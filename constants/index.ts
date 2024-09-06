import { mainnet, sepolia } from '@starknet-react/chains'

const chainMap = {
  mainnet: {
    chain: mainnet,
    rpcUrl:
      'https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0_7/WBnHOmwS6g5-z7JgnqsrxTi8GL9H1YBk',
  },

  sepolia: {
    chain: sepolia,
    rpcUrl:
      'https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/WBnHOmwS6g5-z7JgnqsrxTi8GL9H1YBk',
  },
}

export { chainMap }
