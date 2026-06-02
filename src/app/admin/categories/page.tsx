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
  const [bg, setBg] = useState<string>('bg-amber-500');
  const [text, setText] = useState<string>('text-black');

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);

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

  const handleCreateCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) return alert('Category name is required!');

    setLoading(true);

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        setBg('bg-amber-500');
        setText('text-black');
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

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this category?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCategories((prev) => prev.filter((c) => c._id !== id));
        alert('Category deleted successfully');
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* HERO GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,#7c1d12,transparent_45%)] opacity-70" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black">
            Category <span className="text-amber-400">Management</span>
          </h1>

          <p className="mt-6 text-lg text-zinc-300 max-w-2xl leading-8">
            Create and manage product categories with premium admin UI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* FORM */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">

            <h2 className="text-2xl font-bold mb-6">Create Category</h2>

            <form onSubmit={handleCreateCategory} className="space-y-5">

              <input
                type="text"
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 text-white focus:border-amber-400 outline-none"
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 text-white focus:border-amber-400 outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold py-4"
              >
                {loading ? 'Creating...' : 'Create Category'}
              </button>

            </form>
          </div>

          {/* TABLE */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">

            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold">Active Categories</h2>
            </div>

            {fetching ? (
              <div className="p-10 text-zinc-400">Loading...</div>
            ) : categories.length === 0 ? (
              <div className="p-10 text-zinc-400">No categories found</div>
            ) : (
              <table className="w-full">

                <thead className="text-zinc-400 text-sm">
                  <tr className="border-b border-white/10">
                    <th className="p-5 text-left">Name</th>
                    <th className="p-5 text-left">Description</th>
                    <th className="p-5 text-left">Created</th>
                    <th className="p-5 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((c) => (
                    <tr key={c._id} className="border-b border-white/5 hover:bg-white/5">

                      <td className="p-5">
                        <span className="px-4 py-2 rounded-full border border-zinc-700 bg-black text-sm font-bold text-amber-400">
                          {c.name}
                        </span>
                      </td>

                      <td className="p-5 text-zinc-400">
                        {c.description || '-'}
                      </td>

                      <td className="p-5 text-zinc-500">
                        {new Date(c.createdAt).toLocaleDateString('en-IN')}
                      </td>

                      <td className="p-5 text-right">
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="px-4 py-2 rounded-full border border-zinc-700 hover:border-amber-400 hover:text-amber-400 transition"
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}