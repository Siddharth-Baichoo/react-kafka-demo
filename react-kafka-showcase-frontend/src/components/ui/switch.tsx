import React from 'react'

export function Switch({ checked, onChange }: { checked?: boolean; onChange?: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange && onChange(!checked)}
      className={`w-11 h-6 rounded-full transition ${checked ? 'bg-black' : 'bg-gray-300'}`}
      aria-pressed={checked}
    >
      <span className={`block w-5 h-5 bg-white rounded-full transition translate-y-0.5 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  )
}
