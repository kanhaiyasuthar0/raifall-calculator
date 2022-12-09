import React, { useEffect } from 'react'
import { useState } from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const TableForUse = ({ data, handleDelete }) => {

    const [tableD, setTable] = useState([])
    const [heading, setHeading] = useState([])
    console.log(data, tableD, heading)
    useEffect(() => {
        // console.log(data[0])
        let arr = Object.keys(data[0])
        setHeading([...arr])
        setTable([...data,])
    }, [data])
    return (<div>
        <table>
            <thead>
                <tr>
                    {heading?.map((item, index) => {
                        return (
                            <th key={index} style={{ textTransform: 'capitalize', border: "1px solid" }}>{item}</th>
                        )
                    })}
                    <th style={{ border: "1px solid", color: "red" }}>Delete</th>
                </tr>
            </thead>
            <tbody>
                {tableD?.map((item, index) => {
                    return (<tr key={index}>
                        {heading.map((each, indexi) => {
                            return (<td key={indexi} style={{ textTransform: 'capitalize', border: "1px solid" }}>{item[each]}</td>
                            )
                        })}
                        <td className='deletebtn' style={{ border: "1px solid", cursor: "pointer" }} onClick={() => handleDelete(item)}><RemoveCircleIcon /></td>

                    </tr>)
                })}
            </tbody>
        </table>
    </div>
    )
}

export default TableForUse