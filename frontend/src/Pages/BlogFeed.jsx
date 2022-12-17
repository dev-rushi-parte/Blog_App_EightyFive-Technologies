import React from 'react'
import TopNavbar from '../Component/Navbar'
import BlogPost from './BlogPost'

function BlogFeed() {
    return (
        <div>
            <TopNavbar />
            <div style={{ marginTop: "8rem" }}>

                {/* <div style={{ width: '35rem' }} className='pb-4 container center_div col-md-6 border border-1 border-dark rounded-3'> */}
                <div style={{ width: '35rem' }} className='pb-4 container center_div col-md-6 border border-1 border-dark'>

                    <BlogPost />



                </div>

            </div>
        </div>
    )
}

export default BlogFeed
