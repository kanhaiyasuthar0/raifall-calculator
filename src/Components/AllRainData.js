import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Result from './Result'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Loader from './Loader';
import Accordion1 from './Accordion';
import Header from './Navbar';
import { Col, Row } from 'react-bootstrap';

const AllRainData = ({ setRainDataToEdit }) => {
    const [isLoading, setLoading] = useState(false)
    const [allData, setAllData] = useState([])
    const [allReportData, setAllReportData] = useState([])
    const [each, setEach] = useState([])
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    async function getAllDataFrombackndRainFall() {
        setLoading(true)

        try {
            let res = await axios.get("https://rainfall.onrender.com/rainAll");
            // setAllData([...res.data])

            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    async function getAllDataFromBackend() {
        setLoading(true)
        try {
            let res = await axios.get("https://rainfall.onrender.com/all");
            console.log(res.data)
            setAllData([...res.data])

            // setAllReportData([...res.data])
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    // async function getAllDataFrombackndRainFall() {


    // }

    const updateRainDataEdit = async (data) => {
        setLoading(true)
        try {
            let res = await axios.put("https://rainfall.onrender.com/updateRain", data);
            // let res2 = await res.json();
            setAllData([...res.data])
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    function handleEdit(data) {
        // console.log(data)
        // console.log(data, "EDIT")
        let arr = []
        for (let i = 0; i < data.length; i++) {
            let obj = {};
            obj["year"] = data[i].year
            obj["rainfall"] = data[i].rainfall
            arr.push(obj)
            console.log(obj)
        }
        console.log(arr)
        localStorage.setItem("rainfall", JSON.stringify(arr))
        setRainDataToEdit([...arr])
        navigate("/projectData")
    }
    function handleGraph(data) {
        // console.log(data)
        // console.log(data, "EDIT")
        let arr = []
        let max = 0
        let min = 5000
        for (let i = 0; i < data.length; i++) {
            if (max < data[i].rainfall) {
                max = data[i].rainfall
            }
            if (min > data[i].rainfall) {
                min = data[i].rainfall
            }
            let obj = {};
            obj["year"] = data[i].year
            obj["rainfall"] = data[i].rainfall
            arr.push(obj)
            console.log(obj)
        }
        localStorage.setItem("max", JSON.stringify(max))
        localStorage.setItem("min", JSON.stringify(min))
        localStorage.setItem("rainfall", JSON.stringify(arr))
        setRainDataToEdit([...arr])
        navigate("/graph")
    }
    const openView = (data) => {
        setEach([...data.data])
    }
    useEffect(() => {
        // getAllDataFrombackndRainFall()
        getAllDataFromBackend()
    }, [])
    return (
        <Row>


            {isLoading ? <Loader /> : ""}

            <Col lg={2}>
                <Header />
            </Col>
            <Col lg={9}>
                <table style={{ border: "1px solid", margin: "auto", width: "70vw" }}>
                    <thead>
                        <tr style={{ border: "1px solid", borderRadius: "10px" }}>
                            <th style={{ border: "1px solid", borderRadius: "10px" }}>Created on</th>
                            <th style={{ border: "1px solid", borderRadius: "10px" }}>Project Name</th>
                            <th style={{ border: "1px solid", borderRadius: "10px" }}>User Name</th>
                            <th style={{ border: "1px solid", borderRadius: "10px" }}>Area</th>
                            <th style={{ border: "1px solid", borderRadius: "10px" }}>No of year's data</th>
                            {/* <th style={{ border: "1px solid", borderRadius: "10px" }}>Dependabilty</th> */}
                            <th style={{ border: "1px solid", borderRadius: "10px" }}>More detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allData?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{ border: "1px solid", borderRadius: "10px" }}>{new Date(item.createdAt).toDateString()}</td>
                                    <td style={{ border: "1px solid", borderRadius: "10px" }}>{item.projectname}</td>
                                    <td style={{ border: "1px solid", borderRadius: "10px" }}>{item.username}</td>
                                    <td style={{ border: "1px solid", borderRadius: "10px" }}>{item.area.value * item.area.unit / 10000} Hectre</td>
                                    <td style={{ border: "1px solid", borderRadius: "10px" }}>{item.userEntered.length}</td>
                                    {/* <td style={{ border: "1px solid", borderRadius: "10px" }}>{item.dependability[0].}</td> */}
                                    <td style={{ border: "1px solid", borderRadius: "10px" }}><Accordion1 data={item} index={index} handleEdit={handleEdit} handleGraph={handleGraph} /></td>
                                    {/* <td style={{ border: "1px solid", borderRadius: "10px" }}>{item.catchment}</td> */}
                                    {/* <td style={{ textOverflow: "ellipsis", border: "1px solid", borderRadius: "10px" }} onClick={() => openView(item)}><Button variant="primary" onClick={handleShow}>
                                    View
                                </Button></td> */}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </Col>

            {/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button> */}





            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Strange table</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <button onClick={() => handleEdit(each)} className='btn btn-secondary'>Edit</button>

                    <table className='strtable'>

                        <thead>

                            <tr>
                                <th>Sr</th>
                                <th>Year</th>
                                <th>Monsoon Rainfall in mm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {each?.map((item, index) => {
                                // console.log(item)
                                return (<tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.year}</td>
                                    <td>{item.rainfall}</td>
                                    {/* <td onClick={() => deleteHandle(item)}><DeleteForeverOutlinedIcon style={{ color: "red", }} /> </td> */}
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </Offcanvas.Body>
            </Offcanvas>

        </Row >
    )
}

export default AllRainData