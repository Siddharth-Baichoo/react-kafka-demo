const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Kafka, logLevel } = require('kafkajs');
const { WebSocketServer } = require('ws');

// Read brokers from env; defaults to local host-mapped 9094 (but in docker-compose we use kafka:9092)
const BROKERS = (process.env.KAFKA_BROKERS || 'localhost:9094')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const app = express();
app.use(cors());
app.use(bodyParser.json());

const kafka = new Kafka({ clientId: 'react-kafka-demo', brokers: BROKERS, logLevel: logLevel.NOTHING });
const producer = kafka.producer();
const consumers = new Map(); // topic -> consumer

const PORT = process.env.PORT || 4000;
const wss = new WebSocketServer({ port: Number(PORT), path: '/stream' });

wss.on('connection', async (ws, req) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const topic = url.searchParams.get('topic') || 'demo.events';

    if (!consumers.has(topic)) {
      const consumer = kafka.consumer({ groupId: `react-kafka-demo-group-${topic}` });
      await consumer.connect();
      await consumer.subscribe({ topic, fromBeginning: false });
      await consumer.run({
        eachMessage: async ({ message }) => {
          const payload = {
            key: message.key?.toString(),
            value: message.value?.toString(),
            timestamp: Number(message.timestamp) || Date.now(),
          };
          wss.clients.forEach((client) => {
            if (client.readyState === 1) client.send(JSON.stringify(payload));
          });
        },
      });
      consumers.set(topic, consumer);
      console.log(`WS consumer running for topic: ${topic}`);
    }
  } catch (e) {
    console.error('WS error', e);
  }
});

app.post('/produce', async (req, res) => {
  const { topic, key, value } = req.body || {};
  if (!topic || !value) return res.status(400).json({ error: 'topic and value required' });
  try {
    await producer.connect();
    await producer.send({ topic, messages: [{ key, value: typeof value === 'string' ? value : JSON.stringify(value) }] });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'produce failed' });
  }
});

app.listen(PORT, () => console.log(`HTTP producer on http://localhost:${PORT}/produce | WS on ws://localhost:${PORT}/stream | Brokers: ${BROKERS.join(', ')}`));
