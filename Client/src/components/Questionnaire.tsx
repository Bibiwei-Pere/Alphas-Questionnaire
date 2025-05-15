"use client";
import { ContainerDashboard, DashboardHeader } from "@/components/ui/containers";
import { useEffect, useState } from "react";
import { Step1 } from "@/components/dashboard/Step1";
import { Step3 } from "./dashboard/Step3";
import { queryKeys, useGetQuestionnaire, useUpdateQuestionnaire } from "@/hooks/questionnaire";
import { Step2 } from "./dashboard/Step2";
import { Step4 } from "./dashboard/Step4";
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const Questionnaire = ({ id }: { id: string }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [questionnaire, setQuestionnaire] = useState<any>({});
  const { data: questionnaireData } = useGetQuestionnaire(id);
  const mutation = useUpdateQuestionnaire();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (questionnaireData) setQuestionnaire(questionnaireData);
  }, [questionnaireData]);

  console.log(currentStep);
  const handleNext = (data: any) => {
    mutation.mutate(
      {
        ...data,
        id,
      },
      {
        onSuccess: () => {
          if (currentStep < projectData.length - 1) setCurrentStep((prevStep) => prevStep + 1);
          else {
            queryClient.invalidateQueries({ queryKey: [queryKeys.questionnaires] });
            router.push("/");
          }
        },
      }
    );
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prevStep) => prevStep - 1);
    else setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <ContainerDashboard>
      <div className='hidden bg-gray-100 p-4 md:flex flex-col'>
        <div className='fixed w-[450px]'>
          {projectData.map((item: any, index: number) => (
            <div key={item.number} className='grid relative grid-cols-[35px,1fr] gap-5 pb-12'>
              <div
                className={`h-full w-full top-[-100px] left-[16px] absolute ${
                  index === 0
                    ? "" // No border for the first step
                    : currentStep >= index
                    ? "border-purple-800 border-dashed"
                    : "border-gray-300 border-dashed"
                } ${index === 0 ? "" : "border-l-[3px]"}`}
              ></div>
              <span
                className={`text-[20px] z-10 font-semibold text-white h-[35px] flex items-center justify-center w-[35px] rounded-full ${
                  currentStep >= index ? "bg-purple-800" : "bg-gray-400"
                }`}
              >
                {item.number}
              </span>
              <div className='space-y-2'>
                <h6>{item.title}</h6>
                <p>{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col space-y-5'>
        {projectData.map((item: any, index: number) =>
          index === currentStep ? (
            <div key={index}>
              <div className='md:hidden sticky top-0 py-2 bg-white z-10'>
                <div className='flex items-center gap-2'>
                  {index !== 0 && <ArrowLeftCircle onClick={handleBack} className='w-5 h-5 cursor-pointer' />}{" "}
                  <h3 className='text-xl mb-1 font-bold'>{item.title}</h3>
                </div>
                <p>{item.details}</p>
              </div>
              <div className='py-8'>
                {index === 0 && (
                  <Step1 questionnaire={questionnaire?.step1} handleNext={handleNext} isPending={mutation.isPending} />
                )}
                {index === 1 && (
                  <Step2
                    questionnaire={questionnaire?.step2}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isPending={mutation.isPending}
                  />
                )}
                {index === 2 && (
                  <Step3
                    questionnaire={questionnaire?.step3}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isPending={mutation.isPending}
                  />
                )}
                {index === 3 && (
                  <Step4
                    questionnaire={questionnaire?.step4}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isPending={mutation.isPending}
                  />
                )}
              </div>
            </div>
          ) : null
        )}
      </div>
    </ContainerDashboard>
  );
};

const projectData = [
  {
    number: 1,
    title: "Biodata",
    details: "Sociodemographic characteristics of Respondents",
  },
  {
    number: 2,
    title: "Group 2",
    details: "Malaria testing and treatment",
  },
  {
    number: 3,
    title: "Group 3",
    details: "Solid waste management",
  },
  {
    number: 4,
    title: "Group 4",
    details: "Utilization of health services",
  },
];
