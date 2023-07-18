import css from "../styles/Footer.module.css";
import Image from "next/image";
import logo from "../assets/logo.jpg";
import { UilFacebook, UilGithub, UilInstagram } from "@iconscout/react-unicons";
export default function Footer() {
  return (
    <div className={css.container}>
      <span>ALL RIGHT RESERVED</span>
      <div className={css.social}>
        <UilFacebook size={45} />
        <UilGithub size={45} />
        <UilInstagram size={45} />
      </div>
      <div className={css.logo}>
        <Image src={logo} alt="" width={50} height={50} />
        <span>UOV</span>
      </div>
    </div>
  );
}
