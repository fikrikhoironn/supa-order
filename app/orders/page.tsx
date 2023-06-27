'use client'
import {useEffect, useState} from 'react';
import {Table, useToast, Thead, Tbody, Tr, Th, Td, TableCaption, Text, Center} from '@chakra-ui/react';
import {getOrderList} from '@/services/products';
import Navbar from "@/components/common/navbar";
import Wrapper from "@/components/common/wrapper";
import FloatingButton from "@/components/common/floating-button";

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
    const toast = useToast();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const {data, error} = await getOrderList();
                console.log(data);
                if (error) {
                    toast({
                        title: "Error",
                        description: "Error fetching orders",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                        position: "top"
                    });
                }
                // @ts-ignore
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
        fetchOrders();
    }, []);


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
                            <Th>Product Title</Th>
                            <Th>Product Variant ID</Th>
                            <Th>Quantity</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.map((order, index) => (
                            <Tr key={order.product_variant_id}>
                                <Td>{index + 1}</Td>
                                <Td>{order.products.product_id.title}</Td>
                                <Td>{order.product_variant_id}</Td>
                                <Td>{order.quantity}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <FloatingButton text="Add Order" url={`/orders/create`}/>

            </Wrapper>
        </>
    );
}
