'use client';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains([sepolia], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'Warisan Digital',
  projectId: 'YOUR_PROJECT_ID', // ganti dengan ID dari rainbowkit.com
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}