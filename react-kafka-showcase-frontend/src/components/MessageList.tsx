import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { StreamRecord } from '@/types'
import { formatTime } from '@/lib/throughput'

export function MessageList({ records }: { records: StreamRecord[] }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recent Messages</CardTitle>
          <div className="text-sm text-muted-foreground">showing latest {records.length} (max 250)</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {records.length === 0 && <p className="text-sm text-muted-foreground">No messages yet. Connect to start streaming.</p>}
          {records.map((m, idx) => (
            <div key={idx} className="rounded-xl border p-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{formatTime(m.timestamp)}</span>
                {m.key && <span className="truncate max-w-[40%]">key: <code>{m.key}</code></span>}
              </div>
              <Separator className="my-2" />
              <pre className="text-sm whitespace-pre-wrap break-words">{m.value}</pre>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
