export function sortObjectKeys(obj: Record<string, any>): Record<string, any> {
  const keys = Object.keys(obj)

  const newObj = {}

  keys.sort()

  keys.forEach((key) => {
    Object.defineProperty(newObj, key, obj[key])
  })

  return newObj
}
