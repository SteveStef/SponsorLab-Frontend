import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function addLocalTimezone(selectedDate) {
  return dayjs(selectedDate).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('YYYY-MM-DD HH:mm:ss Z');
}

export function convertFromUtcToLocal(utcDate) {
  const back = dayjs(utcDate).tz(Intl.DateTimeFormat().resolvedOptions().timeZone);
  return back.format('MMMM D, YYYY');
}
