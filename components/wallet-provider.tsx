"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"
import { BrowserProvider, type JsonRpcSigner } from "ethers"

interface WalletContextType {
  walletAddress: string | null
  signer: JsonRpcSigner | null
  chainId: number | null
  isConnecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  walletAddress: null,
  signer: null,
  chainId: null,
  isConnecting: false,
  connect: async () => {},
  disconnect: () => {},
})

export function useWallet() {
  return useContext(WalletContext)
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      on: (event: string, handler: (...args: unknown[]) => void) => void
      removeListener: (event: string, handler: (...args: unknown[]) => void) => void
    }
  }
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const updateSigner = useCallback(async () => {
    if (!window.ethereum) return
    try {
      const provider = new BrowserProvider(window.ethereum)
      const s = await provider.getSigner()
      const address = await s.getAddress()
      const network = await provider.getNetwork()
      setSigner(s)
      setWalletAddress(address)
      setChainId(Number(network.chainId))
    } catch {
      setSigner(null)
      setWalletAddress(null)
      setChainId(null)
    }
  }, [])

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      window.open('https://metamask.io/download/', '_blank')
      return
    }
    setIsConnecting(true)
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      await updateSigner()
    } catch {
      // user rejected
    } finally {
      setIsConnecting(false)
    }
  }, [updateSigner])

  const disconnect = useCallback(() => {
    setWalletAddress(null)
    setSigner(null)
    setChainId(null)
  }, [])

  // Listen for account/chain changes
  useEffect(() => {
    if (!window.ethereum) return

    const handleAccountsChanged = (accounts: unknown) => {
      const accs = accounts as string[]
      if (accs.length === 0) {
        disconnect()
      } else {
        updateSigner()
      }
    }

    const handleChainChanged = () => {
      updateSigner()
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged)
    window.ethereum.on('chainChanged', handleChainChanged)

    // Check if already connected
    window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
      const accs = accounts as string[]
      if (accs.length > 0) {
        updateSigner()
      }
    })

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum?.removeListener('chainChanged', handleChainChanged)
    }
  }, [updateSigner, disconnect])

  return (
    <WalletContext.Provider value={{ walletAddress, signer, chainId, isConnecting, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}
