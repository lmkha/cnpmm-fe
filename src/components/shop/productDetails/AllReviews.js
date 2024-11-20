import React, { Fragment, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, editReview } from "./Action";

import moment from "moment";
import { LayoutContext } from "../layout";
import { deleteReview } from "./Action";
import { isAuthenticate } from "../auth/fetchApi";
import { getSingleProduct } from "./FetchApi";
import { Button, IconButton, Stack } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

const AllReviews = (props) => {
  const { data, dispatch } = useContext(LayoutContext);
  const { pRatingsReviews } = data.singleProductDetail;
  let { id } = useParams(); // Prodduct Id

  const [fData, setFdata] = useState({
    success: false,
  });

  if (fData.success) {
    setTimeout(() => {
      setFdata({ ...fData, success: false });
    }, 2000);
  }

  const fetchData = async () => {
    try {
      let responseData = await getSingleProduct(id);
      if (responseData.product) {
        dispatch({
          type: "singleProductDetail",
          payload: responseData.product,
        });
      }
      if (responseData.error) {
        console.log(responseData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="md:mx-16 lg:mx-20 xl:mx-24 flex flex-col">
        {fData.success ? Alert("green", fData.success) : ""}
      </div>
      <div className="mt-6 mb-12 md:mx-16 lg:mx-20 xl:mx-24">
        {/* List start */}
        {pRatingsReviews.length > 0 ? (
          pRatingsReviews.map((item, index) =>
            <ReviewItem
              key={index}
              item={item}
              index={index}
              data={data}
              fetchData={fetchData}
              setFdata={setFdata}
            />
          )
        ) : (
          <div>No Review found</div>
        )}
      </div>
    </Fragment>
  );
};

const ReviewItem = ({ item, index, data, fetchData, setFdata }) => {
  const [reviewData, setReviewData] = useState(item);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Fragment key={index}>
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-start">
        <img
          className="mx-2 w-16 h-16 rounded-full"
          src="https://secure.gravatar.com/avatar/676d90a1574e9d3ebf98dd36f7adad60?s=60&d=mm&r=g"
          alt="pic"
        />
        <div className="mx-2 flex justify-between w-full">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <span>{item.user ? item.user.name : ""}</span>
              <span className="text-sm text-yellow-700">
                {moment(item.createdAt).format("lll")}
              </span>
            </div>
            {
              !isEditing ? (
                <div className="leading-tight mt-3">{item.review}</div>
              ) : (
                <textarea
                  className="w-full h-20 p-2 border border-gray-300 rounded-lg"
                  defaultValue={item.review}
                  onChange={(e) => setReviewData({ ...reviewData, review: e.target.value })}
                />
              )
            }
          </div>
          <div className="flex flex-col">
            <div className="flex justify-end">
              {
                !isEditing ? (
                  <ReviewStars defaultValue={item.rating} />
                ) : (
                  <ReviewStars isEdit={true} onChange={(newValue) => {
                    setReviewData({ ...reviewData, rating: newValue })
                  }} />
                )
              }
            </div>
            {item.user &&
              isAuthenticate() &&
              item.user._id === isAuthenticate().user._id ? (
              <div className="flex justify-center my-2">
                <Stack direction={'row'} spacing={1}>
                  {
                    isEditing ? (
                      <>
                        <Button color="success" variant="contained" sx={{ textTransform: 'none' }} onClick={() => {
                          editReview(
                            data.singleProductDetail._id,
                            item._id,
                            reviewData.rating,
                            reviewData.review,
                            fetchData,
                            setFdata
                          ).then(() => setIsEditing(false))
                        }}>
                          Save
                        </Button>

                        <Button color="secondary" variant="outlined" sx={{ textTransform: 'none' }} onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => setIsEditing(true)}>
                          <EditIcon />
                        </IconButton>

                        <IconButton onClick={() => {
                          deleteReview(
                            item._id,
                            data.singleProductDetail._id,
                            fetchData,
                            setFdata
                          )
                        }}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )
                  }
                </Stack>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const ReviewStars = ({ isEdit, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue || 0);
  console.log('Check varr', defaultValue);

  return (
    <Box>
      <Rating
        disabled={defaultValue ? true : false}
        name="rating"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (onChange) {
            onChange(newValue);
          }
        }}
        size="small"
        precision={isEdit ? 1 : 0.1}
      />
    </Box>
  );
};

export default AllReviews;
