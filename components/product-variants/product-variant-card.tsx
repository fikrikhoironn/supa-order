import Link from "next/link";
import {Text, Card} from "@chakra-ui/react";

interface ProductVariant {
    id: number;
    price: number;
}

export default function ProductVariantCard(props: ProductVariant): JSX.Element {
    const {id, price} = props;

    return (
        <Card
            minH="4rem"
            minW="40"
            margin="0.5rem"
            justifyContent="center"
            _hover={{
                background: 'white',
                color: 'teal.500',
            }}>
            <Link href={`/product-variants/update/${id}`}>
                <Text fontSize="1rem" fontWeight="400" textAlign="center">Variant {id}</Text>
                <Text fontSize="1rem" fontWeight="400" textAlign="center">$ {price}</Text>
            </Link>
        </Card>
    );
}
