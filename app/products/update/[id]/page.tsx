'use client'
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface PageProps {
    params: {
        id: number;
    };
}

export default function UpdateProduct({ params }: PageProps) {
    const [product, setProduct] = useState<any>(null);
    const [title, setTitle] = useState('');

    useEffect(() => {
        // Fetch the product from the database
        const fetchProduct = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', params.id)
                .single();

            if (error) {
                console.error('Error fetching product:', error);
            } else {
                setProduct(data);
                setTitle(data.title);
            }
        };

        fetchProduct();
    }, [params.id]);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!title) {
            alert('Please enter a title.');
            return;
        }

        const updatedProduct = {
            id: params.id,
            title: title,
        };

        // Update the product in the database
        const { error } = await supabase
            .from('products')
            .update(updatedProduct)
            .eq('id', params.id);

        if (error) {
            console.error('Error updating product:', error);
        } else {
            alert('Product updated successfully!');
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Update Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title-input" className="block font-bold mb-2">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title-input"
                        value={title}
                        onChange={handleTitleChange}
                        className="border border-gray-300 px-2 py-1"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Update
                </button>
            </form>
        </div>
    );
}
