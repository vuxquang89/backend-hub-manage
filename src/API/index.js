export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};
