import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 h-screen p-4">
        <ul className="space-y-2">
          <li>Dashboard</li>
          <li>Products</li>
          <li>Orders</li>
        </ul>
      </aside>
      <main className="p-6 flex-1">{children}</main>
    </div>
  );
}
