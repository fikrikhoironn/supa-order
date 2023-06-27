'use client'
import {useEffect, useState} from 'react';
import {getProducts} from "@/services/products";
import Wrapper from "@/components/common/wrapper";
import Navbar from "@/components/common/navbar";
import ProductCard from "@/components/products/product-card";
import FloatingButton from "@/components/common/floating-button";
import {Text, useToast} from "@chakra-ui/react";


interface Product {
    id: number;
    title: string;
}

export default function ProductsPage() {
    const toast = useToast();
    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        const fetchProducts = async (): Promise<void> => {
            try {
                const {data, error} = await getProducts();
                if (error) {
                    toast({
                        title: "Error",
                        description: "Error fetching products",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                        position: "top"
                    });
                    return;
                }
                setProducts(data);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Error fetching products",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "top"
                });
            }
        };
        fetchProducts();
    }, [toast]);

    return (
        <>
            <Navbar />
            <Wrapper>
                <div className="flex flex-col items-center min-h-screen">
                    <Text className="text-2xl font-bold my-4">Products</Text>
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
