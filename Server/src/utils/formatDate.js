import { format } from "date-fns";
import { enUS } from "date-fns/locale";

/**
 * Formats a date to "21st September, 2001"
 * @param {Date} date 
 * @returns {string | null} 
 */
export const formatDate = (date) => {
	if (!date) return null;
	return format(date, "do MMMM, yyyy", { locale: enUS });
};
