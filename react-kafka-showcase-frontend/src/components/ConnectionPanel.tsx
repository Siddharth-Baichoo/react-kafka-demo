import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { CircleDot, PauseCircle, PlayCircle, Plug, PlugZap } from 'lucide-react'

export type ConnectionPanelProps = {
  wsUrl: string
  setWsUrl: (v: string) => void
  topic: string
  setTopic: (v: string) => void
  demoMode: boolean
  setDemoMode: (v: boolean) => void
  isConnected: boolean
  onConnect: () => void
  onDisconnect: () => void
}

export function ConnectionPanel(props: ConnectionPanelProps) {
  const { wsUrl, setWsUrl, topic, setTopic, demoMode, setDemoMode, isConnected, onConnect, onDisconnect } = props
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Connection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant={isConnected ? 'default' : 'secondary'} className="gap-1">
            {isConnected ? <PlugZap className="h-4 w-4" /> : <Plug className="h-4 w-4" />}
            {isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
          <CircleDot className={`h-4 w-4 ${isConnected ? '' : 'opacity-40'}`} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ws">WebSocket URL</Label>
            <Input id="ws" value={wsUrl} onChange={(e) => setWsUrl((e.target as HTMLInputElement).value)} placeholder="ws://localhost:4000/stream" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input id="topic" value={topic} onChange={(e) => setTopic((e.target as HTMLInputElement).value)} placeholder="demo.events" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="demo">Demo Mode</Label>
            <div className="flex items-center gap-3">
              <Switch checked={demoMode} onChange={setDemoMode} />
              <span className="text-sm text-muted-foreground">No backend required</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!isConnected ? (
            <Button onClick={onConnect} className="gap-2">
              <PlayCircle className="h-4 w-4" /> Connect
            </Button>
          ) : (
            <Button onClick={onDisconnect} variant="secondary" className="gap-2">
              <PauseCircle className="h-4 w-4" /> Disconnect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
