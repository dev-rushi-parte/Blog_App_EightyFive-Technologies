import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from './BlogStyle.module.css'
function BlogPost(props) {

    console.log(props)
    const navigate = useNavigate()

    return (
        <div id={style.post} className='rounded-3 mt-3'>

            <div id={style.head}>
                <div id={style.imgBox} onClick={() => navigate("/profile")} >
                    {props?.item?.userId?.img == '' ? <img src="\img\ProfilePic.jpg" alt='img1' /> : <img src={props?.item?.userId?.img} alt='img2' />}

                </div>
                <div>
                    <p onClick={() => navigate("/profile")} >{props?.item?.userId?.name}</p>
                </div>
            </div>

            <div className='p-3 fs-3 fw-bold'>
                <p> {props.item.title}</p>
            </div>

            <div id={style.blogImg}>
                <img src={props.item.img} alt="img" />
            </div>

            <div className='p-3'>
                <p>{props.item.content}</p>
            </div>
        </div>
    )
}

export default BlogPost
