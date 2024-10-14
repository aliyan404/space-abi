import { shortString } from 'starknet'
import { shortenAddress } from './address'

function interactSwitchRes(type: string, value: string) {
  if (type === 'core::felt252') {
    if (!isValidShortStringInput(value)) return value

    return shortString.decodeShortString(value)
  }
  if (type === 'core::starknet::contract_address::ContractAddress') {
    const valToBigint = BigInt(value.startsWith('0x') ? value.slice(2) : value)
    const hexString = valToBigint.toString(16)
    const paddedHexString = hexString.padStart(64, '0')
    const shortAddr = shortenAddress(paddedHexString)

    return `0x${shortAddr}`
  }
  return value
}

function isValidShortStringInput(input: string): boolean {
  const cleanedInput = input.toLowerCase().replace(/^0x/, '')

  const isValidHex = /^[0-9a-f]+$/.test(cleanedInput)
  const isValidDecimal = /^\d+$/.test(cleanedInput)

  if (!isValidHex && !isValidDecimal) {
    return false
  }

  let bigIntValue: bigint
  try {
    bigIntValue = isValidHex
      ? BigInt(`0x${cleanedInput}`)
      : BigInt(cleanedInput)
  } catch {
    return false
  }

  const max248BitNumber = BigInt('0x' + 'f'.repeat(62))
  if (bigIntValue < 0 || bigIntValue > max248BitNumber) {
    return false
  }

  const hexString = bigIntValue.toString(16).padStart(2, '0')
  const decodedString = Buffer.from(hexString, 'hex').toString('utf8')

  return decodedString.length <= 31
}

function devideFormat(value: string, decimals = 18) {
  console.log('devideInputString:', value)
  const bigIntValue = BigInt(value)
  const divisor = BigInt(10 ** decimals)

  const integerPart = bigIntValue / divisor
  const fractionalPart = bigIntValue % divisor

  let fractionalStr = fractionalPart.toString().padStart(decimals, '0')

  fractionalStr = fractionalStr.replace(/0+$/, '')

  if (fractionalStr === '') {
    return integerPart.toString()
  }

  return `${integerPart}.${fractionalStr}`
}

function multiplyFormat(value: string, decimals = 18) {
  const [integerPart, fractionalPart = ''] = value.split('.')

  const paddedFractionalPart = fractionalPart.padEnd(decimals, '0')

  const combinedValue = `${integerPart}${paddedFractionalPart}`

  const trimmedValue = combinedValue.replace(/^0+/, '')

  return trimmedValue || '0'
}

export { devideFormat, multiplyFormat, interactSwitchRes }
