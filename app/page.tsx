'use client'
import {useEffect, useState} from 'react';
import {getProducts} from "@/services/products";
import Wrapper from "@/components/common/wrapper";
import Navbar from "@/components/common/navbar";
import ProductCard from "@/components/products/product-card";
import { Box, Button} from "@chakra-ui/react";
import Link from "next/link";


interface Product {
    id: number;
    title: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        fetchProducts();
    }, []);

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

    return (
        <>
            <Navbar />
            <Wrapper>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold my-4">Products</h1>
                    <div className="flex flex-row gap-8">
                        {products.map((product: Product) => (
                            <ProductCard key={product.id} id={product.id} title={product.title} />
                        ))}
                    </div>
                </div>
                <Box
                    position="fixed"
                    bottom={4}
                    right={16}
                    zIndex={999}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="14rem"
                    height="48px"
                    borderRadius="2xl"
                    boxShadow="lg"
                    bg="teal.500"
                    color="white"
                    cursor="pointer"
                    transition="all 0.3s ease"
                    _hover={{
                        transform: 'scale(1.1)',
                        boxShadow: 'xl',
                    }}
                >
                    <Button
                        variant="unstyled"
                        size="md"
                        aria-label="Scroll to top"
                    >
                        <Link href="/products/create/">
                            Add Product
                        </Link>
                    </Button>
                </Box>

            </Wrapper>
        </>
    );
}
