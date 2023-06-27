'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from "@/components/common/navbar";
import Wrapper from "@/components/common/wrapper";
import {Box, Button, Input, Text, VStack, useToast, Center, Spinner} from "@chakra-ui/react";
import {getProduct} from "@/services/products";

interface PageProps {
    params: {
        id: number;
    };
}

export default function UpdateProduct({ params }: PageProps) {
    const toast = useToast();
    const [product, setProduct] = useState<any>(null);
    const [title, setTitle] = useState('');
    const [dbTitle, setDbTitle] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            const { data, error } = await getProduct(params.id)
            console.log(data)
            if (error) {
                toast({
                    title: "Error",
                    description: "Error fetching product",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "top"
                })
            } else {
                setProduct(data);
                setTitle(data[0].title);
                setDbTitle(data[0].title);
            }
        };

        fetchProduct();
    }, [params.id]);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!title) {
            toast({
                title: "Title must not be blank",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
            return;
        }

        const updatedProduct = {
            id: params.id,
            title: title,
        };

        const { error } = await supabase
            .from('products')
            .update(updatedProduct)
            .eq('id', params.id);

        if (error) {
            toast({
                title: "Error updating product",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
        } else {
            setDbTitle(title);
            toast({
                title: "Product updated successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
        }
    };

    if (!product) {
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
        );
    }

    return (
        <>
            <Navbar />
            <Wrapper>
                <Box py="8rem">
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4} py="2rem">
                            <Text fontSize="2xl" fontWeight="black">Update Product {dbTitle}</Text>
                            <label htmlFor="title">Title:</label>
                            <Input
                                type="text"
                                id="title"
                                value={title}
                                onChange={handleTitleChange}
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
