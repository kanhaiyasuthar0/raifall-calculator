import React, { useEffect } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button, Checkbox, TextField } from '@mui/material';
const InputData = ({ setEnteredval, enteredval, handleChange, submit, deleteHandle, generateReport, setnoYear, setArea, setType }) => {
    console.log(enteredval)
    enteredval = enteredval.sort((a, b) => a.year - b.year)
    useEffect(() => {

    })
    return (
        <>
            <div className='radiobtn'>

                <FormLabel id="demo-radio-buttons-group-label">Type of Catchment</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="1"
                    name="radio-buttons-group"
                    onChange={(e) => setType(e.target.value)}
                >
                    <FormControlLabel value={1} control={<Radio />} label="1 - Good" />
                    <FormControlLabel value={2} control={<Radio />} label="2 - Average" />
                    <FormControlLabel value={3} control={<Radio />} label="3 - Bad" />
                </RadioGroup>
                <div className='inputareayear'>

                    <TextField onChange={(e) => setArea(e.target.value)} className='area' type={"number"} id="area" label="Area" variant="standard" />
                    <TextField onChange={(e) => setnoYear(e.target.value)} className='year' type={"number"} id="year" label="Total No. of years for which rainfall data is available" variant="standard" />
                </div>
            </div>


            <div className='depend'>
                <FormLabel component="legend">Dependabilty</FormLabel>
                <FormControlLabel
                    value="top"
                    control={<Checkbox />}
                    label="90%"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="top"
                    control={<Checkbox />}
                    label="75%"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="top"
                    control={<Checkbox />}
                    label="50%"
                    labelPlacement="top"
                />
            </div>

            {/* <div>
                <TextField id="eyear" name='year' onChange={handleChange} type={"number"} label="Year" variant="standard" />
                <TextField id="eval" name='val' onChange={handleChange} type={"number"} label="Rainfall value in mm" variant="standard" />
            </div> */}
            <div style={{ margin: "20px auto", display: "flex", justifyContent: "space-evenly", width: "500px" }}>
                {/* <Button variant="contained" onClick={submit} color="success">  Submit
                </Button> */}
                <Button variant="contained" onClick={generateReport} color="error">  Generate Report
                </Button>
            </div>
            {/* <div>
                {enteredval.length > 0 ?
                    <table className='strtable'>
                        <thead>

                            <tr>
                                <th>sr</th>
                                <th>Year</th>
                                <th>Monsoon Rainfall in mm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enteredval?.map((item, index) => {
                                // console.log(item)
                                return (<tr onClick={() => deleteHandle(item)}>
                                    <td>{index + 1}</td>
                                    <td>{item.year}</td>
                                    <td>{item.val}</td>
                                </tr>)
                            })}
                        </tbody>
                    </table> : ""}
            </div> */}

        </>
    )
}

export default InputData