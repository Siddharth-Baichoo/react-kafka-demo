# React Kafka Showcase with Bridge

A demo project showcasing real-time Kafka message streaming in a React application, using a Node.js bridge server and Dockerized Kafka setup.

## Features
- Live Kafka message streaming to the browser via WebSockets
- Producer panel to send messages to Kafka topics
- Connection panel to select and connect to topics
- Message list to view incoming messages in real time
- Throughput chart to visualize message rates
- Docker Compose setup for Kafka, Node.js bridge, and Kafka UI

## Architecture
- **React Frontend** (`src/`):
  - UI components for connection, producing, listing messages, and throughput chart
  - Custom hook (`useKafkaStream.ts`) for WebSocket streaming
- **Node.js Bridge Server** (`server/`):
  - Express API and WebSocket server
  - Uses `kafkajs` to connect to Kafka and relay messages
- **Kafka**: Bitnami Kafka container
- **Kafka UI**: Provectus Kafka UI for topic/message inspection

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js (for local development)

### Quick Start (Recommended)
1. Clone the repo:
   ```sh
   git clone <repo-url>
   cd react-kafka-showcase-with-bridge
   ```
2. Start all services:
   ```sh
   docker-compose up --build
   ```
   - Kafka broker: `localhost:9094`
   - Bridge server: `localhost:4000`
   - Kafka UI: `localhost:8080`
3. Open the React app (if not containerized):
   ```sh
   cd src
   npm install
   npm start
   ```

### Manual Server Start
1. Start Kafka via Docker Compose:
   ```sh
   docker-compose up kafka
   ```
2. Start the Node.js bridge:
   ```sh
   cd server
   npm install
   node server.js
   ```
3. Start the React app as above.

## Usage
- Use the **Producer Panel** to send messages to a topic
- Use the **Connection Panel** to select a topic and connect
- View live messages in the **Message List**
- Monitor throughput in the **Throughput Chart**
- Inspect topics/messages in **Kafka UI** (`localhost:8080`)

## Project Structure
```
react-kafka-showcase-with-bridge/
├── docker-compose.yml
├── server/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── src/
│   ├── App.tsx
│   ├── types.ts
│   ├── components/
│   │   ├── ConnectionPanel.tsx
│   │   ├── MessageList.tsx
│   │   ├── ProducerPanel.tsx
│   │   └── ThroughputChart.tsx
│   ├── hooks/
│   │   └── useKafkaStream.ts
│   └── lib/
│       └── throughput.ts
```

## Environment Variables
- `KAFKA_BROKERS`: Kafka broker address (default: `localhost:9094`)
- `PORT`: Bridge server port (default: `4000`)

## License
MIT