# Server-Sent Events (SSE) Example

This repository contains an example implementation of Server-Sent Events (SSE). SSE is a standard allowing servers to push real-time updates to the browser over a single HTTP connection.

## Introduction

Server-Sent Events (SSE) is a technology that allows a server to send updates to the client as they happen over a single HTTP connection. This is useful for real-time applications like live scores, notifications, or chat applications.

### How SSE Works
- **Client Request**: The client sends an initial HTTP request to the server to establish a connection.
- **Server Response**: The server responds with a MIME type of `text/event-stream`.
- **Event Stream**: The server sends a stream of events to the client, which can be processed as they arrive.

### Advantages of SSE
- **Simple Protocol**: SSE uses a simple HTTP protocol, making it easy to implement.
- **Automatic Reconnection**: The browser automatically reconnects to the server if the connection is lost.
- **Event ID**: Events can have unique IDs, allowing clients to remember the last event they received and avoid missing any updates.

### Limitations
- **Browser Support**: Not all browsers support SSE (e.g., Internet Explorer).
- **Single-Directional**: SSE is one-way; data can only be sent from the server to the client.

