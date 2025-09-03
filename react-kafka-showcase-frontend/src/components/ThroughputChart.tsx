import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity } from 'lucide-react'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts'
import type { ThroughputPoint } from '@/types'

export function ThroughputChart({ data }: { data: ThroughputPoint[] }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5" /> Live Throughput (5s buckets)
          </CardTitle>
          <Badge variant="outline">last 60s</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="t" tickFormatter={(t) => new Date(Number(t)).toLocaleTimeString()} minTickGap={24} />
              <YAxis allowDecimals={false} />
              <Tooltip labelFormatter={(t) => new Date(Number(t)).toLocaleTimeString()} />
              <Line type="monotone" dataKey="count" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
