// app/product/[id]/page.tsx
'use client';

import { getProductById } from "@/lib/products";
import { useCartStore } from "@/lib/store/cart";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import Image from "next/image";
import AddToCartButton from '@/components/AddToCartButton';

// Params type tells us that [id] is coming from the URL
type Props = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: Props) {
  const product = getProductById(params.id);

  // If product not found, show 404
  if (!product) {
    notFound();
  }

  // const addToCart = () => {
  //   useCartStore.getState().addToCart({
  //     id: product.id,
  //     name: product.name,
  //     price: product.price,
  //     image: product.image,
  //   });
  // };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-xl object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-yellow-600 text-xl font-semibold">₹{product.price}</p>
          <p className="text-gray-700">{product.description}</p>
          <AddToCartButton productID={product.id} />
        </div>
      </div>
    </div>
  );
}
