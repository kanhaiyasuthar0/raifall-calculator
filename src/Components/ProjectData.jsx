import React, { useEffect } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button, Checkbox, Drawer, TextField } from '@mui/material';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import Header from './Navbar';
import { Alert, Col, Row } from 'react-bootstrap';
const ProjectData = ({ }) => {
    const navigate = useNavigate()
    const [projectDetails, setProjectDetails] = useState({
        user_name: "",
        project_name: "",
        area: "",
        no_of_year: "",
    })
    const [completeUserData, setCompleteUserData] = useState({})


    const [unit, setunit] = React.useState('');
    const [alert, setAlert] = React.useState(null);

    const handleChange = (event) => {
        setunit(event.target.value);
    };

    const [no50, set50] = useState({ value: 50, status: false })
    const [no75, set75] = useState({ value: 75, status: false })
    const [no90, set90] = useState({ value: 90, status: false })
    const [type, setType] = useState(1)

    function handleDepend(e) {
        if (e.target.name == 90) {
            set90({ value: 90, status: e.target.checked })
        } else if (e.target.name == 75) {
            set75({ value: 75, status: e.target.checked })
        } else {
            set50({ value: 50, status: e.target.checked })
        }
    }


    const handleData = (e) => {
        setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value })
    }
    const SubmitUserData = () => {
        console.log(projectDetails)
        if (projectDetails.user_name && projectDetails.project_name && projectDetails.area && unit && projectDetails.no_of_year) {
            let obj = {
                user_name: projectDetails.user_name,
                project_name: projectDetails.project_name,
                area: projectDetails.area,
                unit: unit,
                no_of_year: projectDetails.no_of_year,
                type: type,
                dependability: [no50, no75, no90]
            }
            localStorage.setItem("userData", JSON.stringify(obj))
            setCompleteUserData({
                ...obj
            })
            setAlert(null)
            navigate("/rainfallValue")
        } else {
            setAlert({ type: "danger", message: "Please provide all the details" })
        }
    }
    return (
        <Row >
            {/* <Header /> */}

            <Col lg={2}>
                <Header />
            </Col>
            <Col lg={9} className="main">

                {alert ? <Alert key={alert.type} variant={alert.type}>
                    {alert.message}
                </Alert> : ""}
                <div style={{ display: "flex", flexDirection: "column", width: "100%", margin: "auto", }}>
                    <TextField onChange={handleData} value={projectDetails.user_name} name={"user_name"} className='uname' type={"text"} id="uname" label="Please Enter Your Full Name Here .." variant="standard" />
                    <TextField onChange={handleData} value={projectDetails.project_name} name={"project_name"} className='pname' type={"text"} id="pname" label="Project Name" variant="standard" />
                </div>

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
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", width: "100%" }}>

                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>

                            <TextField value={projectDetails.area} onChange={(e) => handleData(e)} style={{ width: "80%" }} name="area" className='area' type={"number"} id="area" label="Area" variant="standard" />
                            <div>  <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={unit}
                                    label="unit"
                                    onChange={handleChange}

                                >
                                    <MenuItem value={1}>sq. m</MenuItem>
                                    <MenuItem value={10000}>hec.</MenuItem>
                                    {/* <MenuItem value={30}>Thirty</MenuItem> */}
                                </Select>     </div>
                        </div>
                        <TextField value={projectDetails.no_of_year} onChange={(e) => handleData(e)} name="no_of_year" className='year' type={"number"} id="year" label="Total No. of years for which rainfall data is available" variant="standard" />
                    </div>
                </div>


                <div className='depend'>
                    <FormLabel component="legend">Dependabilty</FormLabel>
                    <FormControlLabel
                        value="top"
                        control={<Checkbox />}
                        label="50%"
                        labelPlacement="top"
                        onChange={handleDepend}
                        name="50"
                    />
                    <FormControlLabel
                        value="top"
                        control={<Checkbox />}
                        label="75%"
                        labelPlacement="top"
                        onChange={handleDepend}
                        name="75"
                    />
                    <FormControlLabel
                        value="top"
                        control={<Checkbox />}
                        label="90%"
                        labelPlacement="top"
                        onChange={handleDepend}
                        name="90"
                    />
                </div>

                {/* <div>
                <TextField id="eyear" name='year' onChange={handleChange} type={"number"} label="Year" variant="standard" />
                <TextField id="eval" name='val' onChange={handleChange} type={"number"} label="Rainfall value in mm" variant="standard" />
            </div> */}
                <div style={{ margin: "20px auto", display: "flex", justifyContent: "space-evenly", width: "500px" }}>
                    {/* <Button variant="contained" onClick={submit} color="success">  Submit
                </Button> */}
                    <Button variant="contained" onClick={SubmitUserData} color="error">  Fill the data
                    </Button>
                </div>
            </Col>
        </Row>
    )
}

export default ProjectData