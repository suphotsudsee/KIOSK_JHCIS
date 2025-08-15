const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

// parse JSON bodies, but tolerate empty payloads so GET requests with
// a `Content-Type: application/json` header do not trigger a crash that
// manifests as "Unexpected end of input" in some browsers (e.g. Chrome)
app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({ extended: true }));

// gracefully handle malformed JSON payloads
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }
  next();
});

// compresses all the responses
app.use(compression());

// adding set of security middlewares
app.use(helmet());

// enable all CORS request
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

require("./src/routes/index.routes")(app);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  // res.status(statusCode).json({ message: err });
  return;
});

app.listen(port, "0.0.0.0", () => {
  console.log(`App listening at 0.0.0.0:${port}`);
});
