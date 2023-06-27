'use client'
import {useEffect, useState} from 'react';
import {Table, Thead, Tbody, Tr, Th, Td, TableCaption, Text, Center, Box, Button} from '@chakra-ui/react';
import {getOrderList} from '@/services/products';
import Navbar from "@/components/common/navbar";
import Wrapper from "@/components/common/wrapper";
import Link from "next/link";

interface Product {
    product_id: {
        title: string;
    };
}

interface Order {
    product_variant_id: number;
    quantity: number;
    products: Product;
}

export default function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {
        try {
            const {data, error} = await getOrderList();
            console.log(data);
            if (error) {
                throw error;
            }
            // @ts-ignore
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    return (
        <>
            <Navbar/>
            <Wrapper>
                <Center py="2rem">
                    <Text fontSize="2xl" fontWeight="black">Order List</Text>
                </Center>
                <Table variant="simple">
                    <TableCaption>Orders</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Product Variant ID</Th>
                            <Th>Quantity</Th>
                            <Th>Product Title</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.map((order, index) => (
                            <Tr key={order.product_variant_id}>
                                <Td>{index + 1}</Td>
                                <Td>{order.product_variant_id}</Td>
                                <Td>{order.quantity}</Td>
                                <Td>{order.products.product_id.title}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
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
                        <Link href={`/orders/create`}>
                            Add Order
                        </Link>
                    </Button>
                </Box>

            </Wrapper>
        </>
    );
}
