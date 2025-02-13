import { NavLink, useLocation } from "react-router-dom";
import { useGetSingalProductQuery } from "../../redux/fetchers/products/productSingalapi";
import Title from "../../reuseComponents/Title";

const ProductDetails = () => {
  const paramsdetails = useLocation();
  const { data } = useGetSingalProductQuery(paramsdetails.state.id);

  return (
    <div className="container mx-auto px-[10px] my-[80px]">
      <div>
        <Title
          title="Products Details"
          description="Show Your Product Details And Purcess"
        />
      </div>
      <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-[40px]">
        <div>
          <img className="w-full" src={data?.data.image} alt="" />
        </div>
        <div className="space-y-4">
          <h2 className="text-[35px]">{data?.data.name}</h2>
          <p className="text-[18px]">{data?.data.description}</p>
          <p>
            <span className="text-[#1ABC9C]">Category : </span>
            {data?.data.type}
          </p>
          <p>
            <span className="text-[#1ABC9C]">Model : </span>
            {data?.data.brand}
          </p>
          <p>
            <span className="text-[#1ABC9C]">Price : </span>
            {data?.data.price}
          </p>
          <div>
            <NavLink state={{ pid: data?.data }} to="/checkOut">
              <button className="border border-[#1ABC9C] py-[8px] px-[30px] cursor-pointer hover:bg-[#1ABC9C] hover:text-[#fff]">
                Bye Now
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
