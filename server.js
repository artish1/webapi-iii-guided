const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");
const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`);

  next();
}

function authenticate(req, res, next) {
  if (req.headers.authorization === "melon") {
    next();
  } else {
    res.send({ message: "Not authorized" });
  }
}

server.use(express.json());
server.use(helmet());
server.use("/api/hubs", hubsRouter);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.get("/echo", (req, res) => {
  res.send(req.headers);
});

server.get("/area51", authenticate, (req, res) => {
  res.send({ message: "welcome" });
});

module.exports = server;
