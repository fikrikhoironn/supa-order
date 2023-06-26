'use client'
import {useEffect, useState} from 'react';
import {getProducts} from "@/services/products";
import Wrapper from "@/components/common/wrapper";
import Navbar from "@/components/common/navbar";
import ProductCard from "@/components/products/product-card";
import {supabase} from "@/lib/supabase";

interface ProductVariant {
    id: number;
    product_id: number;
    price: number;
}

interface Product {
    id: number;
    title: string;
    product_variants: ProductVariant[];
}

export default function ProductsPage(): JSX.Element {
    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async (): Promise<void> => {
        try {
            const {data, error} = await getProducts();
            console.log(data);
            if (error) {
                console.error('Error fetching products-variants:', error);
                return;
            }
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products-variants:', error);
        }
    };


    return (
        <>
            <Navbar />
            <Wrapper>
                <h1 className="text-2xl font-bold mb-4">Products</h1>
                {products.map((product: Product) => (
                    <div key={product.id} className="mb-6">
                        <h2 className="text-lg font-medium mb-2">{product.title}</h2>
                        <ul>
                            {product.product_variants.map((variant: ProductVariant) => (
                                <li key={variant.id} className="mb-1">
                                    Product Variant ID: {variant.id}, Price: {variant.price}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </Wrapper>
        </>
    );
}
