'use client'

import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/lib/supabase'
import Wrapper from "@/components/common/wrapper";
import Navbar from "@/components/common/navbar";
import { VStack, Button, Input, Text, Box, useToast} from "@chakra-ui/react";

export default function CreateProduct() {
    const toast = useToast();
    const [title, setTitle] = useState('');

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (title.trim() === '') {
            toast({
                title: "Title must not be blank",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
            return;
        }

        const {error } = await supabase.from('products').insert([{ title }]);

        if (error) {
            toast({
                title: "Error creating product",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
        } else {
            setTitle('');
            toast({
                title: "Product created successfully",
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
                        <Text fontSize="2xl" fontWeight="black">Create Product</Text>
                        <label htmlFor="title">Title:</label>
                        <Input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            width="16rem"
                            variant="outline"
                        />
                        <Button type="submit" variant='outline' colorScheme="biru" w="8rem">Create</Button>
                    </VStack>
                </form>
            </Box>
            </Wrapper>
        </>
    );
}
