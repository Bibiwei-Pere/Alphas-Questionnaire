"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { formStep1 } from "@/app/components/schema/Forms";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { scrollToTop } from "@/lib/helpers";
import { DynamicField, DynamicType } from "./DynamicField";

export const Step1 = ({ questionnaire, handleNext, isPending }: any) => {
  const form = useForm<z.infer<typeof formStep1>>({
    resolver: zodResolver(formStep1),
  });

  useEffect(() => {
    if (questionnaire) form.reset(questionnaire);
    const timer = setTimeout(() => {
      scrollToTop();
    }, 100);
    return () => clearTimeout(timer);
  }, [questionnaire]);

  const onSubmit = (values: z.infer<typeof formStep1>) => handleNext({ step1: values });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-6'>
          {fieldStep1.map((section, i) => (
            <div key={i} className='space-y-4'>
              <h4 className='font-semibold text-lg'>{section.section}</h4>
              {section.items.map((field, index) => (
                <DynamicField
                  key={index}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  form={form}
                  options={field.options}
                />
              ))}
            </div>
          ))}
        </div>
        <Button variant='outline' disabled={isPending} className='mt-10 gap-2'>
          Proceed
          {isPending && <Loader className='animate-spin w-4 h-4' />}
        </Button>
      </form>
    </Form>
  );
};

export const fieldStep1: {
  section: string;
  items: {
    name: string;
    label: string;
    type: DynamicType;
    options?: string[];
  }[];
}[] = [
  {
    section: "Section A: Social demographics",
    items: [
      { name: "age", label: "Age (years)", type: "input" },
      { name: "sex", label: "Sex", type: "select", options: ["Male", "Female"] },
      {
        name: "maritalStatus",
        label: "Marital Status",
        type: "select",
        options: ["Married", "Single", "Divorced", "Cohabiting", "Widow/Widower", "Separated"],
      },
      {
        name: "stateOfOrigin",
        label: "State of Origin",
        type: "select",
        options: ["Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Rivers", "Others"],
      },
      {
        name: "educationLevel",
        label: "Level of Formal Education",
        type: "select",
        options: ["None", "Primary", "Secondary", "Tertiary"],
      },
      {
        name: "religion",
        label: "Religion",
        type: "select",
        options: ["Christianity", "Muslim", "Traditional worshippers", "Others"],
      },
      {
        name: "occupation",
        label: "Occupation",
        type: "select",
        options: ["Farmer", "Civil Servant", "Trader", "Artisan", "Others"],
      },
      {
        name: "insurance",
        label: "Are you under any health insurance?",
        type: "circleCheckbox",
        options: ["Yes", "No"],
      },
    ],
  },
];
