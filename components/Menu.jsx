import { urlFor } from "../lib/client";
import css from "../styles/Menu.module.css";
import Image from "next/image";
import Link from "next/link";
export default function Menu({ food }) {
  console.log(food);
  return (
    <div className={css.container}>
      <div className={css.heading}>
        <span>OUR MENU</span>
        <span>Menu That Always</span>
        <span>Make you Fall In Love</span>
      </div>
      {/*food*/}

      {/******** map to data in back end ****** */}

      <div className={css.menu}>
        {food.map((food, id) => {
          const src = urlFor(food.image).url();
          return (
            <div className={css.food} key={id}>
              <Link href={`./food/${food.slug.current}`}>
                <div className={css.ImageWrapper}>
                  <Image
                    loader={() => src}
                    src={src}
                    alt=""
                    objectFit="cover"
                    layout="fill"
                  />
                </div>
              </Link>
              <span>{food.name}</span>
              <span>
                <span style={{ color: "var(--themeRed)" }}>Rs :</span>{" "}
                {food.price}.00
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
