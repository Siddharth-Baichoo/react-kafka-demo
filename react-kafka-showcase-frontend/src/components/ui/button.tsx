import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'secondary' }
export function Button({ className = '', variant = 'default', ...rest }: Props) {
  const base = 'px-4 py-2 rounded-xl text-sm font-medium transition'
  const styles = variant === 'secondary' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
  return <button className={`${base} ${styles} ${className}`} {...rest} />
}
