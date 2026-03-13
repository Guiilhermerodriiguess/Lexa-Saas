import React from "react";
import { FileText, File as FileIconGeneric, FileCheck, ShieldAlert, FileCode } from "lucide-react";

export function FileIcon({ extension, className }: { extension: string, className?: string }) {
    const ext = extension.toLowerCase().replace('.', '');

    if (['pdf'].includes(ext)) return <FileText className={className || "text-red-500"} />;
    if (['doc', 'docx'].includes(ext)) return <FileCheck className={className || "text-blue-500"} />;
    if (['xls', 'xlsx', 'csv'].includes(ext)) return <FileCode className={className || "text-emerald-500"} />;
    if (['p7s', 'sig'].includes(ext)) return <ShieldAlert className={className || "text-amber-500"} />;

    return <FileIconGeneric className={className || "text-zinc-400"} />;
}
