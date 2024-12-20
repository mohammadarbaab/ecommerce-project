import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import React from "react";import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from "../userSlice";
import { discountPrice } from "../../../app/constants";

function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);
  const filteredOrders = orders.filter(order => order.user.id === user.id);
  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchLoggedInUserOrdersAsync(user.id));
    }
  }, [dispatch, user]);

  if (!user) {
    return <p>User is not logged in or data is unavailable</p>;
  }
  return (
    <div>
      {filteredOrders.map((order,index) => (
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 my-5">
              Order: {order.id}
            </h1>
            <h3 className="text-xl font-bold tracking-tight text-red-900 my-5">
              Order: {order.id}
            </h3>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.href}>{item.title}</a>
                          </h3>
                          <p className="ml-4">${discountPrice(item)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quentity"
                            className="inline mr-5  text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty:={item.quantity}
                          </label>
                        </div>

                        <div className="flex"></div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${order.totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total items in Cart</p>
              <p>{order.totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
            Shiping Addresses:
            </p>
            <div
              key={index}
              className="flex justify-between mt-6 gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {order.selectedAddress.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    Phone:{order.selectedAddress.phone}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    Street:{order.selectedAddress.street}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-500">
                  {order.selectedAddress.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserOrders;
