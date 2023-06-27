'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {getProductVariant} from "@/services/products";
import Navbar from "@/components/common/navbar";
import Wrapper from "@/components/common/wrapper";
import {Box, Button, Input, Text, VStack, useToast, Center, Spinner} from "@chakra-ui/react";

interface PageProps {
    params: {
        id: number;
    };
}

export default function UpdateProduct({ params }: PageProps) {
    const [productVariant, setProductVariant] = useState(null);
    const [price, setPrice] = useState('');
    const toast = useToast();

    useEffect(() => {
        const fetchProductVariant = async () => {
            const { data, error } = await getProductVariant(params.id);
            if (error) {
                toast({
                    title: "Error",
                    description: "Error fetching products-variants",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "top"
                })
            } else {
                setProductVariant(data);
                setPrice(data.price.toString());
            }
        };

        fetchProductVariant();
    }, [params.id, toast]);

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!price) {
            toast({
                title: "Price must not be blank",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
            return;
        }

        const updatedProductVariant = {
            id: params.id,
            price: parseFloat(price),
        };

        const { error } = await supabase
            .from('product_variants')
            .update(updatedProductVariant)
            .eq('id', params.id);

        if (error) {
            toast({
                title: "Error updating products variant",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
        } else {
            toast({
                title: "Product variant updated successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
        }
    };

    if (!productVariant) {
        return (
            <>
                <Center py="12rem">
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />;
                </Center>
            </>

        )

    }

    return (
        <>
            <Navbar />
            <Wrapper>
                <Box py="8rem" className="min-h-screen">
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4} py="2rem">
                            <Text fontSize="2xl" fontWeight="black">Update Variant {params.id}</Text>
                            <label htmlFor="price">price:</label>
                            <Input
                                type="text"
                                id="price"
                                value={price}
                                onChange={handlePriceChange}
                                width="16rem"
                            />
                            <Button type="submit" variant='outline' colorScheme="biru" w="8rem">Update</Button>
                        </VStack>
                    </form>
                </Box>
            </Wrapper>
        </>
    );
}
