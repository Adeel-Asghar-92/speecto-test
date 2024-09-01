import express from "express";
import config from "./config/index";
import Logger from "./lib/logger";
import * as libs from "./lib";
import { mongoose } from "./dataSources";
// import { router } from "./api";

async function startServer() {
  mongoose.run();
  const app: express.Application = express();
  await libs.default({ serverApp: app });
  // app.use(
  //   express.json({ limit: '10mb' }),
  //   express.urlencoded({ limit: '10mb', extended: true }),
  //   authMiddleware,
  //   router,
  //   notFoundMiddleware
  // )
  // app.use(
  //   express.json({ limit: "10mb" }),
  //   express.urlencoded({ limit: "10mb", extended: true }),
  //   router
  // );

  app &&
    app.listen(config.port, () => {
      Logger.info(`
      	Running Node Server for ${process.env.NODE_ENV}	|⚡️
        Ready now on port: ${config.port}             |⚡️
      ; 

    `);
    });
}

startServer();
