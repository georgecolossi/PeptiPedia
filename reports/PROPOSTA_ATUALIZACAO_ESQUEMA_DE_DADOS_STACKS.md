# PROPOSTA DE EVOLUÇÃO DA ARQUITETURA DE DADOS: ESQUEMA DE PROTOCOLOS E STACKS DE PEPTÍDEOS

**Identificador do Documento:** `SCHEMA-EVOLUTION-STACKS-2026-11`  
**Data de Emissão:** 08 de Novembro de 2026  
**Status:** Especificação Técnica e Implementação  
**Arquivos de Destino:** `js/stacks-data.js` e `public/js/stacks-data.js`

---

## 1. LIMITAÇÕES DA ARQUITETURA LEGADA

A estrutura de dados legada de `RESEARCH_STACKS` sofria de três deficiências metodológicas:
1. **Homogeneização posológica forçada:** Assumia que todos os peptídeos listados no array `peptides` compartilhavam a mesma unidade (ex.: microgramas), a mesma rota (SC) e o mesmo regime temporal, impossibilitando a representação fiel de:
   - Compostos orais (ex.: 5-Amino-1MQ, KPV, BPC Arginato).
   - Compostos intranasais (ex.: Semax, Selank).
   - Formulações tópicas expressas em percentual (ex.: Argireline 5% + SNAP-8).
   - Compostos dosados em Unidades Internacionais (UI) ou volumes parenterais (ex.: Cerebrolysin em mL, rhGH em UI).
2. **Omissão da distinção entre Blends Comerciais e Administração Separada:**
   - Não registrava a rigidez de razões fixas (ex.: GLOW 70 mg em proporção 5:1:1) nem seus conflitos cinéticos (como forçar TB-500 em microdoses diárias).
3. **Ausência de Metadados de Governança Científica e Risco:**
   - Misturava ensaios clínicos homologados (ex.: CagriSema) com práticas empíricas não testadas e combinações perigosas (ex.: Incretin Triple Burn), sem categorização unívoca.

---

## 2. ESPECIFICAÇÃO DO NOVO SCHEMA v2

O novo esquema mantém total retrocompatibilidade com a interface visual (`title`, `badge`, `category`, `peptides`, `summary`, `synergyRationale`, `protocolSchedule`, `safetyAlert`), enquanto adiciona metadados estruturados de alta precisão farmacotécnica:

```typescript
interface ComponentProtocolDetail {
  peptideId: string;                  // ID canônico no PEPTIDES_DATABASE
  name: string;                       // Nome usual legível
  doseAmount: number | string;        // Quantidade numérica da dose típica ou faixa
  doseUnit: string;                   // 'mcg' | 'mg' | 'UI' | 'mL' | 'gotas' | '%'
  unitType: 'mass' | 'biological_iu' | 'volume' | 'concentration' | 'ratio';
  route: string;                      // 'Subcutânea (SC)' | 'Oral' | 'Intranasal' | 'Tópica' | 'IM/IV'
  frequency: string;                  // '1x ao dia' | '2x por semana' | 'sob demanda' | etc.
  timing: string;                     // 'Manhã em jejum' | 'Antes de dormir' | 'Pós-treino'
  evidenceCategory: string;           // Categoria individual de evidência
  sourceReference: string;            // Citação primária (PMID, DOI, Bula ou Código)
}

interface BlendDetails {
  isFixedRatioBlend: boolean;         // true se comercializado como pó misto no mesmo frasco
  totalVialMassMg?: number;           // Massa nominal total do frasco liofilizado (ex.: 70 mg)
  typicalReconstitutionVolumeMl?: number; // Volume padrão de diluente sugerido (ex.: 3.0 mL)
  diluentRecommended?: string;        // Ex.: 'Água Bacteriostática (BAC) 0,9%'
  componentProportions?: Record<string, string>; // Ex.: {'ghk-cu': '71.4% (50mg)', ...}
  resultingConcentrations?: string;   // Ex.: 'GHK-Cu: 16.67 mg/mL; BPC-157: 3.33 mg/mL'
  kineticConflictWarning?: string;    // Alerta de divergência de meia-vida/frequência
  physicochemicalRisk?: string;       // Alerta de oxidação/quelação por metais
}

interface ResearchStackV2 {
  // --- Campos de Compatibilidade com UI v1 ---
  id: string;
  title: string;
  badge: string;                      // Rótulo sóbrio (ex.: 'Ensaio Clínico Fase 3', 'Blend Comercial')
  category: string;
  peptides: string[];                 // Array de IDs canônicos para filtragem
  summary: string;
  synergyRationale: string;
  protocolSchedule: {
    duration: string;
    morning?: string;
    evening?: string;
    weeklyNotes?: string;
    washout?: string;
  };
  safetyAlert: string;

  // --- Campos Estruturados do Schema v2 ---
  evidenceCategory: 
    | 'clinical_combination'
    | 'preclinical_combination'
    | 'documented_off_label_combination'
    | 'community_reported_stack'
    | 'commercial_blend'
    | 'unverified_combination';

  riskLevel: 'low' | 'moderate' | 'high' | 'contraindicated';
  administrationParadigm: 'independent_vials' | 'commercial_fixed_blend' | 'mixed_routes' | 'topical';
  wadaProhibited: boolean;
  componentsDetails: ComponentProtocolDetail[];
  blendDetails?: BlendDetails;
  primarySources: string[];
  auditDate: string;
}
```

---

## 3. BENEFÍCIOS PARA A CALCULADORA E INTERFACE

1. **Calculadora Inteligente de Unidades Mistas:** A interface passa a ser capaz de calcular separadamente o volume de cada componente quando as unidades diferem (ex.: SS-31 em mg + MOTS-c em mg + 5-Amino-1MQ em cápsula oral).
2. **Alerta Visual de Blend vs. Seringa:** A interface pode exibir se o protocolo é um pó pré-misturado de frasco único ou se exige injeções subcutâneas em sítios alternados.
3. **Auditoria de Conformidade em Tempo Real:** A integridade dos dados pode ser verificada por suítes automatizadas de testes em Python/JS sem quebrar renderizações existentes.
