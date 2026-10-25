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
stabDataCode += '; global.STABILITY_SCENARIOS = STABILITY_SCENARIOS; global.STABILITY_SOLVENTS = STABILITY_SOLVENTS; global.STABILITY_KNOWN_PROFILES = STABILITY_KNOWN_PROFILES; global.COMPOUND_EVIDENCE_STATUS = COMPOUND_EVIDENCE_STATUS; global.CHART_DATA_ORIGIN = CHART_DATA_ORIGIN; global.normalizeSequence = normalizeSequence; global.analyzeMolecularVulnerabilities = analyzeMolecularVulnerabilities;';
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
  { id: 'desmopressin', expected: 9, seq: 'Mpr-Y-F-Q-N-C-P-d(R)-G-NH2' },
  // Novos casos obrigatórios da auditoria final:
  { id: 'foobar-test', expected: 'incomplete', seq: 'Ala-Gly-Foobar-Lys' },
  { id: 'unbalanced-delim', expected: 'incomplete', seq: 'Ala-Gly-[Nle' },
  { id: 'abcz-test', expected: 'incomplete', seq: 'ABCZ' },
  // Casos obrigatórios do Hotfix Final:
  { id: 'bracket-foobar', expected: 'incomplete', seq: 'Ala-[Foobar]-Gly' },
  { id: 'd-paren-foobar', expected: 'incomplete', seq: 'd(Foobar)-Ala-Gly' },
  { id: 'lys-bogus', expected: 'incomplete', seq: 'Ala-Lys(Bogus)-Gly' },
  { id: 'bracket-nle-valid', expected: 3, seq: 'Ala-[Nle]-Gly' },
  { id: 'bracket-aib-valid', expected: 3, seq: 'Ala-[Aib]-Gly' },
  { id: 'd-f-valid', expected: 3, seq: 'd(F)-Ala-Gly' },
  { id: 'd-w-valid', expected: 3, seq: 'd(W)-Ala-Gly' }
];

for (const c of mandatoryCases) {
  const r = normalizeSequence(c.seq, c.meta);
  if (c.expected === 'incomplete') {
    assert.strictEqual(r.status, 'incomplete', `Esperado status incomplete para ${c.id}`);
    assert.strictEqual(r.cleanLength, 0, `Comprimento limpo deve ser 0 para ${c.id}`);
    assert(r.unrecognizedTokens.length > 0 || r.reason, `Deve reportar token desconhecido ou motivo para ${c.id}`);
    console.log(`PASS: ${c.id} -> incomplete detectado corretamente`);
  } else {
    assert.strictEqual(r.status, 'valid', `Esperado status valid para ${c.id}`);
    assert.strictEqual(r.cleanLength, c.expected, `Comprimento de ${c.id} deve ser ${c.expected}, obtido ${r.cleanLength}`);
    assert.strictEqual(r.unrecognizedTokens.length, 0, `Nenhum token desconhecido permitido em ${c.id}`);
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
    assert.strictEqual(r.unrecognizedTokens.length, 0, `Peptídeo válido ${p.id} não pode ter tokens desconhecidos`);
  } else {
    incompleteCount++;
    assert(r.cleanLength === 0, `Peptídeo incompleto ${p.id} deve ter cleanLength == 0`);
    assert(r.reason, `Peptídeo incompleto ${p.id} deve declarar motivo`);
  }
}

assert.strictEqual(validCount, 94, 'Devem existir exatamente 94 compostos com sequência válida');
assert.strictEqual(incompleteCount, 20, 'Devem existir exatamente 20 compostos incompletos/confidenciais');
console.log(`PASS: 114 compostos avaliados com precisão (94 válidos com 0 tokens desconhecidos, 20 incompletos com justificativa científica).`);

console.log('=== 5. TESTE DE DISTINÇÃO MPR VS CYS NAS VULNERABILIDADES ===');
const atosibanPeptide = global.PEPTIDES_DATABASE.find(p => p.id === 'atosiban');
const desmoPeptide = global.PEPTIDES_DATABASE.find(p => p.id === 'desmopressin');
const zicoPeptide = global.PEPTIDES_DATABASE.find(p => p.id === 'ziconotide');

const atosiVuln = analyzeMolecularVulnerabilities(atosibanPeptide);
const desmoVuln = analyzeMolecularVulnerabilities(desmoPeptide);
const zicoVuln = analyzeMolecularVulnerabilities(zicoPeptide);

// Atosiban deve ter 1x Cys e 1x Mpr
assert(atosiVuln.oxidation.desc.includes('1x Cys'), 'Atosiban deve conter 1x Cys');
assert(atosiVuln.oxidation.desc.includes('1x Mpr'), 'Atosiban deve conter 1x Mpr');
assert(atosiVuln.oxidation.desc.includes('3-mercaptopropionil'), 'Atosiban deve especificar 3-mercaptopropionil');
console.log('PASS: Atosiban distingue 1x Cys de 1x Mpr.');

