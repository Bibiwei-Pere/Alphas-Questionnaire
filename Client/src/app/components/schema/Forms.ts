import { z } from "zod";

export const formLogin = z.object({
  email: z.string().min(2, "Email field is required.").default(""),
  password: z.string().min(2, "Password field is required.").default(""),
});

export const formPasswordReset = z.object({
  email: z.string().min(2, "Email field is required.").default(""),
});

export const formNewPassword = z.object({
  password: z.string().min(2, "Password field is required.").default(""),
  confirmPassword: z.string().min(2, "Comfirm password field is required.").default(""),
});

export const formUpdateUser = z.object({
  email: z.string().optional(),
  lastname: z.string().optional(),
  firstname: z.string().optional(),
});

export const formUpdatePassword = z.object({
  passwordReset: z.object({
    password: z.string().min(6, "Minimun of 6 characters.").default(""),
    confirmPassword: z.string().min(6, "Minimun of 6 characters.").default(""),
  }),
});

export const formStep1 = z.object({
  age: z.string().min(1, "Age is required."),
  insurance: z.string().optional(),
  sex: z.enum(["Male", "Female"], { required_error: "Sex is required." }),
  maritalStatus: z.enum(["Married", "Single", "Divorced", "Cohabiting", "Widow/Widower", "Separated"], {
    required_error: "Marital status is required.",
  }),
  stateOfOrigin: z.enum(["Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Rivers", "Others"], {
    required_error: "State of Origin is required.",
  }),
  educationLevel: z.enum(["None", "Primary", "Secondary", "Tertiary"], {
    required_error: "Education level is required.",
  }),
  religion: z.enum(["Christianity", "Muslim", "Traditional worshippers", "Others"], {
    required_error: "Religion is required.",
  }),
  occupation: z.enum(["Farmer", "Civil Servant", "Trader", "Artisan", "Others"], {
    required_error: "Occupation is required.",
  }),
});

export const formStep2 = z.object({
  // Section B
  malariaCauses: z.array(z.string()).optional(),
  malariaSymptoms: z.array(z.string()).optional(),
  heardTesting: z.string().optional(),
  testingInfoSource: z.array(z.string()).optional(),
  testingMethodsKnown: z.array(z.string()).optional(),
  knowWhereToTest: z.string().optional(),
  recommendedTreatment: z.array(z.string()).optional(),
  treatmentInfoSource: z.array(z.string()).optional(),

  // Section C
  testingCentersAvailable: z.string().optional(),
  testingCenterDistance: z.string().optional(),

  // Section D
  familiarWithRapidTest: z.string().optional(),
  testBeforeTreatment: z.string().optional(),
  whyNoTest: z.array(z.string()).optional(),
  testLocation: z.array(z.string()).optional(),

  // Section E
  treatmentMethodUsed: z.array(z.string()).optional(),
  treatmentDrugSource: z.array(z.string()).optional(),
  completeTreatmentCourse: z.string().optional(),
  treatmentDrugsAvailable: z.string().optional(),
});

export const formStep3 = z.object({
  // Section B
  wasteDisposalMethods: z.array(z.string()).optional(),
  awarenessOfDangers: z.array(z.string()).optional(),
  awarenessSource: z.array(z.string()).optional(),
  sufficientFacilities: z.string().optional(),

  // Section C
  wasteChallenges: z.array(z.string()).optional(),
  learnedProperManagement: z.string().optional(),
  penaltiesInCommunity: z.string().optional(),
  shouldIncludeInCurriculum: z.string().optional(),

  // Section D
  educationInfluence: z.string().optional(),
  jobInfluence: z.string().optional(),
  ageInfluence: z.string().optional(),
  householdInfluence: z.string().optional(),

  // Section E
  needCampaigns: z.string().optional(),
  needFines: z.string().optional(),
  govSupport: z.string().optional(),
});

export const formStep4 = z.object({
  // Section 2: Available and Accessible Health Services
  visitHealthCentre: z.string().optional(),
  facilityAccessible: z.string().optional(),
  satisfiedWithService: z.string().optional(),
  visitForPrevention: z.string().optional(),
  distanceDiscourages: z.string().optional(),

  // Section 3: Level of Awareness and Perception
  awareOfServices: z.string().optional(),
  providersAreCompetent: z.string().optional(),
  facilitiesAreEquipped: z.string().optional(),
  satisfiedWithHealthCentre: z.string().optional(),
  servicesMeetNeeds: z.string().optional(),

  // Section 4: Factors Affecting Utilization
  influenceSeverity: z.string().optional(),
  influenceCost: z.string().optional(),
  influenceDistance: z.string().optional(),
  influenceQuality: z.string().optional(),
  influenceAttitude: z.string().optional(),
  preferTraditional: z.string().optional(),
  trustHealthSystem: z.string().optional(),
  waitingTime: z.string().optional(),
  accessibilityHours: z.string().optional(),

  costAffectsDecision: z.string().optional(),
  cultureAffectsChoice: z.string().optional(),
  preferTradOverModern: z.string().optional(),
  awareOfInsurance: z.string().optional(),
  avoidedDueToFinance: z.string().optional(),
  healthcareAffordable: z.string().optional(),
  comfortableToShare: z.string().optional(),
  educationAffectsSeeking: z.string().optional(),

  // Section 5: Suggestions for Improvement
  suggestAdequateStaff: z.string().optional(),
  suggestDrugAvailability: z.string().optional(),
  suggestHealthEducation: z.string().optional(),
  suggestReducedWaiting: z.string().optional(),
  suggestBetterAttitude: z.string().optional(),
  suggestOpen24hrs: z.string().optional(),
  suggestAffordableServices: z.string().optional(),
});
