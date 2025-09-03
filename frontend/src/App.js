import React, { useState, useEffect } from "react";
import { getUserOrders, createOrder } from "./services/api";
import RestaurantList from "./components/RestaurantList";
import OrderList from "./components/OrderList";
import ErrorAlert from "./components/ErrorAlert";
import "./App.css";

function App() {
  const [restaurants] = useState([
    { id: 1, name: "Pizza Palace", description: "Best pizza in town", rating: 4.5, delivery_time: 30 },
    { id: 2, name: "Burger Barn", description: "Gourmet burgers and fries", rating: 4.2, delivery_time: 25 },
    { id: 3, name: "Taco Fiesta", description: "Authentic Mexican cuisine", rating: 4.8, delivery_time: 35 }
  ]);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await getUserOrders(1);
      setOrders(response.data);
    } catch (err) {
      console.error("Error loading orders:", err);
    }
  };

  const placeOrder = async (restaurantId, restaurantName) => {
    try {
      setLoading(true);
      setError(null);

      const orderData = {
        userId: 1,
        restaurantId,
        items: [{ id: 1, name: "Sample Item", quantity: 1, price: 15.99 }],
        total: 15.99,
        paymentInfo: { paymentMethodId: "pm_test_card" }
      };

      const response = await createOrder(orderData);

      if (response.data.success) {
        alert(`Order placed successfully at ${restaurantName}!`);
        loadOrders();
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setError(`Failed to place order: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>FoodFlash</h1>
        <p>Fast food delivery at your fingertips</p>
      </header>

      <ErrorAlert message={error} />

      <main style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <RestaurantList restaurants={restaurants} onOrder={placeOrder} loading={loading} />
        <OrderList orders={orders} />
      </main>

      <footer style={{ textAlign: "center", padding: "20px", marginTop: "40px", borderTop: "1px solid #eee" }}>
        <p>© 2025 FoodFlash - Powered by hunger and code</p>
      </footer>
    </div>
  );
}

export default App;
