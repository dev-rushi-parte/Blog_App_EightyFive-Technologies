import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import TopNavbar from '../Component/Navbar'
import { GetUser, UpdateUser } from '../Redux/BlogReducer/action';
import style from "./BlogStyle.module.css"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/Spinner';

function Profile() {

  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false)
  const [img, setImg] = useState("")

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.authToken);


  const HandelUpdate = (e) => {
    setLoading(true)
    if (img !== '') {
      const data = new FormData();
      data.append("file", img)
      data.append("upload_preset", "insta-clone")
      data.append("cloud_name", "rushi2784")
      fetch(`https://api.cloudinary.com/v1_1/insta-clone/image/upload`, {
        method: "POST",
        body: data
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.url)
          // Post the Image to our data base

          const payload = {
            id: user?._id,
            email,
            img: data.url,
            token,
            name
          }
          // console.log(payload)
          dispatch(UpdateUser(payload))
            .then((res) => {
              console.log(res)
              if (res.type == 'UPADATE_USER_INFO_SUCCESS') {

                setUpdate(prv => !prv)
                setLoading(false)

                alert("Succesfully Updates")
              }
            })

        })
    }
    else {
      const payload = {
        id: user?._id,
        email,
        token,
        name
      }
      // console.log(payload)
      dispatch(UpdateUser(payload))
        .then((res) => {
          console.log(res)
          if (res.type == 'UPADATE_USER_INFO_SUCCESS') {
            setUpdate(prv => !prv)
            setLoading(false)
            alert("Succesfully Updates")

          }
        })
    }
  }



  useEffect(() => {
    dispatch(GetUser(token))
      .then((res) => {
        console.log(res.payload)
        setUser(res.payload)
        setEmail(res.payload.email)
        setName(res.payload.name)
      })
  }, [update])

  return (
    <div>
      <TopNavbar />
      <div id={style.ProfileBox} style={{ marginTop: "8rem" }}>
        {user == null ? <>
          <Spinner style={{ width: "6rem", height: "6rem" }} className='container center_div mt-5 ' animation="border" role="status" />
        </> : <>
          {loading ? <>
            <Spinner style={{ width: "6rem", height: "6rem" }} className='container center_div mt-5 ' animation="border" role="status" />
          </> : <>
            <div id={style.ProfileImg}>

              <input onChange={(e) => setImg(e.target.files[0])} id={style.hideFile} type="file" />
              {user?.img == '' ? <img src="\img\ProfilePic.jpg" alt='img1' /> : <img src={user?.img} alt='img2' />}

            </div>
            <div id={style.userInfo}>
              <Form className='mt-1 p-1' >

                <Form.Group className="mb-3 col-md-10 col-sm-10 col-xs-4" >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control value={email}
                    maxLength="30" required
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter email" />

                </Form.Group>


                <Form.Group className="mb-3 col-md-10 col-sm-10">
                  <Form.Label>Name</Form.Label>

                  <Form.Control
                    value={name}
                    minLength="6" required
                    onChange={(e) => setName(e.target.value)}
                    type={'text'}
                    placeholder="Password" />


                </Form.Group>
              </Form>
              <Button disabled={(name !== user?.name || email !== user?.email || img !== '') ? false : true}
                style={{ marginLeft: '330px' }} className='col-md-4 mt-5' variant="primary"
                onClick={HandelUpdate}>
                Update
              </Button>
            </div>
          </>}

        </>}

      </div>

    </div>
  )
}

export default Profile
