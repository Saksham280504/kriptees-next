"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "@/redux/actions/cartAction";
import { useRouter } from "next/navigation";

const Cart = ({ isOpen, onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  // 1) “mounted” drives whether the DOM is in the tree
  const [mounted, setMounted] = useState(false);
  // 2) “localOpen” drives the translate-x class
  const [localOpen, setLocalOpen] = useState(false);
 

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // When isOpen turns true, mount immediately
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      // trigger slide-out
      setLocalOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if(mounted) {
      // requestAnimationFrame is even smoother than setTimeout(…,0)
      requestAnimationFrame(() => setLocalOpen(true));
    }
  }, [mounted]);

  function handleTransitionEnd() {
    if(!localOpen) setMounted(false);
  }

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return;
    const item = cartItems.find((it) => it.productId === id);
    dispatch(addItemToCart(id, newQty, item?.size));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    const item = cartItems.find((it) => it.productId === id);
    dispatch(addItemToCart(id, newQty, item?.size));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    onClose();
    router.push("/login?redirect=/shipping");
  };

  const navigateToProduct = (productId) => {
    onClose();
    router.push(`/product/${productId}`);
  };


  useEffect(() => {
    if (isOpen) {
      const orig = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [isOpen]);

 if (!mounted) return null;

  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/30
          transition-opacity duration-500
          ${localOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      />

      {/* slide-panel */}
      <div
        onTransitionEnd={handleTransitionEnd}
 className={`
   fixed inset-y-0 right-0 z-50
  w-full sm:w-3/4 md:w-1/3
  bg-white
  transform transition-transform duration-500 ease-in-out
   ${localOpen ? 'translate-x-0' : 'translate-x-full'}
 `}
        style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          boxShadow: '-4px 0 15px rgba(0,0,0,0.1)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-start mb-6 pb-6 border-b border-gray-200"
                >
                  <div
                    className="w-20 h-24 flex-shrink-0 mr-4 relative cursor-pointer"
                    onClick={() => navigateToProduct(item.productId)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCartItems(item.productId);
                      }}
                      className="absolute top-0 left-0 text-red-500 bg-white rounded-full p-1"
                      style={{ fontSize: "16px", transform: "translate(-50%, -50%)" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-grow">
                    <h3
                      className="font-bold text-xl uppercase cursor-pointer hover:text-gray-700"
                      onClick={() => navigateToProduct(item.productId)}
                    >
                      {item.name}
                    </h3>
                    <p className="text-gray-600 mb-1">SIZE: {item.size}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <span className="mr-2">QUANTITY:</span>
                        <div className="border rounded inline-flex">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              decreaseQuantity(item.productId, item.quantity);
                            }}
                            className="px-2 py-1 border-r"
                          >
                            -
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              increaseQuantity(item.productId, item.quantity, item.stock);
                            }}
                            className="px-2 py-1 border-l"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center my-4">
                <span className="font-bold">TOTAL</span>
                <span className="font-bold text-xl">₹{totalPrice}</span>
              </div>
              <button
                onClick={checkoutHandler}
                className="w-full bg-black text-white py-3 uppercase font-bold tracking-wider hover:bg-gray-800"
              >
                PROCEED TO CHECKOUT
              </button>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-xl font-semibold mb-4">Your cart is empty</p>
              <button
                onClick={() => {
                  onClose();
                  router.push("/");
                }}
                className="bg-black text-white px-6 py-2 rounded"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
    </>
  );
};

export default Cart;
