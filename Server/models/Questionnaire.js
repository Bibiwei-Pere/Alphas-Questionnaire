import mongoose from "mongoose";

const QuestionnaireSchema = new mongoose.Schema(
  {
    step1: {
      age: { type: String, default: "" },
      insurance: { type: String, default: "" },
      sex: { type: String, default: "" },
      maritalStatus: { type: String, default: "" },
      stateOfOrigin: { type: String, default: "" },
      educationLevel: { type: String, default: "" },
      religion: { type: String, default: "" },
      occupation: { type: String, default: "" },
    },
    step2: {
      malariaCauses: { type: [String], default: [] },
      malariaSymptoms: { type: [String], default: [] },
      heardTesting: { type: String, default: "" },
      testingInfoSource: { type: [String], default: [] },
      testingMethodsKnown: { type: [String], default: [] },
      knowWhereToTest: { type: String, default: "" },
      recommendedTreatment: { type: [String], default: [] },
      treatmentInfoSource: { type: [String], default: [] },

      testingCentersAvailable: { type: String, default: "" },
      testingCenterDistance: { type: String, default: "" },

      familiarWithRapidTest: { type: String, default: "" },
      testBeforeTreatment: { type: String, default: "" },
      whyNoTest: { type: [String], default: [] },
      testLocation: { type: [String], default: [] },

      treatmentMethodUsed: { type: [String], default: [] },
      treatmentDrugSource: { type: [String], default: [] },
      completeTreatmentCourse: { type: String, default: "" },
      treatmentDrugsAvailable: { type: String, default: "" },
    },
    step3: {
      wasteDisposalMethods: { type: [String], default: [] },
      awarenessOfDangers: { type: [String], default: [] },
      awarenessSource: { type: [String], default: [] },
      sufficientFacilities: { type: String, default: "" },

      wasteChallenges: { type: [String], default: [] },
      learnedProperManagement: { type: String, default: "" },
      penaltiesInCommunity: { type: String, default: "" },
      shouldIncludeInCurriculum: { type: String, default: "" },

      educationInfluence: { type: String, default: "" },
      jobInfluence: { type: String, default: "" },
      ageInfluence: { type: String, default: "" },
      householdInfluence: { type: String, default: "" },

      needCampaigns: { type: String, default: "" },
      needFines: { type: String, default: "" },
      govSupport: { type: String, default: "" },
    },
    step4: {
      visitHealthCentre: { type: String, default: "" },
      facilityAccessible: { type: String, default: "" },
      satisfiedWithService: { type: String, default: "" },
      visitForPrevention: { type: String, default: "" },
      distanceDiscourages: { type: String, default: "" },

      awareOfServices: { type: String, default: "" },
      providersAreCompetent: { type: String, default: "" },
      facilitiesAreEquipped: { type: String, default: "" },
      satisfiedWithHealthCentre: { type: String, default: "" },
      servicesMeetNeeds: { type: String, default: "" },

      influenceSeverity: { type: String, default: "" },
      influenceCost: { type: String, default: "" },
      influenceDistance: { type: String, default: "" },
      influenceQuality: { type: String, default: "" },
      influenceAttitude: { type: String, default: "" },
      preferTraditional: { type: String, default: "" },
      trustHealthSystem: { type: String, default: "" },
      waitingTime: { type: String, default: "" },
      accessibilityHours: { type: String, default: "" },

      costAffectsDecision: { type: String, default: "" },
      cultureAffectsChoice: { type: String, default: "" },
      preferTradOverModern: { type: String, default: "" },
      awareOfInsurance: { type: String, default: "" },
      avoidedDueToFinance: { type: String, default: "" },
      healthcareAffordable: { type: String, default: "" },
      comfortableToShare: { type: String, default: "" },
      educationAffectsSeeking: { type: String, default: "" },

      suggestAdequateStaff: { type: String, default: "" },
      suggestDrugAvailability: { type: String, default: "" },
      suggestHealthEducation: { type: String, default: "" },
      suggestReducedWaiting: { type: String, default: "" },
      suggestBetterAttitude: { type: String, default: "" },
      suggestOpen24hrs: { type: String, default: "" },
      suggestAffordableServices: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Questionnaire", QuestionnaireSchema);
