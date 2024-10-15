import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customItemAPI from "../services/customItemAPI";
import { useNavigate } from "react-router-dom";
import "../App.css";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customItem, setCustomItem] = useState(undefined);
  useEffect(() => {
    const getCustomItem = async () => {
      const customItem = await customItemAPI.getCustomItemById(id);
      if (customItem === undefined || customItem.length == 0) {
        navigate("/");
      }
      setCustomItem(customItem[0]);
      console.log(customItem);
    };
    getCustomItem();
  }, []);
  //   id={customItem.id}
  //   title={customItem.title}
  //   servings={customItem.servings}
  //   imgurl={customItem.imgurl}
  //   description={customItem.description}
  //   preparationTime={customItem.preparationtime}
  //   instructions={customItem.instructions}
  //   ingredients={customItem.ingredients}

  const formatArray = (array) => {
    if (array.constructor === Array) {
      return (
        <tbody className="text-white font-mono">
          {array.map((element, index) => (
            <tr key={index}>
              <td>{element}</td>
            </tr>
          ))}
        </tbody>
      );
    }

    const arraySplitList = array.split(",");
    const formattedArray = arraySplitList.map((element) =>
      element.replace("{", "").replace("}", "").trim()
    );

    return (
      <tbody className="text-white font-mono">
        {formattedArray.map((element, index) => (
          <tr key={index}>
            <td>{element}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  const handleCountDownFunctionality = (seconds) => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + seconds * 1000);

    const diff = futureDate - now;

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSeconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${minutes} minutes ${remainingSeconds} seconds`;
  };

  return (
    <div>
      {customItem && (
        <div>
          <div className="bg-slate-800/75 m-20 p-6 rounded-lg">
            <div className="flex flex-row">
              <div className="basis-1/2">
                <div>
                  <h1 className="font-white font-thin text-6xl py-2">
                    {customItem.title}
                  </h1>
                  <p className="font-thin text-slate-100 text-xl py-2">
                    {"Serving Size: " + customItem.servings}
                  </p>

                  <p className="font-thin text-slate-100 text-xl pb-2">
                    {"Preparation Time: " +
                      handleCountDownFunctionality(customItem.preparationtime)}
                  </p>
                </div>

                <div>
                  <p className="font-thin text-slate-300 text-xl">
                    {customItem.description}
                  </p>
                </div>

                <div className="max-full">
                  <table className="table-auto">
                    <thead>
                      <tr className="flex justify-center">
                        <th className="text-white font-mono text-lg">
                          Ingredients
                        </th>
                      </tr>
                    </thead>

                    {formatArray(customItem.ingredients)}
                  </table>
                </div>

                <div className="max-full">
                  <table className="table-auto">
                    <thead>
                      <tr className="flex justify-center">
                        <th className="text-white font-mono text-lg">
                          Directions
                        </th>
                      </tr>
                    </thead>

                    {formatArray(customItem.instructions)}
                  </table>
                </div>
              </div>
              <div className="rounded basis-1/2 p-8">
                <img
                  className="rounded size-full shadow-2xl shadow-black object-cover"
                  src={customItem.imgurl}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
