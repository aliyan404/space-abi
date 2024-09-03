import { RpcProvider } from 'starknet'

function getRpcProvider(network: string) {
  if (network === 'sepolia') {
    const sepoliaProvider = new RpcProvider({
      nodeUrl:
        'https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/WBnHOmwS6g5-z7JgnqsrxTi8GL9H1YBk',
    })
    return sepoliaProvider
  } else if (network === 'mainnet') {
    const mainnetProvider = new RpcProvider({
      nodeUrl:
        'https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0_7/WBnHOmwS6g5-z7JgnqsrxTi8GL9H1YBk',
    })
    return mainnetProvider
  }
}

export { getRpcProvider }
