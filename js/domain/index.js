/**
 * Domain Engine & Compatibility Adapters (H4.7 Remediated Canon)
 * Unifica Compounds, Stacks e Protocols, provendo validação, fábrica e adaptadores
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

  function createEngineInstance(cList, sList, pList) {
    const activeCompounds = cList || [];
    const activeStacks = sList || [];
    const activeProtocols = pList || [];

    const compoundsMap = new Map(activeCompounds.map(c => [c.id, c]));
    const stacksMap = new Map(activeStacks.map(s => [s.id, s]));

    // 1. Consultation APIs
    function getCompoundById(id) {
      return compoundsMap.get(id) || null;
    }

    function getAllCompounds() {
      return activeCompounds;
    }

    function getStackById(id) {
      return stacksMap.get(id) || null;
    }

    function getAllStacks() {
      return activeStacks;
    }

    function getProtocolsByCompound(compoundId) {
      return activeProtocols.filter(p => p.subjectType === 'compound' && p.compoundId === compoundId);
    }

    function getProtocolsByStack(stackId) {
      return activeProtocols.filter(p => p.subjectType === 'stack' && p.stackId === stackId);
    }

    // 2. Referential Integrity Validator (supports custom stores parameterization)
    function validateReferentialIntegrity(customStores) {
      const cTarget = (customStores && customStores.compounds) || activeCompounds;
      const sTarget = (customStores && customStores.stacks) || activeStacks;
      const pTarget = (customStores && customStores.protocols) || activeProtocols;

      const cMap = new Map(cTarget.map(c => [c.id, c]));
      const sMap = new Map(sTarget.map(s => [s.id, s]));
      const errors = [];

      // Validar stacks
      sTarget.forEach(s => {
        (s.components || []).forEach(comp => {
          if (!cMap.has(comp.compoundId)) {
            errors.push(`Stack [${s.id}] referencia compoundId inexistente: '${comp.compoundId}'`);
          }
        });
      });

      // Validar protocolos
      pTarget.forEach(p => {
        if (p.subjectType === 'compound') {
          if (!p.compoundId || p.stackId) {
            errors.push(`Protocolo [${p.id}] com vínculo inválido para subjectType='compound'`);
          } else if (!cMap.has(p.compoundId)) {
            errors.push(`Protocolo [${p.id}] referencia compoundId inexistente: '${p.compoundId}'`);
          }
        } else if (p.subjectType === 'stack') {
          if (!p.stackId || p.compoundId) {
            errors.push(`Protocolo [${p.id}] com vínculo inválido para subjectType='stack'`);
          } else if (!sMap.has(p.stackId)) {
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
      return activeCompounds.map(c => {
        const cProtos = getProtocolsByCompound(c.id);
        const hasProtocol = cProtos.length > 0;
        const primaryProto = hasProtocol ? cProtos[0] : null;
        const recons = (primaryProto && primaryProto.reconstitutionInformation) || {};

        return {
          id: c.id,
          name: c.canonicalName,
          fullName: c.fullName,
          category: c.category,
          categoryId: c.categoryId,
          therapeuticTargets: c.therapeuticTargets,
          status: c.regulatoryStatus,
          statusType: c.statusType,
          substanceType: c.substanceType,
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
          hasDocumentedClinicalProtocol: hasProtocol,
          researchProtocols: {
            typicalDose: hasProtocol ? (typeof primaryProto.dose === 'number' ? `${primaryProto.dose} ${primaryProto.doseUnit}` : (primaryProto.dose || "Dose sob investigação")) : "Em Investigação / Sem protocolo clínico documentado",
            defaultDoseNumber: hasProtocol ? (typeof primaryProto.dose === 'number' ? primaryProto.dose : 250) : null,
            defaultUnit: hasProtocol ? (primaryProto.doseUnit || "mcg") : "N/A",
            frequency: hasProtocol ? (primaryProto.frequency || "Conforme prescrição") : "Não aplicável",
            defaultFrequency: hasProtocol ? (primaryProto.frequency || "1x ao dia") : "Não aplicável",
            cycleLength: hasProtocol ? (primaryProto.duration || "4 a 6 semanas") : "Não aplicável",
            defaultCycleWeeks: hasProtocol ? 6 : null,
            timing: hasProtocol ? (primaryProto.administrationContext || "Manhã") : "Uso experimental / Sem posologia humana",
            titration: hasProtocol ? "Sem titulação necessária." : "Não aplicável.",
            researchFocus: c.therapeuticTargets?.[0] || "Pesquisa Translacional"
          },
          reconstitution: {
            vialSize: hasProtocol ? (primaryProto.formulation || "Frasco padrão") : "Reagente investigacional de bancada",
            recommendedDiluent: recons.diluent || "Água Bacteriostática (BAC) 0,9%",
            recommendedBacWater: recons.volume || "2.0 mL",
            resultingConcentration: recons.resultingConcentration || "Variável",
            stabilityMixed: c.storageInformation?.storageMixed || "Refrigerado a 2°C a 8°C",
            stabilityUnmixed: c.storageInformation?.storageUnmixed || "-20°C"
          },
          protocol: primaryProto,
          protocols: cProtos,
          safety: {
            contraindications: (primaryProto && primaryProto.contraindications) || c.safetyProfile?.contraindications || [],
            sideEffects: (primaryProto && primaryProto.adverseEffects) || c.safetyProfile?.documentedSideEffects || [],
            criticalAlert: c.safetyProfile?.criticalAlert || ""
          },
          unitConventions: c.unitConventions || {},
          sources: c.sources || [],
          clinicalStudies: (c.sources || [])
            .filter(s => s && s.type !== 'reference' && (s.title || s.pmid))
            .map(s => ({
              title: s.title,
              journal: s.journal || (s.type === 'label' ? 'Bula Regulatória Oficial' : 'PubMed Reference'),
              year: s.year || '',
              pmid: s.pmid || s.reference || 'Documento Oficial',
              url: s.url || (s.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/` : '')
            }))
        };
      });
    }

    // 4. Backward Compatibility Adapter: Reconstruct RESEARCH_STACKS
    function rebuildResearchStacks() {
      return activeStacks.map(s => {
        const sProtos = getProtocolsByStack(s.id);
        const primaryProto = sProtos[0] || {};

        return {
          id: s.id,
          name: s.canonicalName,
          title: s.canonicalName,
          badge: s.badge || (s.compositionType === 'commercial_fixed_blend' || s.compositionType === 'commercial_blend' ? 'Blend Comercial & Relato Comunitário' : 'Stack de Pesquisa'),
          category: s.category,
          peptides: (s.components || []).map(c => c.compoundId),
          summary: s.description || s.synergyRationale || "",
          synergyRationale: s.synergyRationale,
          protocolSchedule: {
            duration: primaryProto.duration || "4 a 6 semanas",
            morning: primaryProto.administrationContext?.split('|')?.[0]?.replace('Manhã:', '')?.trim() || "",
            evening: primaryProto.administrationContext?.split('|')?.[1]?.replace('Noite:', '')?.trim() || "",
            weeklyNotes: primaryProto.frequency || "",
            washout: primaryProto.administrationContext?.split('|')?.[2]?.replace('Washout:', '')?.trim() || "Pausa de 4 semanas."
          },
          safetyAlert: s.knownInteractions?.[0] || s.safetyAlert || "",
          evidenceCategory: s.evidenceCategory,
          riskLevel: s.riskLevel,
          administrationParadigm: s.compositionType,
          wadaProhibited: s.riskLevel === 'high' || (s.components || []).some(c => ['somatropin', 'bpc-157', 'tb-500', 'igf-1-lr3', 'cjc-1295-no-dac', 'ipamorelin'].includes(c.compoundId)),
          componentsDetails: (s.components || []).map(c => ({
            peptideId: c.compoundId,
            name: getCompoundById(c.compoundId)?.canonicalName || c.compoundId,
            doseAmount: c.amount,
            doseUnit: c.unit,
            unitType: "mass",
            route: "Subcutânea (SC)",
            frequency: "Conforme protocolo",
            sourceReference: c.source || ""
          })),
          blendDetails: s.commercialFormulations || {},
          primarySources: s.sources || [],
          protocol: primaryProto,
          protocols: sProtos,
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
      rebuildResearchStacks,
      create: createEngineInstance
    };
  }

  return createEngineInstance(compounds, stacks, protocols);
}));
