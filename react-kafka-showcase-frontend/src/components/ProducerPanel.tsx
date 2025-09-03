import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'

export function ProducerPanel({ defaultUrl, topic }: { defaultUrl: string; topic: string }) {
  const [produceUrl, setProduceUrl] = useState(defaultUrl)
  const [produceKey, setProduceKey] = useState('')
  const [produceValue, setProduceValue] = useState('{"hello": "world"}')
  const [isProducing, setIsProducing] = useState(false)

  async function handleProduce() {
    setIsProducing(true)
    try {
      const res = await fetch(produceUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, key: produceKey || undefined, value: produceValue }),
      })
      if (!res.ok) throw new Error('Produce failed')
    } catch (e) {
      console.error(e)
    } finally {
      setIsProducing(false)
    }
  }

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Produce</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="pkey">Key (optional)</Label>
          <Input id="pkey" value={produceKey} onChange={(e) => setProduceKey((e.target as HTMLInputElement).value)} placeholder="partitioning-key" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pval">Value (JSON or text)</Label>
          <Textarea id="pval" rows={6} value={produceValue} onChange={(e) => setProduceValue((e.target as HTMLTextAreaElement).value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="prod">Producer HTTP URL</Label>
          <Input id="prod" value={produceUrl} onChange={(e) => setProduceUrl((e.target as HTMLInputElement).value)} placeholder="http://localhost:4000/produce" />
        </div>
        <Button onClick={handleProduce} disabled={isProducing} className="w-full gap-2">
          <Send className="h-4 w-4" /> {isProducing ? 'Sending...' : 'Send to Kafka'}
        </Button>
      </CardContent>
    </Card>
  )
}
