import React from 'react';
import { Card } from '@tremor/react';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

export const WidgetSkeleton: React.FC = () => (
  <Card className="h-full flex flex-col space-y-4">
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-12 w-1/2" />
    <Skeleton className="flex-grow w-full" />
    <div className="flex space-x-2">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  </Card>
);
