'use client'
import { useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {getOrderList} from "@/services/products";

interface Product {
    product_id: {
        title: string;
    };
}

interface Order {
    product_variant_id: number;
    quantity: number;
    product: Product;
}

export default function OrderList(): JSX.Element {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {
        try {
            const { data, error } = await getOrderList();
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
        <div>
            <h1>Order List</h1>
            {orders.map((order) => (
                <div key={order.product_variant_id}>
                    <h2>Product Variant ID: {order.product_variant_id}</h2>
                    <p>Quantity: {order.quantity}</p>
                    <p>Product Title: {order.product.product_id.title}</p>
                </div>
            ))}
        </div>
    );
}
