
# React Kafka Showcase Frontend

An interactive Kafka message streaming demo built with React, TypeScript, Vite, and Tailwind CSS. Visualizes live Kafka throughput, message lists, and allows producing messages via HTTP. Includes a backend-free demo mode for local UI testing.

## Features
- **Live Kafka Stream UI**: Connect to a WebSocket endpoint to stream Kafka messages in real time.
- **Produce Messages**: Send messages to a Kafka topic via HTTP POST.
- **Demo Mode**: Toggle demo mode for synthetic data without a backend.
- **Live Throughput Chart**: Visualizes message rate in 5s buckets (last 60s).
- **Recent Messages List**: Shows latest messages with key, value, and timestamp.
- **Modular UI**: Built with reusable React components and Tailwind CSS primitives.

## Getting Started
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## Kafka Integration
- **WebSocket**: `ws://localhost:4000/stream?topic=<topic>` (expects JSON messages)
- **Produce API**: `POST http://localhost:4000/produce` with `{ topic, key?, value }`

## Main Components
- `ConnectionPanel`: Configure WebSocket URL, topic, and demo mode. Connect/disconnect.
- `ProducerPanel`: Produce messages to Kafka via HTTP.
- `MessageList`: Displays recent messages (max 250).
- `ThroughputChart`: Shows live message throughput.

## Folder Structure
- `src/types.ts` — Shared types
- `src/lib/throughput.ts` — Metrics logic
- `src/hooks/useKafkaStream.ts` — Streaming & demo logic
- `src/components/` — Main UI components
- `src/components/ui/` — UI primitives (button, card, input, etc.)

## Styling
Tailwind CSS is configured via `postcss.config.js`, `tailwind.config.ts`, and `src/index.css`.

## Dependencies
- React, React DOM
- Vite (dev/build)
- Tailwind CSS
- Framer Motion (animation)
- Lucide React (icons)
- Recharts (charts)

## License
MIT
