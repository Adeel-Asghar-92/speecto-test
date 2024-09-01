import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import methodOverride from "method-override";
import { router } from "../api";
import config from "../config";

import fs from "fs";

export default ({ app }: { app: express.Application }) => {
  /**
   * API Status Check !!
   */

  app.use(express.json({ limit: "10mb" })); // Adjust the limit as needed

  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  app.get("/status", (req, res) => {
    res.status(200).json({
      status: "OK! Server is working 100%  🔥",
    });
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  /* Setting up basics */
  app.enable("trust proxy");
  app.use(cors());
  app.use(methodOverride());
  app.use(bodyParser.json());

  // Load API routes with /api
  app.use(config.api.prefix, router);

  /// catch 404 and forward to error handler
  app.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const err = new Error("Not Found");
      // err["status"] = 404;
      next(err);
    }
  );

  /// error handlers
  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      /**
       * Handler 401
       */
      if (err.name === "UnauthorizedError") {
        return res.status(err.status).send({ message: err.message }).end();
      }
      return next(err);
    }
  );
  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.status(err.status || 500);
      res.json({
        errors: {
          message: err.message,
        },
      });
    }
  );
};
