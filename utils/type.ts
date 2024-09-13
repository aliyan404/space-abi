function getValueType(value: any) {
  if (!value) return

  if (value?.type.toLowerCase().includes('u256')) {
    return 'u256'
  }

  if (value?.type.includes('ContractAddress')) {
    return 'address'
  }
}

export { getValueType }
