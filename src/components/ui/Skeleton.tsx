import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  const combinedClassName = `animate-pulse rounded-md bg-neutral-800/50 ${className || ''}`;

  return <div className={combinedClassName} {...props} />;
}
