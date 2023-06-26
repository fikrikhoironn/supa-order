import Link from "next/link";

interface Product {
    id: number;
    title: string;
}

export default function ProductCard(props: Product): JSX.Element {
    const { id, title } = props;

    return (
        <Link href={`/products/${id}`}>
            <div className="bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <button className="bg-blue-500 text-white mt-4 py-2 px-4 rounded">
                    Add to Cart
                </button>
            </div>
        </Link>
    );
}
