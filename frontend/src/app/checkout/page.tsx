'use client';

import { useCartStore } from '@/lib/store/cart';
import { useEffect } from 'react';
import axios from 'axios';

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const loadRazorpayScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const placeOrder = async (items: any[], totalAmount: number) => {
    try {
      const response = await axios.post('/api/place-order', {
        items,
        totalAmount,
      });

      console.log('Order Success:', response.data);
    } catch (err: any) {
      console.error('Order failed:', err.response?.data || err.message);
    }
  };

  const handleCheckout = async () => {
    const order = await axios.post('/api/razorpay/order', {
      amount: total * 100, // Razorpay uses paise
    });

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: order.data.amount,
      currency: 'INR',
      name: 'Petwear',
      description: 'Order Payment',
      order_id: order.data.id,
      handler: async function (response: any) {
        alert('Payment successful!');
        await placeOrder(items, total);
        clearCart();
        window.location.href = '/success';
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#0097A7',
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  if (items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p>Total: ₹{total}</p>
      <button
        onClick={handleCheckout}
        className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg"
      >
        Pay Now
      </button>
    </div>
  );
}
