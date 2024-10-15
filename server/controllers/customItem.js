import "../config/dotenv.js";
import { pool } from "../config/database.js";
import { veganCheckList } from "../data/veganCheckList.js";

const verifyVeganRecipe = (title, description, ingredients, instructions) => {
  // Check name
  const recipeNameSplit = title.split();
  const recipeNameIntersection = recipeNameSplit.filter((section) =>
    veganCheckList.includes(section)
  );

  if (recipeNameIntersection.length) {
    return false;
  }

  // check description
  const recipeDescriptionSplit = description.split();
  const recipeDescriptionIntersection = recipeDescriptionSplit.filter(
    (section) => veganCheckList.includes(section)
  );

  if (recipeDescriptionIntersection.length) {
    return false;
  }

  // check Recipe Instructions
  const recipeInstructionIntersection = veganCheckList.filter((section) =>
    instructions.includes(section)
  );

  if (recipeInstructionIntersection.length) {
    return false;
  }

  // check Recipe Ingredients
  const recipeIngredientsIntersection = veganCheckList.filter((section) =>
    ingredients.includes(section)
  );

  if (recipeIngredientsIntersection.length) {
    return false;
  }

  return true;
};

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
    vegan,
    preparationTime,
    servings,
    ingredients,
    instructions,
  } = req.body;

  const insertQuery = `
      INSERT INTO customItem (title, description, vegan, imgurl, preparationTime, servings, ingredients, instructions) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
  `;

  const values = [
    title,
    description,
    vegan,
    imgURL,
    preparationTime,
    servings,
    ingredients,
    instructions,
  ];

  try {
    if (
      verifyVeganRecipe(title, description, ingredients, instructions) ===
        false &&
      vegan == 1
    ) {
      throw "Invalid Vegan Recipe";
    }
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
    vegan,
    ingredients,
    instructions,
  } = req.body;
  const customItemId = req.params.id;

  const updateQuery = `
  UPDATE customItem SET title = $1, description = $2, vegan = $3, imgurl = $4, preparationTime = $5, servings = $6, ingredients = $7, instructions = $8 WHERE id = $9;
  `;

  const values = [
    title,
    description,
    vegan,
    imgURL,
    preparationTime,
    servings,
    ingredients,
    instructions,
    customItemId,
  ];

  try {
    if (
      verifyVeganRecipe(title, description, ingredients, instructions) ===
        false &&
      vegan == 1
    ) {
      throw "Invalid Vegan Recipe";
    }
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
