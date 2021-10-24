const XDate = require("xdate");

export function checkSameDate(a: typeof XDate, b: typeof XDate): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
