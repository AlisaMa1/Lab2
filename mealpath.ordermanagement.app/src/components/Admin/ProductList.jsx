import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UpdateForm from './UpdateForm';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [page, pageSize]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://localhost:7155/api/Products/all?page=${page}&pageSize=${pageSize}`);
      const responseData = response.data;

      if (Array.isArray(responseData)) {
        const totalCountHeader = response.headers['x-total-count'];
        setTotalProducts(totalCountHeader);
        setProducts(responseData);
      } else {
        console.error('Invalid response data format:', responseData);
      }
    } catch (error) {
      console.error('Error fetching product list:', error);
    }
  };

  const handleDelete = async (productId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this product?');

    if (!shouldDelete) {
      return;
    }

    try {
      await axios.delete(`https://localhost:7155/api/Products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdate = (productId) => {
    const selected = products.find((product) => product.productID === productId);
    setSelectedProduct(selected);
    setShowUpdateForm(true);
  };

  const handleUpdateFormCancel = () => {
    setShowUpdateForm(false);
    setSelectedProduct(null);
  };

  const handleUpdateSuccess = () => {
    setShowUpdateForm(false);
    setSelectedProduct(null);
    fetchProducts();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto my-8">
      <Link
        to="/createitem"
        className="bg-green-600 text-white py-2 px-4 rounded-lg text-lg mb-4 inline-block"
      >
        Create New Product
      </Link>
      <h1 className="text-3xl font-semibold mb-4">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.productID} className="w-275 h-[200px] min-w-[350px] md:w-300 md:min-w-[400px] bg-cardOverlay rounded-lg py-2 px-5 my-5 backdrop-blur-lg hover:drop-shadow-lg flex items-center justify-evenly relative">
            <div className="w-full flex items-center justify-between py-2">
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl "
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </div>
            <div className="flex flex-col flex-grow">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xl font-semibold mb-2">{product.title}</p>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                </div>
                <div className="text-green-600 font-semibold">${product.price}</div>
              </div>
              <div className="mt-auto flex justify-end">
                <button
                  className="bg-red-500 text-white px-3 py-1 mr-2 rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(product.productID)}
                >
                  Delete
                </button>
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                  onClick={() => handleUpdate(product.productID)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-white text-green-500 px-4 py-2 rounded-md cursor-pointer shadow-md"
        >
          Previous
        </button>
        <span className="text-lg font-semibold bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
          {page}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          // disabled={!totalProducts || page * pageSize >= totalProducts}
          className="bg-white text-green-500 px-4 py-2 rounded-md cursor-pointer shadow-md"
        >
          Next
        </button>
      </div>
      {showUpdateForm && selectedProduct && (
        <UpdateForm
          product={selectedProduct}
          onUpdate={handleUpdateSuccess}
          onCancel={handleUpdateFormCancel}
        />
      )}
    </div>
  );
};

export default observer(ProductList);
