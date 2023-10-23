import * as dotenv from "dotenv";
dotenv.config();
import * as express from "express";
import * as cors from "cors";

const port = process.env.HOME_PORT || 8000;

const app = express();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5137"],
  })
);
app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Connected to home route!" });
});

// Listen to server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
