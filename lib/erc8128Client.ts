import { createSignerClient, type Client, type EthHttpSigner } from '@slicekit/erc8128'
import type { JsonRpcSigner } from 'ethers'

/**
 * Create an ERC-8128 signer client from a connected MetaMask signer.
 * Returns a Client whose `fetch` method signs all requests with ERC-8128 headers.
 */
export function createBrowserSignerClient(
  signer: JsonRpcSigner,
  address: string,
  chainId: number,
): Client {
  const ethSigner: EthHttpSigner = {
    address: address as `0x${string}`,
    chainId,
    signMessage: async (messageBytes: Uint8Array) => {
      // ethers v6 signer.signMessage accepts Uint8Array
      const sig = await signer.signMessage(messageBytes)
      return sig as `0x${string}`
    },
  }

  return createSignerClient(ethSigner)
}

export type { Client as Erc8128Client }
