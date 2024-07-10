export function formatDate(isoString) {
  // const isoString = '2023-06-14T23:00:00.000-07:00';
  const date = new Date(isoString)

  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const hours = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)
  const seconds = ('0' + date.getSeconds()).slice(-2)

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  console.log(formattedDate)
  return formattedDate
}
