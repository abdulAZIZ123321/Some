import {useEffect, useState, useRef} from 'react';

import request from '../../services/http';


import Modal from '../../components/Modal'

import userAvatar from '../../assests/images/avatar.jpg';

import './UserList.scss';


const UserList = () => {

    const [ list, setList] = useState({// TODO Userdan ma'lumot olish uchun ochildi pasda user ma'lumotlariga almdi
        isFetched: false,
        data: [],
        error: null
    })

    const [ single, setSingle] = useState({ // TODO
        isFetched: false,
        data: {},
        error: null
    })

    const inputNameRef = useRef(null)
    const inputJobRef = useRef(null)

    const [modalState, setModalState ] = useState(false) // TODO Modalni ochish uchun qilindi
    const [addUserModal, setAddUserModal ] = useState(false) // TODO Add knopkasi bosilganda
   // const [addUserHasError, setAddUserHasError] = useState(false)
    const [editUserModal, setEditUserModal] = useState(false)
    const [response, setResponse] = useState([])
    useEffect(() => {
        request.get('./users?page=1')
        .then((response) => {
            console.log(response)
            setList({              // TODO Bu yerda serverdan kelayotgan user ma'lumotlariga tenglashtirilyapti
                isFetched: true,   // TODO Ya'ni listning boshlang'ich holati quyidagilarga o'zgartirilyapti
                data: response.data.data,
                error: false
            })
            setResponse(response)
        })
        .catch((err) => {
            console.log(err)
            setList({
                isFetched: true,
                data: [],
                error: true
            })
        })
    }, [])

    const getSingleUser = (id) => {
         request.get(`/users/${id}`)
        .then((response) => {
            setSingle({
                isFetched: true,
                data: response.data.data,
                error: false
            })
        })
        .catch((err) => {
            console.log(err)
            setSingle({
                isFetched: true, 
                data: {},
                error: true
            })
        })
    }


    const showSingleUser = (id) => {
        setSingle({
                isFetched: false,
                data: {},
                error: false
            })
        
        // TODO User haqida qo'shimcha ma'lumot ko'rish uchun Viewga bosilganda ishlaydi
        setModalState(true);        
        getSingleUser(id)
    }

    

    const showEditUser = (id) => { // TODO Userni o'zgartirmoqchi bo'lganda  Edit knopkasiga bosganda ishlaydi
        setSingle({
                isFetched: false,
                data: {},
                error: false
            })
        
       
        setEditUserModal(true); 
        getSingleUser(id)       
       
    }


    const handleAddUserSubmit = (e) => {
        e.preventDefault();
        request.post('/users', {
            name: inputNameRef.current.value,
            job: inputJobRef.current.value
        })
        .then((response)=> {
            setAddUserModal(false)
            inputNameRef.current.value="";
            inputJobRef.current.value=""
        })
        .catch((err)=> {
            console.log(err)
        })

        setList((prevState) => {
            return {
                ...prevState,
                data: [
                    ...prevState.data,
                    {
                        first_name: response.data.name,
                        last_name: 'Inoyatov',
                        id: response.data.id,
                        email: 'khumoyun@inoyatov.com',
                        avatar: userAvatar
                    }
                ]
            }
        })
    }

    return (
        <div className="container">
            

            <Modal 
            open={modalState}
            handleModalClose={setModalState}
            title="Single user"
            >

            {
                single.isFetched ? (
                    <div className="">
                        <h1>{single.data.first_name}</h1>
                    </div>
                ) : (
                    <h1>Loading...</h1>
                )
            }
            </Modal>


            <Modal 
                        open={addUserModal}
                        handleModalClose={setAddUserModal}
                        title="Add user"
            >

                    <form onSubmit={handleAddUserSubmit}>
                         {/* { // TODO Bu qism ishlamadi ustozda ham
                             addUserHasError ? (
                                 <div className="alert alert-danger" role="alert">
                                        A simple danger alert—check it out!
                                </div>
                             ) : (
                                 <></>
                             )
                         } */}
                            <div className="mb-3">
                                <label htmlFor="user-add-input-name" className="form-label">Name</label>
                                <input ref={inputNameRef} type="text" className="form-control" id="user-add-input-name" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="user-add-input-job" className="form-label">Job</label>
                                <input ref={inputJobRef} type="text" className="form-control" id="user-add-input-job" />
                            </div>
                            
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>

            </Modal>


            <Modal 
            open={editUserModal}
            handleModalClose={setEditUserModal}
            title="Edit user"
            >

             <form onSubmit={handleAddUserSubmit}>
                         {/* { // TODO Bu qism ishlamadi ustozda ham
                             addUserHasError ? (
                                 <div className="alert alert-danger" role="alert">
                                        A simple danger alert—check it out!
                                </div>
                             ) : (
                                 <></>
                             )
                         } */}
                    <div className="mb-3">
                        <label htmlFor="user-add-input-name" className="form-label">Name</label>
                        <input ref={inputNameRef} value={`${single.data.first_name} ${single.data.last_name}`} type="text" className="form-control" id="user-add-input-name" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user-add-input-job" className="form-label">Job</label>
                        <input ref={inputJobRef} type="text" className="form-control" id="user-add-input-job" />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </Modal>







           

            <div className="row">
                <button className="btn btn-success" onClick={() => setAddUserModal(true)}>Add user</button>

                 {
                    list.data.map((item) => (
                        <div className="col-md-3">
                            <div className="card mt-5">
                                <img src={item.avatar} alt="" className="card-img-top"/>
                                <div className="card-body">
                                    <h1 className="card-title">{item.first_name} {item.last_name}</h1>
                                    <p className="card-text">
                                        {item.email}
                                    </p>
                                    <button className="btn btn-outline-primary me-3" onClick={() => showSingleUser(item.id)}>View</button>
                                    <button className="btn btn-outline-warning" onClick={() => showEditUser(item.id)}>Edit</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


export default UserList