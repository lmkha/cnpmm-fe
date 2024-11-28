import React, { Fragment, useEffect, useContext } from "react";
import moment from "moment";
import { fetchOrderByUser } from "./Action";
import Layout, { DashboardUserContext } from "./Layout";

const apiURL = process.env.REACT_APP_API_URL;

const TableHeader = () => {
  return (
    <Fragment>
      <thead>
        <tr>
          <th className="px-4 py-2 border">Products</th>
          <th className="px-4 py-2 border">Size</th>
          <th className="px-4 py-2 border">Status</th>
          <th className="px-4 py-2 border">Total</th>
          <th className="px-4 py-2 border">Phone</th>
          <th className="px-4 py-2 border">Address</th>
          <th className="px-4 py-2 border" style={{ maxWidth: "150px" }}>
            Transaction Id
          </th>
          <th className="px-4 py-2 border">Checkout</th>
          <th className="px-4 py-2 border">Processing</th>
        </tr>
      </thead>
    </Fragment>
  );
};

const TableBody = ({ order }) => {
  const getRandomSize = () => {
    const sizes = ["S", "M"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  return (
    <Fragment>
      <tr className="border-b" style={{ height: "100%" }}>
        <td className="hover:bg-gray-200 p-2 text-center cursor-default">
          {order.allProduct.map((product, i) => {
            return (
              <div
                className="block flex items-center"
                key={i}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    className="w-8 h-8 object-cover object-center"
                    src={`${apiURL}/uploads/products/${product.id.pImages[0]}`}
                    alt="productImage"
                    style={{ marginRight: 8 }}
                  />
                  <span>{product.id.pName}</span>
                </div>
                <span style={{ justifyContent: "end", marginLeft: 8 }}>
                  x{product.quantitiy}
                </span>
              </div>
            );
          })}
        </td>
        <td
          className="hover:bg-gray-200 p-2 text-center cursor-default gap-10"
          style={{ justifyContent: "space-between" }}
        >
          {order.allProduct.map((product, i) => {
            return (
              <div
                className="block flex items-center justify-center space-x-2"
                key={i}
              >
                <div>{getRandomSize()}</div>
              </div>
            );
          })}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center cursor-default">
          {order.status === "Not processed" && (
            <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Processing" && (
            <span className="block text-yellow-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Shipped" && (
            <span className="block text-blue-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Delivered" && (
            <span className="block text-green-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Cancelled" && (
            <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">
          ${order.amount}.00
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">{order.phone}</td>
        <td className="hover:bg-gray-200 p-2 text-center">{order.address}</td>
        <td
          className="hover:bg-gray-200 p-2 text-center"
          style={{ maxWidth: "150px" }}
        >
          {order.transactionId}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {moment(order.createdAt).format("lll")}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {moment(order.updatedAt).format("lll")}
        </td>
      </tr>
    </Fragment>
  );
};

const OrdersComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);
  const { OrderByUser: orders } = data;

  useEffect(() => {
    fetchOrderByUser(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.loading) {
    return (
      <div className="w-full md:w-10/12 flex items-center justify-center py-24">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }
  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-10/12 md:px-8">
        <div className="border">
          <div className="py-4 px-4 text-lg font-semibold border-t-2 border-yellow-700">
            Orders
          </div>
          <hr />
          <div className="overflow-auto bg-white shadow-lg p-4">
            <table className="table-auto border w-full my-2">
              <TableHeader />
              <tbody>
                {orders && orders.length > 0 ? (
                  orders.map((item, i) => {
                    return <TableBody key={i} order={item} />;
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-xl text-center font-semibold py-8"
                    >
                      No order found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="text-sm text-gray-600 mt-2">
              Total {orders && orders.length} order found
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const UserOrders = (props) => {
  return (
    <Fragment>
      <Layout children={<OrdersComponent />} />
    </Fragment>
  );
};

export default UserOrders;
