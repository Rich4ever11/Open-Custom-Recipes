import React, { useState } from "react";

export default function CustomItemCard(props) {
  const { title, imgURL, servings, description, ingredients, instructions } =
    props;

  const [showModal, setShowModal] = useState(false);

  const formatIngredients = () => {
    const ingredientSplitList = ingredients.split(",");
    const formattedIngredients = ingredientSplitList.map((ingredient) =>
      ingredient.replace("{", "").replace("}", "").trim()
    );

    return (
      <tbody className="text-white font-mono">
        {formattedIngredients.map((ingredient, index) => (
          <tr key={index}>
            <td>{ingredient}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="shrink-0">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800/75 dark:border-gray-700">
        <div className="flex justify-center pt-4">
          <h3 className="mb-2 text-4xl font-thin tracking-tight text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>

        <div className="flex justify-center">
          <h4>{servings + " Servings"}</h4>
        </div>

        <a>
          <div className="rounded p-4">
            <img
              className="rounded size-full shadow-2xl shadow-black"
              src={imgURL}
              alt=""
            />
          </div>
        </a>
        <div className="p-5">
          <div className="flex justify-center">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {description}
            </p>
          </div>
          <div className="bg-slate-700 rounded-md m-2">
            <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

            <table className="table-auto">
              <thead>
                <tr className="flex justify-center">
                  <th className="text-white font-mono text-lg">Ingredients</th>
                </tr>
              </thead>

              {formatIngredients()}
            </table>
          </div>

          <div
            data-modal-target="default-modal"
            data-modal-toggle="default-modal"
            className="py-2"
          >
            <a
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
              //   onClick={setShowModal(!showModal)}
              style={{ textShadow: "4px 4px 10px black" }}
            >
              View Details
            </a>{" "}
            <a
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
              //   onClick={setShowModal(!showModal)}
              style={{ textShadow: "4px 4px 10px black" }}
            >
              Instructions
            </a>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
