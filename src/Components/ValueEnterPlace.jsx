import { Button, FormControlLabel, Switch, TextField } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Add, check } from './common'
import Loader from './Loader'
import Header from './Navbar'

import TableData from './TableData'
import TableForUse from './TableForUse'
import YearVal from './YearVal'

const ValueEnterPlace = () => {
    const [isLoading, setLoading] = useState(false)

    let userData = JSON.parse(localStorage.getItem("userData"))
    const [data1, setData] = useState([])
    const [year, setYear] = useState("")
    const [rainfall, setRainfall] = useState("")
    const [auto, setAuto] = useState(false)
    const [allRainfallData, setAllRainfallData] = useState([])
    const navigate = useNavigate()
    const handleRainfall = (e) => {
        setRainfall(e.target.value)
    }
    const handleYear = (e) => {
        setYear(e.target.value)
    }

    const submit = (e) => {
        e.preventDefault()
        setAllRainfallData([...allRainfallData, { year: year, rainfall: rainfall }])
        if (auto) {
            setYear((prev) => +prev + 1)
        }
        setRainfall("")
    }
    const columns = [
        { field: 'year', headerName: 'ID', width: 70 },
        { field: 'rainfall', headerName: 'ID', width: 70 },
    ]
    // console.log(auto)
    const saveit = () => {
        localStorage.setItem("rainfall", JSON.stringify(allRainfallData));
        generateDataForUpload(allRainfallData)

        // navigate("/generateReport")
    }
    const handleDelete = (item) => {
        let filtered = allRainfallData.filter((each) => each.year != item.year);
        setAllRainfallData([...filtered])
    }



    async function generateDataForUpload(rainfall) {
        let userData = JSON.parse(localStorage.getItem("userData"))
        let strengthTable = JSON.parse(localStorage.getItem("strengthTable"))
        let normal = [...rainfall.sort((a, b) => a.year - b.year)]
        let sorted = rainfall.sort((a, b) => b.rainfall - a.rainfall)


        // year: { type: Number },
        //         rainfall: { type: Number },
        //         sortedrainfall: { type: Number },
        //         runoff: { type: Number },
        //         yield: { type: Number },
        //         dependabilty: { type: Number },
        //         depend: [{ at: { type: String }, val: { type: Number } }]
        const reportGenerateandDownload = () => {
            let arr = [];
            for (let i = 0; i < normal.length; i++) {
                let obj = {}
                obj["year"] = normal[i].year;
                obj["rainfall"] = normal[i].rainfall;
                obj["sortedrainfall"] = sorted[i].rainfall;
                obj["runoff"] = check(sorted[i].rainfall, JSON.parse(localStorage.getItem("strengthTable")));
                obj["dependability"] = (((i + 1) / (1 + +userData.no_of_year)) * 100).toFixed(4)
                obj["yield"] = ((((check(sorted[i].rainfall, JSON.parse(localStorage.getItem("strengthTable"))) / 1000)) * 10000) / 1000000).toFixed(5)
                arr.push(obj)
            }
            setData([...arr])
            console.log(arr, "ARRR")
            MakeDataForAdd(userData, normal, arr)
            localStorage.setItem("rainfall", JSON.stringify([]))
            navigate("/generateReport")
        }




        reportGenerateandDownload()


    }

    function interpolDepend(ob1val, ob2val, c1, c2, mainVal) {
        // console.log(ob1val, ob2val, c1, c2, mainVal)
        let upper = ob2val - ob1val
        let lower = ob2val - mainVal
        let u2 = c2 - c1
        let l2 = c2 - "x"
        // console.log(upper, lower, u2, l2)
        let v1 = lower / upper * u2
        return (c2 - v1).toFixed(5)
    }

    function getData(value, data) {
        console.log(value, data)
        for (let i = 0; i < data.length; i++) {
            console.log(data[i], i, value, data[i]["dependability"])
            if (data[i]["dependability"] == value) {
                // console.log("got the value", value)
                return data[i]["yield"]
            } else if (data[i]["dependability"] == value) {
                // console.log("got the value", value)
                return data[i]["yield"]
            } else if (data[i]["dependability"] == value) {
                // console.log("got the value", value)
                return data[i]["yield"]
            } else if (+data[i]["dependability"] < +value, data[i + 1] ? +data[i + 1]["dependability"] > +value : false) {
                // console.log("got the value", value, data1[i + 1], data1[i])
                // console.log("YES")
                return interpolDepend(data[i]["dependability"], data[i + 1]["dependability"], data[i]["yield"], data[i + 1]["yield"], value)
            }
        }
        let ans = 0;
        return ans.toFixed(5)
    }

    function MakeDataForAdd(userData, normal, data) {
        console.log(data)
        console.log(userData.dependability)
        let DataFinal = {
            username: userData.user_name,
            projectname: userData.project_name,
            area: {
                value: userData.area,
                unit: userData.unit
            },
            catchment: {
                value: userData.type
            },
            totalnoofyeardata: userData.no_of_year,
            dependability: [
                { value: getData(userData.dependability[0].value, data), status: userData.dependability[0].status, at: userData.dependability[0].value },
                { value: getData(userData.dependability[1].value, data), status: userData.dependability[1].status, at: userData.dependability[1].value },
                { value: getData(userData.dependability[2].value, data), status: userData.dependability[2].status, at: userData.dependability[2].value }
            ]
            ,
            userEntered: [...normal],
            data: [...data]
        }

        setLoading(true)
        Add(DataFinal)
        setLoading(false)
        localStorage.setItem("viewData", JSON.stringify(DataFinal))
    }


    let editable = JSON.parse(localStorage.getItem("rainfall"));
    useEffect(() => {
        if (editable) {
            setAllRainfallData([...editable])
        }
    }, [])
    return (
        <Row>
            {isLoading ? <Loader /> : ""}


            <Col lg={3}>
                <Header />
            </Col>
            <Col lg={7}>

                <form>
                    <div style={{ display: "flex", width: "50%", justifyContent: "space-evenly", margin: "auto" }} >
                        <FormControlLabel control={<Switch onChange={() => setAuto(!auto)} value={auto ? true : false} />} label="Auto increment year?" />
                        <TextField style={{ width: "800px", marginRight: "20px" }} id="eyear" value={year} name='year' onChange={handleYear} type={"number"} label="Year" variant="standard" />
                        <TextField style={{ width: "800px" }} id="eval" value={rainfall} name='val' onChange={handleRainfall} type={"number"} label="Rainfall value in mm" variant="standard" />
                    </div>
                    <div style={{ margin: "20px auto", display: "flex", justifyContent: "space-evenly", width: "500px" }}>
                        <Button type='' variant="contained" onClick={submit} color="success">  Add
                        </Button>
                        <Button variant="contained" disabled={userData?.no_of_year == allRainfallData.length ? false : true} onClick={saveit} color="error">  Save to cloud
                        </Button><Button>{userData?.no_of_year} no of entries</Button>
                    </div>
                </form>


                <div style={{ margin: "auto", width: "fit-content" }}>
                    {allRainfallData.length > 0 ? <TableForUse data={allRainfallData} handleDelete={handleDelete} /> : ""}
                </div>
            </Col>
        </Row>
    )
}

export default ValueEnterPlace