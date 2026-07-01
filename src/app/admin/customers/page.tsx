'use client';

import React, { useState, useEffect, FormEvent } from 'react';

interface ICustomer {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function CustomersPage() {

  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);

  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null);

  const fetchCustomers = async () => {
    try {
      setFetching(true);
      const res = await fetch('/api/admin/customers');
      const data = await res.json();

      if (data.success) {
        setCustomers(data.customers);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this customer?');

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/customers?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCustomers((prev) => prev.filter((customer) => customer.id !== id));
        alert('Customer deleted successfully');
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

 return (
    <section className="relative min-h-screen bg-black text-white px-4 md:px-6 py-10 md:py-20">
      {/* ... (Glow divs) ... */}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black">Customer <span className="text-amber-400">Management</span></h1>
          <p className="mt-4 text-zinc-400">View details and manage existing user accounts.</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl overflow-hidden">
          <div className="p-6 md:p-8 border-b border-white/10">
            <h2 className="text-2xl md:text-3xl font-black">Registered Customers</h2>
          </div>

          {/* ... (Loading/Empty states) ... */}

          <div className="overflow-x-auto">
            {/* Desktop Table */}
            <table className="w-full hidden md:table">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 text-xs uppercase">
                  <th className="p-6 text-left">Name</th>
                  <th className="p-6 text-left">Email</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="p-6 font-bold">{c.name}</td>
                    <td className="p-6 text-zinc-300">{c.email}</td>
                    <td className="p-6 text-right space-x-3">
                       {/* Buttons */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-white/10">
              {customers.map((c) => (
                <div key={c.id} className="p-6 flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">{c.name}</span>
                    <span className="text-xs text-zinc-500 uppercase">{c.role}</span>
                  </div>
                  <div className="text-sm text-zinc-400">{c.email}</div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setSelectedCustomer(c)} className="flex-1 rounded-xl bg-white/5 py-2 text-sm font-bold border border-white/10">View</button>
                    <button onClick={() => handleDelete(c.id)} className="flex-1 rounded-xl bg-red-500/10 text-red-500 py-2 text-sm font-bold border border-red-500/20">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}