"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Eye, Loader, MoreVertical, Trash2 } from "lucide-react";
import { ContainerDashboard, DashboardHeader, DashboardWrapper } from "@/components/ui/containers";
import { useDeleteQuestionnaire, useGetQuestionnaires, useGetQuestionnaireStats } from "@/hooks/questionnaire";
import { QuestionnaireColumns } from "@/components/schema/Columns";
import { exportToCSV } from "@/lib/helpers";
import { fieldStep2 } from "@/components/dashboard/Step2";
import { fieldStep3 } from "@/components/dashboard/Step3";
import { fieldStep4 } from "@/components/dashboard/Step4";
import { SkeletonCard1 } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Empty } from "@/components/ui/table";
import { PaginationContainer } from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/alert-dialog";

export default function Responses() {
  const [data, setData] = useState<any>([]);
  const { data: questionnaireStats } = useGetQuestionnaireStats();
  const { data: questionnaires, status } = useGetQuestionnaires();
  const [remaining, setRemaining] = useState(300);
  const [searchNo, setSearchNo] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;
  const router = useRouter();
  const [id, setId] = useState<any>(null);
  const mutation = useDeleteQuestionnaire();

  const dropdownActions = [
    {
      label: "View Details",
      icon: Eye,
      action: (id: string) => router.push(`/questionnaire/${id}`),
      color: "text-foreground",
    },
    {
      label: "Delete",
      icon: Trash2,
      action: (id: string) => setId(id),
      color: "text-red-600",
    },
  ];

  console.log(id);
  useEffect(() => {
    if (questionnaires?.length > 0) {
      setRemaining(300 - questionnaires?.length);
      setData(questionnaires);
    }
  }, [questionnaires]);

  const handleExport = (selectedGroup: string) => {
    const visibleKeys = QuestionnaireColumns.filter(
      ({ accessorKey }: any) => accessorKey && !getHiddenKeysByGroup(selectedGroup).includes(accessorKey)
    ).map((col: any) => col.accessorKey);

    const dataToExport = data.map((row: any, index: number) => {
      const flattenedRow: any = {};
      visibleKeys.forEach((key: string) => {
        if (key === "questionnaireNo") {
          flattenedRow[key] = index + 1;
        } else {
          const parts = key.split(".");
          let value = row;
          for (const part of parts) {
            value = value?.[part];
          }

          // Convert arrays to comma-separated strings
          if (Array.isArray(value)) {
            flattenedRow[key] = value.join(", ");
          } else {
            flattenedRow[key] = value ?? "";
          }
        }
      });
      return flattenedRow;
    });

    if (dataToExport.length > 0) {
      exportToCSV(dataToExport, `Responses_${selectedGroup}`);
    } else {
      console.log("No data to export.");
    }
  };

  const searchedStat = searchNo !== "" ? questionnaireStats?.[parseInt(searchNo) - 1] : null;

  const isSearching = searchNo !== "";

  const paginatedStats = questionnaireStats?.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const groups = ["All", "Group 2", "Group 3", "Group 9"];

  if (status !== "success") return <SkeletonCard1 />;
  return (
    <ContainerDashboard className='flex flex-col'>
      <DashboardHeader
        title='Responses Submited'
        children2={
          <div className='flex gap-4 items-center'>
            <p className='text-center'>
              Total: <b className='text-black'>{questionnaires?.length || 0}</b>
            </p>
            <p className='text-center flex gap-2 items-center'>
              Remaining: <b className='text-black'>{remaining}</b>
            </p>
          </div>
        }
      >
        <div className='flex items-center gap-3'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='gap-2'>
                <Download className='w-5 h-5' />
                <span className='hidden sm:block'>Export Data</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {groups.map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    handleExport(item); // pass the group directly
                  }}
                >
                  Export {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </DashboardHeader>

      <div className='md:space-y-4'>
        <div className='flex gap-2 items-center'>
          <Input
            type='number'
            min='1'
            placeholder='Enter Questionnaire No'
            value={searchNo}
            onChange={(e) => setSearchNo(e.target.value)}
            className='border px-3 py-2 rounded-md text-sm w-[200px]'
          />
          {isSearching && (
            <Button className='ml-0' onClick={() => setSearchNo("")}>
              Clear
            </Button>
          )}
        </div>

        <DashboardWrapper className2='space-y-4'>
          {questionnaireStats?.length === 0 && <Empty title='No stats available.' />}
          {isSearching ? (
            searchedStat ? (
              <div className='border border-gray-200 rounded-md p-3 space-y-1'>
                <div className='flex justify-between gap-4 items-centers'>
                  <p>
                    Questionnaire No: <b>{searchNo}</b>
                  </p>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreVertical className='cursor-pointer hover:text-brown-700 h-5 w-5 text-foreground' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start'>
                      {dropdownActions.map((actionItem: any, idx: number) => (
                        <DropdownMenuItem
                          key={idx}
                          onClick={() => actionItem.action(searchedStat._id)} // ✅ Correctly pass item's _id here
                          className='flex items-center gap-2'
                        >
                          {actionItem.icon && <actionItem.icon className='h-4 w-4' />}
                          <p className={actionItem.color}>{actionItem.label}</p>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p>
                  Total Questions: <b>{searchedStat.totalQuestions}</b>
                </p>
                <p>
                  <b>Answered:</b> {searchedStat.answered} &nbsp;&nbsp;
                  <b>Unanswered:</b> {searchedStat.unanswered}
                </p>
                <details>
                  <summary className='cursor-pointer text-blue-600'>View Unanswered Fields</summary>
                  <ul className='list-disc list-inside mt-2 text-gray-600 max-h-[200px] overflow-auto'>
                    {searchedStat.unansweredFields.map((field: string, i: number) => (
                      <li key={i}>{field}</li>
                    ))}
                  </ul>
                </details>
              </div>
            ) : (
              <p className='text-sm text-red-600'>No questionnaire found for number {searchNo}</p>
            )
          ) : (
            paginatedStats?.map((item: any, index: number) => (
              <div key={index} className='border border-gray-200 rounded-md p-2 sm:p-3 space-y-1'>
                <div className='flex gap-4 justify-between items-centers'>
                  <p>
                    Questionnaire No: <b>{pageIndex * pageSize + index + 1}</b>
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreVertical className='cursor-pointer hover:text-brown-700 h-5 w-5 text-foreground' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start'>
                      {dropdownActions.map((actionItem: any, idx: number) => (
                        <DropdownMenuItem
                          key={idx}
                          onClick={() => actionItem.action(item._id)} // ✅ Correctly pass item's _id here
                          className='flex items-center gap-2'
                        >
                          {actionItem.icon && <actionItem.icon className='h-4 w-4' />}
                          <p className={actionItem.color}>{actionItem.label}</p>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p>
                  Total Questions: <b>{item.totalQuestions}</b>
                </p>
                <p>
                  <b>Answered:</b> {item.answered} &nbsp;&nbsp;
                  <b>Unanswered:</b> {item.unanswered}
                </p>
                <details>
                  <summary className='cursor-pointer text-blue-600'>View Unanswered Fields</summary>
                  <ul className='list-disc list-inside mt-2 text-gray-600 max-h-[200px] overflow-auto'>
                    {item.unansweredFields.map((field: string, i: number) => (
                      <li key={i}>{field}</li>
                    ))}
                  </ul>
                </details>
              </div>
            ))
          )}

          {questionnaireStats && questionnaireStats.length > pageSize && (
            <PaginationContainer
              table={{
                getPageCount: () => Math.ceil(questionnaireStats.length / pageSize),
                getState: () => ({ pagination: { pageIndex } }),
                previousPage: () => setPageIndex((prev) => Math.max(prev - 1, 0)),
                nextPage: () =>
                  setPageIndex((prev) =>
                    prev + 1 < Math.ceil(questionnaireStats.length / pageSize) ? prev + 1 : prev
                  ),
                getCanPreviousPage: () => pageIndex > 0,
                getCanNextPage: () => pageIndex + 1 < Math.ceil(questionnaireStats.length / pageSize),
              }}
            />
          )}
        </DashboardWrapper>
      </div>

      <Modal isClose open={id} className='max-w-[500px]' title='Delete Response' setOpen={setId}>
        <div className='space-y-6 px-4 md:px-6 pb-6'>
          <p>Are you sure you want to delete this response?. Action cannot be undone.</p>

          <Button
            disabled={mutation.isPending}
            onClick={() =>
              mutation.mutate(
                { id },
                {
                  onSuccess: () => setId(null),
                }
              )
            }
            variant='destructive'
            className='gap-2'
          >
            Delete
            {mutation.isPending && <Loader className='w-5 h-5 animate-spin' />}
          </Button>
        </div>
      </Modal>
    </ContainerDashboard>
  );
}

const extractLabels = (fields: any[]) => fields.flatMap((section: any) => section.items.map((item: any) => item.label));

const getHiddenKeysByGroup = (group: string) => {
  const step2Labels = extractLabels(fieldStep2);
  const step3Labels = extractLabels(fieldStep3);
  const step4Labels = extractLabels(fieldStep4);
  const allLabels = [...step2Labels, ...step3Labels, ...step4Labels];

  console.log(group);
  switch (group) {
    case "Group 2":
      return allLabels.filter((label) => !step2Labels.includes(label));
    case "Group 3":
      return allLabels.filter((label) => !step3Labels.includes(label));
    case "Group 9":
      return allLabels.filter((label) => !step4Labels.includes(label));
    default:
      return [];
  }
};
