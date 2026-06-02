'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import { useAuth } from "../context/AuthContext";

function CheckoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [discount, setDiscount] = useState(0);
    const [finalTotal, setFinalTotal] = useState(0);

    useEffect(() => {
        const discountValue = Number(searchParams.get("discount")) || 0;

        const totalValue = Number(searchParams.get("total")) || 0;

        setDiscount(discountValue);

        setFinalTotal(totalValue);
    }, [searchParams]);


    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        addressLine: '',
        landmark: '',
        city: '',
        postalCode: '',
    });

    const { user } = useAuth();
    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                addressLine: user.addressLine || '',
                landmark: user.landmark || '',
                city: user.city || '',
                postalCode: user.postalCode || '',
            });
        }
    }, [user]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const [paymentMethod, setPaymentMethod] = useState('Card');

    const handleCompletePurchase = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Stripe checkout session ke liye request
            const res = await fetch('/api/admin/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: [{ name: 'GNS Premium Box', price: finalTotal, quantity: 1 }],
                    customerDetails: formData,
                    paymentMethod: paymentMethod
                }),
            });

            const data = await res.json();

            if (data.url) {
                // Redirect to Stripe OR Success page depending on URL returned
                window.location.href = data.url;
            } else {
                alert('Payment initiation failed: ' + (data.error || 'Unknown error'));
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            alert('Error connecting to Stripe!');
            setLoading(false);
        }
    };
    return (
        <section className="relative min-h-screen overflow-hidden bg-black text-white">

            {/* CYAN GLOW */}
            <div className="absolute top-0 left-0 w-125 h-125  bg-orange-500/10 blur-[140px] pointer-events-none" />

            {/* ORANGE GLOW */}
            <div className="absolute bottom-0 right-0 w-125 h-125  text-amber-400
                    blur-[160px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

                {/* HEADER */}
                <div className="text-center mb-16">

                    <p className="uppercase tracking-[6px] text-amber-400 text-sm font-black mb-5">
                        Secure Checkout
                    </p>

                    <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
                        Complete Your
                        <span className="text-amber-400"> Order</span>
                    </h1>

                    <p className="mt-6 text-lg text-zinc-400 font-medium max-w-2xl mx-auto leading-9">
                        Fresh spices. Premium aroma. Delivered directly to your kitchen.
                    </p>

                </div>

                <div className="grid lg:grid-cols-3 gap-10 items-start">

                    {/* LEFT FORM */}
                    <div
                        className="
    lg:col-span-2
    rounded-[40px]
    border border-white/10
    bg-zinc-950/80
    backdrop-blur-xl
    p-8 md:p-10
    shadow-[0_0_40px_rgba(251,191,36,0.08)]
    relative
    overflow-hidden
  "
                    >

                        {/* INNER GLOW */}
                        <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-orange-500/10 blur-[90px]" />

                        <div className="relative z-10">

                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-12 h-0.75 bg-amber-400" />

                                <p className="uppercase tracking-[5px] text-xs font-black text-amber-400">
                                    Shipping Details
                                </p>
                            </div>

                            <form
                                onSubmit={handleCompletePurchase}
                                className="space-y-7"
                            >

                                {/* FULL NAME */}
                                <div>
                                   <label className="block text-sm font-bold mb-3 text-zinc-300">
    Full Name
</label>

                                    <input
                                        type="text"
                                        name="fullName"
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                        required
                                        className="
    w-full
    rounded-2xl
    border border-white/10
    bg-zinc-950
    text-white
    backdrop-blur-sm
    px-5
    py-4
    outline-none
    focus:border-amber-400
    placeholder:text-zinc-500
    transition-all
  "
                                    />
                                </div>

                                {/* EMAIL */}
                                <div>
                                   <label className="block text-sm font-semibold mb-3 text-zinc-300 uppercase tracking-wide">
    Email Address
</label>

                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        required
                                        className="
    w-full
    rounded-2xl
    border border-white/10
    bg-black/40
    px-5
    py-4
    outline-none
    focus:border-amber-500
    text-white
    placeholder:text-zinc-500
    transition-all
  "
                                    />
                                </div>

                                {/* PHONE */}
                                <div>
                            <label className="block text-sm font-bold mb-3 text-zinc-300">
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        onChange={handleInputChange}
                                        placeholder="Enter phone number"
                                        required
                                        className="
    w-full
    rounded-2xl
    border border-white/10
    bg-black/40
    px-5
    py-4
    outline-none
    focus:border-amber-500
    text-white
    placeholder:text-zinc-500
    transition-all
  "
                                    />
                                </div>


                                {/* ADDRESS */}
                                <div>
                                   <label className="block text-sm font-bold mb-3 text-zinc-300">
    Address
</label>

                                    <input
                                        type="text"
                                        name="addressLine"
                                        value={formData.addressLine}
                                        onChange={handleInputChange}
                                        placeholder="House no, street, area"
                                        required
                                        className="
    w-full
    rounded-2xl
    border border-white/10
    bg-black/40
    px-5
    py-4
    outline-none
    focus:border-amber-500
    text-white
    placeholder:text-zinc-500
    transition-all
  "
                                    />
                                </div>

                                {/* LANDMARK */}
                                <div>
                                   <label className="block text-sm font-bold mb-3 text-zinc-300">
    Landmark
</label>

                                    <input
                                        type="text"
                                        name="landmark"
                                        value={formData.landmark}
                                        onChange={handleInputChange}
                                        placeholder="Near hospital, park..."
                                        required
                                        className="
    w-full
    rounded-2xl
    border border-white/10
    bg-black/40
    px-5
    py-4
    outline-none
    focus:border-amber-500
    text-white
    placeholder:text-zinc-500
    transition-all
  "
                                    />
                                </div>

                                {/* CITY + PINCODE */}
                                <div className="grid md:grid-cols-2 gap-6">

                                    <div>
                                       <label className="block text-sm font-bold mb-3 text-zinc-300">
    City
</label>


                                        <input
                                            type="text"
                                            name="city"
                                            onChange={handleInputChange}
                                            placeholder="Enter city"
                                            required
                                            className="
    w-full
    rounded-2xl
    border border-white/10
    bg-black/40
    px-5
    py-4
    outline-none
    focus:border-amber-500
    text-white
    placeholder:text-zinc-500
    transition-all
  "
                                        />
                                    </div>

                                    <div>
                                       <label className="block text-sm font-bold mb-3 text-zinc-300">
    Pincode
</label>

                                        <input
                                            type="text"
                                            name="postalCode"
                                            onChange={handleInputChange}
                                            placeholder="Enter pincode"
                                            required
                                            className="
    w-full
    rounded-2xl
    border border-white/10
    bg-black/40
    px-5
    py-4
    outline-none
    focus:border-amber-500
    text-white
    placeholder:text-zinc-500
    transition-all
  "
                                        />
                                    </div>

                                </div>

                                {/* PAYMENT METHODS */}
                                <div className="flex flex-col space-y-3">

                                   <label
  className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all border ${
    paymentMethod === 'Card'
      ? 'border-amber-400 bg-amber-400/10 shadow-[0_0_20px_rgba(251,191,36,0.15)]'
      : 'border-white/10 bg-black/40 hover:border-amber-400/30'
  }`}
>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="Card"
                                            checked={paymentMethod === 'Card'}
                                            onChange={() => setPaymentMethod('Card')}
                                            className="w-5 h-5 accent-amber-400"
                                        />
                                        <span className="font-bold text-white">
                                            Card Payment (Stripe)
                                        </span>
                                    </label>

                                    <label
                                        className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'COD'
                                            ? 'border-amber-400 bg-amber-400/10'
                                            : 'border-white/10 bg-zinc-950'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="COD"
                                            checked={paymentMethod === 'COD'}
                                            onChange={() => setPaymentMethod('COD')}
                                            className="w-5 h-5 accent-amber-400"
                                        />
                                        <span className="font-bold text-white">
                                            Cash on Delivery
                                        </span>
                                    </label>

                                    <label
                                        className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'GPay'
                                            ? 'border-amber-400 bg-amber-400/10'
                                            : 'border-white/10 bg-zinc-950'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="GPay"
                                            checked={paymentMethod === 'GPay'}
                                            onChange={() => setPaymentMethod('GPay')}
                                            className="w-5 h-5 accent-amber-400"
                                        />
                                        <span className="font-bold text-white">
                                            GPay / QR Code
                                        </span>
                                    </label>

                                </div>

                                {/* BUTTON */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
    w-full
    mt-6
    rounded-xl
    bg-amber-500
    hover:bg-amber-400
    text-black
    py-5
    text-lg
    font-bold
    transition-all
    duration-300
    shadow-lg
    hover:scale-[1.02]
    disabled:opacity-60
  "
                                >
                                    {loading ? 'Processing...' : paymentMethod === 'Card' ? `Pay £${finalTotal} Securely` : `Confirm Order`}
                                </button>

                            </form>
                        </div>
                    </div>

                    {/* RIGHT SUMMARY */}
                   <div
  className="
    rounded-[40px]
    border border-white/10
    bg-zinc-950/80
    backdrop-blur-xl
    p-8
    shadow-[0_0_40px_rgba(251,191,36,0.08)]
    relative
    overflow-hidden
  "
>

  {/* ORANGE GLOW */}
  <div className="absolute bottom-0 left-0 w-55 h-55 bg-orange-500/10 blur-[90px]" />

  <div className="relative z-10">

    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-0.5 bg-amber-400" />

      <p className="uppercase tracking-[5px] text-xs font-black text-amber-400">
        Order Summary
      </p>
    </div>

    {/* PRODUCT */}
    <div
      className="
        rounded-3xl
        bg-black/40
        border border-white/10
        p-6
        mb-6
      "
    >
      <h3 className="text-2xl font-black text-amber-400">
        GNS Premium Box
      </h3>

      <p className="mt-3 text-zinc-400 leading-7">
        Handcrafted premium spices with authentic Indian flavours.
      </p>
    </div>

    {/* PRICE */}

    <div className="flex justify-between text-zinc-400 font-medium">
      <span>Discount</span>

      <span className="text-amber-400 font-black">
        {discount}%
      </span>
    </div>

    <div className="flex justify-between text-zinc-400 font-medium mt-3">
      <span>Shipping</span>

      <span>£100</span>
    </div>

    <div className="border-t border-white/10 pt-5 mt-5 flex justify-between items-center">
      <span className="text-xl font-black text-white">
        Total
      </span>

      <span className="text-3xl font-black text-amber-400">
        £{finalTotal}
      </span>
    </div>

    {/* TAGS */}
    <div className="flex flex-wrap gap-3 mt-10">
      {['100% Pure', 'Premium Aroma', 'Fresh Blend'].map(
        (item, i) => (
          <div
            key={i}
            className="
              rounded-full
              border border-white/10
              bg-black/40
              text-amber-400
              px-5
              py-2
              text-sm
              font-bold
            "
          >
            {item}
          </div>
        )
      )}
    </div>

  </div>
  </div>
  </div>
  </div>
        </section>
    );
}

export default CheckoutPage;