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

export { chainMap, quickAccess }
