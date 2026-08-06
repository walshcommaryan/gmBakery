export const imageMap: { [key: string]: string[] } = {
  "Brioche Caramel Pecan nut": ["/assets/images/product_images/gm_10.png"],
  "Brioche Chocolate Chip": ["/assets/images/product_images/gm_6.png"],
  "Canelés": ["/assets/images/product_images/gm_3a.png", "/assets/images/product_images/gm_3b.png", "/assets/images/product_images/gm_3c.png"],
  "Fondant Chocolat": ["/assets/images/product_images/gm_8a.png", "/assets/images/product_images/gm_8b.png", "/assets/images/product_images/gm_8c.png"],
  "Kouign Amann": ["/assets/images/product_images/gm_5.png"],
  "Lunette Apricot jam": ["/assets/images/product_images/gm_11.png"],
  "Lunette Strawberry Jam": ["/assets/images/product_images/gm_4.png"],
  "Macarons":[ "/assets/images/product_images/gm_2.png"],
  "Madeleines Chocolate Chip": ["/assets/images/product_images/gm_12a.png", "/assets/images/product_images/gm_12b.png"],
  "Madeleines Vanilla": ["/assets/images/product_images/gm_1.png"],
  "Quiche Lorraine": ["/assets/images/product_images/gm_9a.png", "/assets/images/product_images/gm_9b.png"],
  "Tarte au citron meringué": ["/assets/images/product_images/gm_7.png"],
};

// Snapshot of the `products` table taken from the final database dump before the
// ordering API was retired. ProductContext serves this verbatim when ordering is
// disabled so the menu still renders without a backend.
export const staticProducts = [
  { product_id: 1, name: "Brioche Caramel Pecan nut", description: "Rich brioche filled with caramel and toasted pecans.", price: 4.99, pack_size: 1 },
  { product_id: 2, name: "Brioche Chocolate Chip", description: "Fluffy sweet bread.", price: 4.99, pack_size: 1 },
  { product_id: 3, name: "Kouign Amann", description: "Rich buttery pastry with caramel crust.", price: 5.99, pack_size: 1 },
  { product_id: 4, name: "Tarte au citron meringué", description: "Delicious pastry shell with a lemon flavored filling.", price: 6.99, pack_size: 1 },
  { product_id: 5, name: "Fondant Chocolat", description: "Rich molten-centered chocolate cake.", price: 5.99, pack_size: 1 },
  { product_id: 6, name: "Madeleines Vanilla", description: "Soft shell-shaped sponge cakes.", price: 6.99, pack_size: 4 },
  { product_id: 7, name: "Madeleines Chocolate Chip", description: "Soft shell-shaped sponge cakes with chocolate chip bits.", price: 6.99, pack_size: 4 },
  { product_id: 8, name: "Macarons", description: "Sweet almond-based sandwich cookies.", price: 4.99, pack_size: 2 },
  { product_id: 9, name: "Canelés", description: "Crispy caramelized outside, custardy core. Vanilla beans & Rhum.", price: 5.99, pack_size: 3 },
  { product_id: 10, name: "Lunette Strawberry Jam", description: "Oval biscuit filled with strawberry jam.", price: 2.99, pack_size: 1 },
  { product_id: 11, name: "Lunette Apricot jam", description: "Oval biscuit filled with apricot jam.", price: 2.99, pack_size: 1 },
  { product_id: 12, name: "Quiche Lorraine", description: "Savory egg tart.", price: 6.99, pack_size: 1 },
];
