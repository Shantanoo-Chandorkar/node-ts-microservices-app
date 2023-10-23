// import modules
import * as dotenv from "dotenv";
dotenv.config();
import * as express from "express";
import * as cors from "cors";
import connectDB from "../config/ormconfig";

// Import routing modules
import productRoutes from "./routes/productRoute";

// Express object
const app = express();

// Port
const port = process.env.ADMIN_PORT || 8080;

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5137"],
  })
);
app.use(express.json());

// Database
connectDB
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);

    console.log(`Rabbit mq connected`);

    // Routing middlewares
    app.use("/api/v1/products", productRoutes);

    // Healthcheck
    app.get("/", (req: express.Request, res: express.Response) => {
      res.status(200).json({
        message: "Everything is working A-Okay.",
      });
    });

    // Listen to server
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });
