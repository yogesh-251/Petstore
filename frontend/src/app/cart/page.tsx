'use client';

import { useCartStore } from '@/lib/store/cart';
import Image from 'next/image';
import Link from 'next/link';
// import Button from "@/components/Button";
import { useRouter } from 'next/navigation';


export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCartStore();

  const router = useRouter();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
        <Link href="/" className="text-teal-600 underline">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4 items-center">
            <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p>₹{item.price} × {item.quantity}</p>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:underline">
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="text-xl font-bold">
        Total: ₹{total}
      </div>
      
      <div className="flex gap-4">
        <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Clear Cart
        </button>
        <button 
          onClick={() => router.push('/checkout')}
          className=" bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition">
          Checkout
        </button>
        {/* <Button label='Checkout' className="px-4 py-2 rounded-lg"/> */}
      </div>
    </div>
  );
}
