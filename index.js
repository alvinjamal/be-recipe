const express = require("express");
const cors = require(`cors`);
const morgan = require(`morgan`);
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const bodyParser = require(`body-parser`);
require(`dotenv`).config();
const xss = require("xss-clean");
const upload = require("./src/middlewares/upload");

const mainRouter = require("./src/routes/index");

const app = express();
const port = process.env.PORT;

const corsOptions = {
  // origin: "http://localhost:3000",
  origin: "https://food-recipe-alvinjamal.vercel.app",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(xss());

app.use("/", mainRouter);

app.use("/img", express.static("./upload"));
app.use(upload.array());

app.all("*", (req, res, next) => {
  res.status(500).json({ status: "error", statusCode: 500 });
});

app.use("/", (req, res, next) => {
  res.status(200).json({ status: "success", statusCode: 200 });
});

app.listen(port, () => {
  console.log(` Example app listening on port ${port}`);
});
