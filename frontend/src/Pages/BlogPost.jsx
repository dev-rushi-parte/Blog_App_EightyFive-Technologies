import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './BlogStyle.module.css';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateBlog } from '../Redux/BlogReducer/action';
import Spinner from 'react-bootstrap/Spinner';


function BlogPost(props) {

    const [show, setShow] = useState(false);
    const [data, setdata] = useState();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState("");
    const [preview, setPreview] = useState();
    const [loadingStatus, setLoadingStatus] = useState(false)
    const dispatch = useDispatch()


    const token = useSelector((state) => state.auth.authToken);

    const handleClose = () => setShow(false);

    // console.log(data?._id)
    const handleShow = (item) => {
        console.log(item)
        setTitle(item.title)
        setContent(item.content)
        setdata(item)
        setShow(true)
    };

    // console.log(props.setUpdates)

    const handleUpdate = async (e) => {
        setLoadingStatus(true)
        if (selectedFile !== '') {
            const dataa = new FormData();
            dataa.append("file", selectedFile)
            dataa.append("upload_preset", "insta-clone")
            dataa.append("cloud_name", "rushi2784")
            fetch(`https://api.cloudinary.com/v1_1/insta-clone/image/upload`, {
                method: "POST",
                body: dataa
            })
                .then((res) => res.json())
                .then((imges) => {
                    console.log(imges.url)
                    // Post the Image to our data base
                    console.log(data)
                    const payload = {
                        id: data?._id,
                        img: imges.url,
                        title,
                        token,
                        content
                    }
                    console.log(payload)
                    dispatch(UpdateBlog(payload))
                        .then((res) => {
                            console.log(res)
                            if (res.type == 'UPDATE_BLOG_SUCCESS') {

                                props.setUpdates(prv => !prv)
                                setLoadingStatus(false)

                                alert("Succesfully Updates")
                                setShow(false)
                            }
                        })

                })
        }
        else {
            const payload = {
                id: data?._id,
                title,
                token,
                content
            }
            console.log(payload)
            dispatch(UpdateBlog(payload))
                .then((res) => {
                    console.log(res)
                    if (res.type == 'UPDATE_BLOG_SUCCESS') {
                        props.setUpdates(prv => !prv)
                        setLoadingStatus(false)
                        alert("Succesfully Updates")
                        setShow(false)

                    }
                })
        }
    }

    // Only for Preview
    useEffect(() => {

        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)


    }, [selectedFile])


    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }
    return (
        <div id={style.post} className='rounded-3 mt-3'>

            <div id={style.head}>
                <div id={style.imgBox} onClick={() => navigate("/profile")} >
                    {props?.item?.userId?.img == '' ? <img src="\img\ProfilePic.jpg" alt='img1' /> : <img src={props?.item?.userId?.img} alt='img2' />}

                </div>
                <div>
                    <p onClick={() => navigate("/profile")} >{props?.item?.userId?.name}</p>
                </div>
                <div id={style.editSymbol}>

                    <Dropdown>
                        <Dropdown.Toggle id={style.dropdown_toggle} variant="white">
                            <BiDotsVerticalRounded fontSize={'35px'} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="light" className='ms-4'>
                            <Dropdown.Item onClick={() => handleShow(props.item)} >Edit</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item >Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>


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









            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Updating Blog</Modal.Title>
                </Modal.Header>
                {loadingStatus ?
                    <Spinner style={{ width: "6rem", height: "6rem" }} className='container center_div mt-5 ' animation="border" role="status" />
                    :

                    <Modal.Body>
                        <Form>
                            <p id={style.warring}>Click On Image to change it</p>
                            <div id={style.Blog_Upate_img}>

                                <input onChange={onSelectFile} id={style.blog_update_hideFile} type="file" />
                                {preview == null ? <img src={data?.img} alt='img1' /> : <img src={preview} alt='img2' />}

                            </div>


                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    value={title}
                                    type="text"
                                    autoFocus
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}

                                    rows={10} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>}
                {loadingStatus ? "" : <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={(title !== data?.title || content !== data?.content || selectedFile !== '') ? false : true}
                        variant="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Modal.Footer>}

            </Modal>

        </div>
    )
}

export default BlogPost
