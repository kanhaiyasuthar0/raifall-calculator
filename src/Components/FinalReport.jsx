import React, { useEffect, useState } from 'react'
import { check } from './common'
import axios from "axios"
import xlsx from "json-as-xlsx"
import { Switch } from '@mui/material'
import { Button } from 'bootstrap'

const FinalReport = ({ enteredval }) => {
    let rainfall = JSON.parse(localStorage.getItem("rainfall"))
    let userData = JSON.parse(localStorage.getItem("userData"))
    let strengthTable = JSON.parse(localStorage.getItem("strengthTable"))
    let normal = [...rainfall.sort((a, b) => a.year - b.year)]
    let sorted = rainfall.sort((a, b) => b.rainfall - a.rainfall)
    const [data1, setData] = useState([])
    const [hidebtn, setHideBtn] = useState(false)

    // console.log(first)
    //to generate report
    const reportGenerateandDownload = () => {
        let arr = [];
        for (let i = 0; i < normal.length; i++) {
            let obj = {}
            obj["sr"] = i + 1;
            obj["year"] = normal[i].year;
            obj["monsoon_rainfall_in_mm"] = normal[i].rainfall;
            obj["rainfall_desce_order_in_mm"] = sorted[i].rainfall;
            obj["runoff_depth_as_per_strength_table_in_mm_per"] = check(sorted[i].rainfall);
            obj["dependabilty"] = (((i + 1) / (1 + +userData.no_of_year)) * 100).toFixed(4)
            obj["yield"] = ((((check(sorted[i].rainfall) / 1000)) * 10000) / 1000000).toFixed(5)
            arr.push(obj)
        }
        setData([...arr])
    }


    const downloadAsExcel = (data2) => {
        let arr = Object.keys(data2[0])
        console.log(arr)
        let main = []
        for (let i = 0; i < arr.length; i++) {
            let obj = {
                label: arr[i].toUpperCase(), value: arr[i]
            }
            main.push(obj)
        }
        let data = [
            {
                sheet: "Report",
                columns: [
                    // ...main
                    { label: "Sr", value: "sr" },
                    { label: "Year", value: "year" },
                    { label: "Monsoon Rainfall in mm", value: "monsoon_rainfall_in_mm" },
                    { label: "Rainfall descending order in mm", value: "rainfall_desce_order_in_mm" },
                    { label: "Runoff depth as per Strange table in mm per", value: "runoff_depth_as_per_strength_table_in_mm_per" },
                    { label: "Yield", value: "yield" },
                    { label: "Dependability", value: "dependabilty" }

                ],
                content: [
                    ...data2
                    // { user: "Andrea", age: 20, more: { phone: "11111111" } },
                    // { user: "Luis", age: 21, more: { phone: "12345678" } },
                ],
            }
        ]


        let settings = {
            fileName: "MySpreadsheet", // Name of the resulting spreadsheet
            extraLength: 3, // A bigger number means that columns will be wider
            writeMode: 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
            writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
            RTL: false, // Display the columns from right-to-left (the default value is false)
        }

        xlsx(data, settings)
    }

    const downloadDocument = async () => {
        let data = {}
        console.log()
        data["name"] = userData.uname;
        let arr = []
        for (let i = 0; i < data1.length; i++) {
            let obj = {}
            obj["year"] = data1[i].year
            obj["rainfall"] = data1[i].monsoon_rainfall_in_mm
            obj["sortedrainfall"] = data1[i].rainfall_desce_order_in_mm
            obj["runoff"] = data1[i].runoff_depth_as_per_strength_table_in_mm_per
            obj["yield"] = data1[i].yield
            obj["dependabilty"] = data1[i].dependabilty
            obj["depend"] = [{ at: 50, val: 122 }]
            // data["data"] = obj
            arr.push(obj)
        }

        data["data"] = arr

        try {
            let res = await axios.post(`https://rainfall.onrender.com/add`, data)
            let res2 = await res.json();
            console.log(res2)

        } catch (error) {

        }

        downloadAsExcel(data1)
        // converter.json2csv(data1, async (err, csv) => {
        //     if (err) {
        //         throw err
        //     }
        //     // print CSV string
        //     console.log(csv)
        //     download(csv)
        // })
    }

    function interpolDepend(ob1val, ob2val, c1, c2, mainVal) {
        console.log(ob1val, ob2val, c1, c2, mainVal)
        let upper = ob2val - ob1val
        let lower = ob2val - mainVal
        let u2 = c2 - c1
        let l2 = c2 - "x"
        console.log(upper, lower, u2, l2)
        let v1 = lower / upper * u2
        return (c2 - v1).toFixed(5)
    }

    function getData(value) {
        for (let i = 0; i < data1.length; i++) {
            console.log(data1[i], i, value)
            if (data1[i]["dependabilty"] == value) {
                console.log("got the value", value)
                return data1[i]["yield"]
            } else if (data1[i]["dependabilty"] == value) {
                console.log("got the value", value)
                return data1[i]["yield"]
            } else if (data1[i]["dependabilty"] == value) {
                console.log("got the value", value)
                return data1[i]["yield"]
            } else if (+data1[i]["dependabilty"] < +value, data1[i + 1] ?? ["dependabilty"] > +value) {
                console.log("got the value", value, +data1[i + 1], +data1[i])
                console.log("YES")
                return interpolDepend(data1[i]["dependabilty"], data1[i + 1]["dependabilty"], data1[i]["yield"], data1[i + 1]["yield"], value)
            }
        }
        let ans = 0;
        return ans.toFixed(5)
    }
    const handleHide = (e) => {
        // console.log(e.target.checked)
        setHideBtn(e.target.checked)
    }

    useEffect(() => {
        reportGenerateandDownload()
        // pdfD()
    }, [])
    let { type } = userData
    return (
        <div>
            <div>
                {/* <Header /> */}
                <div>
                    {/* <Switch onChange={handleHide} /> */}
                    <h1>Results of Yield Analysis using Strange Table</h1>
                    {/* <div style={{ display: "flex", width: "500px", margin: "auto" }}>
                    <div>Report By - </div>
                    <div> {userData.uname}</div>
                </div> */}
                    {hidebtn && <div style={{ margin: "20px auto", display: "flex", justifyContent: "space-around", width: "250px", alignItems: "center" }}>
                        {/* <Button variant="contained" onClick={submit} color="success">  Submit
                </Button> */}
                        <Button variant="contained" onClick={downloadDocument} color="success">  Download report
                        </Button>
                    </div>}
                    <div style={{ display: "flex", width: "500px", margin: "auto", fontSize: "24px", fontWeight: 600 }}>
                        <div>Project name - </div>
                        <div style={{ textTransform: "capitalize" }}>  {userData.user_name}  {` ${userData.project_name}`}</div>
                    </div>
                    <div>

                        <table style={{ border: "1px solid", margin: "2px auto", width: "300px" }}>

                            <tr>
                                <td style={{ border: "1px solid" }}>Area  </td>
                                <td style={{ border: "1px solid" }}>{+userData.area * +userData.unit} Sq.m</td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid" }}>Type of Catchment</td>
                                <td style={{ border: "1px solid" }}>{type == 1 ? "Good" : type == 2 ? "Average" : type == 3 ? "Bad" : ""}</td>
                            </tr>
                        </table>
                        <table style={{ border: "1px solid", margin: "auto", width: "700px" }}>
                            <tr>
                                <td style={{ border: "1px solid" }}>Yield at - {"50%"} Dependabilty </td>
                                <td style={{ border: "1px solid" }}>{getData((50).toFixed(4))} in Mcum</td>
                                <td style={{ border: "1px solid" }}>{(getData((50).toFixed(4)) * 1000).toFixed(3)} in TCm</td>
                                <td style={{ border: "1px solid" }}>{(getData((50).toFixed(4)) * 35.314).toFixed(3)} in MCft</td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid" }}>Yield at - {"75%"} Dependabilty = </td>
                                <td style={{ border: "1px solid" }}>{getData((75).toFixed(4))} in Mcum</td>
                                <td style={{ border: "1px solid" }}>{(getData((75).toFixed(4)) * 1000).toFixed(3)} in TCm</td>
                                <td style={{ border: "1px solid" }}>{(getData((75).toFixed(4)) * 35.314).toFixed(3)} in MCft</td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid" }}>Yield at - {"90%"} Dependabilty = </td>
                                <td style={{ border: "1px solid" }}>{getData((90).toFixed(4))} in Mcum</td>
                                <td style={{ border: "1px solid" }}>{(getData((90).toFixed(4)) * 1000).toFixed(3)} in TCm</td>
                                <td style={{ border: "1px solid" }}>{(getData((90).toFixed(4)) * 35.314).toFixed(3)} in MCft</td>
                            </tr>
                        </table>

                        {/* {depend["50"] && <div className='eachD'>
                        <div></div>
                        <div>{getData((50).toFixed(4))} in Mcum</div>
                        <div>{getData((50).toFixed(4)) * 1000} in TCm</div>
                        <div>{getData((50).toFixed(4)) * 35.314} in MCft</div>
                    </div>}
                    {depend["75"] && <div className='eachD'>
                        <div>Yield at - {"75%"} Dependabilty = </div>
                        <div>{getData((60).toFixed(4))} in Mcum</div>
                        <div>{getData((60).toFixed(4)) * 1000} in TCm</div>
                        <div>{getData((60).toFixed(4)) * 35.314} in MCft</div>
                    </div>}
                    {depend["90"] && <div className='eachD'>
                        <div>Yield at - {"90%"} Dependabilty = </div>
                        <div>{getData((90).toFixed(4))} in Mcum</div>
                        <div>{getData((90).toFixed(4)) * 1000} in TCm</div>
                        <div>{getData((90).toFixed(4)) * 35.314} in MCft</div>
                    </div>} */}

                    </div>

                </div>
                <table style={{ border: "1px solid", display: "inline-block", margin: "50px auto" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "200px", border: "1px solid" }}>Sr</th>
                            <th style={{ width: "200px", border: "1px solid" }}>Year</th>
                            <th style={{ width: "200px", border: "1px solid" }}>Monsoon Rainfall in mm</th>
                            <th style={{ width: "200px", border: "1px solid" }}>Monsoon Rainfall in descending order in mm</th>
                            <th style={{ width: "200px", border: "1px solid" }}>Run off depth as per strange table in mm per</th>
                            <th style={{ width: "200px", border: "1px solid" }}>Yield in Mcum</th>
                            <th style={{ width: "200px", border: "1px solid" }}>Dependabilty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data1?.map((item, index) => {
                            // console.log(index + 1 / 21)
                            return (<tr>
                                <td style={{ width: "200px", border: "1px solid" }}>{item.sr}</td>
                                <td style={{ width: "200px", border: "1px solid" }}>{item.year}</td>
                                <td style={{ width: "200px", border: "1px solid" }}>{item.monsoon_rainfall_in_mm}</td>
                                <td style={{ width: "200px", border: "1px solid" }}>{item.rainfall_desce_order_in_mm}</td>
                                <td style={{ width: "200px", border: "1px solid" }}>{item.runoff_depth_as_per_strength_table_in_mm_per}</td>
                                <td style={{ width: "200px", border: "1px solid" }}>{item.yield}</td>
                                <td style={{ width: "200px", border: "1px solid" }}>{item.dependabilty}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>
                <div>
                    {/* {depend["50"] && <div>
                    <div>Yield at - {"50%"} Dependabilty = </div>
                    <div>{getData((50).toFixed(4))}</div>
                </div>} */}
                    {/* {depend["75"] && <div>
                    <div>Yield at - {"75%"} Dependabilty = </div>
                    <div>{getData(60.0000)}</div>
                </div>}
                {depend["90"] && <div>
                    <div>Yield at - {"90%"} Dependabilty = </div>
                    <div>{getData(90.0000)}</div>
                </div>} */}
                </div>

            </div>
        </div>
    )
}

export default FinalReport