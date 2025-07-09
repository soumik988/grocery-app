import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="mt-12 pb-16">
      <div>
        <p className="text-2xl md:text-3xl font-medium">My Orders</p>
      </div>

      {myOrders.length === 0 ? (
        <p className="mt-8 text-gray-500">No orders yet.</p>
      ) : (
        myOrders.map((order) => (
          <div
            key={order._id}
            className="my-8 border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
          >
            <p className="flex justify-between items-center gap-6">
              <span>Order ID: {order._id}</span>
              <span>Payment: {order.paymentType}</span>
              <span>Total Amount: ${order.amount}</span>
            </p>

            {order.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={`relative bg-white text-gray-800/70 ${
                  order.items.length !== itemIndex + 1 ? "border-b" : ""
                } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 w-full max-w-4xl`}
              >
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="p-4 rounded-lg">
                    <img
                      src={
                        item.product?.image?.[0]
                          ? `http://localhost:5000/images/${item.product.image[0]}`
                          : "/default.jpg"
                      }
                      alt={item.product?.name || "product image"}
                      className="w-16 h-16 object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-medium">{item.product?.name}</h2>
                    <p>{item.product?.category}</p>
                  </div>
                </div>

                <div className="text-lg font-medium">
                  <p>Quantity: {item.quantity || 1}</p>
                  <p>Status: {order.status || "Pending"}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
                </div>

                <p className="text-lg">
                  Amount: $
                  {Number(item.product?.offerPrice || 0) * Number(item.quantity || 1)}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
