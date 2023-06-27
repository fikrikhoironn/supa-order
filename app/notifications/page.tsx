'use client'
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {getNotifications} from "@/services/products";
import Wrapper from "@/components/common/wrapper";
import Navbar from "@/components/common/navbar";
import {Center, Spinner, VStack} from "@chakra-ui/react";
import NotificationCard from "@/components/notifications/notification-card";

interface Notification {
    id: number;
    order_id: number;
    notification_title: string;
}

export default function Notifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const { data, error } = await getNotifications();
            if (error) {
                console.error('Error fetching notifications:', error);
            } else {
                setNotifications(data);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <>
            <Navbar/>
            <Wrapper>
                <VStack pt="3">
                    <h1 className="text-2xl font-bold mb-4">Notifications</h1>
                    {notifications.length === 0 ? (
                        <Center py="12rem">
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='xl'
                            />
                        </Center>
                    ) : (
                        <ul>
                                {notifications.map((notification) => (
                                    <li key={notification.id} className="mb-2">
                                        <NotificationCard notificationTitle={notification.notification_title} orderId={notification.order_id}/>
                                    </li>
                                ))}
                        </ul>
                    )}
                </VStack>

            </Wrapper>
        </>
    );
}
