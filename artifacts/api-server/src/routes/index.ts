import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRequestsRouter from "./contactRequests";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRequestsRouter);

export default router;
