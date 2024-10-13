import React, { useEffect, useState } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import customItemAPI from "../services/customItemAPI";
import { useNavigate } from "react-router-dom";
import CustomItemForm from "../components/CustomItemForm";

const EditCustomItem = () => {
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

  return (
    <div>
      {customItem && (
        <CustomItemForm
          id={customItem.id}
          title={customItem.title}
          servings={customItem.servings}
          imgurl={customItem.imgurl}
          description={customItem.description}
          preparationTime={customItem.preparationtime}
          instructions={customItem.instructions}
          ingredients={customItem.ingredients}
          formType={1}
        />
      )}
    </div>
  );
};

export default EditCustomItem;
