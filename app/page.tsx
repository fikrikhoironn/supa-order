'use client'
import {useEffect, useState} from 'react';
import {getProducts} from "@/services/products";
import Wrapper from "@/components/common/wrapper";
import Navbar from "@/components/common/navbar";
import ProductCard from "@/components/products/product-card";
import FloatingButton from "@/components/common/floating-button";


interface Product {
    id: number;
    title: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        const fetchProducts = async (): Promise<void> => {
            try {
                const {data, error} = await getProducts();
                console.log(data);
                if (error) {
                    console.error('Error fetching products:', error);
                    return;
                }
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <Navbar />
            <Wrapper>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold my-4">Products</h1>
                    <div className="flex flex-row flex-wrap gap-8">
                        {products.map((product: Product) => (
                            <ProductCard key={product.id} id={product.id} title={product.title} />
                        ))}
                    </div>
                </div>
                <FloatingButton text="Add Product" url="/products/create"/>
            </Wrapper>
        </>
    );
}
