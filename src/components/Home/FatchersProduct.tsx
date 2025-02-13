import { NavLink } from "react-router-dom";
import Title from "../../reuseComponents/Title";
import { useGetAllProductQuery } from "../../redux/fetchers/products/getAllproductApi";
import Spinnter from "../../reuseComponents/Spinnter";
export type Product = {
  _id: string;
  name: string;
  brand: string;
  price: number;
  model: string;
  stock: number;
  category: string;
  description: string;
  image: string;
};
const FatchersProduct = () => {
  const { data, isLoading } = useGetAllProductQuery({});

  return (
    <div className="py-[40px] bg-gray-100">
      <div>
        <Title
          title="Fetchers Product"
          description="this is a rpoduct includes"
        />
        <div>{isLoading ? <Spinnter /> : ""}</div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-[25px]">
            {data?.data &&
              data?.data.slice(0, 6).map((item: Product) => {
                return (
                  <div key={item._id} className="p-[10px]">
                    <div className="border mb-[10px] rounded-lg p-[10px]">
                      <img
                        className="w-full h-[250px]"
                        src={item?.image}
                        alt={item?.name || "Product Image"}
                      />
                    </div>
                    <div>
                      <h4>{item?.name}</h4>
                      <p>{item?.description.slice(0, 80)}</p>

                      <div className="flex justify-between items-center">
                        <p>{item?.model}</p>
                        <p>${item?.price}</p>
                      </div>
                      <div className="mt-[20px]">
                        <NavLink state={{ id: item._id }} to="/productDetails">
                          <button className="border border-[#1ABC9C] py-[8px] px-[30px] cursor-pointer hover:bg-[#1ABC9C] hover:text-[#fff]">
                            View Details
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="text-center mt-[30px]">
            <NavLink to="/allProduct">
              <button className="px-[50px] py-[15px] bg-[#1ABC9C] text-white cursor-pointer">
                All Product
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FatchersProduct;
