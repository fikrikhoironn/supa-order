import {supabase} from "@/lib/supabase";
import exp from "constants";

export const getProduct = async (id: number) => {
    return await supabase
        .from('products')
        .select(`id, title, product_variants (id, product_id, price)`)
        .eq('id', id)
};

export const getProducts = async () => {
    return await supabase
        .from('products')
        .select(`id, title`)
};

export const getOrderList = async () => {
    return await supabase
        .from('orders')
        .select('product_variant_id, quantity, products:product_variants(product_id:products(title))');
};


export const showProducts = async () => {
    return await supabase
        .from('products-variants').select('*');
}

export const getProductVariants = async () => {
    return await supabase
        .from('product_variants').select('*');
}

export const insertOrder = async (selectedProductVariant: number, quantity: number) => {
    return await supabase
        .from('orders').insert([
        {
            product_variant_id: selectedProductVariant,
            quantity: quantity,
        },
    ]);
}

export const getNotifications = async () => {
    return await supabase
        .from('notifications')
        .select('*');
}

export const getProductVariant = async (id: number) => {
    return await supabase
        .from('product_variants')
        .select('*')
        .eq('id', id)
        .single();

}

export const updateProductVariant = async (id: number, price: number) => {
    return await supabase
        .from('product_variants')
        .update({price: price})
        .eq('id', id);
}
