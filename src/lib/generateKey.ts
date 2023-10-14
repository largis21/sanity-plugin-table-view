export const generateKey = (): string => {
  return Math.random().toString(36).slice(2)
}
