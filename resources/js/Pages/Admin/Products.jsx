import { Head, router, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useState, useEffect, useRef } from 'react';
import GlassButton from '@/Components/GlassButton';

export default function Products({ auth, products }) {
    // Form State
    const { data, setData, post, processing, errors: formErrors, reset, clearErrors } = useForm({
        name: '',
        category: 'men',
        new_price: '',
        old_price: '',
        product_image: '',
        description: '',
        specifications: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const firstInputRef = useRef(null);

    // Calculated Discount
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        if (data.new_price && data.old_price) {
            const oldP = parseFloat(data.old_price);
            const newP = parseFloat(data.new_price);
            if (oldP > newP && oldP > 0) {
                const calc = Math.round(((oldP - newP) / oldP) * 100);
                setDiscount(calc);
            } else {
                setDiscount(0);
            }
        } else {
            setDiscount(0);
        }
    }, [data.new_price, data.old_price]);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/products', {
            onSuccess: () => {
                closeModal();
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/admin/products/${id}`);
        }
    };

    const handleClearAll = () => {
        if (confirm('WARNING: Are you sure you want to delete ALL products? This cannot be undone.')) {
            router.post('/admin/products/clear');
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
        // Focus first input after modal opens
        setTimeout(() => {
            firstInputRef.current?.focus();
        }, 100);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        clearErrors();
        reset();
    };

    return (
        <MainLayout user={auth?.user}>
            <Head title="Admin Products" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 mt-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-[var(--text-primary)]">Inventory</h1>
                    <p className="text-[var(--text-muted)] mt-1 font-sans">Manage your store's product catalog.</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <button 
                        className="px-6 py-2 border border-[var(--border-color)] text-[var(--text-muted)] hover:text-red-500 hover:border-red-500 transition-colors uppercase tracking-widest text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)]" 
                        onClick={handleClearAll}
                        disabled={!products || products.length === 0 || processing}
                        aria-label="Delete all products"
                    >
                        Purge All
                    </button>
                    <GlassButton 
                        onClick={openModal}
                        aria-label="Add a new product"
                    >
                        + Add Product
                    </GlassButton>
                </div>
            </div>



            {/* Accessible Minimal Table */}
            <main className="border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-x-auto">
                <table className="w-full text-left border-collapse" aria-label="Products Table">
                    <thead className="bg-[var(--bg-base)] border-b border-[var(--border-color)]">
                        <tr>
                            <th scope="col" className="p-4 text-xs tracking-widest uppercase text-[var(--text-muted)] font-medium">Image</th>
                            <th scope="col" className="p-4 text-xs tracking-widest uppercase text-[var(--text-muted)] font-medium">Name</th>
                            <th scope="col" className="p-4 text-xs tracking-widest uppercase text-[var(--text-muted)] font-medium">Category</th>
                            <th scope="col" className="p-4 text-xs tracking-widest uppercase text-[var(--text-muted)] font-medium">Price</th>
                            <th scope="col" className="p-4 text-xs tracking-widest uppercase text-[var(--text-muted)] font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!products || products.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center p-8 text-[var(--text-muted)]">
                                    No products found in the database.
                                </td>
                            </tr>
                        ) : (
                            products.map(product => (
                                <tr key={product.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-base)] transition-colors">
                                    <td className="p-4">
                                        <div className="w-12 h-12 bg-[var(--bg-base)] border border-[var(--border-color)] flex items-center justify-center overflow-hidden">
                                            <img 
                                                src={product.product_image?.startsWith('http') ? product.product_image : `/${product.product_image}`} 
                                                alt={`Thumbnail of ${product.name}`} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-[var(--text-primary)] max-w-xs truncate">
                                        {product.name}
                                    </td>
                                    <td className="p-4 uppercase text-sm tracking-wider text-[var(--text-muted)]">
                                        {product.category}
                                    </td>
                                    <td className="p-4 font-mono">
                                        <div className="text-[var(--text-primary)] font-bold">${parseFloat(product.new_price).toFixed(2)}</div>
                                        {parseFloat(product.old_price) > parseFloat(product.new_price) && (
                                            <div className="text-xs line-through text-[var(--text-muted)] mt-0.5">${parseFloat(product.old_price).toFixed(2)}</div>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button 
                                            className="text-sm font-medium uppercase tracking-wider text-[var(--text-muted)] hover:text-red-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)] px-2 py-1"
                                            onClick={() => handleDelete(product.id)}
                                            aria-label={`Delete product ${product.name}`}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </main>

            {/* Custom Accessible Modal */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div 
                        className="bg-[var(--bg-secondary)] border border-[var(--border-color)] w-full max-w-2xl p-6 md:p-8 animate-fade-up shadow-2xl overflow-y-auto max-h-[90vh]"
                        role="document"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 id="modal-title" className="text-2xl font-display font-bold uppercase tracking-wide text-[var(--text-primary)]">Add New Product</h2>
                            <button 
                                onClick={closeModal}
                                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)] p-1"
                                aria-label="Close modal"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        

                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-2 uppercase tracking-wider">Product Name *</label>
                                <input 
                                    id="name"
                                    type="text" 
                                    name="name"
                                    ref={firstInputRef}
                                    className="w-full bg-transparent border border-[var(--border-color)] p-3 text-[var(--text-primary)] focus-visible:outline-none focus-visible:border-[var(--text-primary)] transition-colors" 
                                    value={data.name} 
                                    onChange={handleChange} 
                                    required
                                    aria-required="true"
                                    aria-invalid={formErrors.name ? "true" : "false"}
                                />
                                {formErrors.name && <p className="text-red-500 text-sm mt-1" role="alert">{formErrors.name[0]}</p>}
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-[var(--text-primary)] mb-2 uppercase tracking-wider">Category *</label>
                                <select 
                                    id="category"
                                    name="category"
                                    className="w-full bg-[var(--bg-base)] border border-[var(--border-color)] p-3 text-[var(--text-primary)] focus-visible:outline-none focus-visible:border-[var(--text-primary)] transition-colors" 
                                    value={data.category} 
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                    <option value="kids">Kids</option>
                                </select>
                                {formErrors.category && <p className="text-red-500 text-sm mt-1" role="alert">{formErrors.category[0]}</p>}
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-[var(--text-primary)] mb-2 uppercase tracking-wider">Description *</label>
                                <textarea 
                                    id="description"
                                    name="description"
                                    rows="3"
                                    className="w-full bg-transparent border border-[var(--border-color)] p-3 text-[var(--text-primary)] focus-visible:outline-none focus-visible:border-[var(--text-primary)] transition-colors" 
                                    value={data.description} 
                                    onChange={handleChange} 
                                    required
                                ></textarea>
                                {formErrors.description && <p className="text-red-500 text-sm mt-1" role="alert">{formErrors.description[0]}</p>}
                            </div>

                            <div>
                                <label htmlFor="specifications" className="block text-sm font-medium text-[var(--text-primary)] mb-2 uppercase tracking-wider">Specifications <span className="text-[var(--text-muted)] font-normal text-xs normal-case ml-2">(One per line)</span></label>
                                <textarea 
                                    id="specifications"
                                    name="specifications"
                                    rows="4"
                                    placeholder="Cotton Blend&#10;Slim Fit&#10;Machine Washable"
                                    className="w-full bg-transparent border border-[var(--border-color)] p-3 text-[var(--text-primary)] font-mono text-sm focus-visible:outline-none focus-visible:border-[var(--text-primary)] transition-colors" 
                                    value={data.specifications} 
                                    onChange={handleChange} 
                                ></textarea>
                                {formErrors.specifications && <p className="text-red-500 text-sm mt-1" role="alert">{formErrors.specifications[0]}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[var(--bg-base)] border border-[var(--border-color)] p-4 relative">
                                {/* Discount Badge Overlay */}
                                {discount > 0 && (
                                    <div className="absolute -top-3 right-4 bg-[var(--text-primary)] text-[var(--bg-base)] text-xs font-bold px-2 py-1 uppercase tracking-widest" aria-live="polite">
                                        Discount: {discount}%
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="old_price" className="block text-sm font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wider">Old Price (MSRP)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-[var(--text-muted)] font-mono">$</span>
                                        <input 
                                            id="old_price"
                                            type="number" 
                                            name="old_price"
                                            step="0.01" 
                                            min="0"
                                            className="w-full bg-transparent border border-[var(--border-color)] p-3 pl-8 text-[var(--text-primary)] font-mono focus-visible:outline-none focus-visible:border-[var(--text-primary)] transition-colors" 
                                            value={data.old_price} 
                                            onChange={handleChange} 
                                            required
                                        />
                                    </div>
                                    {formErrors.old_price && <p className="text-red-500 text-sm mt-1" role="alert">{formErrors.old_price[0]}</p>}
                                </div>
                                <div>
                                    <label htmlFor="new_price" className="block text-sm font-medium text-[var(--text-primary)] mb-2 uppercase tracking-wider">New Price (Sale) *</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-[var(--text-muted)] font-mono">$</span>
                                        <input 
                                            id="new_price"
                                            type="number" 
                                            name="new_price"
                                            step="0.01" 
                                            min="0"
                                            className="w-full bg-transparent border border-[var(--text-primary)] p-3 pl-8 text-[var(--text-primary)] font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-primary)] transition-colors" 
                                            value={data.new_price} 
                                            onChange={handleChange} 
                                            required
                                        />
                                    </div>
                                    {formErrors.new_price && <p className="text-red-500 text-sm mt-1" role="alert">{formErrors.new_price[0]}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="product_image" className="block text-sm font-medium text-[var(--text-primary)] mb-2 uppercase tracking-wider">
                                    Image URL <span className="text-[var(--text-muted)] font-normal text-xs normal-case ml-2">(Optional)</span>
                                </label>
                                <input 
                                    id="product_image"
                                    type="url" 
                                    name="product_image"
                                    className="w-full bg-transparent border border-[var(--border-color)] p-3 text-[var(--text-primary)] font-mono text-sm focus-visible:outline-none focus-visible:border-[var(--text-primary)] transition-colors" 
                                    value={data.product_image} 
                                    onChange={handleChange}
                                    placeholder="https://..."
                                />
                                {formErrors.product_image && <p className="text-red-500 text-sm mt-1" role="alert">{formErrors.product_image[0]}</p>}
                            </div>

                            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-[var(--border-color)]">
                                <button 
                                    type="button" 
                                    className="px-6 py-3 font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)]" 
                                    onClick={closeModal}
                                >
                                    CANCEL
                                </button>
                                <GlassButton 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-8"
                                >
                                    {processing ? 'SAVING...' : 'SAVE PRODUCT'}
                                </GlassButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
