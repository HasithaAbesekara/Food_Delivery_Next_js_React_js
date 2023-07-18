import css from "../styles/Hero.module.css";
import Image from "next/image";
import Cherry from "../assets/Cherry.png";
import HeroImg from "../assets/heroImg.jpg";
import { UilPhone } from "@iconscout/react-unicons";
export default function Hero() {
  return (
    <div className={css.container}>
      {/*left side*/}
      <div className={css.left}>
        <div className={css.cherryDiv}>
          <span>More than Faster</span>
          <Image src={Cherry} alt="" width={40} height={25} />
        </div>

        <div className={css.heroText}>
          <span>Be The Fastest</span>
          <span>In Delivering</span>
          <span>
            You <span style={{ color: "var(--themeRed)" }}>Food</span>
          </span>
        </div>

        <span className={css.miniText}>
          Our Mission is to filling your tummy with delicious food and with fast
          and free delivery
        </span>
        <button className={`btn ${css.btn}`}>Get Started</button>
      </div>
      {/*right side*/}
      <div className={css.right}>
        <div className={css.imageContainer}>
          <Image
            src={HeroImg}
            alt=""
            layout="intrinsic"
            width={1000}
            height={600}
            style={{ borderRadius: "25px" }}
          />
        </div>
        <div className={css.ContactUs}>
          <span>Contact Us</span>
          <div>
            <UilPhone color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}
