import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import TopNavbar from '../Component/Navbar'
import { Get_All_Blog } from '../Redux/BlogReducer/action';
import BlogPost from './BlogPost'

function BlogFeed() {
    const [data, setData] = useState()

    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.authToken);

    useEffect(() => {
        dispatch(Get_All_Blog(token))
            .then((res) => {
                setData(res.payload)
            })
    }, [])

    // console.log(data)
    return (
        <div>
            <TopNavbar />
            <div style={{ marginTop: "8rem" }}>

                {/* <div style={{ width: '35rem' }} className='pb-4 container center_div col-md-6 border border-1 border-dark rounded-3'> */}
                <div style={{ width: '40rem' }}
                    className='pb-4 container center_div col-md-6 '>
                    {
                        data?.map((item, i) => (
                            <div key={i}>
                                <BlogPost item={item} />

                            </div>
                        ))
                    }



                </div>

            </div>
        </div>
    )
}

export default BlogFeed
