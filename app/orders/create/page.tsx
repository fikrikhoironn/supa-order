'use client'
import { supabase} from "@/lib/supabase";
import { useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {getProductVariants, insertOrder, showProducts} from "@/services/products";

interface Product {
    id: number;
    title: string;
}

interface ProductVariant {
    id: number;
    product_id: number;
    price: number;
}


export default function CreateOrder(): JSX.Element {
    const [products, setProducts] = useState<Product[]>([]);
    const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);
    const [selectedProductVariant, setSelectedProductVariant] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);

    useEffect(() => {
        fetchProducts();
        fetchProductVariants();
    }, []);

    async function fetchProducts() {
        try {
            const { data, error } = await showProducts();
            if (error) {
                throw error;
            }
            if (data) {
                setProducts(data);
            }
        } catch (error) {
            console.error('Error fetching products-variants:', error);
        }
    }

    async function fetchProductVariants() {
        try {
            const { data, error } = await getProductVariants();
            if (error) {
                throw error;
            }
            if (data) {
                setProductVariants(data);
            }
        } catch (error) {
            console.error('Error fetching products variants:', error);
        }
    }

    async function createOrder() {
        try {
            const { data, error } = await insertOrder(selectedProductVariant, quantity)
            if (error) {
                throw error;
            }
            if (data) {
                console.log('Order created successfully:', data);
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    }

    const handleProductVariantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedVariantId = parseInt(event.target.value);
        setSelectedProductVariant(selectedVariantId);
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const quantityValue = parseInt(event.target.value);
        setQuantity(quantityValue);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Order</h1>
            <div className="mb-4">
                <label htmlFor="product-variant-select" className="mr-2">
                    Product Variant:
                </label>
                <select
                    id="product-variant-select"
                    value={selectedProductVariant}
                    onChange={handleProductVariantChange}
                    className="border border-gray-300 px-2 py-1"
                >
                    <option value={0}>Select Product Variant</option>
                    {productVariants.map((variant) => (
                        <option key={variant.id} value={variant.id}>
                            Product ID: {variant.product_id} - Price: {variant.price}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="quantity-input" className="mr-2">
                    Quantity:
                </label>
                <input
                    type="number"
                    id="quantity-input"
                    value={quantity}
                    min="1"
                    onChange={handleQuantityChange}
                    className="border border-gray-300 px-2 py-1"
                />
            </div>
            <button
                onClick={createOrder}
                disabled={selectedProductVariant === 0 || quantity === 0}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Create Order
            </button>
        </div>
    );
}
