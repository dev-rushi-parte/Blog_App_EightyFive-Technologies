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


    return axios.post("http://localhost:8080/blog/", payload, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${payload.token}`
        }
    })
        .then((res) => {
            // console.log(res)
            return dispatch(addblogSuccess(res))

        })
        .catch((err) => {

            return addblogFailure(err)

        })
}

export const get_all_post_request = () => ({
    type: types.GET_ALL_BLOG_REQUEST
})

export const get_all_post_success = (payload) => ({
    type: types.GET_ALL_BLOG_SUCCESS,
    payload
});

export const get_all_post_failure = (payload) => ({
    type: types.GET_ALL_BLOG_ERROR,
    payload
})


export const Get_All_Blog = (token) => (dispatch) => {
    dispatch(get_all_post_request());


    return axios.get("http://localhost:8080/blog/all", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            // console.log(res)
            return dispatch(get_all_post_success(res.data))

        })
        .catch((err) => {

            return get_all_post_failure(err)

        })
}