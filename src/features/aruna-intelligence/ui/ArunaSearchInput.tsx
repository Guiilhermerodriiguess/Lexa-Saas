"use client";

import React, { useState } from "react";
import { Search, Sparkles, Loader2 } from "lucide-react";

export function ArunaSearchInput() {
    const [isSearching, setIsSearching] = useState(false);
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;
        setIsSearching(true);
        // Lógica de busca semântica será integrada aqui
        setTimeout(() => setIsSearching(false), 2000);
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto group">
            <form onSubmit={handleSearch} className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {isSearching ? (
                        <Loader2 className="h-4 w-4 text-[#C5A55A] animate-spin" />
                    ) : (
                        <Sparkles className="h-4 w-4 text-[#C5A55A]" />
                    )}
                </div>

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Pergunte algo à Aruna... (ex: causas de danos morais contra bancos)"
                    className="w-full bg-white/5 border border-[#C5A55A]/20 rounded-2xl py-4 pl-12 pr-20 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#C5A55A]/50 focus:ring-4 focus:ring-[#C5A55A]/5 transition-all shadow-[0_0_30px_rgba(197,165,90,0.05)]"
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <button
                        type="submit"
                        disabled={isSearching}
                        className="px-4 py-1.5 bg-[#C5A55A] hover:bg-[#b0944f] text-black text-xs font-black rounded-xl transition-all active:scale-95 disabled:opacity-50"
                    >
                        BUSCAR
                    </button>
                </div>
            </form>

            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#C5A55A]/20 to-transparent rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity -z-10" />
        </div>
    );
}
