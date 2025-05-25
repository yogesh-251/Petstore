// app/page.tsx

// Importing React is optional in Next.js 13+ (App Router), but including for clarity.
import React from 'react';
import ProductCard from "@/components/ProductCard";
import { supabase } from '@/lib/supabase/client';
// import Image from 'next/image';

// This is a server component (by default). It returns JSX, the UI structure.
export default async function HomePage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*');
  // console.log('All prods', products)

  if (error) return <div>Failed to load products</div>;

  return (
    <div className="flex flex-col gap-16 p-6 md:p-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-500">
          Welcome to Petwear
        </h1>
        <p className="text-lg text-gray-700">
          Fashionable clothing and accessories for your pets!
        </p>
      </section>

      {/* Featured Products Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-black">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Sample product cards */}
          {products.map((product: any) => (
            <div key={product.id}>
              <ProductCard name={product.name}  price={product.price / 100} image={product.image} />
              {/* <ProductCard name="TShirt" price={799} image="/tshirt.jpg" />
              <ProductCard name="Raincoat" price={1199} image="/raincoat.jpg" /> */}
            </div>))}
        </div>
        {/* <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <div key={product.id} className="border p-4 rounded">
              <Image 
                src={product.image} 
                alt={product.name} 
                width={400}
                height={192}
                className="w-full h-48 object-cover rounded" 
                style={{ width: '100%', height: '12rem' }}
                />
              <h2 className="text-lg font-bold mt-2">{product.name}</h2>
              <p className="text-sm">{product.description}</p>
              <p className="mt-1 font-semibold text-teal-700">₹{product.price / 100}</p>
            </div>
          ))}
        </div> */}
      </section>
    </div>
  );
}
