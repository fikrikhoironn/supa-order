'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {getProductVariant} from "@/services/products";
import Navbar from "@/components/common/navbar";
import Wrapper from "@/components/common/wrapper";
import {Box, Button, Input, Text, VStack, useToast} from "@chakra-ui/react";

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
            console.error('Price must not be blank');
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

        // Update the products variant in the database
        const { error } = await supabase
            .from('product_variants')
            .update(updatedProductVariant)
            .eq('id', params.id);

        if (error) {
            console.error('Error updating products variant:', error);
            toast({
                title: "Error updating products variant",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
        } else {
            console.log('Product variant updated successfully');
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
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <Wrapper>
                <Box py="8rem">
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