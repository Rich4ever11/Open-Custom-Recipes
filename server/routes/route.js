import express from "express";
import "../config/dotenv.js";
// import controller for custom items
import customItemController from "../controllers/customItem.js";

const router = express.Router();

// define routes to get, create, edit, and delete items
router.use("/", customItemController.getCustomItems);

export default router;
