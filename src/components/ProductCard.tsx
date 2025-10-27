import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import type { Product } from "../store/productStore";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      </Link>

      <h3 className="mt-2 font-semibold text-gray-800">{product.name}</h3>
      <p className="text-red-600 font-bold">{product.price.toLocaleString()} đ</p>

      <button
        className="mt-3 bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 w-full"
        onClick={() => addToCart({ id: product.id, title: product.name, price: product.price, image: product.image, quantity: 1 })}
      >
        🛒 Thêm vào giỏ
      </button>
    </div>
  );
};

export default ProductCard;
