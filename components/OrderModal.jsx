import { Modal, useMantineTheme } from "@mantine/core";
import css from "../styles/OrderModal.module.css";
import { useState } from "react";
import { createOrder } from "../lib/orderHandler";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "../store/store";
import { useRouter } from "next/router";
export default function OrderModal({ opened, setOpened, PaymentMethod }) {
  const theme = useMantineTheme();
  const router = useRouter();
  {
    /*handdl the input field funtion*/
  }
  const [FormData, setFormData] = useState({});

  const handleInput = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createOrder({ ...FormData, total, PaymentMethod });
    toast.success("Order Placed");
    resetCart();
    {
      typeof window !== "undefined" && localStorage.setItem("order", id);
    }
    router.push(`/order/${id}`);
  };

  const total = typeof window !== "undefined" && localStorage.getItem("total");

  {
    /*reste cart*/
  }
  const resetCart = useStore((state) => state.resetCart);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(null)}
      title="Payement"
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      <form action="" className={css.formContainer} onSubmit={handleSubmit}>
        <input
          onChange={handleInput}
          type="text"
          name="name"
          required
          placeholder="Name"
        />
        <input
          onChange={handleInput}
          type="text"
          name="phone"
          required
          placeholder="Phone Number"
        />
        <textarea
          name="address"
          rows={3}
          onChange={handleInput}
          placeholder="Address"
        ></textarea>
        <span>
          You will Pay <span>Rs : {total} </span> on delivery
        </span>
        <button type="submit" className="btn">
          Place Order
        </button>
      </form>
      <Toaster />
    </Modal>
  );
}
