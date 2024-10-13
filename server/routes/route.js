import express from "express";
import "../config/dotenv.js";
// import controller for custom items
import customItemController from "../controllers/customItem.js";

const router = express.Router();

// define routes to get, create, edit, and delete items
router.get("/customItems", customItemController.getCustomItems);

router.get("/customItems/:id", customItemController.getCustomItemById);

router.post("/customItems", customItemController.addCustomItem);

router.put("/customItems/:id", customItemController.updateCustomItem);

router.delete("/customItems/:id", customItemController.removeCustomItemById);

export default router;
