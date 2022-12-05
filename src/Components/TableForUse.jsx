import React, { useEffect } from 'react'
import { useState } from 'react'

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
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {heading?.map((item, index) => {
                            return (
                                <th style={{ textTransform: 'capitalize', border: "1px solid" }}>{item}</th>
                            )
                        })}
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {tableD?.map((item, index) => {
                        return (<tr>
                            {heading.map((each) => {
                                return (<td style={{ textTransform: 'capitalize', border: "1px solid" }}>{item[each]}</td>
                                )
                            })}
                            <td onClick={() => handleDelete(item)}>Delete</td>

                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableForUse