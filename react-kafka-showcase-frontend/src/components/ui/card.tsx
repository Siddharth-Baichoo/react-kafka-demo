import React from 'react'

export function Card({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`rounded-2xl border shadow-sm bg-white ${className}`}>{children}</div>
}
export function CardHeader({ children }: React.PropsWithChildren) {
  return <div className="p-4 border-b">{children}</div>
}
export function CardTitle({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
  return <h3 className={`font-medium ${className}`}>{children}</h3>
}
export function CardContent({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`p-4 ${className}`}>{children}</div>
}
