import { animateScroll as scroll } from "react-scroll";

export function formatDate(dateString: any) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const suffix = (day: any) => {
    if (day > 3 && day < 21) return "th"; // covers 4-20
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${suffix(day)} ${month} ${year}`;
}

export const exportToCSV = (tableData: any[], filename: string) => {
  const headers = Object.keys(tableData[0]);
  const csvRows = [
    headers.join(","),
    ...tableData.map((row) => headers.map((header) => JSON.stringify(row[header] ?? "")).join(",")),
  ];

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const shortenText = (text: string, maxLength: number) => {
  if (!text) return;
  if (text.length > maxLength) return `${text.substring(0, maxLength)}...`;
  return text;
};

export const scrollToTop = () => scroll.scrollToTop();

export const scrollToBottom = () => scroll.scrollToBottom();
