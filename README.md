# Server Sent Event with clusterized Node.js

This is a demo of using server-sent event under a clusterized node environment.
Unlike WSS, SSE does not require a handshake to establish a connection, so no additional magic is needed at load-balancing to ensure handshake requests are routed to the same node in the cluster.

## Running the demo:

1. `npm i && npm start`
2. From browser (or anything really), access `http://localhost: 3000`
3. Watch and notice how websocket will reset occasionally as
