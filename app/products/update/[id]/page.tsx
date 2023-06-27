'use client'
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from "@/components/common/navbar";
import Wrapper from "@/components/common/wrapper";
import {Box, Button, Input, Text, VStack, useToast} from "@chakra-ui/react";

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
        // Fetch the product from the database
        const fetchProduct = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', params.id)
                .single();

            if (error) {
                console.error('Error fetching product:', error);
            } else {
                setProduct(data);
                setTitle(data.title);
                setDbTitle(data.title);
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
            console.error('Title must not be blank');
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

        // Update the product in the database
        const { error } = await supabase
            .from('products')
            .update(updatedProduct)
            .eq('id', params.id);

        if (error) {
            console.error('Error updating product:', error);
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
        return <div>Loading...</div>;
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
