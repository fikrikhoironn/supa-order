'use client'
import {useEffect, useState} from 'react';
import {getProduct} from "@/services/products";
import Wrapper from "@/components/common/wrapper";
import Navbar from "@/components/common/navbar";
import {Box, Button, Center, HStack, Text} from "@chakra-ui/react";
import ProductVariantCard from "@/components/product-variants/product-variant-card";
import Link from "next/link";
import {FaEdit} from "react-icons/fa";

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
    const [products, setProducts] = useState<any>([]);
    const productId = params.id;
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async (): Promise<void> => {
        try {
            const {data, error} = await getProduct(params.id);
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
                                <HStack>
                                    {product.product_variants.map((variant: ProductVariant) => (
                                        <ProductVariantCard id={variant.id} price={variant.price}/>
                                    ))}
                                </HStack>
                            </Center>
                        </div>
                    ))}
                </Box>
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
                        <Link href={`/product-variants/create/${productId}`}>
                            Add Variant
                        </Link>
                    </Button>
                </Box>
            </Wrapper>
        </>
    );
}
