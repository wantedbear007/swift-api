import { Request, Response } from "express";
import Summarized from "../database/models/summarized.model";


export class SummarizedController {
  async getAllController(req: Request, res: Response) {
    try {
      const data = await Summarized.query();
      console.log(data)
      res.status(200).send("hlel")
    } catch {
      
    } finally {
  
    }
  }
}


