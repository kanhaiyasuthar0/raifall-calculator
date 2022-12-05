import { Button, Switch } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { margin } from '@mui/system';
import axios from "axios"
import xlsx from "json-as-xlsx"
import Header from './Navbar';
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
const converter = require('json-2-csv')
const Result = ({ enteredval, noYear, check, finalReport, setReport, noArea, userData, depend, type }) => {
    let normal = [...enteredval.sort((a, b) => a.year - b.year)]
    let sorted = enteredval.sort((a, b) => b.val - a.val)
    const [data1, setData] = useState([])
    const [hidebtn, setHideBtn] = useState(false)
    console.log(userData, "ashahsahiahiusha")
    // console.log(1 / (noYear + 1))
    function pdfD() {
        const pdfObject = jsPDFInvoiceTemplate(props);
        // console.log(pdfObject)
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

    const reportGenerateandDownload = () => {
        let arr = [];
        for (let i = 0; i < normal.length; i++) {
            let obj = {}
            obj["sr"] = i + 1;
            obj["year"] = normal[i].year;
            obj["monsoon_rainfall_in_mm"] = normal[i].val;
            obj["rainfall_desce_order_in_mm"] = sorted[i].val;
            obj["runoff_depth_as_per_strength_table_in_mm_per"] = check(sorted[i].val);
            obj["dependabilty"] = (((i + 1) / (1 + +noYear)) * 100).toFixed(4)
            obj["yield"] = ((((check(sorted[i].val) / 1000)) * 10000) / 1000000).toFixed(5)
            arr.push(obj)
        }
        setData([...arr])
    }
    // console.log(arr, "Final")
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
    const download = (data) => {
        const blob = new Blob([data], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '')
        a.setAttribute('href', url)
        a.setAttribute('download', "Dataset.csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    }
    // const [eachDepend, setEachDepend] = useState({
    //     "50"
    // })
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
            console.log(data1[i], i,)
            if (data1[i]["dependabilty"] == value) {
                return data1[i]["yield"]
            } else if (data1[i]["dependabilty"] == value) {
                return data1[i]["yield"]
            } else if (data1[i]["dependabilty"] == value) {
                return data1[i]["yield"]
            } else if (+data1[i]["dependabilty"] < +value, +data1[i + 1] ?? ["dependabilty"] > +value) {
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
    // /35.314 to Mcft
    let aob = []
    let aor = [];
    for (var key in data1[0]) {
        let obj = {}
        obj["title"] = key
        aob.push(obj)
    }
    for (let i = 0; i < data1.length; i++) {
        let arr = [...data1[i]]
        aor.push(aor)
    }
    console.log(aob, data1, aor)
    var props = {
        outputType: OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Invoice 2021",
        orientationLandscape: false,
        compress: true,
        logo: {
            src: "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            type: 'PNG', //optional, when src= data:uri (nodejs case)
            width: 170, //aspect ratio = width/height
            height: 26.66,
            margin: {
                top: 0, //negative or positive num, from the current position
                left: 10 //negative or positive num, from the current position
            }
        },
        // stamp: {
        //     inAllPages: true, //by default = false, just in the last page
        //     src: "",
        //     type: 'JPG', //optional, when src= data:uri (nodejs case)
        //     width: 20, //aspect ratio = width/height
        //     height: 20,
        //     margin: {
        //         top: 0, //negative or positive num, from the current position
        //         left: 0 //negative or positive num, from the current position
        //     }
        // },
        // business: {
        //     name: "Business Name",
        //     address: "Albania, Tirane ish-Dogana, Durres 2001",
        //     phone: "(+355) 069 11 11 111",
        //     email: "email@example.com",
        //     email_1: "info@example.al",
        //     website: "www.example.al",
        // },
        contact: {
            label: "Invoice issued for:",
            name: "Client Name",
            address: "Albania, Tirane, Astir",
            phone: "(+355) 069 22 22 222",
            email: "client@website.al",
            otherInfo: "www.website.al",
        },


        invoice: {
            label: "Invoice #: ",
            num: 19,
            invDate: "Payment Date: 01/01/2021 18:12",
            invGenDate: "Invoice Date: 02/02/2021 10:17",
            headerBorder: false,
            tableBodyBorder: false,
            header: [

                ...aob
            ],
            table: Array.from(data1, (item, index) => ([

                index + 1,
                "There are many variations ",
                "Lorem Ipsum is simply dummy text dummy text ",
                200.5,
                4.5,
                "m2",
            ])),
            // additionalRows: [{
            //     col1: 'Total:',
            //     col2: '145,250.50',
            //     col3: 'ALL',
            //     style: {
            //         fontSize: 14 //optional, default 12
            //     }
            // },
            // {
            //     col1: 'VAT:',
            //     col2: '20',
            //     col3: '%',
            //     style: {
            //         fontSize: 10 //optional, default 12
            //     }
            // },
            // {
            //     col1: 'SubTotal:',
            //     col2: '116,199.90',
            //     col3: 'ALL',
            //     style: {
            //         fontSize: 10 //optional, default 12
            //     }
            // }],

        },
        footer: {
            text: "",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };
    useEffect(() => {
        reportGenerateandDownload()
        // pdfD()
    }, [])
    return (
        <div>
            {/* <Header /> */}
            <div>
                <Switch onChange={handleHide} />
                <h1>Results of Yield Analysis using Strange Table</h1>
                {/* <div style={{ display: "flex", width: "500px", margin: "auto" }}>
                    <div>Report By - </div>
                    <div> {userData.uname}</div>
                </div> */}
                {hidebtn && <div style={{ margin: "20px auto", display: "flex", justifyContent: "space-around", width: "250px", alignItems: "center" }}>
                    {/* <Button variant="contained" onClick={submit} color="success">  Submit
                </Button> */}
                    <Button variant="contained" onClick={downloadDocument} color="success">  Download report
                    </Button> <CloudDownloadOutlinedIcon />
                </div>}
                <div style={{ display: "flex", width: "500px", margin: "auto", fontSize: "24px", fontWeight: 600 }}>
                    <div>Project name - </div>
                    <div style={{ textTransform: "capitalize" }}>  {userData.pname}  {` ${userData.plocation}`}</div>
                </div>
                <div>

                    <table style={{ border: "1px solid", margin: "2px auto", width: "300px" }}>

                        <tr>
                            <td style={{ border: "1px solid" }}>Area  </td>
                            <td style={{ border: "1px solid" }}>{noArea} Hectre</td>
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
                            <td style={{ border: "1px solid" }}>{getData((60).toFixed(4))} in Mcum</td>
                            <td style={{ border: "1px solid" }}>{(getData((60).toFixed(4)) * 1000).toFixed(3)} in TCm</td>
                            <td style={{ border: "1px solid" }}>{(getData((60).toFixed(4)) * 35.314).toFixed(3)} in MCft</td>
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
    )
}

export default Result