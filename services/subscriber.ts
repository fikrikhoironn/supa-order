import {supabase} from "@/lib/supabase";

const channel = supabase
    .channel('schema-db-changes')
    .on(
        'postgres_changes',
        {
            event: 'INSERT',
            schema: 'public',
            table: 'orders',
        },
        async (payload) => {
            console.log(payload)
            // @ts-ignore
            setNotifications((prevNotifications) => [payload.new, ...prevNotifications ]);                const {new: order} = payload;
            try {
                // Retrieve the product variant and its details
                const {data: productVariant, error: variantError} = await supabase
                    .from('product_variants')
                    .select('price, product_id')
                    .eq('id', order.product_variant_id)
                    .single();

                if (variantError) {
                    console.log('Error retrieving product variant:', variantError)
                    throw variantError;
                }

                // Retrieve the product title
                const {data: product, error: productError} = await supabase
                    .from('products')
                    .select('title')
                    .eq('id', productVariant.product_id)
                    .single();

                if (productError) {
                    console.log('Error retrieving product:', productError)
                    throw productError;
                }

                // Construct the notification title
                const notificationTitle = `${product.title} - ${productVariant.price}`;

                console.log('Notification title:', notificationTitle);
                // Insert the notification into the notifications table
                console.log('Inserting notification...')
                const {data: newNotification, error: insertError} = await supabase
                    .from('notifications')
                    .upsert({
                        order_id: order.id,
                        notification_title: notificationTitle,
                    }, {onConflict: 'order_id'});

                if (insertError) {
                    console.log('Error inserting notification:', insertError)
                    throw insertError;
                }

                console.log('Notification inserted:', newNotification);
            } catch (error) {
                console.error('Error inserting notification:', error);
            }
        })
    .subscribe();

// const req2 = supabase
//     .channel('schema-db-changes')
//     .on(
//         'postgres_changes',
//         {
//             event: '*',
//             schema: 'public',
//             table: 'products',
//         },
//         async (payload) => {
//             console.log(payload)
//             const { new: updatedProduct } = payload;
//             try {
//                 // Get all related notifications
//                 const { data: notifications, error: fetchError } = await supabase
//                     .from('notifications')
//                     .select('id, order:orders (product_variant:product_variants(*))')
//                     .eq('order.product_variant.product_id', updatedProduct.id);
//
//                 if (fetchError) {
//                     throw fetchError;
//                 }
//
//                 // Update each notification
//                 console.log(notifications)
//                 for (const notification of notifications) {
//                     const newTitle = `${updatedProduct.title} - ${notification.order.product_variant.price}`;
//                     const { error: updateError } = await supabase
//                         .from('notifications')
//                         .update({ notification_title: newTitle })
//                         .eq('id', notification.id);
//
//                     if (updateError) {
//                         throw updateError;
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error updating notifications:', error);
//             }
//         })
//     .subscribe();
