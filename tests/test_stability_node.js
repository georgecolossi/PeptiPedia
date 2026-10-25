/**
 * Suíte de Testes Automatizados em JavaScript Real (Node.js / V8)
 * Validação Direta do Parser Molecular, Modelo Matemático e Catálogo de 114 Peptídeos
 * Peptipedia - 2026
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');

// 1. Carregar Base de Peptídeos e Dados de Estabilidade
let pepCode = fs.readFileSync(path.join(ROOT, 'js/peptides-data.js'), 'utf8');
pepCode += '; global.PEPTIDES_DATABASE = PEPTIDES_DATABASE;';
eval(pepCode);

let stabDataCode = fs.readFileSync(path.join(ROOT, 'js/stability-data.js'), 'utf8');
stabDataCode += '; global.STABILITY_SCENARIOS = STABILITY_SCENARIOS; global.STABILITY_SOLVENTS = STABILITY_SOLVENTS; global.STABILITY_KNOWN_PROFILES = STABILITY_KNOWN_PROFILES; global.COMPOUND_EVIDENCE_STATUS = COMPOUND_EVIDENCE_STATUS; global.CHART_DATA_ORIGIN = CHART_DATA_ORIGIN; global.normalizeSequence = normalizeSequence;';
eval(stabDataCode);

let stabClockCode = fs.readFileSync(path.join(ROOT, 'js/stability.js'), 'utf8');
stabClockCode += '; global.PeptideStabilityClock = PeptideStabilityClock;';
eval(stabClockCode);

console.log('=== 1. TESTE DO CATÁLOGO DE 114 PEPTÍDEOS ===');
assert.strictEqual(global.PEPTIDES_DATABASE.length, 114, 'Catálogo deve possuir exatamente 114 peptídeos');
console.log('PASS: 114 peptídeos carregados com sucesso.');

console.log('=== 2. TESTE DOS CASOS MANDATÓRIOS DO PARSER MOLECULAR ===');
const mandatoryCases = [
  { id: 'ipamorelin', expected: 5, seq: 'Aib-His-D-2-Nal-D-Phe-Lys-NH2' },
  { id: 'orexin-a', expected: 33, seq: 'Pyr-PLPDCCRQKTCSCRLYELLHGAGNHAAGILTL-NH2' },
  { id: 'thymulin', expected: 9, seq: 'Pyr-AKSQGGSN' },
  { id: 'leuprorelin', expected: 9, seq: 'Pyr-H-W-S-Y-d(L)-L-R-P-NHEt' },
  { id: 'goserelin', expected: 10, seq: 'Pyr-H-W-S-Y-d(S(tBu))-L-R-P-Azgly-NH2' },
  { id: 'ziconotide', expected: 25, seq: 'CKGKGAKCSRLMYDCCTGSCRSGKC-NH2' },
  { id: 'apraglutide', expected: 33, seq: 'HGDGSFSDE-[Nle]-[d-Phe]-TILDLLAARDFINWLIQTKITD-NH2' },
  { id: 'octreotide', expected: 8, seq: 'd(F)-C-F-d(W)-K-T-C-Thr(ol)' },
  { id: 'd-phe-ala-gly', expected: 3, seq: 'D-Phe-Ala-Gly-NH2' },
  { id: 'unknown-1', expected: 'incomplete', seq: 'GGG-???-CCC' },
  { id: 'unknown-2', expected: 'incomplete', seq: '????' },
  { id: 'tb-500', expected: 'incomplete', seq: 'Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln (Fragmento 17-23, PM 889,0 g/mol). Precursor completo Timosina Beta-4 (43 aa, PM 4963,5 g/mol): Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln-Glu-Lys-Asn-Pro-Leu-Pro-Ser-Lys-Glu-Thr-Ile-Glu-Gln-Glu-Lys-Gln-Ala-Gly-Glu-Ser', meta: { id: 'tb-500' } },
  { id: 'atosiban', expected: 9, seq: 'Mpr-d(Y(Et))-I-T-N-C-P-Orn-G-NH2' },
  { id: 'desmopressin', expected: 9, seq: 'Mpr-Y-F-Q-N-C-P-d(R)-G-NH2' }
];

for (const c of mandatoryCases) {
  const r = normalizeSequence(c.seq, c.meta);
  if (c.expected === 'incomplete') {
    assert.strictEqual(r.status, 'incomplete', `Esperado status incomplete para ${c.id}`);
    assert.strictEqual(r.cleanLength, 0, `Comprimento limpo deve ser 0 para ${c.id}`);
    console.log(`PASS: ${c.id} -> incomplete detectado corretamente`);
  } else {
    assert.strictEqual(r.status, 'valid', `Esperado status valid para ${c.id}`);
    assert.strictEqual(r.cleanLength, c.expected, `Comprimento de ${c.id} deve ser ${c.expected}, obtido ${r.cleanLength}`);
    console.log(`PASS: ${c.id} -> ${r.cleanLength} resíduos (esperado: ${c.expected})`);
  }
}

console.log('=== 3. TESTE DO MOTOR CINÉTICO E MODELO MATEMÁTICO ===');
const clock = new PeptideStabilityClock();

// Potência em dia 0
assert.strictEqual(clock.calculatePotencyAtDay(0, 0.012), 100.0, 'Potência em dia 0 deve ser 100%');
assert.strictEqual(clock.calculatePotencyAtDay(-5, 0.012), 100.0, 'Dias negativos devem retornar 100%');
assert.strictEqual(clock.calculatePotencyAtDay(30, 0.0), 100.0, 'k=0 deve retornar 100%');
assert.strictEqual(clock.calculatePotencyAtDay(30, -0.05), 100.0, 'k negativo deve retornar 100%');
assert.strictEqual(clock.calculatePotencyAtDay(30, NaN), 100.0, 'NaN deve retornar 100%');
assert.strictEqual(clock.calculatePotencyAtDay(30, Infinity), 100.0, 'Infinity deve retornar 100%');

// Potência calculada dia 30 k=0.012 -> ~69.8%
const pot30 = clock.calculatePotencyAtDay(30, 0.012);
assert(Math.abs(pot30 - 69.767) < 0.1, `Potência dia 30 esperada ~69.8%, obtido ${pot30}`);
console.log('PASS: Cálculo de potência R(t) validado com sucesso.');

// Meia-vida teórica
assert.strictEqual(clock.calculateHalfLife(0.0), 'Infinita / Indefinida');
assert.strictEqual(clock.calculateHalfLife(-0.01), 'Infinita / Indefinida');
assert.strictEqual(clock.calculateHalfLife(NaN), 'Infinita / Indefinida');
assert.strictEqual(clock.calculateHalfLife(0.012), 58);
assert.strictEqual(clock.calculateHalfLife(0.003), 231);
assert.strictEqual(clock.calculateHalfLife(0.035), 20);
console.log('PASS: Cálculo de meia-vida t_1/2 validado com sucesso.');

// Modelo de temperatura independente e ajustável
clock.setCustomK(0.010);
clock.setThermalFactor(4.0); // Fator ajustável de 4x
let calc = clock.calculate();
assert.strictEqual(calc.fridge.kRate, 0.010);
assert.strictEqual(calc.room.kRate, 0.040); // 0.010 * 4.0
console.log('PASS: Fator de sensibilidade térmica ajustável validado.');

clock.setCustomK(0.010, 0.025); // Taxas independentes diretas
calc = clock.calculate();
assert.strictEqual(calc.fridge.kRate, 0.010);
assert.strictEqual(calc.room.kRate, 0.025);
console.log('PASS: Taxas térmicas independentes validadas.');

console.log('=== 4. TESTE DE PROCESSAMENTO DOS 114 COMPOSTOS REAIS ===');
let validCount = 0;
let incompleteCount = 0;
for (const p of global.PEPTIDES_DATABASE) {
  const seq = p.sequenceOneLetter || p.sequence || '';
  const r = normalizeSequence(seq, p);
  if (r.status === 'valid') {
    validCount++;
    assert(r.cleanLength > 0, `Peptídeo válido ${p.id} deve ter cleanLength > 0`);
  } else {
    incompleteCount++;
    assert(r.cleanLength === 0, `Peptídeo incompleto ${p.id} deve ter cleanLength == 0`);
    assert(r.reason, `Peptídeo incompleto ${p.id} deve declarar motivo`);
  }
}

assert.strictEqual(validCount, 94, 'Devem existir exatamente 94 compostos com sequência válida');
assert.strictEqual(incompleteCount, 20, 'Devem existir exatamente 20 compostos incompletos/confidenciais');
console.log(`PASS: 114 compostos avaliados com precisão (94 válidos, 20 incompletos com justificativa científica).`);

console.log('\n========================================');
console.log('TODOS OS TESTES EM NODE.JS PASSARAM COM SUCESSO (100% OK)');
console.log('========================================\n');
