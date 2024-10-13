import React from "react";
// import "../App.css";
// import "../css/Navigation.css";

const Navigation = () => {
  return (
    <nav className="bg-gradient-to-b from-black px-4">
      <ul>
        <li>
          <h1 className="text-white text-6xl font-thin italic font-mono">
            Recipe And Go 🥗
          </h1>
        </li>
      </ul>

      <ul>
        <li>
          <a
            href="/"
            role="button"
            className="transition duration-700 ease-in-out bg-transparent font hover:bg-green-200 text-white font-thin hover:text-black py-2 px-4 border border-white hover:border-transparent rounded"
          >
            Add Recipe
          </a>
        </li>
        <li>
          <a
            href="/customItems"
            role="button"
            className="transition duration-700 ease-in-out bg-transparent hover:bg-green-200 text-white font-thin hover:text-black py-2 px-4 border border-white hover:border-transparent rounded"
          >
            View Recipes
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
