import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface CartItem {
  productid: string;
  quantity: number;
  price: number;
}

interface Product {
  id: string;
  name: string;
  model: string;
  details: {
    phase: string;
    height: number;
    length: number;
    // ... other product details
  };
  image_paths: string[];
  price: number;
}

interface CartProduct extends CartItem {
  product: Product;
}

// Order type from order_history API response
interface OrderDetails {
  order_id: string;
  product_name: string;
  product_model: string;
  product_details: string;
  quantity_ordered: number;
  total_amount: number;
  payment_option: string;
  order_status: string;
}

const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    return payload.user_id;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orderHistory, setOrderHistory] = useState<OrderDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart and product data
  const fetchCartData = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError('Please login to view your cart');
      setLoading(false);
      return;
    }

    try {
      // Fetch cart items
      const cartResponse = await fetch('http://localhost:8000/cart/getcartdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-KEY': API_KEY,
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!cartResponse.ok) throw new Error('Failed to fetch cart');
      const cartData = await cartResponse.json();
      setCartItems(cartData.cart_items);

      // Fetch all products
      const productsResponse = await fetch('http://localhost:8000/products/all', {
        headers: {
          'API-KEY': API_KEY,
        },
      });
      if (!productsResponse.ok) throw new Error('Failed to fetch products');
      const productsData = await productsResponse.json();
      setProducts(productsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  // Fetch order history
  const fetchOrderHistory = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      alert('Please login to view order history');
      return;
    }
    setOrdersLoading(true);
    try {
      const response = await fetch('http://localhost:8000/order/orderhistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-KEY': API_KEY,
        },
        body: JSON.stringify({ user_id: userId }),
      });
      if (!response.ok) throw new Error('Failed to fetch order history');
      const orderData = await response.json();
      setOrderHistory(orderData);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to load order history');
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // Handle quantity changes in cart (existing logic)
  const handleQuantityChange = async (productId: string, action: 'increase' | 'decrease') => {
    const userId = getUserIdFromToken();
    if (!userId) {
      alert('Please login to modify cart');
      return;
    }

    try {
      // Optimistic UI update
      setCartItems((prev) => {
        const item = prev.find((item) => item.productid === productId);
        if (!item) return prev;
        const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;

        if (newQuantity <= 0) {
          return prev.filter((i) => i.productid !== productId);
        }
        return prev.map((i) =>
          i.productid === productId ? { ...i, quantity: newQuantity } : i
        );
      });

      const endpoint = action === 'increase' ? 'increasequantity' : 'decreasemethods';
      const response = await fetch(`http://localhost:8000/cart/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-KEY': API_KEY,
        },
        body: JSON.stringify({ productid: productId }),
      });

      if (!response.ok) throw new Error(`Failed to ${action} quantity`);
    } catch (error) {
      // Re-fetch cart data on error
      fetchCartData();
      alert(`Failed to update quantity: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };


  const cartWithProducts: CartProduct[] = cartItems
    .map((item) => ({
      ...item,
      product: products.find((p) => p.id === item.productid),
    }))
    .filter((item): item is CartProduct => !!item.product);

  
  const totalAmount = cartWithProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

 
  const handleCheckout = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      alert('Please login to checkout');
      return;
    }
  
    try {
    
      for (const item of cartWithProducts) {
        const totalAmountString = (item.price * item.quantity).toFixed(2);
        const orderQuantityString = item.quantity.toString(); 
        const orderPayload = {
          user_id: userId,
          productid: item.productid,
          order_quantity: orderQuantityString, 
          totalamount: totalAmountString, 
          paymentoption: 'COD', 
          orderstatus: 'Pending',
        };
        const response = await fetch('http://localhost:8000/order/addorder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'API-KEY': API_KEY,
          },
          body: JSON.stringify(orderPayload),
        });
        if (!response.ok) throw new Error('Failed to create order for one or more items');
      }
      alert('Order placed successfully!');
      fetchCartData();
    } catch (error) {
      alert(`Checkout error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };
  
  

  if (loading) {
    return (
      <div className="text-center py-20">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <FaSpinner className="text-4xl text-[#8EB03E] mx-auto" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error} <br />
        <Link to="/login" className="text-[#8EB03E] hover:underline">
          Login here
        </Link>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-50 bg-gray-50 min-h-screen"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#8EB03E] mb-8">Your Shopping Cart</h1>

        {cartWithProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Your cart is empty.{' '}
            <Link to="/products" className="text-[#8EB03E] hover:underline">
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-6 mb-8">
              {cartWithProducts.map((item, index) => (
                <motion.div
                  key={item.productid}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row gap-6"
                >
                  <div className="w-full md:w-48 h-48 bg-gray-100 rounded-lg overflow-hidden">
                    {item.product.image_paths?.length > 0 ? (
                      <img
                        src={item.product.image_paths[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-[#8EB03E]">{item.product.name}</h2>
                    <p className="text-gray-600">{item.product.model}</p>

                    <div className="mt-4 flex flex-wrap gap-4 items-center">
                      <div className="flex items-center gap-2 bg-[#8EB03E]/10 rounded-full px-3 py-1">
                        <button
                          onClick={() => handleQuantityChange(item.productid, 'decrease')}
                          className="text-[#8EB03E] hover:bg-[#8EB03E]/20 rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-[#8EB03E] font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.productid, 'increase')}
                          className="text-[#8EB03E] hover:bg-[#8EB03E]/20 rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex gap-4">
                        <p className="text-lg font-semibold">Price: {item.price.toFixed(2)}</p>
                        <p className="text-lg font-semibold text-[#8EB03E]">
                          Total: {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#8EB03E]">Total Amount</h2>
                <p className="text-2xl font-bold">{totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCheckout}
                  className="bg-[#8EB03E] hover:bg-[#7A9C2F] text-white px-6 py-3 rounded-full text-lg font-medium transition-colors"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={fetchOrderHistory}
                  className="bg-[#8EB03E] hover:bg-[#7A9C2F] text-white px-6 py-3 rounded-full text-lg font-medium transition-colors"
                >
                  View Order History
                </button>
              </div>
            </motion.div>

            {ordersLoading ? (
              <div className="text-center py-10">
                <FaSpinner className="animate-spin text-4xl text-[#8EB03E] mx-auto" />
              </div>
            ) : orderHistory.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-white rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-[#8EB03E] mb-4">Order History</h2>
                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <div key={order.order_id} className="border-b pb-4">
                      <p>
                        <strong>Order ID:</strong> {order.order_id}
                      </p>
                      <p>
                        <strong>Product:</strong> {order.product_name} ({order.product_model})
                      </p>
                      <p>
                        <strong>Quantity:</strong> {order.quantity_ordered}
                      </p>
                      <p>
                        <strong>Total:</strong> ${order.total_amount.toFixed(2)}
                      </p>
                      <p>
                        <strong>Payment Option:</strong> {order.payment_option}
                      </p>
                      <p>
                        <strong>Status:</strong> {order.order_status}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </>
        )}
      </div>
    </motion.section>
  );
};

export default CartPage;
