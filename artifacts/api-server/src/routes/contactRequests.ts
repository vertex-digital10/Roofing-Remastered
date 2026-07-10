import { Router, type IRouter, type Request, type Response } from "express";
import { db, contactRequestsTable } from "@workspace/db";
import {
  CreateContactRequestBody,
  CreateContactRequestResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact-requests", async (req: Request, res: Response): Promise<void> => {
  const parsed = CreateContactRequestBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid contact request");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [contactRequest] = await db
    .insert(contactRequestsTable)
    .values(parsed.data)
    .returning();

  res.status(201).json(CreateContactRequestResponse.parse(contactRequest));
});

export default router;
