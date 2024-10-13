import "../config/dotenv.js";
import { pool } from "../config/database.js";

const getCustomItems = async (req, res) => {
  const getQuery = `
      SELECT *
      FROM customItem
      ORDER BY id ASC
  `;

  try {
    const result = await pool.query(getQuery);
    console.log("🎉 custom item data obtained");
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("⚠️ error grabbing custom item data: ", error);
    res.status(500).json({ error: error.message });
  }
};

const getCustomItemById = async (req, res) => {
  const customItemId = req.params.id;
  const getQuery = `
      SELECT *
      FROM customItem
      WHERE id = $1
      ORDER BY id ASC
  `;

  try {
    const result = await pool.query(getQuery, [customItemId]);
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

  const insertQuery = `
      INSERT INTO customItem (title, description, imgurl, preparationTime, servings, ingredients, instructions) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
  `;

  const values = [
    title,
    description,
    imgURL,
    preparationTime,
    servings,
    ingredients,
    instructions,
  ];

  try {
    const result = await pool.query(insertQuery, values);
    console.log("🎉 custom item data added");
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("⚠️ error adding custom item data: ", error);
    res.status(500).json({ error: error.message });
  }
};

const updateCustomItem = async (req, res) => {
  const {
    title,
    description,
    imgURL,
    preparationTime,
    servings,
    ingredients,
    instructions,
  } = req.body;
  const customItemId = req.params.id;

  const updateQuery = `
  UPDATE customItem SET title = $1, description = $2, imgurl = $3, preparationTime = $4, servings = $5, ingredients = $6, instructions = $7 WHERE id = $8;
  `;

  const values = [
    title,
    description,
    imgURL,
    preparationTime,
    servings,
    ingredients,
    instructions,
    customItemId,
  ];

  try {
    const result = await pool.query(updateQuery, values);
    console.log("🎉 custom item data added");
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("⚠️ error adding custom item data: ", error);
    res.status(500).json({ error: error.message });
  }
};

const removeCustomItemById = async (req, res) => {
  const customItemId = req.params.id;
  const getQuery = `
      DELETE FROM customItem WHERE id = $1
  `;

  try {
    const result = await pool.query(getQuery, [customItemId]);
    console.log("🎉 custom item deleted");
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("⚠️ error deleting custom item: ", error);
    res.status(500).json({ error: error.message });
  }
};

export default {
  getCustomItems,
  getCustomItemById,
  addCustomItem,
  updateCustomItem,
  removeCustomItemById,
};
