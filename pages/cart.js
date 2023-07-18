/* eslint-disable jsx-a11y/alt-text */
import { useStore } from "../store/store";
import Layout from "../components/Layout";
import css from "../styles/Cart.module.css";
import { urlFor } from "../lib/client";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import OrderModal from "../components/OrderModal";
import { useRouter } from "next/router";
export default function Card() {
  const CartData = useStore((state) => state.cart);
  const [PaymentMethod, setPaymentMethod] = useState(null);
  const [Order, setOrder] = useState(
    typeof window !== "undefined" && localStorage.getItem("order")
  );
  const removeFood = useStore((state) => state.removeFood);
  const handleRemove = (i) => {
    removeFood(i);
    toast.error("Item Removed");
  };

  const router = useRouter();
  const total = () =>
    CartData.food.reduce((a, b) => a + b.quantity * b.price, 0);

  const handleOnDelivery = () => {
    setPaymentMethod(0);
    typeof window !== "undefined" && localStorage.setItem("total", total());
  };
  //handleCheckout
  const handleCheckout = async () => {
    typeof window !== "undefined" && localStorage.setItem("total", total());
    setPaymentMethod(1);
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CartData.food),
    });
    if (response.status === 500) return;
    const data = await response.json();
    toast.loading("Redirecting...");
    router.push(data.url);
  };

  return (
    <Layout>
      <div className={css.container}>
        {/*details*/}
        <div className={css.details}>
          <table className={css.table}>
            <thead>
              <th>Food</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </thead>
            <tbody className={css.tbody}>
              {CartData.food.length > 0 &&
                CartData.food.map((food, i) => {
                  const src = urlFor(food.image).url();
                  return (
                    <tr key={i}>
                      <td className={css.imageTd}>
                        <Image
                          loader={() => src}
                          objectFit="cover"
                          src={src}
                          width={85}
                          height={85}
                        />
                      </td>
                      <td>{food.name}</td>
                      <td>{food.price}</td>
                      <td>{food.quantity}</td>
                      <td>{food.price * food.quantity}</td>
                      <td
                        style={{ color: "var(--themeRed)", cursor: "pointer" }}
                        onClick={() => handleRemove(i)}
                      >
                        X
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {/*summery*/}
        <div className={css.cart}>
          <span>Cart</span>
          <div className={css.CartDetails}>
            <div>
              <span>Items</span>
              <span>{CartData.food.length}</span>
            </div>
            <div>
              <span>Total</span>
              <span>
                <span style={{ color: "var(themeRed)" }}>Rs : </span>
                {total()}
              </span>
            </div>
          </div>

          {/*pay on another ithem used this condtion in button not display in pya button*/}
          {!Order && CartData.food.length > 0 ? (
            <div className={css.buttons}>
              <button className="btn" onClick={handleOnDelivery}>
                Pay on Delivery
              </button>
              <button className="btn" onClick={handleCheckout}>
                Pay Now
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Toaster />
      {/*Modle*/}
      <OrderModal
        opened={PaymentMethod === 0}
        setOpened={setPaymentMethod}
        PaymentMethod={PaymentMethod}
      />
    </Layout>
  );
}
