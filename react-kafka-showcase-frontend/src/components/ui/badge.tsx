import React from 'react'

export function Badge({ children, variant = 'default', className = '' }: React.PropsWithChildren<{ variant?: 'default' | 'secondary' | 'outline'; className?: string }>) {
  const styles =
    variant === 'secondary' ? 'bg-gray-100 text-gray-800' : variant === 'outline' ? 'border text-gray-700' : 'bg-black text-white'
  return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${styles} ${className}`}>{children}</span>
}
