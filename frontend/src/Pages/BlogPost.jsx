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
                    <img src='img\my.jpg' alt='img' />
                </div>
                <div>
                    <p onClick={() => navigate("/profile")} >{props?.item?.userId?.name}</p>
                </div>
            </div>

            <div className='ps-2 pt-3'>
                <p> <span>Title - </span>{props.item.title}</p>
            </div>

            <div id={style.blogImg}>
                <img src={props.item.img} alt="img" />
            </div>

            <div>
                <p><span>Content - </span>{props.item.content}</p>
            </div>
        </div>
    )
}

export default BlogPost
