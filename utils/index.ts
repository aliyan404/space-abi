export const shortenAddress = (address?: string) => {
  if (!address) return null
  return `${address?.substring(0, 6)}...${address?.substring(
    address.length - 4,
    address.length
  )}`
}
