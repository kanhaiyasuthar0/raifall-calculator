import { Button, FormControlLabel, Switch, TextField } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TableData from './TableData'
import TableForUse from './TableForUse'
import YearVal from './YearVal'


const ValueEnterPlace = () => {
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
    }
    const columns = [
        { field: 'year', headerName: 'ID', width: 70 },
        { field: 'rainfall', headerName: 'ID', width: 70 },
    ]
    // console.log(auto)
    const saveit = () => {
        localStorage.setItem("rainfall", JSON.stringify(allRainfallData));
        navigate("/generateReport")
    }
    useEffect(() => {

    }, [])
    return (
        <div>
            <form>
                <div style={{ display: "flex", width: "50%", justifyContent: "space-evenly", margin: "auto" }} >
                    <FormControlLabel control={<Switch onChange={() => setAuto(!auto)} value={auto ? true : false} />} label="Auto increment year?" />
                    <TextField id="eyear" value={year} name='year' onChange={handleYear} type={"number"} label="Year" variant="standard" />
                    <TextField id="eval" value={rainfall} name='val' onChange={handleRainfall} type={"number"} label="Rainfall value in mm" variant="standard" />
                </div>
                <div style={{ margin: "20px auto", display: "flex", justifyContent: "space-evenly", width: "500px" }}>
                    <Button type='' variant="contained" onClick={submit} color="success">  Add
                    </Button>
                    <Button variant="contained" onClick={saveit} color="error">  Save to cloud
                    </Button>
                </div>
            </form>


            <div style={{ margin: "auto", width: "fit-content" }}>

                {allRainfallData.length > 0 ? <TableForUse data={allRainfallData} /> : ""}
            </div>

        </div>
    )
}

export default ValueEnterPlace