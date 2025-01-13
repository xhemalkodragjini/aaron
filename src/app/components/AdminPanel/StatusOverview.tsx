"use client"

import React from 'react';
import { Database, FileText, Link, Loader2, AlertCircle, Check, RefreshCw } from 'lucide-react';
import StatusCard from './StatusCard';

interface StatusOverviewProps {
  indexedDocsCount: number;
  lastIndexed: string;
  indexingStatus: 'idle' | 'running' | 'error' | 'success';
  statusMessage: string;
  isIndexing: boolean;
  onStartIndexing: () => void;
}

const StatusOverview: React.FC<StatusOverviewProps> = ({
  indexedDocsCount,
  lastIndexed,
  indexingStatus,
  statusMessage,
  isIndexing,
  onStartIndexing,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <StatusCard icon={Database} title="Indexed Documents">
      <p className="text-2xl font-bold">{indexedDocsCount}</p>
      <p className="text-sm text-gray-500">Last indexed: {lastIndexed}</p>
    </StatusCard>

    <StatusCard icon={FileText} title="Indexing Status">
      <div className="flex items-center gap-2">
        {indexingStatus === 'running' && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
        {indexingStatus === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
        {indexingStatus === 'success' && <Check className="w-4 h-4 text-green-500" />}
        <span className={
          indexingStatus === 'running' ? 'text-blue-600' :
          indexingStatus === 'error' ? 'text-red-600' :
          indexingStatus === 'success' ? 'text-green-600' :
          'text-gray-600'
        }>
          {statusMessage || 'System Ready'}
        </span>
      </div>
    </StatusCard>

    {/* <StatusCard icon={Link} title="Quick Actions">
      <button
        onClick={onStartIndexing}
        disabled={isIndexing}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isIndexing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Indexing...
          </>
        ) : (
          <>
            <RefreshCw className="w-4 h-4" />
            Trigger Reindex
          </>
        )}
      </button>
    </StatusCard> */}
  </div>
);

export default StatusOverview;