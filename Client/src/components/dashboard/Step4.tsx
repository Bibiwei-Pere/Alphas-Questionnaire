"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { scrollToTop } from "@/lib/helpers";
import { DynamicField, DynamicType } from "./DynamicField";
import { z } from "zod";
import { formStep4 } from "@/app/components/schema/Forms";
import { Reveal } from "@/app/components/animations/Text";

export const Step4 = ({ questionnaire, handleNext, handleBack, isPending }: any) => {
  const form = useForm<z.infer<typeof formStep4>>({
    resolver: zodResolver(formStep4),
  });

  useEffect(() => {
    if (questionnaire) form.reset(questionnaire);
    const timer = setTimeout(() => scrollToTop(), 100);
    return () => clearTimeout(timer);
  }, [questionnaire]);

  const onSubmit = (values: any) => handleNext({ step4: values });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-10'>
          {fieldStep4.map((section, index: number) => (
            <div key={index}>
              <h4 className='font-semibold mb-4'>{section.section}</h4>
              {section.subSection && <h4 className='mb-4'>{section.subSection}</h4>}
              <div className='space-y-4'>
                {section.items.map((field, index: number) => (
                  <Reveal width='100%' key={index}>
                    <DynamicField
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      index={index + 1}
                      form={form}
                      options={["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-between items-center gap-2 mt-10'>
          <Button onClick={handleBack} className='w-full max-w-[300px] ml-0'>
            Back
          </Button>
          <Button variant='outline' disabled={isPending} className='mr-0'>
            {isPending ? <Loader2 className='animate-spin w-4 h-4' /> : "Proceed"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const fieldStep4: {
  section?: string;
  subSection?: string;
  items: {
    name: string;
    label: string;
    type: DynamicType;
    options?: string[];
  }[];
}[] = [
  {
    section: "Section 2: Available and Accessible Health Services",
    items: [
      {
        name: "visitHealthCentre",
        label: "I frequently visit a health centre when I experience health issues.",
        type: "circleCheckbox",
      },
      {
        name: "facilityAccessible",
        label: "The health facility I use is easily accessible from my home.",
        type: "circleCheckbox",
      },
      {
        name: "satisfiedWithService",
        label: "I am satisfied with the quality of services provided at my local health facility.",
        type: "circleCheckbox",
      },
      {
        name: "visitForPrevention",
        label: "I visit health facilities primarily for preventive care such as vaccinations or screenings.",
        type: "circleCheckbox",
      },
      {
        name: "distanceDiscourages",
        label: "The distance to the nearest health facility discourages me from seeking care.",
        type: "circleCheckbox",
      },
    ],
  },
  {
    section: "Section 3: Level of Awareness and Perception",
    items: [
      {
        name: "awareOfServices",
        label: "I am aware of the services offered at the local health centre.",
        type: "circleCheckbox",
      },
      {
        name: "providersAreCompetent",
        label: "Healthcare providers in Sampou are well-trained and competent.",
        type: "circleCheckbox",
      },
      {
        name: "facilitiesAreEquipped",
        label: "Health facilities in Sampou are adequately equipped.",
        type: "circleCheckbox",
      },
      {
        name: "satisfiedWithHealthCentre",
        label: "I am satisfied with the services I receive at the health centre.",
        type: "circleCheckbox",
      },
      {
        name: "servicesMeetNeeds",
        label: "I believe health services in Sampou meet my healthcare needs.",
        type: "circleCheckbox",
      },
    ],
  },
  {
    section: "Section 4a: Factors Affecting Utilization",
    subSection: "What factors Influence your decision to seek health services in Sampou?",
    items: [
      { name: "influenceSeverity", label: "Severity of illness", type: "circleCheckbox" },
      { name: "influenceCost", label: "Cost of service", type: "circleCheckbox" },
      { name: "influenceDistance", label: "Distance to health care facility", type: "circleCheckbox" },
      { name: "influenceQuality", label: "Quality of service", type: "circleCheckbox" },
      { name: "influenceAttitude", label: "Attitude of health care workers", type: "circleCheckbox" },
      { name: "preferTraditional", label: "Preference of traditional medicine", type: "circleCheckbox" },
      { name: "trustHealthSystem", label: "Trust in health system", type: "circleCheckbox" },
      { name: "waitingTime", label: "Waiting time", type: "circleCheckbox" },
      { name: "accessibilityHours", label: "Facility not accessible for 24 hours", type: "circleCheckbox" },
    ],
  },
  {
    section: "Section 4b: Factors Affecting Utilization",
    items: [
      {
        name: "costAffectsDecision",
        label: "Cost of services affects my decision to seek healthcare.",
        type: "circleCheckbox",
      },
      {
        name: "cultureAffectsChoice",
        label: "Cultural beliefs influence my choice of healthcare.",
        type: "circleCheckbox",
      },
      {
        name: "preferTradOverModern",
        label: "I prefer traditional medicine over modern healthcare.",
        type: "circleCheckbox",
      },
      {
        name: "awareOfInsurance",
        label: "I am aware of the government’s health insurance or welfare programs.",
        type: "circleCheckbox",
      },
      {
        name: "avoidedDueToFinance",
        label: "I have avoided seeking healthcare due to financial constraints.",
        type: "circleCheckbox",
      },
      {
        name: "healthcareAffordable",
        label: "The cost of healthcare services in Sampou is affordable.",
        type: "circleCheckbox",
      },
      {
        name: "comfortableToShare",
        label: "I feel comfortable discussing personal health concerns with healthcare providers.",
        type: "circleCheckbox",
      },
      {
        name: "educationAffectsSeeking",
        label: "My level of education affects my healthcare-seeking behavior.",
        type: "circleCheckbox",
      },
    ],
  },
  {
    section: "What are your suggestions for Improvement",
    items: [
      { name: "suggestAdequateStaff", label: "Provision of adequate staff.", type: "circleCheckbox" },
      { name: "suggestDrugAvailability", label: "Drug availability", type: "circleCheckbox" },
      { name: "suggestHealthEducation", label: "Health education", type: "circleCheckbox" },
      { name: "suggestReducedWaiting", label: "Reduced waiting time", type: "circleCheckbox" },
      { name: "suggestBetterAttitude", label: "Better attitude of staff", type: "circleCheckbox" },
      { name: "suggestOpen24hrs", label: "Facility opening 24 hours", type: "circleCheckbox" },
      { name: "suggestAffordableServices", label: "Affordable services", type: "circleCheckbox" },
    ],
  },
];
