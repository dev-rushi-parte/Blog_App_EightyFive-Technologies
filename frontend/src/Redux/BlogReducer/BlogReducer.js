
import * as types from './actionType'

const inState = {
    isLoading: false,
    isError: false,
}

export const BlogReducer = (state = inState, action) => {

    const { type, payload } = action;

    switch (type) {

        case types.ADD_BLOG_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case types.ADD_BLOG_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                payload
            }
        }
        case types.ADD_BLOG_ERROR: {
            return {
                ...state,
                isError: true
            }
        }
        case types.GET_ALL_BLOG_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case types.GET_ALL_BLOG_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                payload
            }
        }
        case types.GET_ALL_BLOG_ERROR: {
            return {
                ...state,
                isError: true
            }
        }
        default:
            return state


    }
}