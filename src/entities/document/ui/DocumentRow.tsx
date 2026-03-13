import React from "react";
import { type Document } from "../model/schema";
import { FileIcon } from "./FileIcon";
import { Download, MoreVertical, Trash2 } from "lucide-react";

export function DocumentRow({ doc }: { doc: Document }) {
    const formatSize = (bytes?: number | null) => {
        if (!bytes) return "0 KB";
        const kb = bytes / 1024;
        return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb.toFixed(0)} KB`;
    };

    return (
        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/5 transition-all group">
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-white/5 group-hover:scale-110 transition-transform">
                    <FileIcon extension={doc.fileExtension} />
                </div>
                <div>
                    <h4 className="text-sm font-medium text-white group-hover:text-[#C5A55A] transition-colors">{doc.name}</h4>
                    <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-[10px] text-zinc-500 uppercase">{doc.category}</span>
                        <span className="text-[10px] text-zinc-600">•</span>
                        <span className="text-[10px] text-zinc-500">{formatSize(doc.fileSizeBytes)}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-all">
                    <Download size={16} />
                </button>
                <button className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-500 hover:text-red-500 transition-all">
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
}
