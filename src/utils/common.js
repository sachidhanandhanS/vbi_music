import { months } from './constant'

export const generateUUID = () =>
  Math.floor(Math.random() * 100)

export const debounce = (cb, limit) => {
  let timeoutId = null
  return function() {
    const args = arguments
    if(timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      cb(...args)
    }, limit)
  }
}

export const getFormatedDate = () => {
  const date = new Date()
  const month = months[date.getMonth()].slice(0, 3)
  const day = `${date.getDate()}`.padStart(2, '0')
  const period =  date.getHours() > 12 ? 'pm' : 'am'
  return `${day} ${month}, ${date.getFullYear()} ${date.getHours() % 12}:${date.getMinutes()} ${period}`
}

export const shuffleArray = (arr) => {
  const newArray = [...arr]
  return newArray.sort(() => Math.random() - 0.5)
}

export const  convertToEllipsis = (text, trimLength) => {
  if (text.length > trimLength) return `${text.slice(0, trimLength)}...`;
  return text;
}