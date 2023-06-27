'use client'
import {useEffect, useState} from 'react';
import {getProduct} from "@/services/products";
import Wrapper from "@/components/common/wrapper";
import Navbar from "@/components/common/navbar";
import {Box, Center, HStack, Text, useToast} from "@chakra-ui/react";
import ProductVariantCard from "@/components/product-variants/product-variant-card";
import Link from "next/link";
import {FaEdit} from "react-icons/fa";
import FloatingButton from "@/components/common/floating-button"


interface ProductVariant {
    id: number;
    product_id: number;
    price: number;
}

interface PageProps {
    params: {
        id: number;
    };
}

interface Product {
    id: number;
    title: string;
    product_variants: ProductVariant[];
}

export default function ProductsPage({params}: PageProps) {
    const toast = useToast();
    const [products, setProducts] = useState<any>([]);
    const productId = params.id;
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const {data, error} = await getProduct(params.id);
                if (error) {
                    toast({
                        title: "Error",
                        description: "Error fetching products-variants",
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
                    description: "Error fetching products-variants",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "top"
                });
            }
        };
        fetchProducts();
    }, [params.id, toast]);


    return (
        <>
            <Navbar/>
            <Wrapper>
                <Box py="2rem">
                    {products.map((product: Product) => (
                        <div key={product.id} className="mb-6">
                            <Center>
                                <Text fontSize="2xl" fontWeight="black">{product.title}</Text>
                                <Link href={`/products/update/${product.id}`}>
                                    <FaEdit className="ml-4"/>
                                </Link>
                            </Center>
                            <Center my="8">
                                <HStack className="flex-wrap">
                                    {product.product_variants.map((variant: ProductVariant) => (
                                        <ProductVariantCard key={variant.id} id={variant.id} price={variant.price}/>
                                    ))}
                                </HStack>
                            </Center>
                        </div>
                    ))}
                </Box>
                <FloatingButton text="Add Variant" url={`/product-variants/create/${productId}`}/>
            </Wrapper>
        </>
    );
}
