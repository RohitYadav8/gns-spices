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

  // FETCH COUPONS
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

  // CREATE COUPON
  const handleCreateCoupon = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!code || !discount || !expiryDate) {
      return alert('Saari fields bharein!');
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code.toUpperCase().trim(),
          discount: Number(discount),
          expiryDate,
        }),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (res.ok) {
        alert('Coupon kamyabi se ban gaya!');

        setCode('');
        setDiscount('');
        setExpiryDate('');

        fetchCoupons();
      } else {
        alert(data.message || 'Kuch gadbad hui');
      }
    } catch (error) {
      console.error(error);
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  // DELETE COUPON
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      'Kya aap is coupon ko delete karna chahte hain?'
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `/api/admin/coupons?id=${id}`,
        {
          method: 'DELETE',
        }
      );

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (res.ok) {
        setCoupons((prev) =>
          prev.filter((coupon) => coupon._id !== id)
        );

        alert('Coupon delete ho gaya');
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

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

        {/* HEADING */}
        <div className="mb-12">

          
          <h1 className="text-5xl md:text-6xl font-black leading-tight">
            Coupon
            <span className="text-[#F48F68]">
              {' '}Management
            </span>
          </h1>

          <p className="mt-6 text-lg text-[#332D20]/70 max-w-2xl leading-8">
            Create, manage, and monitor your store discount
            coupons with premium glassmorphism UI.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* LEFT FORM */}
          <div
            className="
              rounded-4xl
              border
              border-[#FFE394]
              bg-white/70
              backdrop-blur-xl
              shadow-2xl
              p-8
              relative
              overflow-hidden
            "
          >

            {/* INNER GLOW */}
            <div className="absolute top-0 left-0 w-55 h-55 bg-[#8BDFDD]/20 blur-[100px]" />

            <div className="relative z-10">

              <h2 className="text-3xl font-black mb-8">
                Create Coupon
              </h2>

              <form
                onSubmit={handleCreateCoupon}
                className="space-y-6"
              >

                {/* CODE */}
                <div>
                  <label className="block uppercase tracking-[4px] text-xs font-black text-[#332D20]/60 mb-3">
                    Coupon Code
                  </label>

                  <input
                    type="text"
                    placeholder="FESTIVE50"
                    value={code}
                    onChange={(e) =>
                      setCode(e.target.value)
                    }
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-[#FFE394]
                      bg-white/20
                      backdrop-blur-xl
                      px-5
                      py-4
                      text-sm
                      font-bold
                      outline-none
                      focus:border-[#F48F68]
                      transition-all
                    "
                    required
                  />
                </div>

                {/* DISCOUNT */}
                <div>
                  <label className="block uppercase tracking-[4px] text-xs font-black text-[#332D20]/60 mb-3">
                    Discount %
                  </label>

                  <input
                    type="number"
                    placeholder="20"
                    min="1"
                    max="100"
                    value={discount}
                    onChange={(e) =>
                      setDiscount(e.target.value)
                    }
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-[#FFE394]
                      bg-white/20
                      backdrop-blur-xl
                      px-5
                      py-4
                      text-sm
                      font-bold
                      outline-none
                      focus:border-[#F48F68]
                      transition-all
                    "
                    required
                  />
                </div>

                {/* DATE */}
                <div>
                  <label className="block uppercase tracking-[4px] text-xs font-black text-[#332D20]/60 mb-3">
                    Expiry Date
                  </label>

                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) =>
                      setExpiryDate(e.target.value)
                    }
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-[#FFE394]
                      bg-white/20
                      backdrop-blur-xl
                      px-5
                      py-4
                      text-sm
                      font-bold
                      outline-none
                      focus:border-[#F48F68]
                      transition-all
                    "
                    required
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    rounded-full
                    bg-[#F48F68]
                    hover:bg-[#332D20]
                    text-white
                    py-4
                    font-black
                    transition-all
                    duration-500
                    shadow-xl
                    hover:scale-[1.02]
                    disabled:opacity-50
                  "
                >
                  {loading
                    ? 'Creating...'
                    : 'Create Coupon'}
                </button>

              </form>

            </div>

          </div>

          {/* RIGHT TABLE */}
          <div
            className="
              lg:col-span-2
              rounded-4xl
              border
              border-[#FFE394]
              bg-white/70
              backdrop-blur-xl
              shadow-2xl
              overflow-hidden
              relative
            "
          >

            {/* ORANGE GLOW */}
            <div className="absolute top-0 right-0 w-65 h-65 bg-[#F48F68]/10 blur-[120px]" />

            <div className="relative z-10">

              {/* HEADER */}
              <div className="p-8 border-b border-[#FFE394]/50">

                <h2 className="text-3xl font-black">
                  Active Coupons
                </h2>

              </div>

              {/* LOADING */}
              {fetching ? (
                <div className="p-12 text-center font-semibold text-[#332D20]/60">
                  Coupons load ho rahe hain...
                </div>
              ) : coupons.length === 0 ? (
                <div className="p-12 text-center font-semibold text-[#332D20]/60">
                  Koi active coupons nahi hain.
                </div>
              ) : (
                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead>
                      <tr className="border-b border-[#FFE394]/40">

                        <th className="p-6 text-left uppercase tracking-[4px] text-xs text-[#332D20]/60">
                          Code
                        </th>

                        <th className="p-6 text-left uppercase tracking-[4px] text-xs text-[#332D20]/60">
                          Discount
                        </th>

                        <th className="p-6 text-left uppercase tracking-[4px] text-xs text-[#332D20]/60">
                          Expiry
                        </th>

                        <th className="p-6 text-right uppercase tracking-[4px] text-xs text-[#332D20]/60">
                          Action
                        </th>

                      </tr>
                    </thead>

                    <tbody>

                      {coupons.map((coupon) => (
                        <tr
                          key={coupon._id}
                          className="border-b border-[#FFE394]/30 hover:bg-white/20 transition-all"
                        >

                          {/* CODE */}
                          <td className="p-6">
                            <span
                              className="
                                rounded-full
                                border
                                border-[#FFE394]
                                bg-white/20
                                px-4
                                py-2
                                text-sm
                                font-black
                                uppercase
                              "
                            >
                              {coupon.code}
                            </span>
                          </td>

                          {/* DISCOUNT */}
                          <td className="p-6 font-bold">
                            {coupon.discount}% OFF
                          </td>

                          {/* DATE */}
                          <td className="p-6 text-[#332D20]/70 font-medium">
                            {new Date(
                              coupon.expiryDate
                            ).toLocaleDateString(
                              'en-IN',
                              {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              }
                            )}
                          </td>

                          {/* DELETE */}
                          <td className="p-6 text-right">

                            <button
                              onClick={() =>
                                handleDelete(coupon._id)
                              }
                              className="
                                rounded-full
                                border
                                border-[#FFE394]
                                bg-white/20
                                hover:bg-[#F48F68]
                                hover:text-white
                                px-5
                                py-2
                                text-sm
                                font-black
                                transition-all
                                duration-300
                              "
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