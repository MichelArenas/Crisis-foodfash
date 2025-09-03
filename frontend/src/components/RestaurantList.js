import React from "react";

export default function RestaurantList({ restaurants, onOrder, loading }) {
  return (
    <section>
      <h2>Available Restaurants</h2>
      {loading && <p>Processing order...</p>}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        marginBottom: "40px"
      }}>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            backgroundColor: "#f9f9f9"
          }}>
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
            <p>{restaurant.rating}/5</p>
            <p>{restaurant.delivery_time} min delivery</p>
            <button
              onClick={() => onOrder(restaurant.id, restaurant.name)}
              disabled={loading}
              style={{
                backgroundColor: loading ? "#ccc" : "#4CAF50",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Processing..." : "Order Now - $15.99"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
