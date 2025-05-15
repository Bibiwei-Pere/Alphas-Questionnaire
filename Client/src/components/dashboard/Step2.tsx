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
import { formStep2 } from "@/app/components/schema/Forms";
import { Reveal } from "@/app/components/animations/Text";

export const Step2 = ({ questionnaire, handleNext, handleBack, isPending }: any) => {
  const form = useForm<z.infer<typeof formStep2>>({
    resolver: zodResolver(formStep2),
  });

  useEffect(() => {
    if (questionnaire) form.reset(questionnaire);
    const timer = setTimeout(() => scrollToTop(), 100);
    return () => clearTimeout(timer);
  }, [questionnaire]);

  const onSubmit = (values: any) => handleNext({ step2: values });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-10'>
          {fieldStep2.map((section, index: number) => (
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

export const fieldStep2: {
  section: string;
  items: {
    name: string;
    label: string;
    type: DynamicType;
    options?: string[];
  }[];
}[] = [
  {
    section: "Section B: Knowledge of Malaria Testing and Treatment",
    items: [
      {
        name: "malariaCauses",
        label: "How do you get malaria? (Tick one or more)",
        type: "squareCheckbox",
        options: [
          "Mosquito bite",
          "Sun fly bites",
          "Sunlight",
          "Drinking dirty water",
          "Bathing in the rain",
          "I don't know",
        ],
      },
      {
        name: "malariaSymptoms",
        label: "How do you know you have malaria? (Tick one or more)",
        type: "squareCheckbox",
        options: ["Fever", "Vomiting", "Abdominal pain", "Weakness", "I don't know"],
      },
      {
        name: "heardTesting",
        label: "Have you heard about malaria testing?",
        type: "circleCheckbox",
        options: ["Yes", "No"],
      },
      {
        name: "testingInfoSource",
        label: "If 'Yes', where did you get information about malaria testing? (Tick one or more)",
        type: "squareCheckbox",
        options: ["Hospital", "Community Programs", "Media", "Others"],
      },
      {
        name: "testingMethodsKnown",
        label: "What malaria testing methods do you know of? (Tick one or more)",
        type: "squareCheckbox",
        options: ["Malaria rapid diagnostic test", "Malaria parasite test", "DNA Polymerase chain reaction", "NONE"],
      },
      {
        name: "knowWhereToTest",
        label: "Do you know where to get tested for malaria in your community?",
        type: "circleCheckbox",
        options: ["Yes", "No"],
      },
      {
        name: "recommendedTreatment",
        label: "What do you know as the recommended treatment for malaria in Nigeria? (Tick one or more)",
        type: "squareCheckbox",
        options: ["Artemisinin Combination Therapy", "Chloroquine", "Fansidar", "Herbal", "I don't know"],
      },
      {
        name: "treatmentInfoSource",
        label: "Where did you get the information of the recommended treatment from? (Tick one or more)",
        type: "squareCheckbox",
        options: ["Hospital", "Community programs", "Media", "Others"],
      },
    ],
  },
  {
    section: "Section C: Availability of Malaria Testing and Treatment Facilities",
    items: [
      {
        name: "testingCentersAvailable",
        label: "Are there malaria testing centers in your community?",
        type: "circleCheckbox",
        options: ["Yes", "No", "I don't know"],
      },
      {
        name: "testingCenterDistance",
        label: "How far is it from your house?",
        type: "circleCheckbox",
        options: ["Near", "Far", "Very far"],
      },
    ],
  },
  {
    section: "Section D: Malaria Testing Practices",
    items: [
      {
        name: "familiarWithRapidTest",
        label: 'Are you familiar with the term "malaria rapid diagnostic test"?',
        type: "circleCheckbox",
        options: ["Yes", "No"],
      },
      {
        name: "testBeforeTreatment",
        label: "Do you test for malaria before starting treatment?",
        type: "circleCheckbox",
        options: ["Always", "Often", "Sometimes", "Rarely", "Never"],
      },
      {
        name: "whyNoTest",
        label: "If not always test why: (Tick one or more)",
        type: "squareCheckbox",
        options: ["Customs and traditions", "Religious belief", "Pain", "Cost", "I don't think it's important"],
      },
      {
        name: "testLocation",
        label: "If you do test, where do you go for the test? (Tick one or more)",
        type: "squareCheckbox",
        options: ["Hospital", "Drugstore", "Community health extension workers", "Laboratory"],
      },
    ],
  },
  {
    section: "Section E: Malaria Treatment Regimen",
    items: [
      {
        name: "treatmentMethodUsed",
        label: "What treatment method do you use for malaria? (Tick one or more)",
        type: "squareCheckbox",
        options: ["Herbal medicine", "Prescribed drugs", "Over-the-counter drugs", "Others"],
      },
      {
        name: "treatmentDrugSource",
        label: "Where do you usually get malaria treatment drugs? (Tick one or more)",
        type: "squareCheckbox",
        options: ["Hospital", "Drug store", "Traditional healer", "Home"],
      },
      {
        name: "completeTreatmentCourse",
        label: "Do you go to the hospital for treatment and complete the full course as prescribed?",
        type: "circleCheckbox",
        options: ["Always", "Often", "Sometimes", "Rarely", "Never"],
      },
      {
        name: "treatmentDrugsAvailable",
        label: "Are malaria treatment drugs readily available in your community?",
        type: "circleCheckbox",
        options: ["Yes", "No", "I don't know"],
      },
    ],
  },
];
