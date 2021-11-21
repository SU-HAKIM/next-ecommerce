import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactNode } from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { Product } from "../../types";

type Props = {
  products?: Product[];
  children?: ReactNode;
};

const Home: NextPage = (props: Props) => {
  console.log(props);
  return (
    <div className="container">
      <Head>
        <title>Products</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Head>
      <div className="row">
        {props.products?.map((product) => (
          <div
            className="card col sm1 l3 m6   offset-s1 z-depth-2"
            key={product._id}
          >
            <div className="card-image">
              <Image
                src={product.image}
                alt={product.name}
                width={350}
                height={250}
              />
              <span className="card-title">{product.name}</span>
            </div>
            <div className="card-content">
              <p>{product.description}</p>
            </div>
            <div className="card-content">
              <p>Price : {product.price} Taka</p>
            </div>
            <div className="card-action">
              <Link href={`/product/${product._id}`} passHref>
                <a>See Product</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  let products = await fetch("http://localhost:3000/api/products");
  let data = await products.json();

  return {
    props: {
      products: data,
    },
  };
};
