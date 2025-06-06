import './globals.css';
import { WalletProvider } from '../lib/wallet';

export const metadata = {
  title: 'Warisan Digital',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
