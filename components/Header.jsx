import css from "../styles/Header.module.css";
import Image from "next/image";
import logo from "../assets/logo.jpg";
import { UilShoppingBag, UilReceipt } from "@iconscout/react-unicons";
import { useStore } from "../store/store";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Header() {
  //state in terminal
  // const state = useStore((state) => state);
  // console.log(state);

  const [Order, setOrder] = useState("");
  useEffect(() => {
    setOrder(localStorage.getItem("order"));
  }, []);

  /****** */
  const items = useStore((state) => state.cart.food.length);
  return (
    <div className={css.header}>
      {/*logo side*/}
      <div className={css.logo}>
        <Image src={logo} alt="" width={50} height={50} />
        <span>UOV</span>
      </div>
      {/*menu side*/}
      <ul className={css.menu}>
        <li>
          <Link href="../">Home</Link>
        </li>
        <li>Menu</li>
        <li>Contact</li>
      </ul>

      {/*right side*/}
      <div className={css.rightside}>
        <Link href="/cart">
          <div className={css.cart}>
            <UilShoppingBag size={35} color="#2E2E2E" />
            <div className={css.badge}>{items}</div>
          </div>
        </Link>

        {Order && (
          <Link href={`/order/${Order}`}>
            <div className={css.cart}>
              <UilReceipt size={35} color="#2E2E2E" />
              {Order != "" && <div className={css.badge}>1</div>}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
