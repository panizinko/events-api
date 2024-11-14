const fs = require("fs");

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const COUNTS = {
  PRODUCERS: 20,
  CONSUMERS: 100,
  EVENT_TOPICS: 150,
  EVENTS: 200,
  INVALID_EVENTS: 100,
};

const sources = [
  "Kafka",
  "RabbitMQ",
  "Azure EventHub",
  "AWS SQS",
  "Google PubSub",
  "Redis",
  "Apache Pulsar",
];
const departments = [
  "Sales",
  "Marketing",
  "Finance",
  "HR",
  "Operations",
  "IT",
  "Customer Service",
];
const purposes = [
  "Analytics",
  "Logging",
  "Processing",
  "Reporting",
  "Archiving",
  "Monitoring",
  "Indexing",
];
const types = [
  "App",
  "Service",
  "Worker",
  "Processor",
  "Handler",
  "Monitor",
  "Analyzer",
];
const domains = [
  "order",
  "user",
  "payment",
  "product",
  "inventory",
  "shipping",
  "notification",
];
const actions = [
  "created",
  "updated",
  "deleted",
  "processed",
  "validated",
  "synced",
  "archived",
];

// Generate Producers
const generateProducers = () => {
  let data = "ID,name\n";
  for (let i = 1; i <= COUNTS.PRODUCERS; i++) {
    const source = randomFrom(sources);
    const dept = randomFrom(departments);
    data += `${i},"${source} ${dept} Producer"\n`;
  }
  return data;
};

const generateConsumers = () => {
  let data = "ID,name,producer_id_ID\n";
  for (let i = 1; i <= COUNTS.CONSUMERS; i++) {
    const type = randomFrom(types);
    const purpose = randomFrom(purposes);
    const producerId = Math.floor(Math.random() * COUNTS.PRODUCERS) + 1;
    data += `${i},"${purpose} ${type} ${i}",${producerId}\n`;
  }
  return data;
};

// Generate Event Topics
const generateEventTopics = () => {
  let data =
    "ID,name,event_topic_id,event_topic_name,consumer_lag,consumer_ID\n";
  for (let i = 1; i <= COUNTS.EVENT_TOPICS; i++) {
    const domain = randomFrom(domains);
    const action = randomFrom(actions);
    const topicName = `${domain}.${action}`;
    const consumerId = Math.floor(Math.random() * COUNTS.CONSUMERS) + 1;
    const lag = Math.floor(Math.random() * 100);
    data += `${i},"Topic ${i}",${
      i + 1000
    },"${topicName}",${lag},${consumerId}\n`;
  }
  return data;
};

const generateEvents = () => {
  let data = "ID,name,event_topic_id_ID\n";
  for (let i = 1; i <= COUNTS.EVENTS; i++) {
    const domain = randomFrom(domains);
    const action = randomFrom(actions);
    const topicId = Math.floor(Math.random() * COUNTS.EVENT_TOPICS) + 1;
    data += `${i},"${domain} ${action} event ${i}",${topicId}\n`;
  }
  return data;
};

const generateInvalidEvents = () => {
  let data = "ID,description,producer_ID,consumer_ID\n";
  const errors = [
    "Malformed JSON",
    "Invalid schema",
    "Missing required fields",
    "Timeout error",
    "Authentication failed",
    "Data corruption",
    "Invalid timestamp",
    "Duplicate event",
    "Processing error",
    "Validation failed",
  ];

  for (let i = 1; i <= COUNTS.INVALID_EVENTS; i++) {
    const error = randomFrom(errors);
    const producerId = Math.floor(Math.random() * COUNTS.PRODUCERS) + 1;
    const consumerId = Math.floor(Math.random() * COUNTS.CONSUMERS) + 1;
    data += `${i},"${error} at ${new Date().toISOString()}",${producerId},${consumerId}\n`;
  }
  return data;
};

// Generate all files
const generateFiles = () => {
  const dataDir = "./db/data/";

  // Ensure directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Generate files
  fs.writeFileSync(`${dataDir}events-Producer.csv`, generateProducers());
  fs.writeFileSync(`${dataDir}events-Consumer.csv`, generateConsumers());
  fs.writeFileSync(`${dataDir}events-EventTopic.csv`, generateEventTopics());
  fs.writeFileSync(`${dataDir}events-Event.csv`, generateEvents());
  fs.writeFileSync(
    `${dataDir}events-InvalidEvent.csv`,
    generateInvalidEvents()
  );

  console.log("success!");
};

generateFiles();
