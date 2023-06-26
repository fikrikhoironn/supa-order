'use client'
import { useEffect, useState } from 'react';
import {getProducts} from "@/services/products";

interface Product {
  id: number;
  title: string;
}

export default function ProductsPage(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (): Promise<void> => {
    try {
      const { data, error } = await getProducts();
      if (error) {
        console.error('Error fetching products:', error);
        return;
      }
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
      <div>
        <h1>Products</h1>
        {products.map((product) => (
            <div key={product.id}>
              <p>{product.title}</p>
              <button className="btn btn-primary">Button</button>
            </div>
        ))}
      </div>
  );
}
