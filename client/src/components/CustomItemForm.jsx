import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { veganCheckList } from "../data/veganCheckList";
import { LuVegan } from "react-icons/lu";
import PropTypes from "prop-types";
import customItemAPI from "../services/customItemAPI";

function CustomItemForm(props) {
  const navigate = useNavigate();
  const {
    id,
    title,
    servings,
    description,
    imgurl,
    preparationTime,
    instructions,
    ingredients,
    vegan,
    formType,
  } = props;

  const [recipeImageURL, setRecipeImageURL] = useState(
    imgurl ||
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFzYWduYXxlbnwwfHwwfHx8MA%3D%3D"
  );
  const [recipeTitle, setRecipeTitle] = useState(title || "");
  const [recipeServings, setRecipeServings] = useState(servings || "");
  const [recipePreparationTime, setRecipePreparationTime] = useState(
    preparationTime || ""
  );
  const [recipeDescription, setRecipeDescription] = useState(description || "");
  const [recipeInstructions, setRecipeInstructions] = useState(
    instructions || [""]
  );
  const [recipeIngredients, setRecipeIngredients] = useState(
    ingredients || [""]
  );
  const [recipeVegan, setRecipeVegan] = useState(vegan || 0);

  const handleAddInstruction = (event) => {
    event.preventDefault();
    setRecipeInstructions([...recipeInstructions, ""]);
  };

  const handleSingleInstructionUpdate = (index, newValue) => {
    const newRecipeInstructionsArray = [...recipeInstructions];
    newRecipeInstructionsArray[index] = newValue;
    setRecipeInstructions(newRecipeInstructionsArray);
  };

  const handleAddIngredient = (event) => {
    event.preventDefault();
    setRecipeIngredients([...recipeIngredients, ""]);
  };

  const handleSingleIngredientUpdate = (index, newValue) => {
    const newRecipeIngredientsArray = [...recipeIngredients];
    newRecipeIngredientsArray[index] = newValue;
    setRecipeIngredients(newRecipeIngredientsArray);
  };

  const convertListToString = (arrayValue) => {
    return "{" + arrayValue.join(",") + "}";
  };

  const verifyVeganRecipe = () => {
    // Check name
    const recipeNameSplit = recipeTitle.split();
    const recipeNameIntersection = recipeNameSplit.filter((section) =>
      veganCheckList.includes(section)
    );

    if (recipeNameIntersection.length) {
      return false;
    }

    // check description
    const recipeDescriptionSplit = recipeTitle.split();
    const recipeDescriptionIntersection = recipeDescriptionSplit.filter(
      (section) => veganCheckList.includes(section)
    );

    if (recipeDescriptionIntersection.length) {
      return false;
    }

    // check Recipe Instructions
    const instructionStringList = convertListToString(recipeIngredients);
    const recipeInstructionIntersection = veganCheckList.filter((section) =>
      instructionStringList.includes(section)
    );

    if (recipeInstructionIntersection.length) {
      return false;
    }

    // check Recipe Ingredients
    const ingredientsStringList = convertListToString(recipeIngredients);
    const recipeIngredientsIntersection = veganCheckList.filter((section) =>
      ingredientsStringList.includes(section)
    );

    if (recipeIngredientsIntersection.length) {
      return false;
    }

    return true;
  };

  const handleCreateItem = async (event) => {
    event.preventDefault();
    const customItemData = {
      title: recipeTitle,
      description: recipeDescription,
      imgURL: recipeImageURL,
      vegan: recipeVegan,
      preparationTime: recipePreparationTime,
      servings: recipeServings,
      ingredients: convertListToString(recipeIngredients),
      instructions: convertListToString(recipeInstructions),
    };
    switch (formType) {
      case 0:
        const createResponse = await customItemAPI.createCustomItem(
          customItemData
        );
      case 1:
        const updateResponse = await customItemAPI.updateCustomItem(
          customItemData,
          id
        );
      default:
        console.log(customItemData);
    }
    navigate("/customItems");
  };

  const handleRecipeTypeChange = (event) => {
    const value = event.target.value;
    setRecipeVegan(value);
    verifyVeganRecipe();
  };

  const handleRecipeDeletion = async (event) => {
    event.preventDefault();
    if (id) {
      const response = await customItemAPI.removeNewCustomItem(id);
      navigate("/customItems");
    }
  };

  return (
    <div>
      <form
        className="m-8 p-8 bg-black/90 rounded-lg"
        onSubmit={handleCreateItem}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex">
              <h2 className="font-semibold leading-7 text-white text-3xl">
                {formType === 0 ? "Create Recipe" : `Edit Recipe - ${title}`}
              </h2>
              {verifyVeganRecipe() === false && recipeVegan == 1 && (
                <LuVegan className="ml-2" color={"green"} size={36} />
              )}
            </div>

            <p className="mt-1 text-lg leading-6 text-slate-50 py-2">
              Please feel free to share your favorite recipes from your family
              classics to simple dishes. This website is your oyster
            </p>

            <div className="bg-black/50 flex justify-center rounded-lg">
              <img
                className="object-cover h-72 w-96"
                src={recipeImageURL}
                alt=""
              />
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="recipeTitle"
                  className="block text-2xl font-medium leading-6 text-gray-50"
                >
                  Recipe Title
                </label>
                <div className="mt-4">
                  <input
                    type="text"
                    name="recipeTitle"
                    id="recipeTitle"
                    autoComplete="recipeTitle"
                    className="block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-50"
                    placeholder="Recipe Title"
                    value={recipeTitle}
                    onChange={(event) => setRecipeTitle(event.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="recipeImageURL"
                  className="block text-2xl font-medium leading-6 text-gray-50"
                >
                  Recipe ImageURL
                </label>
                <div className="mt-4">
                  <input
                    type="text"
                    name="recipeImageURL"
                    id="recipeImageURL"
                    autoComplete="recipeImageURL"
                    className="block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-50"
                    placeholder="Recipe Title"
                    value={recipeImageURL}
                    onChange={(event) => setRecipeImageURL(event.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 col-span-full">
                <div className="col-span-2 ">
                  <label
                    htmlFor="recipeServings"
                    className="block text-2xl font-medium leading-6 text-gray-50"
                  >
                    Recipe Servings
                  </label>
                  <div className="mt-4">
                    <input
                      type="text"
                      name="recipeServings"
                      id="recipeServings"
                      className="block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-50"
                      placeholder="2"
                      value={recipeServings}
                      onChange={(event) =>
                        setRecipeServings(event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="col-span-2 ">
                  <label
                    htmlFor="recipePreparationTime"
                    className="block text-2xl font-medium leading-6 text-gray-50"
                  >
                    Recipe Preparation Time
                  </label>
                  <div className="mt-4">
                    <input
                      type="number"
                      name="recipePreparationTime"
                      id="recipePreparationTime"
                      autoComplete="recipePreparationTime"
                      className="block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-50"
                      placeholder="3600"
                      min={0}
                      value={recipePreparationTime}
                      onChange={(event) =>
                        setRecipePreparationTime(event.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="recipeDescription"
                  className="block text-2xl font-medium leading-6 text-gray-50"
                >
                  Recipe Description
                </label>
                <div className="mt-4">
                  <textarea
                    id="recipeDescription"
                    name="recipeDescription"
                    rows="3"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-50 p-2 text-sm"
                    value={recipeDescription}
                    onChange={(event) =>
                      setRecipeDescription(event.target.value)
                    }
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-4 col-span-full">
                <div className="col-span-2 ">
                  <label
                    htmlFor="recipeInstructions"
                    className="block text-2xl font-medium leading-6 text-gray-50"
                  >
                    Recipe Instructions
                  </label>
                  <div className="mt-4">
                    {recipeInstructions.map((instruction, index) => (
                      <input
                        key={index}
                        type="text"
                        name="recipeInstructions"
                        id="recipeInstructions"
                        className="block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-50"
                        placeholder={"Instruction " + (index + 1)}
                        value={instruction}
                        onChange={(event) =>
                          handleSingleInstructionUpdate(
                            index,
                            event.target.value
                          )
                        }
                      />
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="p-2 items-center text-center text-white bg-slate-700 rounded-lg hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 bg-transparent max-w-48 text-xl font-thin hover:text-white  border border-blue-50 hover:border-transparent"
                      onClick={handleAddInstruction}
                    >
                      Add Instruction
                    </button>
                  </div>
                </div>

                <div className="col-span-2 ">
                  <label
                    htmlFor="recipeIngredients"
                    className="block text-2xl font-medium leading-6 text-gray-50"
                  >
                    Recipe Ingredients
                  </label>
                  <div className="mt-4">
                    {recipeIngredients.map((ingredient, index) => (
                      <input
                        key={index}
                        type="text"
                        name="recipeIngredient"
                        id="recipeIngredient"
                        className="block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-50"
                        placeholder={"Ingredient " + (index + 1)}
                        value={ingredient}
                        onChange={(event) =>
                          handleSingleIngredientUpdate(
                            index,
                            event.target.value
                          )
                        }
                      />
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="p-2 items-center text-center text-white bg-slate-700 rounded-lg hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 bg-transparent max-w-48 text-xl font-thin hover:text-white  border border-blue-50 hover:border-transparent"
                      onClick={handleAddIngredient}
                    >
                      Add Ingredient
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div class="max-w-sm mx-auto py-4">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Vegan?
                </label>
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleRecipeTypeChange}
                  value={recipeVegan}
                >
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="m-2 p-2 items-center text-center text-white bg-slate-700 rounded-lg hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 bg-transparent max-w-48 text-xl font-thin hover:text-white  border border-blue-50 hover:border-transparent"
                disabled={verifyVeganRecipe() === false && recipeVegan == 1}
              >
                {formType === 0 ? "Add Recipe" : "Update Recipe"}
              </button>

              {formType == 1 && (
                <button
                  className="m-2 p-2 items-center text-center text-white bg-slate-700 rounded-lg hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 bg-transparent max-w-48 text-xl font-thin hover:text-white  border border-blue-50 hover:border-transparent"
                  onClick={handleRecipeDeletion}
                >
                  Remove Recipe
                </button>
              )}
            </div>
            <div className="flex justify-center">
              {verifyVeganRecipe() === false && recipeVegan == 1 && (
                <p>{"Recipe is not vegan :("}</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

CustomItemForm.propTypes = {};

export default CustomItemForm;
