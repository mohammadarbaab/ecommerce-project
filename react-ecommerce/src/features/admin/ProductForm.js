import React, { useEffect, useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../comman/Modals";
import {
  clearSelectedProduct,
  createProductAsync,
  fetchAllProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from "../productslist/productSlice";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { resetCart } from "../cart/cartApi";

function ProductForm() {
  const brands = useSelector(selectBrands);
  const categeories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const selectedProduct = useSelector(selectProductById);
  const [openModel, setOpenModel] = useState();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchAllProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct }; // Destructure selectedProduct correctly
    product.deleted = true; // Set the deleted flag to true
    dispatch(updateProductAsync(product)); // Dispatch the async update
  };

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit((data) => {
            const product = { ...data };
            product.images = [
              product.image1,
              product.image2,
              product.image3,
              product.thumbnail,
            ];
            product.rating = product.rating || 0;
            delete product.image1;
            delete product.image2;
            delete product.image3;
            product.price = +product.price;
            product.stock = +product.stock;
            product.discountPercentage = +product.discountPercentage;

            console.log(product);
            // dispatch(
            //   // add product
            // );
            // console.log(data);
            if (params.id) {
              product.id = params.id;
              product.rating = selectedProduct.rating || 0;
              dispatch(updateProductAsync(product));
              reset();
            } else {
              dispatch(createProductAsync(product));
            }
          })}
        >
          <div className="space-y-12 bg-white p-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Add Product
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                
                <div className="sm:col-span-4">
                {selectedProduct.deleted && (
                  <h2 className="text-red-500 mb-5">This product is deleted</h2>
                )}
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600  ">
                      <input
                        id="title"
                        {...register("title", {
                          required: "name is valid",
                        })}
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="Description"
                      {...register("title", {
                        required: "description is required",
                      })}
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    --Choose Brand--
                  </label>
                  <div className="mt-2">
                    <select
                      {...register("brand", {
                        required: "brand is required",
                      })}
                    >
                      {brands.map((brand, index) => (
                        <option key={index} value={brand.value}>
                          {brand.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    categeory
                  </label>
                  <div className="mt-2">
                    <select
                      {...register("category", {
                        required: "categories is required",
                      })}
                    >
                      {categeories.map((category, index) => (
                        <option key={index} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600  ">
                      <input
                        id="price"
                        {...register("price", {
                          required: "price is required",
                          min: 1,
                          max: 200000,
                        })}
                        type="number"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="discount"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Discount
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600  ">
                      <input
                        id="discountPercentage"
                        {...register("discountPercentage", {
                          required: "discountPercentage is required",
                          min: 0,
                          max: 100,
                        })}
                        type="number"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Stock
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600  ">
                      <input
                        id="stock"
                        {...register("stock", {
                          required: "stock is required",
                          min: 0,
                        })}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Thumbnail
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600  ">
                      <input
                        id="thumbnail"
                        {...register("thumbnail", {
                          required: "thumbnail is required",
                          min: 0,
                        })}
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="image1"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 1
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600  ">
                      <input
                        id="image1"
                        {...register("image1", {
                          required: "image1 is required",
                          min: 0,
                        })}
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="image2"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 2
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600  ">
                      <input
                        id="image2"
                        {...register("image2", {
                          required: "image2 is required",
                          min: 0,
                        })}
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="image3"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 3
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600  ">
                      <input
                        id="image3"
                        {...register("image3", {
                          required: "image3 is required",
                          min: 0,
                        })}
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Extra
              </h2>

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    By Email
                  </legend>
                  <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-900"
                        >
                          Comments
                        </label>
                        <p className="text-gray-500">
                          Get notified when someones posts a comment on a
                          posting.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="candidates"
                          className="font-medium text-gray-900"
                        >
                          Candidates
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="offers"
                          className="font-medium text-gray-900"
                        >
                          Offers
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate accepts or rejects an
                          offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Push Notifications
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    These are delivered via SMS to your mobile phone.
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Everything
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-email"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Same as email
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-nothing"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        No push notifications
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            {selectedProduct && !selectedProduct.deleted && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModel(true);
                }}
                type="button"
                className="text-sm font-semibold leading-6 bg-red text-gray-900"
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <Modal
        // title={`Delete ${selectedProduct.title}`}
        title={`Delete ${selectedProduct?.title || "Product"}`}
        message="Are you sure you want to delete this Product?"
        dangerOption="Delete"
        cencelOption="Cencle"
        dangerAction={handleDelete}
        cencelAction={() => setOpenModel(null)}
        showModal={openModel}
      ></Modal>
    </>
  );
}

export default ProductForm;
