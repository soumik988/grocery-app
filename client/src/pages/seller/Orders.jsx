import { useContext, useEffect, useState } from "react";
// FIXED: Corrected relative import path
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { axios } = useContext(AppContext);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("api/orders/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders available.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:grid md:grid-cols-[2fr_1.5fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
          >
            {/* Product Info */}
            <div className="flex gap-5">
              <img
                className="w-12 h-12 object-cover opacity-60"
                src={
                  order.items?.[0]?.product?.image?.[0]
                    ? `http://localhost:5000/images/${order.items[0].product.image[0]}`
                    : assets.box_icon
                }
                alt="Order Box"
              />
              <div>
                {order.items.map((item, idx) => (
                  <p key={idx} className="font-medium">
                    {item.product.name}{" "}
                    <span
                      className={`text-indigo-500 ${
                        item.quantity < 2 ? "hidden" : ""
                      }`}
                    >
                      x {item.quantity}
                    </span>
                  </p>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="text-sm leading-5">
              <p className="font-medium mb-1">
                {order.address?.firstName ?? "N/A"} {order.address?.lastName ?? ""}
              </p>
              <p>
                {order.address?.street ?? ""}, {order.address?.city ?? ""},{" "}
                {order.address?.state ?? ""}, {order.address?.zipcode ?? ""},{" "}
                {order.address?.country ?? ""}
              </p>
            </div>

            {/* Amount */}
            <p className="font-medium text-base my-auto text-black/70">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(order.amount)}
            </p>

            {/* Order Details */}
            <div className="flex flex-col text-sm leading-5">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p>
                Payment:{" "}
                <span
                  className={`font-semibold ${
                    order.isPaid ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
