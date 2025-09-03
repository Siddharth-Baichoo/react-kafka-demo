# React + Kafka Showcase (Vite + TS)

This is a minimal Vite React scaffold wired to Kafka demo UI.
Pair it with (Kafka + bridge) or run against any server that provides:

- WebSocket: `ws://localhost:4000/stream?topic=<topic>` (pushes Kafka messages as JSON)
- HTTP: `POST http://localhost:4000/produce` with `{ topic, key?, value }`

## Quick start
```bash
npm install
npm run dev
```

## Folder layout
- `src/types.ts` — shared types
- `src/lib/throughput.ts` — pure metrics logic
- `src/hooks/useKafkaStream.ts` — streaming & demo mode
- `src/components/*` — UI components (no external UI lib; basic Tailwind)
- `src/components/ui/*` — small primitives

## Styling
Tailwind is set up via `postcss.config.js`, `tailwind.config.ts`, and `src/index.css`.
