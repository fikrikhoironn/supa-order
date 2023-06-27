'use client'
import { useEffect, useState} from 'react';
import {getProductVariants, insertOrder} from "@/services/products";
import Navbar from "@/components/common/navbar";
import Wrapper from "@/components/common/wrapper";
import {Center, VStack, useToast} from "@chakra-ui/react";

interface Product {
    id: number;
    title: string;
}

interface ProductVariant {
    id: number;
    product_id: number;
    price: number;
    product: Product;
}


export default function CreateOrder() {
    const toast = useToast();
    const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);
    const [selectedProductVariant, setSelectedProductVariant] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);

    useEffect(() => {
        const fetchProductVariants = async () => {
            try {
                const { data, error } = await getProductVariants();
                if (error) {
                    toast({
                        title: "Error",
                        description: "Error fetching products variants",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                        position: "top"
                    });
                }
                if (data) {
                    setProductVariants(data);
                }
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Error fetching products variants",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "top"
                });
            }
        };
        fetchProductVariants();
    }, [toast]);


    async function createOrder() {
        try {
            const { error } = await insertOrder(selectedProductVariant, quantity)
            if (error) {
                toast({
                    title: "Error",
                    description: "Error creating order",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "top"
                })
            }
            else {
                toast({
                    title: "Order created successfully",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                    position: "top"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Error creating order",
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top"
            })
        }
    }

    const handleProductVariantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedVariantId = parseInt(event.target.value);
        setSelectedProductVariant(selectedVariantId);
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const quantityValue = parseInt(event.target.value);
        setQuantity(quantityValue);
    };

    return (
        <>
            <Navbar/>
            <Wrapper>
                <div className="container mx-auto p-4 min-h-screen">
                    <Center>
                        <VStack>
                            <h1 className="text-2xl font-bold mb-4">Create Order</h1>
                            <div className="mb-4">
                                <label htmlFor="product-variant-select" className="mr-2">
                                    Product Variant:
                                </label>
                                <select
                                    id="product-variant-select"
                                    value={selectedProductVariant}
                                    onChange={handleProductVariantChange}
                                    className="border border-gray-300 px-2 py-1"
                                >
                                    <option value={0}>Select Product Variant</option>
                                    {productVariants.map((variant) => (
                                        <option key={variant.id} value={variant.id}>
                                            {variant.product.title} - Price: {variant.price}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="quantity-input" className="mr-2">
                                    Quantity:
                                </label>
                                <input
                                    type="number"
                                    id="quantity-input"
                                    value={quantity}
                                    min="1"
                                    onChange={handleQuantityChange}
                                    className="border border-gray-300 px-2 py-1"
                                />
                            </div>
                            <button
                                onClick={createOrder}
                                disabled={selectedProductVariant === 0 || quantity === 0}
                                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Create Order
                            </button>
                        </VStack>
                    </Center>
                </div>
            </Wrapper>
        </>
    );
}
