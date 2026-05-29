'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PortfolioItem {
  id: string;
  created_at: string;
  category: string;
  title: string;
  description: string | null;
  image_url: string;
  video_url?: string | null;
  order: number | null;
  is_featured: boolean;
}

export default function AdminPage() {
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/check');
        if (!res.ok) {
          router.replace('/admin/login');
          return;
        }
        setAuthenticated(true);
      } catch {
        router.replace('/admin/login');
        return;
      } finally {
        setAuthChecking(false);
      }
    };
    checkAuth();
  }, [router]);

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  const fetchPortfolioItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/portfolio');
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to fetch');
      }
      const data = await res.json();
      setPortfolioItems(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch portfolio items';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchPortfolioItems();
    }
  }, [authenticated, fetchPortfolioItems]);

  const fixedCategories = [
    'Logo',
    'Emotes',
    'Animated Emotes',
    'Animated Overlays',
    'Banner',
    'Overlays',
    'Hand-drawns',
    '3D Model',
    '2D Model',
    'Intros',
    'Outros',
  ];

  const initialFormState: Omit<PortfolioItem, 'id' | 'created_at'> = {
    category: '',
    title: '',
    description: null,
    image_url: '',
    video_url: null,
    order: null,
    is_featured: false,
  };
  const [formState, setFormState] = useState<Omit<PortfolioItem, 'id' | 'created_at'>>(initialFormState);

  async function uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/admin/portfolio/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Upload failed');
    }

    const data = await res.json();
    return data.url;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      let imageUrlToSave = formState.image_url;
      let videoUrlToSave = formState.video_url;

      if (imageFile) {
        imageUrlToSave = await uploadFile(imageFile);
      }

      if (videoFile) {
        videoUrlToSave = await uploadFile(videoFile);
      }

      const itemToSave = { ...formState, image_url: imageUrlToSave, video_url: videoUrlToSave };

      if (editingItem) {
        const res = await fetch('/api/admin/portfolio', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...itemToSave, id: editingItem.id }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Update failed');
        }
      } else {
        const res = await fetch('/api/admin/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemToSave),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Create failed');
        }
      }

      setEditingItem(null);
      setFormState(initialFormState);
      setImageFile(null);
      setImagePreview(null);
      setVideoFile(null);
      setVideoPreview(null);
      fetchPortfolioItems();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checkedValue = (e.target as HTMLInputElement).checked;

    setFormState((prevState) => ({
      ...prevState,
      [name]:
        name === 'order' && value === ''
          ? null
          : type === 'checkbox'
          ? checkedValue
          : value,
    }));
  };

  function handleEditClick(item: PortfolioItem) {
    setEditingItem(item);
    setFormState({
      category: item.category,
      title: item.title,
      description: item.description,
      image_url: item.image_url,
      video_url: item.video_url,
      order: item.order,
      is_featured: item.is_featured,
    });
    setImageFile(null);
    setImagePreview(item.image_url);
    setVideoFile(null);
    setVideoPreview(item.video_url ?? null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelEdit() {
    setEditingItem(null);
    setFormState(initialFormState);
    setImageFile(null);
    setImagePreview(null);
    setVideoFile(null);
    setVideoPreview(null);
  }

  async function handleDeleteClick(id: string) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    setError(null);
    try {
      const res = await fetch('/api/admin/portfolio', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Delete failed');
      }

      fetchPortfolioItems();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  }

  function handleVideoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    } else {
      setVideoFile(null);
      setVideoPreview(null);
    }
  }

  if (authChecking) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-20 px-6 bg-linear-to-b from-black to-[#0a0a0a] min-h-screen flex items-center justify-center">
          <p className="text-gold text-xl">Checking authentication...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 bg-linear-to-b from-black to-[#0a0a0a] min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-gold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Admin Panel
            </motion.h1>
            <motion.button
              onClick={handleLogout}
              className="premium-btn-outline text-sm px-4 py-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Logout
            </motion.button>
          </div>

          <div className="premium-card p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-gold" style={{ fontFamily: 'var(--font-playfair)' }}>
              {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formState.title}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 bg-black/50 text-white focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formState.category}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 bg-black/50 text-white focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                >
                  <option value="" disabled>Select a category</option>
                  {fixedCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formState.description || ''}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 bg-black/50 text-white focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                ></textarea>
              </div>
              <div>
                <label htmlFor="image_url" className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                <input
                  type="text"
                  id="image_url"
                  name="image_url"
                  value={formState.image_url}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 bg-black/50 text-white focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="image_upload" className="block text-sm font-medium text-gray-300 mb-2">Upload Image (Optional)</label>
                <input
                  type="file"
                  id="image_upload"
                  name="image_upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-black hover:file:bg-gold-light"
                />
                {(imagePreview || formState.image_url) && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-300 mb-2">Image Preview:</p>
                    <Image
                      src={imagePreview || formState.image_url || ''}
                      alt="Image Preview"
                      width={200}
                      height={150}
                      className="rounded-md object-cover border border-gray-700"
                    />
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="video_upload" className="block text-sm font-medium text-gray-300 mb-2">Upload Video (Optional)</label>
                <input
                  type="file"
                  id="video_upload"
                  name="video_upload"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-black hover:file:bg-gold-light"
                />
                {(videoPreview || formState.video_url) && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-300 mb-2">Video Preview:</p>
                    <video
                      src={videoPreview || formState.video_url || ''}
                      controls
                      width={200}
                      height={150}
                      className="rounded-md object-cover border border-gray-700"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-300 mb-2">Order (Optional)</label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={formState.order || ''}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 bg-black/50 text-white focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_featured"
                  name="is_featured"
                  checked={formState.is_featured}
                  onChange={(e) => setFormState({ ...formState, is_featured: e.target.checked })}
                  className="h-5 w-5 text-gold rounded border-gray-600 focus:ring-gold"
                />
                <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-300">Featured Item</label>
              </div>
              <div className="flex gap-4">
                <button type="submit" disabled={submitting} className="premium-btn">
                  {submitting ? 'Saving...' : editingItem ? 'Update Item' : 'Add Item'}
                </button>
                {editingItem && (
                  <button type="button" onClick={handleCancelEdit} className="premium-btn-outline">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {loading && <p className="text-center text-gold">Loading portfolio items...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}

          {!loading && !error && (
            <div className="premium-card p-8">
              <h2 className="text-3xl font-bold mb-6 text-gold" style={{ fontFamily: 'var(--font-playfair)' }}>
                All Portfolio Items
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-black/50 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-800 text-gray-300 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Media</th>
                      <th className="py-3 px-6 text-left">Title</th>
                      <th className="py-3 px-6 text-left">Category</th>
                      <th className="py-3 px-6 text-center">Featured</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-400 text-sm font-light">
                    {portfolioItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-800">
                        <td className="py-3 px-6 text-left">
                          {item.video_url ? (
                            <video src={item.video_url} controls width={150} height={100} className="rounded-md object-cover"></video>
                          ) : (
                            <Image src={item.image_url} alt={item.title} width={60} height={60} className="rounded-md object-cover" />
                          )}
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">{item.title}</td>
                        <td className="py-3 px-6 text-left">{item.category}</td>
                        <td className="py-3 px-6 text-center">{item.is_featured ? '✅' : '❌'}</td>
                        <td className="py-3 px-6 text-center whitespace-nowrap">
                          <button onClick={() => handleEditClick(item)} className="premium-btn-outline text-xs px-3 py-1 mr-2">Edit</button>
                          <button onClick={() => handleDeleteClick(item.id)} className="premium-btn-red text-xs px-3 py-1">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {portfolioItems.length === 0 && <p className="text-center text-gray-400 mt-4">No portfolio items found.</p>}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
