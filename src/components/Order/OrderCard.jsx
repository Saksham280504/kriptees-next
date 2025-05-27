"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/app/actions/cartAction";
import { useRouter } from "next/navigation";
import DialogBox from "@/app/components/Product/DialogBox";
import { toast } from "react-toastify";

const createdAt = (user) => {
  const createdAt = new Date(user.createdAt);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  const formatter = new Intl.DateTimeFormat("en-IN", options);
  return formatter.format(createdAt);
};

const OrderCard = ({ item, user }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const classes = {}; // Add styles as needed
  const isSmallScreen = false;
  const { shippingInfo, orderItems } = item;

  const addToCartHandler = (id, qty = 0) => {
    dispatch(addItemToCart(id, qty));
    toast.success("Item Added to Cart");
    router.push("/cart");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={classes.root}>
      {orderItems.map((product) => (
        <div key={product.productId} style={classes.orderCard}>
          <div style={classes.firstBlock}>
            {/* Left Side */}
            <div style={classes.leftSide}>
              <p style={classes.orderPlaced}>ORDER PLACED</p>
              <p style={classes.orderDate}>{createdAt(item)}</p>
              <p style={classes.orderId}>ORDER-ID: #{item._id}</p>
            </div>

            {/* Right Side */}
            {!isSmallScreen && (
              <div style={classes.rightSide}>
                <p style={classes.totalPrice}>Total:</p>
                <p>
                  <strong>₹</strong>
                  {product.price * product.quantity}
                </p>
              </div>
            )}
          </div>

          {/* Second Block */}
          <div style={classes.secondBlock}>
            {/* Left Side */}
            <div style={classes.secondBlock_left}>
              <div style={classes.productDetailsContainer}>
                <div style={{ width: "25%" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: "160px" }}
                  />
                </div>

                <div>
                  <p style={classes.productName}>{product.name}</p>
                  <p style={classes.productQty}>
                    <strong>QTY:</strong> {product.quantity}
                  </p>
                  <p style={classes.deliveryStatus}>
                    <strong>Delivery Status:</strong>{" "}
                    <span
                      style={{
                        color:
                          item.orderStatus === "Delivered" ? "green" : "red",
                      }}
                    >
                      {item.orderStatus}
                    </span>
                  </p>
                  <div style={classes.buttonsContainer}>
                    <button
                      style={classes.buyAgainButton}
                      onClick={() => addToCartHandler(product.productId, 1)}
                    >
                      Buy Again
                    </button>
                    <button
                      style={classes.button}
                      onClick={() =>
                        router.push(`/product/${product.productId}`)
                      }
                    >
                      View item
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ padding: "1rem" }}>
                <button
                  style={classes.reviewButton}
                  onClick={handleClickOpen}
                >
                  Write A Product Review
                </button>

                <DialogBox
                  open={open}
                  handleClose={handleClose}
                  id={product.productId}
                  style={classes.dialog}
                />
              </div>
            </div>

            {/* Right Side */}
            {!isSmallScreen && (
              <div style={classes.secondBlock_right}>
                <div style={classes.addressBlock}>
                  <p>{user.name}</p>
                  <p style={{ fontWeight: 400 }}>Delivery Address:</p>
                  <p style={classes.addressText}>{shippingInfo.address}</p>
                  <p style={classes.addressText}>
                    {shippingInfo.city}, {shippingInfo.state},{" "}
                    {shippingInfo.country} - {shippingInfo.pinCode}
                  </p>
                  <p style={classes.addressText}>
                    Phone: {shippingInfo.phoneNo}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
