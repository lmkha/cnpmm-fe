import React, { Fragment, useEffect, useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../layout";
import { subTotal, quantity, totalCost } from "../partials/Mixins";

import { cartListProduct } from "../partials/FetchApi";
import { fetchData, order } from "./Action";

import { Stack, TextField, Typography } from "@mui/material";
import IMask from 'imask';
import { PriceComponent } from "../home/SingleProduct";

const apiURL = process.env.REACT_APP_API_URL;

export const CheckoutComponent = (props) => {
  const { data, dispatch } = useContext(LayoutContext);

  const [state, setState] = useState({
    address: "",
    name: "",
    phone: "",
    error: false,
    success: false,
  });

  useEffect(() => {
    fetchData(cartListProduct, dispatch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (data.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
        Please wait until finish
      </div>
    );
  }
  return (
    <Fragment>
      <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
        <div className="text-2xl mx-2">Products</div>
        {/* Product List */}
        <div className="flex flex-col md:flex md:space-x-2 md:flex-row">
          <div className="md:w-1/2">
            <CheckoutProducts products={data.cartProduct} />
          </div>
          <div className="w-full order-first md:order-last md:w-1/2">
            <Typography variant="h4" sx={{ textAlign: 'center' }}>Order Information</Typography>
            <Fragment>
              <div
                onBlur={(e) => setState({ ...state, error: false })}
                className="p-4 md:p-8"
              >
                {state.error ? (
                  <div className="bg-red-200 py-2 px-4 rounded">
                    {state.error}
                  </div>
                ) : (
                  ""
                )}
                <div className="flex flex-col py-2 mb-2">
                  <label htmlFor="address" className="pb-2">
                    Delivery Address
                  </label>
                  <TextField
                    key={"address"}
                    size="small"
                    value={state.address}
                    onChange={(e) => {
                      setState({
                        ...state,
                        address: e.target.value,
                        error: false,
                      })
                    }}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label htmlFor="address" className="pb-2">
                    Name
                  </label>
                  <TextField
                    key={"name"}
                    size="small"
                    value={state.name}
                    onChange={(e) => {
                      setState({
                        ...state,
                        name: e.target.value,
                        error: false,
                      })
                    }}
                  />
                </div>
                <div className="flex flex-col py-2 mb-2">
                  <label htmlFor="phone" className="pb-2">
                    Phone
                  </label>
                  <PhoneTextField
                    value={state.phone}
                    onChange={(e) => {
                      setState({
                        ...state,
                        phone: e,
                        error: false,
                      })
                    }}
                  />
                </div>
                <Stack spacing={1} sx={{
                  justifyContent: 'end',
                  alignItems: 'end',
                  py: 2
                }}>
                  <Typography variant="h5">Total</Typography>
                  <PriceComponent price={totalCost(data.cartProduct)} />
                </Stack>
                <div
                  onClick={(e) => {
                    order(dispatch, state, setState, totalCost(data.cartProduct));
                  }}
                  className="w-full px-4 py-2 text-center text-white font-semibold cursor-pointer"
                  style={{ background: "#303031" }}
                >
                  Order
                </div>
              </div>
            </Fragment>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProducts = ({ products }) => {
  const history = useHistory();
  const getRandomSize = () => {
    const sizes = ['S', 'M'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  const [size, setSize] = useState('');

  useEffect(() => {
    // Chỉ gọi một lần khi component mount
    setSize(getRandomSize());
  }, []);

  return (
    <Fragment>
      <div className="grid grid-cols-2 md:grid-cols-1">
        {products !== null && products.length > 0 ? (
          products.map((product, index) => {
            return (
              <div
                key={index}
                className="col-span-1 m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 md:flex md:items-center md:justify-between"
              >
                <div className="md:flex md:items-center md:space-x-4">
                  <img
                    onClick={(e) => history.push(`/products/${product._id}`)}
                    className="cursor-pointer md:h-20 md:w-20 object-cover object-center rounded-lg"
                    src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                    alt="wishListproduct"
                  />
                  <div className="text-lg md:ml-6 truncate">
                    {product.pName}
                  </div>
                </div>
                <Stack direction={'row'} spacing={4} sx={{
                  justifyContent: 'end',
                  alignItems: 'center',
                  py: 2
                }}>
                  <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                    Size : {size}
                  </div>
                  <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                    Quantitiy : {quantity(product._id)}
                  </div>
                  <PriceComponent price={product.pPrice} />
                </Stack>
              </div>
            );
          })
        ) : (
          <div>No product found for checkout</div>
        )}
      </div>
    </Fragment>
  );
};

const PhoneTextField = ({ value, onChange }) => {
  const inputRef = useRef(null);
  const maskRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      maskRef.current = IMask(inputRef.current, {
        mask: '0000-000-000',
      });

      maskRef.current.on('accept', () => {
        const rawValue = maskRef.current.unmaskedValue;
        onChange(rawValue);
      });

      return () => {
        maskRef.current.destroy();
        maskRef.current = null;
      };
    }
  }, [onChange]);

  useEffect(() => {
    if (maskRef.current && maskRef.current.value !== value) {
      maskRef.current.value = value;
      maskRef.current.updateValue();
    }
  }, [value]);

  return (
    <TextField
      size="small"
      inputRef={inputRef}
      value={value}
      placeholder="0000-000-000"
      onChange={() => { }}
      variant="outlined"
      fullWidth
    />
  );
};

export default CheckoutProducts;
