import { addDays, isWeekend, format, addBusinessDays } from "date-fns";

/**
 * UTILS: Engine de Prazos Jurídicos (LEXA Core)
 * Implementa regras baseadas no CPC brasileiro (contagem em dias úteis).
 */

/**
 * Calcula a data final somando dias úteis.
 * @param startDate Data de início da contagem.
 * @param days Quantidade de dias para somar.
 * @returns Data fatal calculada.
 */
export function calculateBusinessDeadline(startDate: Date, days: number): Date {
    // Nota: addBusinessDays do date-fns já pula sábados e domingos.
    // TODO: Integrar feriados nacionais/locais no futuro.
    return addBusinessDays(startDate, days);
}

/**
 * Verifica se uma data é um dia útil processual.
 */
export function isProceduralWorkDay(date: Date): boolean {
    return !isWeekend(date);
}

/**
 * Formata data para exibição jurídica padrão.
 */
export function formatLegalDate(date: Date): string {
    return format(date, "dd/MM/yyyy");
}
