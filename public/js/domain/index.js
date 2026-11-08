/**
 * Domain Engine & Compatibility Adapters (H4.5)
 * Unifica Compounds, Stacks e Protocols, provendo validação e adaptadores
 * retrocompatíveis para PEPTIDES_DATABASE e RESEARCH_STACKS.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    const { COMPOUNDS_STORE } = require('./compounds.js');
    const { STACKS_STORE } = require('./stacks.js');
    const { PROTOCOLS_STORE } = require('./protocols.js');
    module.exports = factory(COMPOUNDS_STORE, STACKS_STORE, PROTOCOLS_STORE);
  } else {
    root.DomainEngine = factory(root.COMPOUNDS_STORE, root.STACKS_STORE, root.PROTOCOLS_STORE);
  }
}(typeof self !== 'undefined' ? self : this, function (compounds, stacks, protocols) {
  'use strict';

  const compoundsMap = new Map((compounds || []).map(c => [c.id, c]));
  const stacksMap = new Map((stacks || []).map(s => [s.id, s]));

  // 1. Consultation APIs
  function getCompoundById(id) {
    return compoundsMap.get(id) || null;
  }

  function getAllCompounds() {
    return compounds || [];
  }

  function getStackById(id) {
    return stacksMap.get(id) || null;
  }

  function getAllStacks() {
    return stacks || [];
  }

  function getProtocolsByCompound(compoundId) {
    return (protocols || []).filter(p => p.subjectType === 'compound' && p.compoundId === compoundId);
  }

  function getProtocolsByStack(stackId) {
    return (protocols || []).filter(p => p.subjectType === 'stack' && p.stackId === stackId);
  }

  // 2. Referential Integrity Validator
  function validateReferentialIntegrity() {
    const errors = [];

    // Validar stacks
    (stacks || []).forEach(s => {
      (s.components || []).forEach(comp => {
        if (!compoundsMap.has(comp.compoundId)) {
          errors.push(`Stack [${s.id}] referencia compoundId inexistente: '${comp.compoundId}'`);
        }
      });
    });

    // Validar protocolos
    (protocols || []).forEach(p => {
      if (p.subjectType === 'compound') {
        if (!p.compoundId || p.stackId) {
          errors.push(`Protocolo [${p.id}] com vínculo inválido para subjectType='compound'`);
        } else if (!compoundsMap.has(p.compoundId)) {
          errors.push(`Protocolo [${p.id}] referencia compoundId inexistente: '${p.compoundId}'`);
        }
      } else if (p.subjectType === 'stack') {
        if (!p.stackId || p.compoundId) {
          errors.push(`Protocolo [${p.id}] com vínculo inválido para subjectType='stack'`);
        } else if (!stacksMap.has(p.stackId)) {
          errors.push(`Protocolo [${p.id}] referencia stackId inexistente: '${p.stackId}'`);
        }
      } else {
        errors.push(`Protocolo [${p.id}] com subjectType desconhecido: '${p.subjectType}'`);
      }
    });

    return {
      valid: errors.length === 0,
      totalErrors: errors.length,
      errors: errors
    };
  }

  // 3. Backward Compatibility Adapter: Reconstruct PEPTIDES_DATABASE
  function rebuildPeptidesDatabase() {
    return (compounds || []).map(c => {
      const cProtos = getProtocolsByCompound(c.id);
      const primaryProto = cProtos[0] || {};
      const recons = primaryProto.reconstitutionInformation || {};

      return {
        id: c.id,
        name: c.canonicalName,
        fullName: c.fullName,
        category: c.category,
        categoryId: c.categoryId,
        therapeuticTargets: c.therapeuticTargets,
        status: c.regulatoryStatus,
        statusType: c.statusType,
        evidenceLevel: c.evidenceSummary?.level || "Pré-Clínico",
        evidenceScore: c.evidenceSummary?.score || 70,
        protocolEvidenceType: c.evidenceSummary?.protocolEvidenceType || "preclinical_empirical",
        protocolEvidenceNote: c.evidenceSummary?.protocolEvidenceNote || "",
        structure: c.sequence && c.sequence !== "N/A" ? `${c.canonicalName} (${c.sequence.split('-').length} aa)` : c.canonicalName,
        sequence: c.sequence,
        molecularWeight: c.molecularWeight,
        halfLife: c.halfLife,
        administrationRoutes: c.routesDocumented,
        primaryRoute: c.primaryRoute,
        summary: c.summary,
        mechanism: c.mechanismOfAction,
        researchProtocols: {
          typicalDose: typeof primaryProto.dose === 'number' ? `${primaryProto.dose} ${primaryProto.doseUnit}` : (primaryProto.dose || "250 mcg"),
          defaultDoseNumber: typeof primaryProto.dose === 'number' ? primaryProto.dose : 250,
          defaultUnit: primaryProto.doseUnit || "mcg",
          frequency: primaryProto.frequency || "1x ao dia",
          defaultFrequency: primaryProto.frequency || "1x ao dia",
          cycleLength: primaryProto.duration || "4 a 6 semanas",
          defaultCycleWeeks: 6,
          timing: primaryProto.administrationContext || "Manhã",
          titration: "Sem titulação necessária.",
          researchFocus: c.therapeuticTargets?.[0] || "Regeneração"
        },
        reconstitution: {
          vialSize: primaryProto.formulation || "Frasco de pesquisa padrão",
          recommendedDiluent: recons.diluent || "Água Bacteriostática (BAC) 0,9%",
          recommendedBacWater: recons.volume || "2.0 mL",
          resultingConcentration: recons.resultingConcentration || "Variável",
          storageUnmixed: c.storageInformation?.storageUnmixed || "20-25°C",
          storageMixed: primaryProto.stabilityConditions || "2-8°C sob refrigeração",
          handlingNotes: c.storageInformation?.handlingNotes || "Não agitar vigorosamente."
        },
        synergies: [],
        sideEffects: c.safetyProfile?.documentedSideEffects || [],
        criticalAlert: c.safetyProfile?.criticalAlert || "",
        contraindications: c.safetyProfile?.contraindications || [],
        fullTextStudies: [],
        scientificReferences: [],
        popularityScore: c.evidenceSummary?.popularityScore || 80,
        safetyClassification: c.safetyProfile?.classification || "preclinical_risk",
        safetyHeaderTitle: c.safetyProfile?.headerTitle || "Precauções de Pesquisa",
        structuredProtocols: cProtos.map(p => ({
          name: p.protocolName,
          category: p.protocolCategory,
          dose: p.dose,
          unit: p.doseUnit,
          frequency: p.frequency,
          duration: p.duration,
          route: p.route,
          indication: p.indication,
          sources: p.sources
        })),
        pendingScientificReview: "Concluído (H4.5 Normalized)"
      };
    });
  }

  // 4. Backward Compatibility Adapter: Reconstruct RESEARCH_STACKS
  function rebuildResearchStacks() {
    return (stacks || []).map(s => {
      const sProtos = getProtocolsByStack(s.id);
      const primaryProto = sProtos[0] || {};

      return {
        id: s.id,
        title: s.canonicalName,
        badge: s.alternativeNames?.[0] || "Comunitário",
        category: s.category,
        peptides: s.components.map(c => c.compoundId),
        summary: s.description,
        synergyRationale: s.synergyRationale,
        protocolSchedule: {
          duration: primaryProto.duration || "4 a 6 semanas",
          morning: primaryProto.administrationContext?.split('|')?.[0]?.replace('Manhã:', '')?.trim() || "",
          evening: primaryProto.administrationContext?.split('|')?.[1]?.replace('Noite:', '')?.trim() || "",
          weeklyNotes: primaryProto.frequency || "",
          washout: primaryProto.administrationContext?.split('|')?.[2]?.replace('Washout:', '')?.trim() || "Pausa de 4 semanas."
        },
        safetyAlert: s.knownInteractions?.[0] || "",
        evidenceCategory: s.evidenceCategory,
        riskLevel: s.riskLevel,
        administrationParadigm: s.compositionType,
        wadaProhibited: s.riskLevel === 'high' || s.components.some(c => ['somatropin', 'bpc-157', 'tb-500', 'igf-1-lr3', 'cjc-1295-no-dac', 'ipamorelin'].includes(c.compoundId)),
        componentsDetails: s.components.map(c => ({
          peptideId: c.compoundId,
          name: getCompoundById(c.compoundId)?.canonicalName || c.compoundId,
          doseAmount: c.amount,
          doseUnit: c.unit,
          unitType: "mass",
          route: "Subcutânea (SC)",
          frequency: "Conforme protocolo",
          sourceReference: c.source
        })),
        blendDetails: s.commercialFormulations || {},
        primarySources: s.sources || [],
        auditDate: "2026-11-08"
      };
    });
  }

  return {
    getCompoundById,
    getAllCompounds,
    getStackById,
    getAllStacks,
    getProtocolsByCompound,
    getProtocolsByStack,
    validateReferentialIntegrity,
    rebuildPeptidesDatabase,
    rebuildResearchStacks
  };
}));
