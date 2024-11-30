import Objection from "objection";
import Knex from "knex";
import "dotenv/config";
import config from "./database/knexfile";
import express, { Express, Response, Request } from "express";
import cors from "cors";
import Unsummarized from "./database/models/unsummarized.model";
import { UNSUMMARIZED_TABLE_NAME } from "./utils/constants";
import { corsOptions } from "./middleware/config";

const app: Express = express();
/**
 * init knex and start database.
 */
async function startServices(): Promise<void> {
  const db = Knex(
    process.env.PRODUCTION == "false" ? config?.development : config?.production
  );
  try {
    await db.raw("SELECT 1");
    Objection.Model.knex(db);
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Database connection failed:");
  } finally {
    // await db.destroy(); // to destroy database instance
  }
}

startServices().then(() => {
  const port: number | string = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(
      `[server]: Server is running at http://${process.env.DOMAIN || "localhost"}:${port}`
    );
  });
});

/**
 * security middlewares.
 */
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  const user = await Unsummarized.query();
  // console.log("use", user);

  res.status(200).send("hello from bhanupratap singh");
});
