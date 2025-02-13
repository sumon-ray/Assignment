import Banner from "../../components/Home/Banner";
import FatchersProduct from "../../components/Home/FatchersProduct";
import Testimonial from "../../components/Home/Tasimonial";

const Home = () => {
  return (
    <div className="container mx-auto px-[10px]">
      <Banner />
      <FatchersProduct />
      <Testimonial />
    </div>
  );
};

export default Home;
