import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
const converter = require('json-2-csv')
const Result = ({ enteredval, noYear, check, finalReport, setReport }) => {
    let normal = [...enteredval.sort((a, b) => a.year - b.year)]
    let sorted = enteredval.sort((a, b) => b.val - a.val)
    const [data1, setData] = useState([])
    // console.log(1 / (noYear + 1))
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
            obj["yield"] = "na"
            arr.push(obj)
        }
        setData([...arr])
    }
    // console.log(arr, "Final")
    const downloadDocument = () => {
        converter.json2csv(data1, async (err, csv) => {
            if (err) {
                throw err
            }
            // print CSV string
            console.log(csv)
            download(csv)
        })
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

    useEffect(() => {
        reportGenerateandDownload()
    }, [])
    return (
        <div>
            <table style={{ border: "1px solid", display: "inline-block", margin: "50px auto" }}>
                <thead>
                    <tr>

                        <th style={{ width: "200px", border: "1px solid" }}>sr</th>
                        <th style={{ width: "200px", border: "1px solid" }}>year</th>
                        <th style={{ width: "200px", border: "1px solid" }}>Monsoon Rainfall in mm</th>
                        <th style={{ width: "200px", border: "1px solid" }}>Monsoon Rainfall in descending order in mm</th>
                        <th style={{ width: "200px", border: "1px solid" }}>Run off depth as per strange table in mm per</th>
                        <th style={{ width: "200px", border: "1px solid" }}>Dependabilty</th>
                        <th style={{ width: "200px", border: "1px solid" }}>Yield in cum</th>
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
                            <td style={{ width: "200px", border: "1px solid" }}>{item.dependabilty}</td>
                            <td style={{ width: "200px", border: "1px solid" }}>{item.yield}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <div style={{ margin: "20px auto", display: "flex", justifyContent: "space-around", width: "250px", alignItems: "center" }}>
                {/* <Button variant="contained" onClick={submit} color="success">  Submit
                </Button> */}
                <Button variant="contained" onClick={downloadDocument} color="success">  Download report
                </Button> <CloudDownloadOutlinedIcon />
            </div>
        </div>
    )
}

export default Result