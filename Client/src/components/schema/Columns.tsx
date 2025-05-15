import { ColumnDef } from "@tanstack/react-table";
import { Eye, Loader, MoreVertical, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Modal } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useDeleteQuestionnaire } from "@/hooks/questionnaire";
import { fieldStep1 } from "../dashboard/Step1";
import { fieldStep2 } from "../dashboard/Step2";
import { fieldStep3 } from "../dashboard/Step3";
import { fieldStep4 } from "../dashboard/Step4";
import { shortenText } from "@/lib/helpers";

const generateColumnsFromFields = (fields: any[], stepKey: "step1" | "step2" | "step3" | "step4"): ColumnDef<any>[] => {
  return fields.flatMap((sectionOrField: any) => {
    const items = sectionOrField.items ?? sectionOrField; // handle step1 (flat array) and others (sectioned)
    return items.map((item: any) => ({
      accessorKey: item.label,
      header: shortenText(item.label, 20),
      cell: ({ row }: any) => {
        const value = row.original?.[stepKey]?.[item.name];
        if (Array.isArray(value)) {
          return value.length > 0 ? (
            <div>
              {value.map((v: string, i: number) => (
                <p key={i}>{v}, </p>
              ))}
            </div>
          ) : (
            "--"
          );
        }
        return <p>{value ?? "--"}</p>;
      },
    }));
  });
};

export const QuestionnaireColumns: ColumnDef<any>[] = [
  {
    accessorKey: "questionnaireNo",
    header: "Questionnaire No",
    cell: ({ row }) => <p>{row.index + 1}</p>,
  },

  // ✅ Dynamically inject step1–step4 columns
  ...generateColumnsFromFields(fieldStep1, "step1"),
  ...generateColumnsFromFields(fieldStep2, "step2"),
  ...generateColumnsFromFields(fieldStep3, "step3"),
  ...generateColumnsFromFields(fieldStep4, "step4"),
];
