import { createSupabaseServerClient } from "@/shared/api/supabase/server";
import { notFound } from "next/navigation";
import EditProcessForm from "./EditProcessForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProcessPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: process, error } = await supabase
    .from("processes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !process) notFound();

  return <EditProcessForm process={process} />;
}
