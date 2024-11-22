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
  return dateObj.diff(dayjs(getTodaysDate()), 'day') <= 0;
}

export const SalesTaxByState = {
  "AL": 0.04,
  "AK": 0.00,
  "AZ": 0.056,
  "AR": 0.065,
  "CA": 0.0725,
  "CO": 0.029,
  "CT": 0.0635,
  "DE": 0.00,
  "FL": 0.06,
  "GA": 0.04,
  "HI": 0.04,
  "ID": 0.06,
  "IL": 0.0625,
  "IN": 0.07,
  "IA": 0.06,
  "KS": 0.065,
  "KY": 0.06,
  "LA": 0.0445,
  "ME": 0.055,
  "MD": 0.06,
  "MA": 0.0625,
  "MI": 0.06,
  "MN": 0.06875,
  "MS": 0.07,
  "MO": 0.04225,
  "MT": 0.00,
  "NE": 0.055,
  "NV": 0.0685,
  "NH": 0.00,
  "NJ": 0.06625,
  "NM": 0.05,
  "NY": 0.04,
  "NC": 0.0475,
  "ND": 0.05,
  "OH": 0.0575,
  "OK": 0.045,
  "OR": 0.00,
  "PA": 0.06,
  "RI": 0.07,
  "SC": 0.06,
  "SD": 0.045,
  "TN": 0.07,
  "TX": 0.0625,
  "UT": 0.0485,
  "VT": 0.06,
  "VA": 0.043,
  "WA": 0.065,
  "WV": 0.06,
  "WI": 0.05,
  "WY": 0.04
}
