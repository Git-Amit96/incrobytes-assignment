import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard.jsx';


const Products = () => {

  const [products, setProducts] = useState([]);
  const {subCategory}= useParams();

  const fetchCategories = async () => {
    const res = await fetch(`http://localhost:3000/item/products/${subCategory}`, {
      method: "GET",
      credentials: "include",
    });
    const json = await res.json();
    setProducts(json.data);

  }
  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    products.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4  w-[90%] m-auto">
        {products.map((category) => (
            <ItemCard
              key={category._id}
              name={category.name}
              description={category.description}
              price= {category.price}
            />
        ))}
      </div>
    ) : (
      <></>
    )
  );

};

export default Products;