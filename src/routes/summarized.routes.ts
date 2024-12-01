import { Router } from "express";
import { SummarizedController } from "../controllers/summarized.controller";

const summarizedRouter = Router();
const controller: SummarizedController = new SummarizedController();
summarizedRouter.get("/all", controller.getAllController);

export default summarizedRouter;
