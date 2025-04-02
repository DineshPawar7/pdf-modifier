import express from "express";
import { modifyPDF } from "../controllers/pdfController.js";

const router = express.Router();

router.post("/modify", modifyPDF);

export default router;
