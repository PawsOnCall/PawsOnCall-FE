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

export function convertToISO8601(dateString) {
  // Parse the input date string
  const date = new Date(dateString.replace(' ', 'T') + 'Z')

  // Format the date components
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0')

  // Combine into the ISO 8601 format
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`
}

// Function to get YYYY-MM-DD from serviceTime
export function getDateFromServiceTime(serviceTime) {
  let date
  if (serviceTime === undefined) {
    date = new Date() // Use current date and time
    console.log('Service time was undefined. Using current date.')
  } else {
    try {
      date = new Date(serviceTime)
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date')
      }
    } catch (error) {
      console.error('Error processing service time:', error)
      date = new Date() // Fallback to current date if there's an error
      console.log('Using current date due to error in service time.')
    }
  }
  return date.toISOString().split('T')[0]
}

// Function to get HH:mm:ss from dropOffTimeStart
export function getTimeFromDropOffStart(dropOffTimeStart) {
  let date
  if (dropOffTimeStart === undefined) {
    date = new Date() // Use current date and time
    console.log('Drop-off time was undefined. Using current time.')
  } else {
    try {
      date = new Date(dropOffTimeStart)
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date')
      }
    } catch (error) {
      console.error('Error processing drop-off time:', error)
      date = new Date() // Fallback to current date if there's an error
      console.log('Using current time due to error in drop-off time.')
    }
  }
  return date.toISOString().split('T')[1].split('.')[0]
}

export function getUserRating(userId) {
  const lastDigit = parseInt(userId.toString().slice(-1), 10)

  switch (lastDigit) {
    case 0:
    case 1:
      return 1
    case 2:
    case 3:
      return 2
    case 4:
    case 5:
      return 3
    case 6:
    case 7:
      return 4
    case 8:
    case 9:
      return 5
    default:
      return 1
  }
}
