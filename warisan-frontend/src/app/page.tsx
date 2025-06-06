'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { parseUnits } from 'viem';
import WarisanAbi from '../../abi/WarisanDigital.json';

const CONTRACT_ADDRESS = '0xd5F9BA4EC1d086aE2CD0F22EACe248fE5411f9d9';

export default function Home() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const { isConnected } = useAccount();

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: WarisanAbi,
    functionName: 'tambahAhliWaris',
    args: [address, parseUnits(amount || '0', 18)],
    enabled: !!address && !!amount,
  });

  const { write, isLoading } = useContractWrite(config);

  const handleTambah = () => {
    if (write) {
      write();
      setStatus('Transaksi dikirim...');
    } else {
      setStatus('Form belum lengkap atau wallet belum connect.');
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Warisan Digital</h1>

      <div className="mb-4">
        <ConnectButton />
      </div>

      {isConnected && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Alamat ahli waris"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Jumlah token"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 mr-2"
          />
          <button
            onClick={handleTambah}
            className="bg-green-600 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : 'Tambah'}
          </button>
        </div>
      )}

      {status && <p className="text-sm text-gray-700">{status}</p>}
    </main>
  );
}