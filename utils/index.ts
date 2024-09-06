import { shortString } from 'starknet'

function shortenAddress(address?: string) {
  if (!address) return null
  return `${address?.substring(0, 6)}...${address?.substring(
    address.length - 4,
    address.length
  )}`
}

function interactSwitchRes(type: string, value: string) {
  if (type === 'core::felt252') {
    console.log('felt252:', value)

    if (!isValidShortStringInput(value)) return value

    return shortString.decodeShortString(value)
  }

  if (type === 'core::starknet::contract_address::ContractAddress') {
    return '0x' + shortenAddress(value)
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

const quickAccess = [
  {
    name: 'AVNU',
    network: 'mainnet',
    address:
      '0x04270219d365d6b017231b52e92b3fb5d7c8378b05e9abc97724537a80e93b0f',
  },
  {
    name: 'JediSwap',
    network: 'mainnet',
    address:
      '0x041fd22b238fa21cfcf5dd45a8548974d8263b3a531a60388411c5e230f97023',
  },
  {
    name: 'STRK',
    network: 'mainnet',
    address:
      '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
  },
]

export {
  shortenAddress,
  isValidShortStringInput,
  interactSwitchRes,
  quickAccess,
}
