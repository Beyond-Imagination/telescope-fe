export function dateToString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset()
  date = new Date(date.getTime() - timezoneOffset * 60 * 1000)
  return date.toISOString().split('T')[0]
}

export function convertDateByType(type: string, date: Date): Date {
  let date1 = new Date(date)
  if (type == 'week') date1.setDate(date.getDate() - 7)
  if (type == 'month') date1.setMonth(date1.getMonth() - 1)
  if (type == 'year') date1.setFullYear(date1.getFullYear() - 1)

  return date1
}
