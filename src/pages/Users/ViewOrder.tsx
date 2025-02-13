import { useEffect } from "react";
import { useGetOrderQuery } from "../../redux/fetchers/products/getOrder";
import { useAppSelector } from "../../redux/hooks";
import Spinnter from "../../reuseComponents/Spinnter";
type TOrder = {
  address: string;
  amount: number;
  city: string;
  email: string;
  name: string;
  product: {
    name: string;
    image: string;
  };
  quantity: number;
  status: "pending" | "confirmed" | "shipped" | "delivered"; // যদি ফিক্সড স্ট্যাটাস থাকে
  user: string;
  zip: string;
};
const ViewOrder = () => {
  const { email } = useAppSelector(
    (state) => state.auth.user as { email: string }
  );
  const { data, isLoading, refetch } = useGetOrderQuery(email);

  useEffect(() => {
    refetch();
  }, []);
  return (
    <div className="">
      <div className="">
        <div className="overflow-x-auto">
          <table className=" table  table-zebra">
            <thead>
              <tr>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Price ($)</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6}>
                    <Spinnter />
                  </td>
                </tr>
              ) : (
                data?.data?.map((order: TOrder, index: number) => (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.product.name}</td>
                    <td>
                      <img
                        src={order.product.image}
                        alt="Product"
                        className="h-10 w-10 object-cover rounded mx-auto"
                      />
                    </td>
                    <td>${order.amount.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
