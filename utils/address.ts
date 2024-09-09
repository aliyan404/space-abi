function isValidFormat(address: string): boolean {
  if (address.length !== 66) {
    return false
  }

  if (!address.startsWith('0x')) {
    return false
  }

  const hexRegex = /^0x[0-9a-fA-F]{64}$/
  return hexRegex.test(address)
}

export { isValidFormat }
