'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {getNotifications} from "@/services/products";

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
        <div>
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            {notifications.length === 0 ? (
                <p>No notifications found.</p>
            ) : (
                <ul>
                    {notifications.map((notification) => (
                        <li key={notification.id} className="mb-2">
                            <strong>Order ID:</strong> {notification.order_id}
                            <br />
                            <strong>Notification Title:</strong> {notification.notification_title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
