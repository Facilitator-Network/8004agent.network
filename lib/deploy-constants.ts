// ---- Backend API ----
export const API_BASE = 'https://agent-cli-backend.onrender.com'

// ---- Per-chain contracts (official ERC-8004) ----
export const CONTRACTS: Record<string, {
  name: string
  rpc: string
  chainId: number
  chainIdHex: string
  blockExplorer: string
  identityRegistry: string
  reputationRegistry: string
  facinetNetwork: string
}> = {
  sepolia: {
    name: 'Ethereum Sepolia',
    rpc: 'https://ethereum-sepolia-rpc.publicnode.com',
    chainId: 11155111,
    chainIdHex: '0xaa36a7',
    blockExplorer: 'https://sepolia.etherscan.io',
    identityRegistry: '0x8004A818BFB912233c491871b3d84c89A494BD9e',
    reputationRegistry: '0x8004B663056A597Dffe9eCcC1965A193B7388713',
    facinetNetwork: 'ethereum-sepolia',
  },
  baseSepolia: {
    name: 'Base Sepolia',
    rpc: 'https://sepolia.base.org',
    chainId: 84532,
    chainIdHex: '0x14a34',
    blockExplorer: 'https://sepolia.basescan.org',
    identityRegistry: '0x8004A818BFB912233c491871b3d84c89A494BD9e',
    reputationRegistry: '0x8004B663056A597Dffe9eCcC1965A193B7388713',
    facinetNetwork: 'base-sepolia',
  },
  fuji: {
    name: 'Avalanche Fuji',
    rpc: 'https://api.avax-test.network/ext/bc/C/rpc',
    chainId: 43113,
    chainIdHex: '0xa869',
    blockExplorer: 'https://testnet.snowtrace.io',
    identityRegistry: '0x8004A818BFB912233c491871b3d84c89A494BD9e',
    reputationRegistry: '0x8004B663056A597Dffe9eCcC1965A193B7388713',
    facinetNetwork: 'avalanche-fuji',
  },
  arbitrumSepolia: {
    name: 'Arbitrum Sepolia',
    rpc: 'https://sepolia-rollup.arbitrum.io/rpc',
    chainId: 421614,
    chainIdHex: '0x66eee',
    blockExplorer: 'https://sepolia.arbiscan.io',
    identityRegistry: '0x8004A818BFB912233c491871b3d84c89A494BD9e',
    reputationRegistry: '0x8004B663056A597Dffe9eCcC1965A193B7388713',
    facinetNetwork: 'arbitrum-sepolia',
  },
  monadTestnet: {
    name: 'Monad Testnet',
    rpc: 'https://testnet-rpc.monad.xyz',
    chainId: 10143,
    chainIdHex: '0x279f',
    blockExplorer: 'https://testnet.monadexplorer.com',
    identityRegistry: '0x8004A818BFB912233c491871b3d84c89A494BD9e',
    reputationRegistry: '0x8004B663056A597Dffe9eCcC1965A193B7388713',
    facinetNetwork: 'monad-testnet',
  },
}

// ---- Identity Registry ABI (JSON format for Facinet executeContract + ethers parsing) ----
export const IDENTITY_REGISTRY_ABI = [
  {
    inputs: [{ name: 'agentURI', type: 'string' }],
    name: 'register',
    outputs: [{ name: 'agentId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'tokenId', type: 'uint256' },
      { name: 'uri', type: 'string' },
    ],
    name: 'setAgentURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'agentId', type: 'uint256' },
      { indexed: false, name: 'agentURI', type: 'string' },
      { indexed: true, name: 'owner', type: 'address' },
    ],
    name: 'Registered',
    type: 'event',
  },
]

// ---- OASF Skills Taxonomy ----
export const OASF_SKILLS: Record<string, string[]> = {
  'Natural Language Processing': [
    'Natural Language Processing', 'Summarization', 'Question Answering',
    'Sentiment Analysis', 'Translation', 'Named Entity Recognition', 'Storytelling',
  ],
  'Images & Computer Vision': [
    'Computer Vision', 'Image Generation', 'Image Classification', 'Object Detection',
  ],
  'Multi Modal': [
    'Speech Recognition', 'Text-to-Speech', 'Text to Image', 'Image to Text',
  ],
  'Analytical Skills': [
    'Code Generation', 'Code Optimization', 'Math Problem Solving',
  ],
  'Data Engineering': [
    'Data Analysis', 'Database Query', 'API Integration',
  ],
}

// ---- Application Domains ----
export const APPLICATION_DOMAINS: Record<string, string[]> = {
  'Technology': [
    'Technology', 'Software Engineering', 'DevOps', 'Data Science',
    'Blockchain', 'DeFi', 'Cybersecurity', 'Cloud Computing',
  ],
  'Finance & Business': ['Finance & Business', 'Finance', 'Banking'],
  'Healthcare': ['Healthcare', 'Telemedicine', 'Healthcare Informatics'],
  'Education': ['Education', 'E-Learning'],
}

// ---- Trust Models ----
export const TRUST_MODELS = [
  { name: 'Reputation-Based', value: 'reputation' },
  { name: 'Crypto-Economic (Staking)', value: 'crypto-economic' },
  { name: 'TEE Attestation', value: 'tee-attestation' },
]

// ---- Types ----
export interface DeployFormData {
  name: string
  url: string
  imageUrl: string
  description: string
  version: string
  author: string
  license: string
  mcpEndpoint: string
  a2aEndpoint: string
  skills: string[]
  customSkills: string
  domains: string[]
  customDomains: string
  metadataStorage: 'on-chain' | 'ipfs'
  trustModels: string[]
  x402Payment: boolean
  activationStatus: 'active' | 'inactive'
  hirePrice: string
}

export interface NetworkResult {
  network: string
  networkKey: string
  agentId: string | null
  registrationTx: string | null
  transferTx: string | null
  blockExplorer: string
}

export interface DeployResult {
  agentWalletAddress: string | null
  circleWalletId: string | null
  networkResults: NetworkResult[]
}

export const DEFAULT_FORM_DATA: DeployFormData = {
  name: '',
  url: '',
  imageUrl: '',
  description: '',
  version: '1.0.0',
  author: '',
  license: 'MIT',
  mcpEndpoint: '',
  a2aEndpoint: '',
  skills: [],
  customSkills: '',
  domains: [],
  customDomains: '',
  metadataStorage: 'on-chain',
  trustModels: [],
  x402Payment: true,
  activationStatus: 'active',
  hirePrice: '0',
}
