'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import Navbar from "@/components/common/navbar";
import Wrapper from "@/components/common/wrapper";
import {Box, Button, Input, Text, VStack, useToast} from "@chakra-ui/react";
import {insertVariant} from "@/services/products";

interface PageProps {
    params: {
        id: number;
    };
}


export default function CreateVariant({ params }: PageProps) {
    const toast = useToast();
    const productId = params.id;
    const [price, setPrice] = useState('');

    const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (price.trim() === '') {
            toast({
                title: "Price must not be blank",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
            return;
        }
        const { error } = await insertVariant(productId, price)

        if (error) {
            toast({
                title: "Error creating variant",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
        } else {
            setPrice('');
            toast({
                title: "Variant created successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
        }
    };

    return (
        <>
        <Navbar />
        <Wrapper>
            <Box py="8rem" className="min-h-screen">
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} py="2rem">
                        <Text fontSize="2xl" fontWeight="black">Create Variant</Text>
                        <label htmlFor="title">Price:</label>
                        <Input
                            type="number"
                            id="price"
                            value={price}
                            onChange={handlePriceChange}
                            width="16rem"
                        />
                        <Button type="submit" variant='outline' colorScheme="biru" w="8rem">Create</Button>
                    </VStack>
                </form>
            </Box>
        </Wrapper>
        </>
    );
}
