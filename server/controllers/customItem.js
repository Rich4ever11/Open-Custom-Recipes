import "../config/dotenv.js";
import { pool } from "../config/database.js";

const getCustomItems = async (req, res) => {
  const getEventsQuery = `
      SELECT *
      FROM customItem
      ORDER BY id ASC
  `;

  try {
    const result = await pool.query(getEventsQuery);
    console.log("🎉 custom item data obtained");
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("⚠️ error grabbing custom item data: ", error);
    res.status(500).json({ error: error.message });
  }
};

const addCustomItem = async (req, res) => {
  const {
    title,
    description,
    imgURL,
    preparationTime,
    servings,
    ingredients,
    instructions,
  } = req.body;

  const getEventsQuery = `
      INSERT INTO customItem (title, description, audience, imgurl, description, preparationTime, servings, ingredients, instructions) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
  `;

  values = [
    title,
    description,
    imgURL,
    preparationTime,
    servings,
    ingredients,
    instructions,
  ];

  try {
    const result = await pool.query(getEventsQuery, values);
    console.log("🎉 custom item data obtained");
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("⚠️ error grabbing custom item data: ", error);
    res.status(500).json({ error: error.message });
  }
};

export default {
  getCustomItems,
  addCustomItem,
};
