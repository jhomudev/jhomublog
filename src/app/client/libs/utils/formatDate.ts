export const formatDate = (date: string) => {
  const d = new Date(date)
  const day = d.getDate().toString()
  const month = (d.getMonth() + 1).toString()
  const year = d.getFullYear().toString()
  
  return {
    simple: d.toUTCString(),
    short: `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`,
    shortReverse: `${year}/${month.padStart(2, '0')}/${day.padStart(2, '0')}`
  }
}