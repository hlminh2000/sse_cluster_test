const app = require("express")();
const bodyParser = require("body-parser");
const cluster = require("cluster");

const { PORT = "3000" } = process.env;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("*", (req, res, next) => {
  console.log("request handled by worker number: ", cluster.worker.id);
  next();
});

app.get("/stream", (req, res) => {
  res.status(200).set({
    connection: "keep-alive",
    "cache-control": "no-cache",
    "content-type": "text/event-stream"
  });
  const state = { num: 0 };
  res.write(String(`Request handled by worker number ${cluster.worker.id}\n`));
  setInterval(() => {
    res.write(`${state.num++}\n`);
  }, 1000);
});

// starts in cluster mode
if (cluster.isMaster) {
  const numCPUs = require("os").cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  app.listen(PORT, () => {
    console.log(`worker ${cluster.worker.id}, listening on port ${PORT}`);
  });
}
