// import React, { useEffect, useState } from 'react'
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { NavLink } from 'react-router-dom';
// import axios from 'axios';
// import moment from "moment"

// const Home = () => {
//     const [data,setData] = useState([]);
//     console.log(data)

//     const getUserData = async()=>{
//         const res = await axios.get("http://localhost:4004/getdata",{
//             headers:{
//                 "Content-Type":"application/json"
//             }
//         });

        

//         if(res.status == 200){
//             setData(res.data)
//         }else{
//             alert("error")
//         }
//     };

//     const updateViewCount = async (id) => {
//         const res = await axios.put(`http://localhost:4004/updateview/${id}`);
//         if (res.status === 200) {
//             // Update the view count in the state
//             setData(data.map(item => item._id === id ? { ...item, viewCount: item.viewCount + 1 } : item));
//         } else {
//             alert("error updating view count");
//         }
//     };

//     useEffect(()=>{
//         getUserData()
//     },[])
//     return (
//         <>
//             <div className="container mt-2">
//                 <h1>MERN IMAGE upload</h1>
//                 <div className="text-end">  
//                 <Button variant="primary" >
//                     <NavLink to="/register" className="text-decoration-none text-light">Add User</NavLink>
//                 </Button>

//                 </div>
//                 <div className="row d-flex justify-content-between align-iteams-center mt-5">
//                 {
//                     data.length > 0 && data.map((element,index)=>{
//                         return (
//                             <>
//                             <Card style={{ width: '22rem',height:"24rem" }} className='mb-3'>
//                         <Card.Img variant="top" src={element.imgpath} style={{width:"100%",height:"50%",textAlign:"center",margin:"auto"}}
//                         className='mt-2'
//                          />
//                         <Card.Body>
//                             <Card.Title>User Name: {element.name}</Card.Title>
//                             <Card.Text>View : {element.viewCount}</Card.Text>
//                             <Card.Text>
//                                 Date Added : {moment(element.date).format("L")}
//                             </Card.Text>
//                             <Button variant="danger" className='col-lg-6 text-center'>Delete</Button>
//                         </Card.Body>
//                     </Card>
//                             </>
//                         )
//                     })
//                 }
                   
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Home





import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import '../home.css'; // import custom CSS for styling

const Home = () => {
    const [data, setData] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [showCard, setShowCard] = useState(false);
    // console.log(data);

    const getUserData = async () => {
        const res = await axios.get("http://localhost:4004/getdata", {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.status === 200) {
            setData(res.data);
        } else {
            alert("error");
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const incrementViewCount = async (id) => {
        try {
            const res = await axios.post(`http://localhost:4004/incrementview/${id}`, {}, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.status === 200) {
                return res.data.updatedViewCount;
            } else {
                console.error("Failed to increment view count");
                return null;
            }
        } catch (error) {
            console.error("Error incrementing view count", error);
            return null;
        }
    };

    const handleCardClick = async (element) => {
        // console.log("Element ID: ", element._id);
        const updatedViewCount = await incrementViewCount(element._id);
        if (updatedViewCount !== null) {
            setData(prevData => prevData.map(item => 
                item._id === element._id ? { ...item, viewCount: updatedViewCount } : item
            ));
        }
        setSelectedCard(element);
        setShowCard(true);
    };
    

    const handleClose = () => {
        setShowCard(false);
        setSelectedCard(null);
    };

    return (
        <>
            <div className={`container mt-2 ${showCard ? 'blur-background' : ''}`}>
                <h1>MERN IMAGE upload</h1>
                <div className="text-end">
                    <Button variant="primary">
                        <NavLink to="/register" className="text-decoration-none text-light">Add User</NavLink>
                    </Button>
                </div>
                <div className="row d-flex justify-content-between align-items-center mt-5">
                    {data.length > 0 && data.map((element, index) => {
                        return (
                            <Card 
                                key={index} 
                                style={{ width: '22rem', height: "24rem", cursor: "pointer"}} 
                                className='mb-3' 
                                onClick={() => handleCardClick(element)}
                            >
                                <Card.Img
                                    variant="top"
                                    src={element.imgpath}
                                    style={{ width: "100%", height: "50%", textAlign: "center", margin: "auto" }}
                                    className='mt-2'
                                />
                                <Card.Body>
                                    <Card.Title>User Name: {element.name}</Card.Title>
                                    <Card.Text>View: {element.viewCount}</Card.Text>
                                    <Card.Text>
                                        Date Added : {moment(element.date).format("L")}
                                    </Card.Text>
                                    <Button variant="danger" className='col-lg-6 text-center'>Delete</Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {showCard && selectedCard && (
                <div className="overlay">
                    <div className="enlarged-card">
                        <button className="close-button" onClick={handleClose}>
                            X
                        </button>
                        <Card style={{ width: '30rem', height: "35rem" }}>
                            <Card.Img
                                variant="top"
                                src={selectedCard.imgpath}
                                style={{ width: "100%", height: "60%", textAlign: "center", margin: "auto" }}
                                className='mt-2'
                            />
                            <Card.Body>
                                <Card.Title>User Name: {selectedCard.name}</Card.Title>
                                <Card.Text>View: {selectedCard.viewCount}</Card.Text>
                                <Card.Text>
                                    Date Added : {moment(selectedCard.date).format("L")}
                                </Card.Text>
                                <Button variant="danger" className='col-lg-6 text-center'>Delete</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;