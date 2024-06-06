const cors = require('cors');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const publishMessagesEventObj = require('./loadCustomEvent');

const port = 3000;
const app = express();

app.use(cors());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/events', (req, res) => {
    let count = 0;
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.flushHeaders(); // flush the headers to establish SSE with the client

    publishMessagesEventObj.addListener('data', (message) => {
        const eventId = uuidv4();
        const eventData = {
            retry: 1500,
            eventId: eventId,
            time: new Date().toISOString(),
            message: `Wattsapp: ${message}`,
            event: `Custom_Event_${Date.now()}`
        };
        res.write(`id: ${eventId}\n`);
        res.write(`data: ${JSON.stringify(eventData)}\n\n`);
    });

    publishMessagesEventObj.addListener('close', () => {
        res.write('data: End of events\n\n');
        res.end();
    });
});

app.get('/new-event', (req, res) => {
    publishMessagesEventObj.emit('data', req?.query?.message);
    res.send('Event Fired !!!');
});

app.get('/close-event', (req, res) => {
    publishMessagesEventObj.emit('close');
    res.send('Closing The Events !!!');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});