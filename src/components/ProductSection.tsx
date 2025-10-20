import ProductCard from "./ProductCard";
import type { Product } from "../types/product";

const ProductSection = () => {
  const products: Product[] = [
    { id: 101, title: "Modern Chair", price: 149.99, image: "https://picsum.photos/400?1", description: "Comfortable modern chair", category: "furniture" },
    { id: 102, title: "Elegant Lamp", price: 89.99, image: "https://picsum.photos/400?2", description: "Elegant lamp", category: "lighting" },
    { id: 103, title: "Luxury Sofa", price: 799.99, image: "https://picsum.photos/400?3", description: "Comfortable sofa", category: "furniture" },
    { id: 104, title: "Wooden Table", price: 259.99, image: "https://picsum.photos/400?4", description: "Solid wood table", category: "furniture" }
  ];

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Our Featured Products</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
