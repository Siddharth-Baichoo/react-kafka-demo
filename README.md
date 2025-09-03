# React Kafka Demo

This workspace contains two main projects demonstrating real-time data streaming and visualization using Apache Kafka and React:

## Projects

### 1. react-kafka-showcase-frontend
A Vite + React + TypeScript frontend that visualizes Kafka message throughput and allows users to connect, produce, and view messages. It uses custom hooks and components for:
- Connecting to Kafka streams
- Producing messages
- Displaying message lists
- Showing throughput charts

**Logic Overview:**
- The frontend connects to a Kafka backend (not included here) via WebSockets or HTTP.
- Messages are sent and received in real-time, updating UI components.
- Throughput is calculated and visualized using custom logic in `lib/throughput.ts`.

### 2. react-kafka-showcase-with-bridge
A full-stack demo with:
- A Node.js/Express server (with Docker support) acting as a bridge between Kafka and the frontend.
- A React frontend similar to the first project, but designed to work with the bridge server.

**Logic Overview:**
- The server connects to Kafka, relays messages to the frontend, and exposes endpoints for producing and consuming messages.
- The frontend interacts with the server to send/receive Kafka messages and visualize throughput.

## How to Run

1. **Frontend only:**
   - Navigate to `react-kafka-showcase-frontend` and run `npm install` then `npm run dev`.
   - Connect to a running Kafka backend.

2. **Full-stack with bridge:**
   - Navigate to `react-kafka-showcase-with-bridge`.
   - Use `docker-compose up` to start Kafka and the bridge server.
   - Run the frontend as above.

## Features
- Real-time Kafka message streaming
- Throughput visualization
- Dockerized backend bridge
- Modular React components

---

For more details, see the individual project `README.md` files.
