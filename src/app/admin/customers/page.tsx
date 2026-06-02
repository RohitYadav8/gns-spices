'use client';

import React, { useState, useEffect, FormEvent } from 'react';

interface ICustomer {
  _id: string;
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
        setCustomers((prev) => prev.filter((customer) => customer._id !== id));
        alert('Customer deleted successfully');
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen bg-black text-white">

      {/* AMBER GLOW */}
      <div className="absolute top-0 left-0 w-125 h-125 bg-amber-500/10 blur-[140px] pointer-events-none" />

      {/* AMBER GLOW */}
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-amber-400/10 blur-[160px] pointer-events-none" />

      {/* MODAL */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl p-8">

            <h3 className="text-2xl font-black mb-6">Customer Details</h3>

            <div className="space-y-4">
              <p className="text-xs text-zinc-400">ID</p>
              <p className="text-sm font-semibold">{selectedCustomer._id}</p>

              <p className="text-xs text-zinc-400">Name</p>
              <p className="text-lg font-bold">{selectedCustomer.name}</p>

              <p className="text-xs text-zinc-400">Email</p>
              <p className="text-lg font-bold text-amber-400">{selectedCustomer.email}</p>

              <p className="text-xs text-zinc-400">Role</p>
              <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-black uppercase">
                {selectedCustomer.role}
              </span>

              <p className="text-xs text-zinc-400">Joined</p>
              <p className="text-sm font-semibold">
                {new Date(selectedCustomer.createdAt).toLocaleString('en-IN')}
              </p>
            </div>

            <button
              onClick={() => setSelectedCustomer(null)}
              className="mt-8 w-full rounded-full bg-amber-500 text-black py-3 font-black hover:bg-amber-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

        {/* HEADING */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black leading-tight">
            Customer <span className="text-amber-400">Management</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl leading-8">
            View details and manage existing user accounts.
          </p>
        </div>

        {/* TABLE */}
        <div className="rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl overflow-hidden">

          <div className="p-8 border-b border-white/10">
            <h2 className="text-3xl font-black">Registered Customers</h2>
          </div>

          {fetching ? (
            <div className="p-12 text-center text-zinc-400">Loading...</div>
          ) : customers.length === 0 ? (
            <div className="p-12 text-center text-zinc-400">No customers found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">

                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-6 text-left text-xs uppercase tracking-widest text-zinc-400">
                      Name
                    </th>
                    <th className="p-6 text-left text-xs uppercase tracking-widest text-zinc-400">
                      Email
                    </th>
                    <th className="p-6 text-right text-xs uppercase tracking-widest text-zinc-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer._id} className="border-b border-white/10 hover:bg-white/5">

                      <td className="p-6 font-bold">{customer.name}</td>

                      <td className="p-6 text-zinc-300">{customer.email}</td>

                      <td className="p-6 text-right space-x-3">

                        <button
                          onClick={() => setSelectedCustomer(customer)}
                          className="rounded-full border border-white/10 bg-white/5 hover:bg-amber-500 hover:text-black px-5 py-2 text-sm font-black transition"
                        >
                          View
                        </button>

                        <button
                          onClick={() => handleDelete(customer._id)}
                          className="rounded-full border border-white/10 bg-white/5 hover:bg-red-500 hover:text-white px-5 py-2 text-sm font-black transition"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}