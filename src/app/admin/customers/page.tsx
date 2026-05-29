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
  
  // State for View Details Modal
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null);

  // FETCH CUSTOMERS
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

  // DELETE CUSTOMER
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
    <section className="relative overflow-hidden min-h-screen bg-[#FFF6DE] text-[#332D20]">
      {/* CYAN GLOW */}
      <div className="absolute top-0 left-0 w-125 h-125 bg-[#8BDFDD]/20 blur-[140px] pointer-events-none" />

      {/* ORANGE GLOW */}
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-[#F48F68]/10 blur-[160px] pointer-events-none" />

      {/* MODAL FOR VIEW DETAILS */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-4xl border border-[#FFE394] bg-white/90 backdrop-blur-xl shadow-2xl p-8 relative overflow-hidden">
            <h3 className="text-2xl font-black mb-6">Customer Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[2px] text-[#332D20]/60 font-bold mb-1">ID</p>
                <p className="text-sm font-semibold">{selectedCustomer._id}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[2px] text-[#332D20]/60 font-bold mb-1">Name</p>
                <p className="text-lg font-bold">{selectedCustomer.name}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[2px] text-[#332D20]/60 font-bold mb-1">Email</p>
                <p className="text-lg font-bold text-[#F48F68]">{selectedCustomer.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[2px] text-[#332D20]/60 font-bold mb-1">Role</p>
                <span className="inline-block rounded-full border border-[#FFE394] bg-white/20 px-4 py-1 text-xs font-black uppercase text-[#332D20]">
                  {selectedCustomer.role}
                </span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[2px] text-[#332D20]/60 font-bold mb-1">Joined Date</p>
                <p className="text-sm font-semibold">
                  {new Date(selectedCustomer.createdAt).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedCustomer(null)}
              className="mt-8 w-full rounded-full bg-[#332D20] text-white py-3 font-black transition-all duration-300 hover:bg-[#F48F68]"
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
            Customer
            <span className="text-[#F48F68]"> Management</span>
          </h1>
          <p className="mt-6 text-lg text-[#332D20]/70 max-w-2xl leading-8">
            View details and manage existing user accounts.
          </p>
        </div>

        {/* TABLE */}
        <div className="w-full">
          <div className="rounded-4xl border border-[#FFE394] bg-white/70 backdrop-blur-xl shadow-2xl overflow-hidden relative">
            {/* ORANGE GLOW */}
            <div className="absolute top-0 right-0 w-65 h-65 bg-[#F48F68]/10 blur-[120px]" />

            <div className="relative z-10">
              {/* HEADER */}
              <div className="p-8 border-b border-[#FFE394]/50">
                <h2 className="text-3xl font-black">Registered Customers</h2>
              </div>

              {/* LOADING */}
              {fetching ? (
                <div className="p-12 text-center font-semibold text-[#332D20]/60">
                  Loading customers...
                </div>
              ) : customers.length === 0 ? (
                <div className="p-12 text-center font-semibold text-[#332D20]/60">
                  No registered customers found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#FFE394]/40">
                        <th className="p-6 text-left uppercase tracking-[4px] text-xs text-[#332D20]/60">
                          Name
                        </th>
                        <th className="p-6 text-left uppercase tracking-[4px] text-xs text-[#332D20]/60">
                          Email
                        </th>
                        <th className="p-6 text-right uppercase tracking-[4px] text-xs text-[#332D20]/60">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr
                          key={customer._id}
                          className="border-b border-[#FFE394]/30 hover:bg-white/20 transition-all"
                        >
                          {/* NAME */}
                          <td className="p-6 font-bold">{customer.name || 'N/A'}</td>

                          {/* EMAIL */}
                          <td className="p-6 text-[#332D20]/80">{customer.email}</td>

                          {/* ACTIONS */}
                          <td className="p-6 text-right space-x-3">
                            <button
                              onClick={() => setSelectedCustomer(customer)}
                              className="rounded-full border border-[#8BDFDD] bg-[#8BDFDD]/10 hover:bg-[#8BDFDD] hover:text-[#332D20] px-5 py-2 text-sm font-black transition-all duration-300"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDelete(customer._id)}
                              className="rounded-full border border-[#FFE394] bg-white/20 hover:bg-red-500 hover:text-white px-5 py-2 text-sm font-black transition-all duration-300"
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
        </div>
      </div>
    </section>
  );
}
