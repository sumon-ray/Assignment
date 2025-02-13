import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ReadProduct from "./product/ReadProduct";
import CreateProduct from "./product/CreateProduct";

const ProductManage = () => {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Product</Tab>
          <Tab>Create Product</Tab>
        </TabList>

        <TabPanel>
          <h2>All Product</h2>
          <ReadProduct />
        </TabPanel>
        <TabPanel>
          <h2>Create Product</h2>
          <CreateProduct />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ProductManage;
