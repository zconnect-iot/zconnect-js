export function transformError(error) {
  // Strips non JSON values like functions and returns simple object for passing to fromJS
  return JSON.parse(JSON.stringify(error))
}

export function flattenObject(obj, name = '', separator = '_') {
  const flatObj = {}
  const loop = (o, path = name) => {
    Object.entries(o).forEach((entry) => {
      const key = `${path}${separator}${entry[0]}`
      if (typeof entry[1] !== 'object') {
        flatObj[key] = entry[1]
        return
      }
      loop(entry[1], key)
    })
  }
  loop(obj)
  return flatObj
}
