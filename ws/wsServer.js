const clients = new Set();
const { WebSocketServer } = require("ws");

const WS_PORT=process.env.WS_PORT || 8080;

const wss = new WebSocketServer({ port: WS_PORT });
wss.on("connection", ws => {
    console.log("Recieved new connection.");
    clients.add(ws);
    ws.on("close", () => {
        if (clients.has(ws)) {
            clients.delete(ws);
            console.log("Disconnected");
        }
    });
});

exports.broadcastMessage = (msg) => {
    for (const client of clients) {
        client.send(msg);
    }
}
