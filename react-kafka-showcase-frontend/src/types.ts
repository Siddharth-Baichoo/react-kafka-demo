export type StreamRecord = {
  key?: string
  value: string
  timestamp: number
}

export type ThroughputPoint = { t: number; count: number }
