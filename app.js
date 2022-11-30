const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const indexRouter = require("./routes/index.js");
app.use("/", indexRouter);

const connect = require("./schemas");
connect();

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
