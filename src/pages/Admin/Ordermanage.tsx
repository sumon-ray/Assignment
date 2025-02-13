/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useGetAllOrderQuery } from "../../redux/fetchers/products/getAllOrder";
import { useUpdateOrderMutation } from "../../redux/fetchers/products/updateOrder";
import Spinnter from "../../reuseComponents/Spinnter";
import { ToastContainer, toast } from "react-toastify";
const Ordermanage = () => {
  const { data, isLoading, refetch } = useGetAllOrderQuery("");
  const [orderStatus, { isSuccess }] = useUpdateOrderMutation();
  const handelPayProcess = (e: any, id: string) => {
    const status = { status: e.target.value, id };
    orderStatus(status);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("successfully Statusch Change");
      refetch();
    }
  }, [isSuccess]);
  return (
    <div>
      <ToastContainer />

      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th>Name</th>
              <th>email</th>
              <th>price</th>
              <th>adderse</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>{isLoading ? <Spinnter /> : ""}</tr>
            {data?.data &&
              data?.data.map((item: Record<string, string>) => (
                <>
                  <tr>
                    <th>{item.name}</th>
                    <th>{item.email}</th>
                    <th>{item.amount}</th>
                    <th>{item.city}</th>
                    <th>
                      <select
                        onChange={(e) => handelPayProcess(e, item._id)}
                        defaultValue={item.status}
                        name=""
                        id=""
                      >
                        <option value="progress">Progress</option>
                        <option value="pending">Pending</option>
                        <option value="shipping">Shipping</option>
                        <option value="complate">Complate</option>
                      </select>
                    </th>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ordermanage;
