import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export function addLocalTimezone(selectedDate) {
  return dayjs(selectedDate).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('YYYY-MM-DD HH:mm:ss Z');
}

export function convertFromUtcToLocal(utcDate) {
  const back = dayjs(utcDate).tz(Intl.DateTimeFormat().resolvedOptions().timeZone);
  return back.format('MM/DD/YYYY');
}

export function chatTime(utcDate) {
  const localTime = dayjs(utcDate).tz(Intl.DateTimeFormat().resolvedOptions().timeZone);
  return localTime.fromNow();
}

export function getTodaysDate() {
  const currDate = dayjs().tz(Intl.DateTimeFormat().resolvedOptions().timeZone);
  return currDate.format('YYYY-MM-DD HH:mm:ss');
}

export function inPast(date) {
  const dateObj = dayjs(date).tz(Intl.DateTimeFormat().resolvedOptions().timeZone);
  return dateObj.diff(dayjs(getTodaysDate()), 'day') < 0;
}
