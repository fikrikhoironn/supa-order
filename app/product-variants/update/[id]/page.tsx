'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {getProductVariant} from "@/services/products";

interface PageProps {
    params: {
        id: number;
    };
}

export default function UpdateProduct({ params }: PageProps) {
    const [productVariant, setProductVariant] = useState(null);
    const [price, setPrice] = useState('');

    useEffect(() => {
        // Fetch the products variant from the database
        const fetchProductVariant = async () => {
            const { data, error } = await getProductVariant(params.id);
            if (error) {
                console.error('Error fetching products variant:', error);
            } else {
                setProductVariant(data);
                setPrice(data.price.toString());
            }
        };

        fetchProductVariant();
    }, [params.id]);

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!price) {
            alert('Please enter a price.');
            return;
        }

        const updatedProductVariant = {
            id: params.id,
            price: parseFloat(price),
        };

        // Update the products variant in the database
        const { error } = await supabase
            .from('product_variants')
            .update(updatedProductVariant)
            .eq('id', params.id);

        if (error) {
            console.error('Error updating products variant:', error);
        } else {
            alert('Product variant updated successfully!');
        }
    };

    if (!productVariant) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Update Product Variant</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="price-input" className="block font-bold mb-2">
                        Price:
                    </label>
                    <input
                        type="number"
                        id="price-input"
                        value={price}
                        onChange={handlePriceChange}
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
