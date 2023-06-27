import Link from "next/link";
import {Text, Card} from "@chakra-ui/react";

interface Product {
    id: number;
    title: string;
}

export default function ProductCard(props: Product) {
    const {id, title} = props;

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
            <Link href={`/products/${id}`}>
                <Text fontSize="1rem" fontWeight="400" textAlign="center">{title}</Text>
            </Link>
        </Card>
    );
}
