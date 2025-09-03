import type { StreamRecord, ThroughputPoint } from '@/types'

export function computeThroughput(records: StreamRecord[], windowMs = 60_000): ThroughputPoint[] {
  const now = Date.now()
  const buckets: Record<number, number> = {}
  records
    .filter((m) => now - m.timestamp <= windowMs)
    .forEach((m) => {
      const bucket = Math.floor(m.timestamp / 5000) * 5000
      buckets[bucket] = (buckets[bucket] || 0) + 1
    })
  return Object.entries(buckets)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([t, count]) => ({ t: Number(t), count }))
}

export function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString()
}
