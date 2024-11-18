"use client"

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}

const StatusCard: React.FC<StatusCardProps> = ({ icon: Icon, title, children }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="flex items-center gap-2 text-gray-600 mb-2">
      <Icon className="w-5 h-5" />
      <h2 className="font-semibold">{title}</h2>
    </div>
    {children}
  </div>
);

export default StatusCard;