// Desmopressina deve ter 1x Cys e 1x Mpr
assert(desmoVuln.oxidation.desc.includes('1x Cys'), 'Desmopressina deve conter 1x Cys');
assert(desmoVuln.oxidation.desc.includes('1x Mpr'), 'Desmopressina deve conter 1x Mpr');
console.log('PASS: Desmopressina distingue 1x Cys de 1x Mpr.');

// Ziconotida deve ter 6x Cys e 0x Mpr
assert(zicoVuln.oxidation.desc.includes('6x Cys'), 'Ziconotida deve conter 6x Cys');
assert(!zicoVuln.oxidation.desc.includes('Mpr'), 'Ziconotida não deve conter Mpr');
console.log('PASS: Ziconotida mapeia 6x Cys sem confusão com Mpr.');

console.log('=== 6. TESTE DE BULA REGULATÓRIA PRIALT / ZICONOTIDA (FDA / EMA) ===');
const zicoProfile = global.STABILITY_KNOWN_PROFILES['ziconotide'];
assert(zicoProfile, 'Perfil de ziconotide deve existir em STABILITY_KNOWN_PROFILES');
const notice = zicoProfile.regulatoryStorageNotice;

// FDA DailyMed 2026: 14 dias primeiro enchimento, 84 dias reenchimento não diluído, 40 dias reenchimento diluído a 31°C
assert(notice.includes('14 dias'), 'Prialt notice deve citar 14 dias para primeiro enchimento');
assert(notice.includes('84 dias'), 'Prialt notice deve citar 84 dias para reenchimento não diluído (FDA DailyMed)');
assert(notice.includes('40 dias'), 'Prialt notice deve citar 40 dias para reenchimento diluído (FDA DailyMed)');
assert(notice.includes('31°C') || notice.includes('31 °C'), 'Prialt notice deve citar 31°C para FDA DailyMed');

// EMA SmPC: 14 dias primeiro enchimento, até 60 dias reenchimentos subsequentes a 37°C
assert(notice.includes('60 dias'), 'Prialt notice deve citar até 60 dias (EMA SmPC)');
assert(notice.includes('37°C') || notice.includes('37 °C'), 'Prialt notice deve citar 37°C para EMA SmPC');

assert(notice.includes('DailyMed') || notice.includes('FDA NDA 021060'), 'Prialt notice deve citar DailyMed/FDA');
assert(notice.includes('SmPC') || notice.includes('EMA'), 'Prialt notice deve citar EMA SmPC');
console.log('PASS: Prialt / Ziconotida atende integralmente às especificações FDA DailyMed (31°C) e EMA SmPC (37°C).');

console.log('=== 7. TESTE DE INFORMAÇÕES MICROBIOLÓGICAS E SOLVENTES ===');
const bacWater = global.STABILITY_SOLVENTS.find(s => s.id === 'bac_water');
const sterileWater = global.STABILITY_SOLVENTS.find(s => s.id === 'sterile_water');
const saline = global.STABILITY_SOLVENTS.find(s => s.id === 'saline_09');

assert(bacWater, 'bac_water deve existir');
assert(sterileWater, 'sterile_water deve existir');
assert(saline, 'saline_09 deve existir');

// Não deve generalizar refrigeração a 2-8°C para todos os frascos multidose
assert(!bacWater.description.includes('28 dias sob 2°C a 8°C como teto'), 'Não deve conter a regra antiga generalizada de 28 dias a 2-8°C como regra geral da USP 797');
assert(bacWater.description.includes('não são universalmente restritas a 2–8°C'), 'Deve esclarecer que conservação térmica não é universalmente restrita a 2-8°C');

// Não deve declarar prazo genérico universal de 24h para água estéril
assert(!sterileWater.description.includes('recomendam uso imediato ou descarte em até 24 horas'), 'Não deve conter descarte genérico em 24h para WFI');
assert(sterileWater.description.includes('inexiste prazo genérico universal de armazenamento de 24 horas'), 'Deve esclarecer inexistência de prazo genérico de 24h');

// Soro fisiológico não deve ter descarte universal de 24h
assert(!saline.description.includes('exige descarte em até 24h'), 'Soro fisiológico não deve ter descarte universal de 24h');
assert(saline.description.includes('Inexiste regra de descarte universal em 24 horas'), 'Soro fisiológico deve esclarecer ausência de descarte universal em 24h');
assert(saline.description.includes('depende estritamente do produto, da apresentação'), 'Soro fisiológico deve declarar dependência do produto e apresentação');

// Deve afirmar que estabilidade química, esterilidade microbiológica e potência biológica são grandezas distintas
assert(bacWater.description.includes('potência biológica'), 'bac_water deve citar potência biológica');
assert(sterileWater.description.includes('Estabilidade química, esterilidade microbiológica e potência biológica são grandezas farmacêuticas completamente distintas e independentes'), 'sterile_water deve enfatizar distinção conceitual');
console.log('PASS: Informações microbiológicas saneadas e tecnicamente acuradas (sem regras genéricas de 24h em WFI ou Soro).');

console.log('\n========================================');
console.log('TODOS OS TESTES EM NODE.JS PASSARAM COM SUCESSO (100% OK)');
console.log('========================================\n');
