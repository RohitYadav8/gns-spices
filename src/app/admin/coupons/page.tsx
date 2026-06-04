'use client';

import React, { useState, useEffect, FormEvent } from 'react';

interface ICoupon {
  _id: string;
  code: string;
  discount: number;
  expiryDate: string;
  createdAt?: string;
}

export default function CouponPage() {
  const [code, setCode] = useState<string>('');
  const [discount, setDiscount] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');

  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);

  const fetchCoupons = async () => {
    try {
      setFetching(true);

      const res = await fetch('/api/admin/coupons');
      const text = await res.text();

      if (!text) {
        setCoupons([]);
        return;
      }

      const data = JSON.parse(text);

      if (res.ok) {
        setCoupons(data.coupons || (Array.isArray(data) ? data : []));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!code || !discount || !expiryDate) {
      return alert('Please fill all fields!');
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.toUpperCase().trim(),
          discount: Number(discount),
          expiryDate,
        }),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (res.ok) {
        alert('Coupon created successfully!');

        setCode('');
        setDiscount('');
        setExpiryDate('');
        fetchCoupons();
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this coupon?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/coupons?id=${id}`, {
        method: 'DELETE',
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (res.ok) {
        setCoupons((prev) => prev.filter((c) => c._id !== id));
        alert('Coupon deleted successfully');
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

 return (
    <section className="relative overflow-hidden min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,#7c1d12,transparent_45%)] opacity-70" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 relative z-10">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black">
            Coupon <span className="text-amber-400">Management</span>
          </h1>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-zinc-300 max-w-2xl leading-8">
            Create, manage, and monitor discount coupons for your store.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORM */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 md:p-8 h-fit">
            <h2 className="text-2xl font-bold mb-6">Create Coupon</h2>
            <form onSubmit={handleCreateCoupon} className="space-y-5">
              <input type="text" placeholder="FESTIVE50" value={code} onChange={(e) => setCode(e.target.value)} className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none focus:border-amber-400" required />
              <input type="number" placeholder="20" value={discount} onChange={(e) => setDiscount(e.target.value)} className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none focus:border-amber-400" required />
              <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none focus:border-amber-400" required />
              <button type="submit" disabled={loading} className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold py-4">
                {loading ? 'Creating...' : 'Create Coupon'}
              </button>
            </form>
          </div>

          {/* TABLE */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold">Active Coupons</h2>
            </div>

            {fetching ? (
              <div className="p-10 text-zinc-400">Loading...</div>
            ) : coupons.length === 0 ? (
              <div className="p-10 text-zinc-400">No coupons found</div>
            ) : (
              <>
                {/* Desktop Table */}
                <table className="w-full text-left hidden md:table">
                  <thead className="text-zinc-400 text-sm">
                    <tr className="border-b border-white/10">
                      <th className="p-5">Code</th>
                      <th className="p-5">Discount</th>
                      <th className="p-5">Expiry</th>
                      <th className="p-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((c) => (
                      <tr key={c._id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-5"><span className="px-4 py-2 rounded-full border border-zinc-700 bg-black text-sm font-bold">{c.code}</span></td>
                        <td className="p-5 text-amber-400 font-bold">{c.discount}%</td>
                        <td className="p-5 text-zinc-400">{new Date(c.expiryDate).toLocaleDateString('en-IN')}</td>
                        <td className="p-5 text-right"><button onClick={() => handleDelete(c._id)} className="px-4 py-2 rounded-full border border-zinc-700 hover:border-amber-400 hover:text-amber-400 transition">Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Mobile List View */}
                <div className="md:hidden divide-y divide-white/10">
                  {coupons.map((c) => (
                    <div key={c._id} className="p-5 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-lg">{c.code}</div>
                        <div className="text-amber-400 text-sm">{c.discount}% Off</div>
                        <div className="text-zinc-500 text-xs">Expires: {new Date(c.expiryDate).toLocaleDateString('en-IN')}</div>
                      </div>
                      <button onClick={() => handleDelete(c._id)} className="px-3 py-1 text-sm rounded-lg border border-zinc-700 hover:border-red-500 hover:text-red-500 transition">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}