// components/ProductCard.tsx

import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import AddToCartButton from '@/components/AddToCartButton';

type ProductCardProps = {
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ name, price, image}: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <Link href={`/product/${name.toLowerCase().replace(/ /g, "-")}`}> 
        <div>     
          <Image
          src={image} // Must be a string (or RemotePattern with loader)
          alt={name}
          width={400} // Required in Next.js
          height={192} // e.g. height based on h-48 (48 * 4 = 192px)
          className="w-full h-48 object-cover rounded-md mb-4"
          style={{ width: '100%', height: '12rem' }} // Ensures layout is consistent
          />
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-yellow-600 font-medium">₹{price}</p>
        </div>  
      </Link>
      <AddToCartButton productID={name.toLowerCase().replace(/ /g, "-")}/>
    </div>
  );
}
