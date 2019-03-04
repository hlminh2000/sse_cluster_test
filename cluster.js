const createServer = require("./app");
const proxy = require("express-http-proxy");
const { PORT = 4000 } = process.env;

const app = require("express")();

const PORTS = [1, 2, 3].map(num => PORT + num);
const randomInt = max => Math.floor(Math.random() * Math.floor(max));

app.use(
  "/",
  proxy(() => {
    const worker = `http://localhost:${PORTS[randomInt(PORTS.length)]}`;
    console.log("worker: ", worker);
    return worker;
  })
);

PORTS.forEach(port => {
  createServer().listen(port, () => {
    console.log(`worker listening on port ${port}`);
  });
});

app.listen(PORT, () => {
  console.log(`======= MASTER listening on port ${PORT} =======`);
});
