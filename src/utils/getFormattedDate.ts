import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

export default function getFormattedDate(date: Date): string {
  const znDate = zonedTimeToUtc(date, 'America/Sao_Paulo');

  return format(znDate, 'dd/MM/yyyy - HH:mm:ss');
}
