import React from "react";

export default function OrderList({ orders }) {
  return (
    <section>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet. Place your first order above!</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {orders.map((order) => (
            <div key={order.id} style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              backgroundColor: "#ffffff"
            }}>
              <p><strong>Order #{order.id}</strong></p>
              <p>
                Status:{" "}
                <span style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  backgroundColor:
                    order.status === "delivered" ? "#4CAF50" :
                    order.status === "preparing" ? "#FF9800" : "#2196F3",
                  color: "white"
                }}>
                  {order.status}
                </span>
              </p>
              <p>Total: ${order.total}</p>
              <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
              {order.restaurant_name && <p>Restaurant: {order.restaurant_name}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
