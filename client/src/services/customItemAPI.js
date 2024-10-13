const getAllCustomItems = async () => {
  try {
    const response = await fetch("/api/customItems");
    const locationData = await response.json();
    return locationData.data;
  } catch {
    return [];
  }
};

export default {
  getAllCustomItems,
};
