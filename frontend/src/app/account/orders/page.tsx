'use client';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session) return;
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', session.user.id);

      if (!error) setOrders(data);
    };

    fetchOrders();
  }, [session]);

  if (!session) return <p>Please log in to see your orders.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="p-4 border mb-4 rounded">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Total:</strong> ₹{order.total_amount}</p>
          <p><strong>Placed On:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
