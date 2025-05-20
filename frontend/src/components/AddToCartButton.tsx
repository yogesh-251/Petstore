'use client';

import Button from '@/components/Button'; 
import { useCartStore } from "@/lib/store/cart";
import { getProductById } from "@/lib/products";

type Props = {
  productID: string;
};

export default function AddToCartButton({ productID }: Props) {
  const product = getProductById(productID);

  const addToCart = () => {
    useCartStore.getState().addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <Button label="Add to Cart" onClick={addToCart} />
  );
}
