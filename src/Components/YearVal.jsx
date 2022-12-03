import { Button, TextField } from '@mui/material'
import React from 'react'

const YearVal = ({ setEnteredval, enteredval, handleChange, submit, deleteHandle, generateReport, setnoYear, setArea, setType }) => {
    return (
        <div>
            <div style={{ display: "flex", width: "50%", justifyContent: "space-evenly", margin: "auto" }} >
                <TextField id="eyear" name='year' onChange={handleChange} type={"number"} label="Year" variant="standard" />
                <TextField id="eval" name='val' onChange={handleChange} type={"number"} label="Rainfall value in mm" variant="standard" />
            </div>
            <div style={{ margin: "20px auto", display: "flex", justifyContent: "space-evenly", width: "500px" }}>
                <Button variant="contained" onClick={submit} color="success">  Add
                </Button>
                {/* <Button variant="contained" onClick={generateReport} color="error">  Generate Report
                </Button> */}
            </div>
        </div>
    )
}

export default YearVal