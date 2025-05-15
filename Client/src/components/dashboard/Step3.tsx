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
import { formStep3 } from "@/app/components/schema/Forms";
import { Reveal } from "@/app/components/animations/Text";

export const Step3 = ({ questionnaire, handleNext, handleBack, isPending }: any) => {
  const form = useForm<z.infer<typeof formStep3>>({
    resolver: zodResolver(formStep3),
  });

  useEffect(() => {
    if (questionnaire) form.reset(questionnaire);
    const timer = setTimeout(() => scrollToTop(), 100);
    return () => clearTimeout(timer);
  }, [questionnaire]);

  const onSubmit = (values: z.infer<typeof formStep3>) => handleNext({ step3: values });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-10'>
          {fieldStep3.map((section, index: number) => (
            <div key={index}>
              <h4 className='font-semibold mb-4'>{section.section}</h4>
              <div className='space-y-4'>
                {section.items.map((field, index: number) => (
                  <Reveal width='100%' key={index}>
                    <DynamicField
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      index={index + 1}
                      form={form}
                      options={field.options}
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

export const fieldStep3: {
  section: string;
  items: {
    name: string;
    label: string;
    type: DynamicType;
    options?: string[];
  }[];
}[] = [
  {
    section: "Section B: Awareness of Solid Waste Management Practices and Environmental Impact",
    items: [
      {
        name: "wasteDisposalMethods",
        label: "How do you usually dispose of your household waste? (Tick one or more)",
        type: "squareCheckbox",
        options: [
          "Dump in open spaces",
          "Burn it",
          "Collected by disposal services",
          "Composting",
          "Give recyclables to collectors",
          "Dump in open pits/landfills",
          "Others",
        ],
      },
      {
        name: "awarenessOfDangers",
        label: "Are you aware of the dangers of improper waste management? (Tick one or more)",
        type: "squareCheckbox",
        options: [
          "Dirty and smelly surroundings",
          "Blocked drainages/flooding",
          "Breeding of mosquitoes, flies, rats",
          "Risk of diseases (e.g., cholera, malaria)",
          "Pollution of water/air",
          "Animal deaths from eating waste",
          "Others",
        ],
      },
      {
        name: "awarenessSource",
        label: "How did you gain awareness on proper waste management? (Tick one or more)",
        type: "squareCheckbox",
        options: ["School", "Government agency", "NGO/community group", "TV/Radio/Internet", "Others"],
      },
      {
        name: "sufficientFacilities",
        label: "Are there sufficient waste disposal facilities in your community?",
        type: "circleCheckbox",
        options: ["Yes", "No"],
      },
    ],
  },
  {
    section: "Section C: Challenges in Adopting Proper Waste Management Practices",
    items: [
      {
        name: "wasteChallenges",
        label: "What challenges do you face in managing waste? (Tick one or more)",
        type: "squareCheckbox",
        options: [
          "No waste bins",
          "Irregular waste collection",
          "Lack of knowledge",
          "No proper dumpsites",
          "Cost of proper management",
          "Others",
        ],
      },
      {
        name: "learnedProperManagement",
        label: "Did you learn about proper waste management?",
        type: "circleCheckbox",
        options: ["Yes", "No"],
      },
      {
        name: "penaltiesInCommunity",
        label: "Are there penalties for improper waste disposal in your community?",
        type: "circleCheckbox",
        options: ["Yes", "No"],
      },
      {
        name: "shouldIncludeInCurriculum",
        label: "Should waste management awareness be included in school curricula?",
        type: "circleCheckbox",
        options: ["Yes", "No"],
      },
    ],
  },
  {
    section: "Section D: Relationship Between Demographics and Awareness",
    items: [
      {
        name: "educationInfluence",
        label: "Do you think your level of education has influenced your knowledge of waste management?",
        type: "circleCheckbox",
        options: ["Strongly Agree", "Agree", "Neither", "Disagree", "Strongly Disagree"],
      },
      {
        name: "jobInfluence",
        label: "Has your job or occupation ever required you to manage waste properly?",
        type: "circleCheckbox",
        options: ["Strongly Agree", "Agree", "Neither", "Disagree", "Strongly Disagree"],
      },
      {
        name: "ageInfluence",
        label: "Do you believe your age affects your awareness of how to manage solid waste?",
        type: "circleCheckbox",
        options: ["Strongly Agree", "Agree", "Neither", "Disagree", "Strongly Disagree"],
      },
      {
        name: "householdInfluence",
        label: "Has anyone in your household influenced your awareness of waste disposal methods?",
        type: "circleCheckbox",
        options: ["Strongly Agree", "Agree", "Neither", "Disagree", "Strongly Disagree"],
      },
    ],
  },
  {
    section: "Section E: Recommendations for Policy and Community Engagement",
    items: [
      {
        name: "needCampaigns",
        label: "Do you think more public awareness campaigns are needed on waste management?",
        type: "circleCheckbox",
        options: ["Yes", "No"],
      },
      {
        name: "needFines",
        label: "Should fines or penalties be imposed on those who dump waste improperly?",
        type: "circleCheckbox",
        options: ["Yes", "No"],
      },
      {
        name: "govSupport",
        label: "Do you believe local government officials are doing enough to support sustainable waste practices?",
        type: "circleCheckbox",
        options: ["Yes", "No"],
      },
    ],
  },
];
