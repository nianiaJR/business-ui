const zeroize = (value: number) => {
  if (value < 10) {
    return '0' + value
  }
  return value.toString()
}

const getDateTime = (timestamps: number | string) => {
  const d = new Date(timestamps)
  const year = d.getFullYear()
  const month = zeroize(d.getMonth() + 1)
  const day = zeroize(d.getDate())
  const hour = zeroize(d.getHours())
  const minute = zeroize(d.getMinutes())
  const second = zeroize(d.getSeconds())

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export { getDateTime }
