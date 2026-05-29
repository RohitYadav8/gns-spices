'use client';

import React, { useState, useEffect, FormEvent } from 'react';

interface ICategory {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
}

export default function CategoriesPage() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [bg, setBg] = useState<string>('bg-[#FFE394]');
  const [text, setText] = useState<string>('text-[#332D20]');

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);

  // FETCH CATEGORIES
  const fetchCategories = async () => {
    try {
      setFetching(true);
      const res = await fetch('/api/admin/categories');
      const data = await res.json();

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // CREATE CATEGORY
  const handleCreateCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      return alert('Category name is required!');
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          bg,
          text,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('Category created successfully!');
        setName('');
        setDescription('');
        setBg('bg-[#FFE394]');
        setText('text-[#332D20]');
        fetchCategories();
      } else {
        alert(data.message || 'Failed to create category');
      }
    } catch (error) {
      console.error(error);
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  // DELETE CATEGORY
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this category?');

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCategories((prev) => prev.filter((category) => category._id !== id));
        alert('Category deleted successfully');
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
            Category
            <span className="text-[#F48F68]"> Management</span>
          </h1>
          <p className="mt-6 text-lg text-[#332D20]/70 max-w-2xl leading-8">
            Create, manage, and monitor your product categories with premium glassmorphism UI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT FORM */}
          <div className="rounded-4xl border border-[#FFE394] bg-white/70 backdrop-blur-xl shadow-2xl p-8 relative overflow-hidden">
            {/* INNER GLOW */}
            <div className="absolute top-0 left-0 w-55 h-55 bg-[#8BDFDD]/20 blur-[100px]" />

            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-8">Create Category</h2>

              <form onSubmit={handleCreateCategory} className="space-y-6">
                {/* NAME */}
                <div>
                  <label className="block uppercase tracking-[4px] text-xs font-black text-[#332D20]/60 mb-3">
                    Category Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Premium Spices"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border border-[#FFE394] bg-white/20 backdrop-blur-xl px-5 py-4 text-sm font-bold outline-none focus:border-[#F48F68] transition-all"
                    required
                  />
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="block uppercase tracking-[4px] text-xs font-black text-[#332D20]/60 mb-3">
                    Description (Optional)
                  </label>
                  <textarea
                    placeholder="Brief details about the category..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-24 rounded-2xl border border-[#FFE394] bg-white/20 backdrop-blur-xl px-5 py-4 text-sm font-bold outline-none focus:border-[#F48F68] transition-all resize-none"
                  />
                </div>
                {/* BACKGROUND COLOR */}
                <div>
                  <label className="block uppercase tracking-[4px] text-xs font-black text-[#332D20]/60 mb-3">
                    Background Color
                  </label>
                  <select
                    value={bg}
                    onChange={(e) => setBg(e.target.value)}
                    className="w-full rounded-2xl border border-[#FFE394] bg-white/20 backdrop-blur-xl px-5 py-4 text-sm font-bold outline-none focus:border-[#F48F68] transition-all"
                  >
                    <option value="bg-[#FFE394]">Yellow (bg-[#FFE394])</option>
                    <option value="bg-[#F48F68]">Orange (bg-[#F48F68])</option>
                    <option value="bg-[#8BDFDD]">Cyan (bg-[#8BDFDD])</option>
                    <option value="bg-[#332D20]">Dark (bg-[#332D20])</option>
                    <option value="bg-white">White</option>
                  </select>
                </div>

                {/* TEXT COLOR */}
                <div>
                  <label className="block uppercase tracking-[4px] text-xs font-black text-[#332D20]/60 mb-3">
                    Text Color
                  </label>
                  <select
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full rounded-2xl border border-[#FFE394] bg-white/20 backdrop-blur-xl px-5 py-4 text-sm font-bold outline-none focus:border-[#F48F68] transition-all"
                  >
                    <option value="text-[#332D20]">Dark (text-[#332D20])</option>
                    <option value="text-white">White</option>
                    <option value="text-[#FFF6DE]">Cream (text-[#FFF6DE])</option>
                  </select>
                </div>
                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#F48F68] hover:bg-[#332D20] text-white py-4 font-black transition-all duration-500 shadow-xl hover:scale-[1.02] disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Category'}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT TABLE */}
          <div className="lg:col-span-2 rounded-4xl border border-[#FFE394] bg-white/70 backdrop-blur-xl shadow-2xl overflow-hidden relative">
            {/* ORANGE GLOW */}
            <div className="absolute top-0 right-0 w-65 h-65 bg-[#F48F68]/10 blur-[120px]" />

            <div className="relative z-10">
              {/* HEADER */}
              <div className="p-8 border-b border-[#FFE394]/50">
                <h2 className="text-3xl font-black">Active Categories</h2>
              </div>

              {/* LOADING */}
              {fetching ? (
                <div className="p-12 text-center font-semibold text-[#332D20]/60">
                  Loading categories...
                </div>
              ) : categories.length === 0 ? (
                <div className="p-12 text-center font-semibold text-[#332D20]/60">
                  No active categories found.
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
                          Description
                        </th>
                        <th className="p-6 text-left uppercase tracking-[4px] text-xs text-[#332D20]/60">
                          Created
                        </th>
                        <th className="p-6 text-right uppercase tracking-[4px] text-xs text-[#332D20]/60">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr
                          key={category._id}
                          className="border-b border-[#FFE394]/30 hover:bg-white/20 transition-all"
                        >
                          {/* NAME */}
                          <td className="p-6">
                            <span className="rounded-full border border-[#FFE394] bg-white/20 px-4 py-2 text-sm font-black uppercase text-[#F48F68]">
                              {category.name}
                            </span>
                          </td>

                          {/* DESCRIPTION */}
                          <td className="p-6 font-medium text-[#332D20]/70 max-w-50 truncate">
                            {category.description || '-'}
                          </td>

                          {/* DATE */}
                          <td className="p-6 text-[#332D20]/70 font-medium">
                            {new Date(category.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>

                          {/* DELETE */}
                          <td className="p-6 text-right">
                            <button
                              onClick={() => handleDelete(category._id)}
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
