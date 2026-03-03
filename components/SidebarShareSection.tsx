'use client';

import { useState, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import { HugeiconsIcon } from '@hugeicons/react';
import { Copy01Icon, CheckmarkCircleIcon } from '@hugeicons/core-free-icons';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

export default function SidebarShareSection() {
  const analytics = useAnalytics();
  const [isCopied, setIsCopied] = useState(false);
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/`;

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    analytics.shareCompleted({ platform: 'copy' });
  }, [analytics, shareUrl]);

  return (
    <div className="flex flex-col items-center py-4 space-y-3">
      <div className="relative">
        <QRCodeSVG value={shareUrl} size={128} className="rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image src="/icon-512.png" alt="Logo" width={24} height={24} className="w-6 h-6 bg-white rounded-md" />
        </div>
      </div>
      <p className="text-xs text-neutral-500">Share with your friends</p>
      <button
        type="button"
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-neutral-900 transition-colors text-neutral-400 hover:text-neutral-200 text-sm"
      >
        <HugeiconsIcon icon={isCopied ? CheckmarkCircleIcon : Copy01Icon} size={16} color="currentColor" strokeWidth={1.5} />
        {isCopied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  );
}
