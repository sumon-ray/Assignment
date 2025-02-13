import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateProductMutation } from "../../../redux/fetchers/products/createProduct";
import { ToastContainer, toast } from "react-toastify";
interface IFormInput {
  name: string;
  brand: string;
  price: number;
  image: string;
  type: "Mountain" | "Road" | "Hybrid" | "BMX" | "Electric";
  description: string;
  inStock: boolean;
  queantity: string;
}

const CreateProduct: React.FC = () => {
  const [product, { isSuccess, isLoading }] = useCreateProductMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    product(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product CreateSuccessfully", { position: "top-center" });
    }
  }, [isSuccess]);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {isLoading ? "Loading......." : "Create Cycle"}
      </h2>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Brand
          </label>
          <input
            id="brand"
            type="text"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            {...register("brand", { required: "Brand is required" })}
          />
          {errors.brand && (
            <p className="text-red-500 text-xs">{errors.brand.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            {...register("price", { required: "Price is required", min: 0 })}
          />
          {errors.price && (
            <p className="text-red-500 text-xs">{errors.price.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Queantity
          </label>
          <input
            id="queantity"
            type="number"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            {...register("queantity", {
              required: "Price is required",
              min: 0,
            })}
          />
          {errors.price && (
            <p className="text-red-500 text-xs">{errors.price.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="img"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL (Optional)
          </label>
          <input
            id="ImageUrl"
            type="url"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            {...register("image")}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type
          </label>
          <select
            id="type"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            {...register("type", { required: "Type is required" })}
          >
            <option value="Mountain">Mountain</option>
            <option value="Road">Road</option>
            <option value="Hybrid">Hybrid</option>
            <option value="BMX">BMX</option>
            <option value="Electric">Electric</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-xs">{errors.type.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-4 flex items-center">
          <input
            id="inStock"
            type="checkbox"
            className="mr-2"
            {...register("inStock")}
          />
          <label htmlFor="inStock" className="text-sm text-gray-700">
            In Stock
          </label>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#1ABC9C] text-white font-semibold rounded-md shadow-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
