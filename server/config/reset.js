import "./dotenv.js";
import { pool } from "./database.js";
import { customItems } from "../data/customItems.js";

export const createCustomItem = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS customItem CASCADE;

    CREATE TABLE IF NOT EXISTS customItem (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        imgURL VARCHAR(255) NOT NULL,
        preparationTime NUMERIC(100, 2) NOT NULL,
        servings VARCHAR(255) NOT NULL, 
        vegan BOOLEAN NOT NULL, 
        ingredients text[] NOT NULL,
        instructions text[] NOT NULL
)
`;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 custom item table created successfully");
  } catch (err) {
    console.error("⚠️ error creating custom item table", err);
  }
};

const seedCustomItem = async () => {
  customItems.forEach((item) => {
    const insertQuery = {
      text: "INSERT INTO customItem (title, description, imgURL, preparationTime, servings, vegan, ingredients, instructions) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    };

    const values = [
      item.title,
      item.description,
      item.imgURL,
      item.preparationTime,
      item.servings,
      item.vegan,
      item.ingredients,
      item.instructions,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting custom data", err);
        return;
      }

      console.log(`✅ ${item.title} added successfully`);
    });
  });
};

// createCustomItem();
seedCustomItem();
