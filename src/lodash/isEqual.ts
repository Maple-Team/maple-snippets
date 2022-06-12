export const isEqual = <T, U>(a: T, b: U): boolean => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return isSameArray(a, b)
  }

  if (getType(a) === "Object" && getType(b) === "Object") {
    return isSameObject(a, b)
  }

  return isSame(a, b)
}
const getType = (a: any): string => {
  return (Object.prototype.toString.call(a) as string).slice(8, -1)
}
const isSameArray = <T, U>(array1: T[], array2: U[]): boolean => {
  if (array1.length !== array2.length) return false
  if (array1.length === array2.length && array1.length === 0) return false

  return array1.every((a, index) => {
    const b = array2[index]
    return isSame(a, b)
  })
}
const isSameObject = (a: any, b: any): boolean => {
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  const aValues = aKeys.map((k) => a[k])
  const bValues = bKeys.map((k) => b[k])

  console.log(aKeys, aValues, bKeys, bValues, "====")
  return aValues.length === bValues.length && isSameArray(aValues, bValues)
}
export const isSame = <T, U>(a: T, b: U): boolean => {
  return (a as unknown) === b
}

isEqual({ a: "a" }, { a: "a" })
