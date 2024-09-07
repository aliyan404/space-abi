function getResType(result: any) {
  if (!result) return

  if (result?.type.toLowerCase().includes('u256')) {
    return 'u256'
  }

  if (result?.type.includes('ContractAddress')) {
    return 'address'
  }
}

function devideFormat(value:string,decimals = 18){
  const bigIntValue = BigInt(value)

  const divisor = BigInt(10 ** decimals)

  const integerPart = bigIntValue / divisor
  const fractionalPart = bigIntValue % divisor

  let fractionalStr = fractionalPart.toString().padStart(decimals, '0')

  fractionalStr = fractionalStr.slice(0, decimals)

  return `${integerPart}.${fractionalStr}`

}


function multiplyFormat(value:string, decimals = 18) {
  const [integerPart, fractionalPart = ''] = value.split('.');

  const paddedFractionalPart = fractionalPart.padEnd(decimals, '0');

  const combinedValue = `${integerPart}${paddedFractionalPart}`;

  const trimmedValue = combinedValue.replace(/^0+/, '');

  return trimmedValue || '0';
}

export { getResType, devideFormat, multiplyFormat }
