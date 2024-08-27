import { shortString } from 'starknet'

export const shortenAddress = (address?: string) => {
  if (!address) return null
  return `${address?.substring(0, 6)}...${address?.substring(
    address.length - 4,
    address.length
  )}`
}

export const interactSwitchRes = (type: string, value: string) => {
  if (type === 'core::felt252') {
    return shortString.decodeShortString(value)
  }

  if (type === 'core::starknet::contract_address::ContractAddress') {
    return '0x' + shortenAddress(value)
  }
  return value
}
