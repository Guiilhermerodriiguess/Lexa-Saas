export interface Evento {
    id: string;
    title: string;
    start_time: string;
    end_time: string;
    category: string;
}

export interface Processo {
    id: string;
    title: string;
    status: string;
    process_number: string;
    updated_at: string;
}

export interface DashboardStats {
    totalProcessos: number;
    totalClientes: number;
}

export interface TimesheetSummary {
    totalMins: number;
    billable: number;
    entries: number;
}
