'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";

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
        phone: '',
        addressLine: '',
        city: '',
        postalCode: '',
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
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
                }),
            });

            const data = await res.json();

            if (data.url) {
                // Stripe ke secure page par redirect
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
        <section className="relative min-h-screen overflow-hidden bg-[#FFF6DE] text-[#332D20]">

            {/* CYAN GLOW */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#8BDFDD]/20 blur-[140px] pointer-events-none" />

            {/* ORANGE GLOW */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F48F68]/10 blur-[160px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

                {/* HEADER */}
                <div className="text-center mb-16">

                    <p className="uppercase tracking-[6px] text-[#F48F68] text-sm font-black mb-5">
                        Secure Checkout
                    </p>

                    <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
                        Complete Your
                        <span className="text-[#F48F68]"> Order</span>
                    </h1>

                    <p className="mt-6 text-lg text-[#332D20]/70 font-medium max-w-2xl mx-auto leading-9">
                        Fresh spices. Premium aroma. Delivered directly to your kitchen.
                    </p>

                </div>

                <div className="grid lg:grid-cols-3 gap-10 items-start">

                    {/* LEFT FORM */}
                    <div
                        className="
              lg:col-span-2
              rounded-[40px]
              border border-[#FFE394]
              bg-white/20
              backdrop-blur-xl
              p-8 md:p-10
              shadow-2xl
              relative
              overflow-hidden
            "
                    >

                        {/* INNER GLOW */}
                        <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-[#8BDFDD]/20 blur-[90px]" />

                        <div className="relative z-10">

                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-12 h-[3px] bg-[#F48F68]" />

                                <p className="uppercase tracking-[5px] text-xs font-black text-[#F48F68]">
                                    Shipping Details
                                </p>
                            </div>

                            <form
                                onSubmit={handleCompletePurchase}
                                className="space-y-7"
                            >

                                {/* FULL NAME */}
                                <div>
                                    <label className="block text-sm font-bold mb-3 text-[#332D20]">
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
                      border border-[#FFE394]
                      bg-white/70
                      backdrop-blur-sm
                      px-5
                      py-4
                      outline-none
                      focus:border-[#F48F68]
                      text-[#332D20]
                      placeholder:text-[#332D20]/40
                      transition-all
                    "
                                    />
                                </div>

                                {/* PHONE */}
                                <div>
                                    <label className="block text-sm font-bold mb-3 text-[#332D20]">
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
                      border border-[#FFE394]
                      bg-white/70
                      backdrop-blur-sm
                      px-5
                      py-4
                      outline-none
                      focus:border-[#8BDFDD]
                      text-[#332D20]
                      placeholder:text-[#332D20]/40
                      transition-all
                    "
                                    />
                                </div>
                               

                                {/* ADDRESS */}
                                <div>
                                    <label className="block text-sm font-bold mb-3 text-[#332D20]">
                                        Address
                                    </label>

                                    <input
                                        type="text"
                                        name="addressLine"
                                        onChange={handleInputChange}
                                        placeholder="House no, street, area"
                                        required
                                        className="
                      w-full
                      rounded-2xl
                      border border-[#FFE394]
                      bg-white/70
                      backdrop-blur-sm
                      px-5
                      py-4
                      outline-none
                      focus:border-[#F48F68]
                      text-[#332D20]
                      placeholder:text-[#332D20]/40
                      transition-all
                    "
                                    />
                                </div>

                                {/* CITY + PINCODE */}
                                <div className="grid md:grid-cols-2 gap-6">

                                    <div>
                                        <label className="block text-sm font-bold mb-3 text-[#332D20]">
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
                        border border-[#FFE394]
                        bg-white/70
                        backdrop-blur-sm
                        px-5
                        py-4
                        outline-none
                        focus:border-[#8BDFDD]
                        text-[#332D20]
                        placeholder:text-[#332D20]/40
                        transition-all
                      "
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-3 text-[#332D20]">
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
                        border border-[#FFE394]
                        bg-white/70
                        backdrop-blur-sm
                        px-5
                        py-4
                        outline-none
                        focus:border-[#F48F68]
                        text-[#332D20]
                        placeholder:text-[#332D20]/40
                        transition-all
                      "
                                        />
                                    </div>

                                </div>

                                {/* BUTTON */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                    w-full
                    mt-6
                    rounded-full
                    bg-[#F48F68]
                    hover:bg-[#332D20]
                    text-white
                    py-5
                    text-lg
                    font-black
                    transition-all
                    duration-500
                    shadow-xl
                    hover:scale-[1.02]
                    disabled:opacity-60
                  "
                                >
                                    {loading ? 'Processing...' : `Pay ${finalTotal}`}
                                </button>

                            </form>
                        </div>
                    </div>

                    {/* RIGHT SUMMARY */}
                    <div
                        className="
              rounded-[40px]
              border border-[#FFE394]
              bg-white/20
              backdrop-blur-xl
              p-8
              shadow-2xl
              relative
              overflow-hidden
            "
                    >

                        {/* ORANGE GLOW */}
                        <div className="absolute bottom-0 left-0 w-[220px] h-[220px] bg-[#F48F68]/10 blur-[90px]" />

                        <div className="relative z-10">

                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-[3px] bg-[#8BDFDD]" />

                                <p className="uppercase tracking-[5px] text-xs font-black text-[#8BDFDD]">
                                    Order Summary
                                </p>
                            </div>

                            {/* PRODUCT */}
                            <div
                                className="
                  rounded-3xl
                  bg-white/70
                  border border-[#FFE394]
                  p-6
                  mb-6
                "
                            >

                                <h3 className="text-2xl font-black text-[#332D20]">
                                    GNS Premium Box
                                </h3>

                                <p className="mt-3 text-[#332D20]/60 leading-7">
                                    Handcrafted premium spices with authentic Indian flavours.
                                </p>

                            </div>

                            {/* PRICE */}

                            <div className="flex justify-between text-[#332D20]/70 font-medium">
                                <span>Discount</span>

                                <span className="text-[#F48F68] font-black">
                                    {discount}%
                                </span>
                            </div>

                            <div className="flex justify-between text-[#332D20]/70 font-medium">
                                <span>Shipping</span>

                                <span>£100</span>
                            </div>

                            <div className="border-t border-[#FFE394] pt-5 flex justify-between items-center">

                                <span className="text-xl font-black">
                                    Total
                                </span>

                                <span className="text-3xl font-black text-[#F48F68]">
                                    {finalTotal}
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
                        border border-[#FFE394]
                        bg-white/70
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