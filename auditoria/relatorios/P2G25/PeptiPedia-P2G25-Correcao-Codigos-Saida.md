# Parecer Técnico de Correção de Códigos de Saída e Semântica de Processos — P2G.2.5

## 1. Diagnóstico do Bug Crítico Identificado na P2G.2.4

A auditoria externa independente identificou uma falha sutil, porém crítica, na semântica de encerramento dos runners `run_p2g24_final.py` e `test_e2e_playwright_p2g24.py`.

### A Anatomia da Armadilha `try / finally` em Python

Nos scripts da versão P2G.2.4, a verificação de asserções continha o seguinte padrão estrutural:

```python
# Trecho defeituoso da P2G.2.4
def main():
    ...
    try:
        if total_failed > 0 or total_run != EXPECTED_ASSERTS:
            run_status["status"] = "FAILED"
            run_status["exitCode"] = 1
            return  # <- RETORNO PREMATURO DENTRO DO TRY!
        ...
        run_status["exitCode"] = 0
    except Exception as exc:
        ...
    finally:
        ...  # limpeza de servidor, navegador e gravação de logs
    
    # Código colocado após a estrutura try/finally:
    if run_status["exitCode"] != 0:
        sys.exit(run_status["exitCode"])
```

**Mecanismo da Falha:**
Conforme a especificação da linguagem Python, quando uma instrução `return` é executada dentro de um bloco `try`, o interpretador executa o bloco `finally:` e, ato contínuo, conclui o retorno da função (retornando o valor implícito `None`).
Dessa forma, qualquer linha de código posicionada **após** a cláusula `finally:` é completamente ignorada e inalcançável. Como a função `main()` retornava `None` ao invocador do script (`if __name__ == "__main__": main()`), o processo Python terminava normalmente com código de saída do sistema operacional igual a `0` (`$LASTEXITCODE = 0`).

Esse comportamento mascarava falhas em pipelines automatizados de shell, fazendo com que erros graves pudessem passar despercebidos por analisadores externos que verificassem unicamente o código de saída do processo.

---

## 2. A Solução Arquitetural Definitiva Implementada na P2G.2.5

Na versão P2G.2.5, a arquitetura de retorno de processos foi completamente refatorada seguindo os princípios de *fail-closed* e retorno direto de valores inteiros:

```python
# Arquitetura robusta implementada na P2G.2.5
def main() -> int:
    ...
    try:
        if total_failed > 0:
            run_status["status"] = "FAILED"
            run_status["exitCode"] = 1
            return 1  # Retorna explicitamente o código de erro inteiro

        if total_run != EXPECTED_ASSERTS:
            run_status["status"] = "FAILED"
            run_status["exitCode"] = 1
            return 1

        run_status["status"] = "PASSED"
        run_status["exitCode"] = 0
        return 0

    except Exception as exc:
        run_status["status"] = "ERROR"
        run_status["exitCode"] = 1
        return 1

    finally:
        # Fechamento de recursos e gravação de evidências...
        # O bloco finally é executado garantidamente antes da devolução do valor retornado.

if __name__ == "__main__":
    sys.exit(main())
```

### Propriedades Matemáticas da Solução

1. **Garantia de Execução do `finally`:** O encerramento seguro do Chromium e do servidor HTTP, assim como a gravação estruturada de logs e do sumário JSON, continuam ocorrendo impreterivelmente.
2. **Propagação Inequívoca do Código de Saída:** O valor inteiro (`0` ou `1`) devolvido pela função `main()` (ou `run()`) é imediatamente passado como argumento para `sys.exit()`, que por sua vez define o status de saída da chamada de sistema do sistema operacional (`ExitProcess` no Windows / `exit()` em POSIX).
3. **Impossibilidade de Mascaramento:** Nenhuma ramificação de código ou falha não tratada é capaz de retornar `0`. Em caso de qualquer falha biológica, funcional, de timeout ou de infraestrutura, o processo é encerrado estritamente com código de saída `1`.
