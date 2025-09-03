import { useCallback, useEffect, useRef, useState } from 'react'
import type { StreamRecord } from '@/types'

export type KafkaConfig = {
  wsUrl: string
  topic: string
  demoMode: boolean
}

export function useKafkaStream({ wsUrl, topic, demoMode }: KafkaConfig) {
  const [isConnected, setConnected] = useState(false)
  const [records, setRecords] = useState<StreamRecord[]>([])
  const socketRef = useRef<WebSocket | null>(null)
  const demoTimer = useRef<number | null>(null)

  const disconnect = useCallback(() => {
    if (demoTimer.current) {
      clearInterval(demoTimer.current)
      demoTimer.current = null
    }
    socketRef.current?.close()
    socketRef.current = null
    setConnected(false)
  }, [])

  const connect = useCallback(() => {
    if (isConnected) return

    if (demoMode) {
      setConnected(true)
      demoTimer.current = window.setInterval(() => {
        const synthetic: StreamRecord = {
          key: Math.random().toString(36).slice(2, 8),
          value: JSON.stringify({ id: crypto.randomUUID(), metric: Math.floor(Math.random() * 100), note: 'demo-event' }),
          timestamp: Date.now(),
        }
        setRecords((prev) => [synthetic, ...prev].slice(0, 250))
      }, 800)
      return
    }

    try {
      const ws = new WebSocket(`${wsUrl}?topic=${encodeURIComponent(topic)}`)
      socketRef.current = ws
      ws.onopen = () => setConnected(true)
      ws.onmessage = (evt) => {
        try {
          const msg = JSON.parse(evt.data)
          const rec: StreamRecord = {
            key: msg.key ?? undefined,
            value: typeof msg.value === 'string' ? msg.value : JSON.stringify(msg.value),
            timestamp: msg.timestamp ? Number(msg.timestamp) : Date.now(),
          }
          setRecords((prev) => [rec, ...prev].slice(0, 250))
        } catch {
          setRecords((prev) => [{ value: String(evt.data), timestamp: Date.now() } as StreamRecord, ...prev].slice(0, 250))
        }
      }
      ws.onclose = () => setConnected(false)
      ws.onerror = () => setConnected(false)
    } catch {
      setConnected(false)
    }
  }, [demoMode, isConnected, topic, wsUrl])

  useEffect(() => () => disconnect(), [disconnect])

  return { isConnected, records, connect, disconnect } as const
}
