import axios from "axios";
import * as types from './actionType';

export const addblogRequest = () => ({
    type: types.ADD_BLOG_REQUEST
});

export const addblogSuccess = (payload) => ({
    type: types.ADD_BLOG_SUCCESS,
    payload
});

export const addblogFailure = (payload) => ({
    type: types.ADD_BLOG_ERROR,
    payload
})

export const AddBlog = (payload) => (dispatch) => {
    dispatch(addblogRequest());


    return axios.post("http://localhost:8080/blog/", payload)
        .then((res) => {
            // console.log(res)
            return dispatch(addblogSuccess(res))

        })
        .catch((err) => {

            return addblogFailure(err)

        })
}