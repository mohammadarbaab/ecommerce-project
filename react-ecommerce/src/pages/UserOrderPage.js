import React from "react";
import UserOrders from "../features/user/components/UserOrder";
import Navbar from "../features/navbar/Navbar";

function UserOrderPage() {
  return (
    <div>
      <Navbar>
        <h1 className="mx-auto text-2xl">My Orders</h1>
        <UserOrders />
      </Navbar>
    </div>
  );
}

export default UserOrderPage;
