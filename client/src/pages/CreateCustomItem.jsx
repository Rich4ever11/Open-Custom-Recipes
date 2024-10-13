import React, { useState } from "react";
import CustomItemForm from "../components/CustomItemForm";
import "../App.css";

const CreateCustomItem = () => {
  return (
    <div>
      <CustomItemForm formType={0} />
    </div>
  );
};

export default CreateCustomItem;
