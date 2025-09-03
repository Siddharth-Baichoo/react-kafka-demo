import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { useKafkaStream } from '@/hooks/useKafkaStream'
import { computeThroughput } from '@/lib/throughput'
import { ThroughputChart } from '@/components/ThroughputChart'
import { MessageList } from '@/components/MessageList'
import { ConnectionPanel } from '@/components/ConnectionPanel'
import { ProducerPanel } from '@/components/ProducerPanel'

export default function App() {
  const [wsUrl, setWsUrl] = useState('ws://localhost:4000/stream')
  const [topic, setTopic] = useState('demo.events')
  const [demoMode, setDemoMode] = useState(true)

  const { isConnected, records, connect, disconnect } = useKafkaStream({ wsUrl, topic, demoMode })
  const throughput = useMemo(() => computeThroughput(records), [records])

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">React + Kafka Showcase</h1>
          <Badge variant="secondary">Modular • TypeScript</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Clean separation of concerns: hooks (stream), lib (metrics), and components (UI). Toggle Demo Mode for a backend-free demo.
        </p>
      </motion.div>

      <ConnectionPanel
        wsUrl={wsUrl}
        setWsUrl={setWsUrl}
        topic={topic}
        setTopic={setTopic}
        demoMode={demoMode}
        setDemoMode={setDemoMode}
        isConnected={isConnected}
        onConnect={connect}
        onDisconnect={disconnect}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ThroughputChart data={throughput} />
        </div>
        <ProducerPanel defaultUrl="http://localhost:4000/produce" topic={topic} />
      </div>

      <MessageList records={records} />
    </div>
  )
}
