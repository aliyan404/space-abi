import { RpcProvider } from 'starknet'

export const sepoliaProvider = new RpcProvider({
  nodeUrl:
    'https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/WBnHOmwS6g5-z7JgnqsrxTi8GL9H1YBk',
})

export const mainnetProvider = new RpcProvider({
  nodeUrl:
    'https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0_7/WBnHOmwS6g5-z7JgnqsrxTi8GL9H1YBk',
})
