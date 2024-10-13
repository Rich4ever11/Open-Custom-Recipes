const getAllCustomItems = async () => {
  try {
    const response = await fetch("/api/customItems");
    const locationData = await response.json();
    return locationData.data;
  } catch {
    return [];
  }
};

const getCustomItemById = async (id) => {
  try {
    const response = await fetch(`/api/customItems/${id}`);
    const locationData = await response.json();
    return locationData.data;
  } catch {
    return [];
  }
};

const createCustomItem = async (customItem) => {
  try {
    const response = await fetch("/api/customItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customItem),
    });
    return { result: "success" };
  } catch {
    return { result: "error" };
  }
};

const updateCustomItem = async (customItem, id) => {
  try {
    const response = await fetch(`/api/customItems/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customItem),
    });
    return { result: "success" };
  } catch {
    return { result: "error" };
  }
};

const removeNewCustomItem = async (id) => {
  try {
    const response = await fetch(`/api/customItems/${id}`, {
      method: "DELETE",
    });
    return { result: "success" };
  } catch {
    return { result: "error" };
  }
};

export default {
  getAllCustomItems,
  getCustomItemById,
  createCustomItem,
  updateCustomItem,
  removeNewCustomItem,
};
