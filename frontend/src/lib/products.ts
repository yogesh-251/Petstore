// lib/products.ts

export const products = [
  {
    id: "hoodie",
    name: "Hoodie",
    price: 999,
    description: "A cozy and stylish hoodie for your pup.",
    image: "/hoodie.jpg"
  },
  {
    id: "tshirt",
    name: "TShirt",
    price: 799,
    description: "Lightweight and adorable shirt for your cat.",
    image: "/tshirt.jpg"
  },
  {
    id: "raincoat",
    name: "Raincoat",
    price: 1199,
    description: "Keep your pet dry with this water-resistant raincoat.",
    image: "/raincoat.jpg"
  }
];

// Function to find a product by ID
export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
