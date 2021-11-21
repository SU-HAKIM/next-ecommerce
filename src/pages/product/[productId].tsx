import Link from "next/link";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Product } from "../../../types";
import { ReactNode, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

type State = {
  children?: ReactNode;
  product?: Product;
};

const Product: NextPage = (props: State) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    M.Modal.init(modalRef.current);
  }, []);
  const deleteProduct = async (id: string) => {
    let response = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
  };
  const getModal = () => {
    return (
      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>{props.product?.name}</h4>
          <p>Do you really want to delete? </p>
        </div>
        <div className="modal-footer">
          <button
            data-target="modal1"
            className=" btn modal-trigger waves-effect waves-light #c62828 red darken-3"
            onClick={() => {
              deleteProduct(props.product?._id as string);
              router.push("/");
            }}
          >
            Yes
          </button>
          <button
            data-target="modal1"
            style={{ marginLeft: "10px" }}
            className=" btn modal-trigger waves-effect waves-light "
          >
            No
          </button>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="card col s12 z-depth-2 center-align">
            <div className="card-image">
              <Image
                src={props.product?.image as string}
                alt={props.product?.name}
                width={450}
                height={350}
              />
              <span className="card-title">{props.product?.name}</span>
            </div>
            <div className="card-content">
              <p>{props.product?.description}</p>
              <p>Price : {props.product?.price} Taka</p>
            </div>
            <div className="card-content">
              <button
                data-target="modal1"
                className="btn modal-trigger waves-effect waves-light #c62828 red darken-3"
              >
                Delete
              </button>
            </div>
            <div className="card-action">
              <input
                type="number"
                style={{ width: "400px", margin: "10px" }}
                min="1"
                placeholder="quantity"
              />
              <button className="waves-effect waves-light btn">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        {getModal()}
      </div>
    </>
  );
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  let response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();

  const paths = data.map((sin: Product) => {
    return {
      params: {
        productId: sin._id,
      },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context);
  let response = await fetch(
    `http://localhost:3000/api/products/${context.params?.productId}`
  );
  const data = await response.json();

  return {
    props: {
      product: data,
    },
  };
};
