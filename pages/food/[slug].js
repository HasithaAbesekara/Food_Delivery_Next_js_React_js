/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../components/Layout";
import { client, urlFor } from "../../lib/client";
import Image from "next/image";
import css from "../../styles/Food.module.css";
import LeftArrow from "../../assets/arrowLeft.png";
import RightArrow from "../../assets/arrowRight.png";
import { useState } from "react";
import { useStore } from "../../store/store";
import toast, { Toaster } from "react-hot-toast";
export default function food({ food }) {
  const src = urlFor(food.image).url();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [Quantity, setQuantity] = useState(1);

  const hadleQuan = (type) => {
    type == "inc"
      ? setQuantity((prev) => prev + 1)
      : Quantity === 1
      ? null
      : setQuantity((prev) => prev - 1);
  };

  //add to cart funtion
  /******* */

  const addfood = useStore((state) => state.addfood);
  const addToCart = () => {
    addfood({ ...food, price: food.price, quantity: Quantity });
    toast.success("Added to cart");
  };
  return (
    <Layout>
      <div className={css.container}>
        <div className={css.imageWrapper}>
          <Image
            loader={() => src}
            src={src}
            alt=""
            layout="fill"
            unoptimized
            objectFit="cover"
          />
        </div>
        <div className={css.right}>
          <span>{food.name}</span>
          <span>{food.details}</span>
          <span>
            <span style={{ color: "var(--themeRed" }}>Rs: </span>
            {food.price}
          </span>
          <div className={css.quantity}>
            <span>Quantity</span>
            <div className={css.counter}>
              <Image
                src={LeftArrow}
                alt=""
                height={20}
                width={20}
                objectFit="contain"
                onClick={() => hadleQuan("dec")}
              />
              <span>{Quantity}</span>
              <Image
                src={RightArrow}
                alt=""
                height={20}
                width={20}
                objectFit="contain"
                onClick={() => hadleQuan("inc")}
              />
            </div>
          </div>
          <button className={`btn ${css.btn}`} onClick={addToCart}>
            Add to Cart
          </button>
        </div>
        <Toaster />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type=="food" && defined(slug.current)][].slug.current`
  );
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const food = await client.fetch(
    `*[_type=="food"&& slug.current=='${slug}'][0]`
  );
  return {
    props: {
      food,
    },
  };
}
