import express from "express";
import bodyParser from "body-parser";

const PORT = 3000;
export const app = express();

app.use(bodyParser.json());

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
