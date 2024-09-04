import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import React from "react";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";


function User() {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [selectedEditIndex,setSelectedEditIndex]=useState(-1)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // const handleRemove = (e, index) => {
  //   const newUser = { ...user, addresses: [...user.addresses] };
  //   // for shallow copy issues,
  //   newUser.addresses.splice(index, 1);
  //   dispatch(updateUserAsync(newUser));
  // };
  const handleRemove = (e, index) => {
    // e.preventDefault(); // Button ya form ke default action ko rokne ke liye (optional)

    // Array ke new copy banate hain bina original ko change kiye
    const newAddresses = user.addresses.filter(
      (_, addrIndex) => addrIndex !== index
    );
    const newUser = { ...user, addresses: newAddresses };

    // Naya object Redux ya state management ko dispatch karte hain
    dispatch(updateUserAsync(newUser));
  };
  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    // for shallow copy issues,
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1)
  };

  return (
    <div>
      <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 my-5">
            Name:{user.name}
          </h1>
          <h3 className="text-xl font-bold tracking-tight text-red-900 my-5">
            Email : {user.email}
          </h3>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <p className="mt-0.5 text-sm text-gray-500">Your Addresses:</p>
          <div>
            {user.addresses.map((address, index) => (
              <div>
                { selectedEditIndex === index ?
                  <form
                  className="bg-white px-5 py-5 mt-12"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                    handleEdit(data, index);
                    reset();
                    console.log(data);
                  })}
                >
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl  font-semibold leading-7 text-gray-900">
                      personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="full-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              required: "name is required",
                            })}
                            id="full-name"
                            value={address.name}
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "email is required",
                            })}
                            value={address.email}
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            {...register("phone", {
                              required: "phone is required",
                            })}
                            value={address.phone}
                            type="tel"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", {
                              required: "street is required",
                            })}
                            value={address.street}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "city is required",
                            })}
                            id="city"
                            value={address.city}
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "state is required",
                            })}
                            id="region"
                            value={address.state}
                            autoComplete="address-level1"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="pinCode"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pinCode", {
                              required: "pinCode is required",
                            })}
                            value={address.pinCode}
                            id="pinCode"
                            autoComplete="pinCode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Edit Address
                    </button>
                  </div>
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Address
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose from Existing address
                    </p>
                    <ul role="list">
                      {user.addresses.map((address, index) => (
                        <li
                          key={index}
                          className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <input
                              onChange={handleAddress}
                              id="push-email"
                              name="address"
                              value={index}
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <img
                              className="h-12 w-12 flex-none rounded-full bg-gray-50"
                              src={address.imageUrl}
                              alt=""
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {address.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                Phone:{address.phone}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                Street:{address.street}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-500">
                              {address.city}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          Payment Method
                        </legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Choose one
                        </p>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              id="cash"
                              name="payments"
                              onChange={handlePayment}
                              value="cash"
                              checked={paymentMethod === "cash"}
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="card"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Cash
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              id="push-email"
                              onChange={handlePayment}
                              name="payments"
                              value="card"
                              checked={paymentMethod === "card"}
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="push-email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Card Payment
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </form> : null
                }
                <div
                  key={index}
                  className="flex justify-between mt-6 gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        Phone:{address.phone}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        Street:{address.street}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-500">
                      {address.city}
                    </p>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <button
                      onClick={(e) => setSelectedEditIndex(index)}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Edit
                    </button>
                    <p className="text-sm leading-6 text-gray-500">
                      <button
                        onClick={(e) => handleRemove(e, index)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
