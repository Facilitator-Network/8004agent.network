// ---- Backend API ----
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://agent-cli-backend.onrender.com'

// ---- Per-chain contracts (official ERC-8004) ----
export const CONTRACTS: Record<string, {
  name: string
  rpc: string
  chainId: number
  chainIdHex: string
  blockExplorer: string
  identityRegistry: string
  reputationRegistry: string
  verificationRegistry: string
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
    verificationRegistry: '0xA4Bc25c1715c073202783699ea934b169c19b3C2',
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
    verificationRegistry: '0x817FCea8d1AcdABe280A39F31feAaf635D740491',
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
    verificationRegistry: '0x82b50Dd0729D1b109522f6b4D9B13Aa438aF63D0',
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
    verificationRegistry: '0x388166fb3B38aFa179B76444d742A329b78B4FF4',
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
    verificationRegistry: '0x6166809DCFaD786C0f18d8d97be3729b83cb2775',
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

// ---- Reputation Registry ABI (for reading feedback via RPC + submitting via Facinet) ----
export const REPUTATION_REGISTRY_ABI = [
  {
    inputs: [
      { name: 'agentId', type: 'uint256' },
      { name: 'value', type: 'int128' },
      { name: 'valueDecimals', type: 'uint8' },
      { name: 'tag1', type: 'string' },
      { name: 'tag2', type: 'string' },
      { name: 'endpoint', type: 'string' },
      { name: 'feedbackURI', type: 'string' },
      { name: 'feedbackHash', type: 'bytes32' },
    ],
    name: 'giveFeedback',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'agentId', type: 'uint256' }],
    name: 'getClients',
    outputs: [{ name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'agentId', type: 'uint256' },
      { name: 'clientAddress', type: 'address' },
    ],
    name: 'getLastIndex',
    outputs: [{ name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'agentId', type: 'uint256' },
      { name: 'clientAddress', type: 'address' },
      { name: 'feedbackIndex', type: 'uint64' },
    ],
    name: 'readFeedback',
    outputs: [
      { name: 'value', type: 'int128' },
      { name: 'valueDecimals', type: 'uint8' },
      { name: 'tag1', type: 'string' },
      { name: 'tag2', type: 'string' },
      { name: 'isRevoked', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'agentId', type: 'uint256' },
      { name: 'clientAddresses', type: 'address[]' },
      { name: 'tag1', type: 'string' },
      { name: 'tag2', type: 'string' },
    ],
    name: 'getSummary',
    outputs: [
      { name: 'count', type: 'uint64' },
      { name: 'summaryValue', type: 'int128' },
      { name: 'summaryValueDecimals', type: 'uint8' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'agentId', type: 'uint256' },
      { indexed: true, name: 'clientAddress', type: 'address' },
      { indexed: false, name: 'feedbackIndex', type: 'uint64' },
      { indexed: false, name: 'value', type: 'int128' },
      { indexed: false, name: 'valueDecimals', type: 'uint8' },
      { indexed: true, name: 'indexedTag1', type: 'string' },
      { indexed: false, name: 'tag1', type: 'string' },
      { indexed: false, name: 'tag2', type: 'string' },
      { indexed: false, name: 'endpoint', type: 'string' },
      { indexed: false, name: 'feedbackURI', type: 'string' },
      { indexed: false, name: 'feedbackHash', type: 'bytes32' },
    ],
    name: 'NewFeedback',
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

// ---- USDC (Avalanche Fuji testnet) ----
export const USDC_ADDRESS = '0x5425890298aed601595a70AB815c96711a31Bc65'
export const USDC_DECIMALS = 6
export const PAYMENT_NETWORK_KEY = 'fuji'

// ---- Per-chain USDC addresses (all 5 testnets) ----
export const CHAIN_USDC: Record<string, string> = {
  sepolia: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
  baseSepolia: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
  fuji: '0x5425890298aed601595a70AB815c96711a31Bc65',
  arbitrumSepolia: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
  monadTestnet: '0x534b2f3A21130d7a60830c2Df862319e593943A3',
}

// ---- Payment chains available for hire (CCTP-supported + direct Fuji) ----
export const PAYMENT_CHAINS: { key: string; label: string; cctp: boolean }[] = [
  { key: 'fuji', label: 'Avalanche Fuji (Direct)', cctp: false },
  { key: 'sepolia', label: 'Ethereum Sepolia', cctp: true },
  { key: 'baseSepolia', label: 'Base Sepolia', cctp: true },
  { key: 'arbitrumSepolia', label: 'Arbitrum Sepolia', cctp: true },
]

export const USDC_ABI = [
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'from', type: 'address' },
      { indexed: true, name: 'to', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
]

// ---- ERC-8126 Agent Verification ----
// Address will be updated after deployment to all testnets
// ERC-8126 addresses are per-network (see CONTRACTS above)
// This is kept for backwards compatibility — defaults to Fuji
export const ERC8126_ADDRESS = '0x82b50Dd0729D1b109522f6b4D9B13Aa438aF63D0'

export const ERC8126_ABI = [
  {
    inputs: [
      { name: 'walletAddress', type: 'address' },
      { name: 'name', type: 'string' },
      { name: 'agentURI', type: 'string' },
    ],
    name: 'registerAgent',
    outputs: [{ name: 'agentId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'agentId', type: 'uint256' }],
    name: 'getAgentVerification',
    outputs: [
      { name: 'isVerified', type: 'bool' },
      { name: 'overallScore', type: 'uint8' },
      { name: 'riskTier', type: 'uint8' },
      { name: 'verifiedAt', type: 'uint256' },
      { name: 'proofCount', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'agentId', type: 'uint256' }],
    name: 'getAgentInfo',
    outputs: [
      { name: 'walletAddress', type: 'address' },
      { name: 'name', type: 'string' },
      { name: 'agentURI', type: 'string' },
      { name: 'registrant', type: 'address' },
      { name: 'registeredAt', type: 'uint256' },
      { name: 'exists', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'agentId', type: 'uint256' },
      { indexed: true, name: 'walletAddress', type: 'address' },
      { indexed: true, name: 'registrantAddress', type: 'address' },
      { indexed: false, name: 'name', type: 'string' },
    ],
    name: 'AgentRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'agentId', type: 'uint256' },
      { indexed: false, name: 'overallRiskScore', type: 'uint8' },
      { indexed: false, name: 'riskTier', type: 'uint8' },
      { indexed: false, name: 'proofCount', type: 'uint256' },
    ],
    name: 'AgentVerified',
    type: 'event',
  },
]
