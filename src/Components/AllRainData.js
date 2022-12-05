import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Result from './Result'

const AllRainData = ({ setEnteredval }) => {
    const [allData, setAllData] = useState([])
    const [each, setEach] = useState([])
    const navigate = useNavigate()
    async function getAllDataFrombackndRainFall() {
        try {
            let res = await axios.get("https://rainfall.onrender.com/rainAll");
            // let res2 = await res.json();
            console.log(res.data)
            // console.log(res2)
            setAllData([...res.data])
        } catch (error) {
            console.log(error)
        }

    }
    function handleEdit(data) {
        // console.log(data)
        let arr = []
        for (let i = 0; i < data.length; i++) {
            let obj = {};
            obj["year"] = data[i].year
            obj["rainfall"] = data[i].rainfall
            arr.push(obj)
            console.log(obj)
        }
        localStorage.setItem("rainfall", JSON.stringify(arr))
        // setEnteredval([...arr])
        navigate("/projectData")
    }
    const openView = (data) => {
        setEach([...data.data])
    }
    useEffect(() => {
        getAllDataFrombackndRainFall()
    }, [])
    return (
        <div>
            <table style={{ border: "1px solid", margin: "auto", width: "500px" }}>
                <thead>
                    <tr style={{ border: "1px solid", borderRadius: "10px" }}>
                        <th style={{ border: "1px solid", borderRadius: "10px" }}>id</th>
                        <th style={{ border: "1px solid", borderRadius: "10px" }}>Name</th>
                        <th style={{ border: "1px solid", borderRadius: "10px" }}>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {allData?.map((item) => {
                        return (
                            <tr>
                                <td style={{ border: "1px solid", borderRadius: "10px" }}>{item._id}</td>
                                <td style={{ border: "1px solid", borderRadius: "10px" }}>{item.name}</td>
                                <td style={{ textOverflow: "ellipsis", border: "1px solid", borderRadius: "10px" }} onClick={() => openView(item)}><button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">View</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>



            {/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button> */}

            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
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
                                return (<tr>
                                    <td>{index + 1}</td>
                                    <td>{item.year}</td>
                                    <td>{item.rainfall}</td>
                                    {/* <td onClick={() => deleteHandle(item)}><DeleteForeverOutlinedIcon style={{ color: "red", }} /> </td> */}
                                </tr>)
                            })}
                        </tbody>
                    </table>


                </div>
            </div>

        </div>
    )
}

export default AllRainData