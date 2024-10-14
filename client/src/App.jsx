import React from "react";
import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import ViewCustomItems from "./pages/ViewCustomItems";
import EditCustomItem from "./pages/EditCustomItem";
import CreateCustomItem from "./pages/CreateCustomItem";
import CustomItemDetails from "./pages/CustomItemDetails";
import "./App.css";

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <CreateCustomItem title="Recipe And Go | Customize" />,
    },
    {
      path: "/customItems",
      element: <ViewCustomItems title="BOLT BUCKET | Custom Cars" />,
    },
    {
      path: "/customItems/:id",
      element: <CustomItemDetails title="BOLT BUCKET | View" />,
    },
    {
      path: "/edit/:id",
      element: <EditCustomItem title="BOLT BUCKET | Edit" />,
    },
  ]);

  return (
    <div className="app">
      <Navigation />

      {element}
    </div>
  );
};

export default App;
