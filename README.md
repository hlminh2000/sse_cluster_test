# Server Sent Event with clusterized Node.js

This is a demo of using server-sent event under a clusterized node environment.
Unlike WS, SSE does not require a handshake to establish a connection, so no additional magic is needed at load-balancing to ensure handshake requests are routed to the same node in the cluster.

The cluster environment is simulated with an http proxy.

## Running the demo:

Install dependencies: `npm i`

### Singleton environment:

1. `npm run single`
2. From browser, go to `http://localhost: 3000`
3. Notice both websocket and SSE implementation works

### Cluster environment:

1. `npm run cluster`
2. From browser, go to `http://localhost: 4000`
3. Notice that only SSE is working as WS fails to establish handshake.
