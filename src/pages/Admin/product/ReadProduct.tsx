/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import { useGetAllProductQuery } from "../../../redux/fetchers/products/getAllproductApi";

import Spinnter from "../../../reuseComponents/Spinnter";
import { useDeleteProductMutation } from "../../../redux/fetchers/products/deleteProduct";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  model: string;
  image: string;
  createdAt: string;
};
const ReadProduct = () => {
  const { data, isLoading, refetch } = useGetAllProductQuery("");
  const [deletePro, { isSuccess }] = useDeleteProductMutation();

  const handelproductDelete = (id: string) => {
    deletePro(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("product Delete Successfylly");
    }
    refetch();
  }, [isSuccess]);

  return (
    <div>
      {isLoading ? (
        <Spinnter />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-[25px]">
            {data &&
              data.data &&
              data.data.length > 0 &&
              [...data.data]
                .sort(
                  (a: any, b: any) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((item: Product) => {
                  return (
                    <div key={item._id} className="p-[10px]">
                      <div className="border mb-[10px] rounded-lg p-[10px]">
                        <img
                          className="w-full h-[250px]"
                          src={item?.image}
                          alt={item?.name || "Product Image"}
                        />
                      </div>
                      <ToastContainer />
                      <div>
                        <h4>{item?.name}</h4>
                        <p>{item?.description.slice(0, 80)}</p>

                        <div className="flex justify-between items-center">
                          <p>{item?.model}</p>
                          <p>${item?.price}</p>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="mt-[20px]">
                            <NavLink
                              state={{ id: item._id }}
                              to="/dashboard/admin/updateProduct"
                            >
                              <button className="border border-[#1ABC9C] py-[8px] px-[30px] cursor-pointer hover:bg-[#1ABC9C] hover:text-[#fff]">
                                Update
                              </button>
                            </NavLink>
                          </div>
                          <div className="mt-[20px]">
                            <button
                              onClick={() => handelproductDelete(item._id)}
                              className="border border-[#1ABC9C] py-[8px] px-[30px] cursor-pointer hover:bg-[#1ABC9C] hover:text-[#fff]"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </>
      )}
    </div>
  );
};

export default ReadProduct;
