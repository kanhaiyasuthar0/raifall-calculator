import logo from './logo.svg';
import './App.css';
import InputData from './Components/InputData';
import TableData from './Components/TableData';
import "../src/Components/common.css"
import { useEffect, useState } from 'react';
import Result from './Components/Result';
import UserDetails from './Components/UserDetails';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useNavigation } from "react-router-dom";
import CustomizedSteppers from './Components/Progress';
import HorizontalLinearStepper from './Components/Progress';
import axios from "axios"
import AllRainData from './Components/AllRainData';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Components/Dashboard';
import Header from './Components/Navbar';
import ProjectData from './Components/ProjectData';
import ValueEnterPlace from './Components/ValueEnterPlace';
import FinalReport from './Components/FinalReport';
import EditRainData from './Components/EditRainData';
function App() {
  let strangeTabled = JSON.parse(localStorage.getItem("strangeTable"))
  const [finalReport, setReport] = useState([])
  const [RainDataToEdit, setRainDataToEdit] = useState([])
  const navigate = useNavigate()
  const [enteredval, setEnteredval] = useState([])
  const [noYear, setnoYear] = useState(0)
  const [noArea, setArea] = useState(0)
  const [type, setType] = useState(1)
  const [runOff, setRunOff] = useState(0)
  const [depend, setDepend] = useState({
    "50": "",
    "75": "",
    "90": ""
  })
  const [StrengthTable, setStrtable] = useState([])
  const [userData, setUserData] = useState({
    uname: "",
    pname: "",
    plocation: ""
  })
  const [eachval, setEachVal] = useState({
    year: "",
    val: ""
  })
  const handleUserData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }
  const handleChange = (e) => {
    console.log()
    setEachVal({ ...eachval, [e.target.name]: e.target.value })
  }
  const handleDepend = (e) => {
    // console.log(e.target.checked, [e.target.name])
    setDepend({ ...depend, [e.target.name]: e.target.value })
  }
  const submit = () => {
    console.log(eachval)
    if (eachval.val && eachval.year) {
      setEnteredval([...enteredval, eachval])
    }
    console.log(type)
  }
  const deleteHandle = (item) => {
    console.log(item)
    let arr = enteredval.filter((each) => each.year != item.year);
    console.log(arr)
    setEnteredval([...arr])
  }
  const generateReport = () => {
    if (enteredval && noArea && noYear && type) {
      navigate("/report")
    }
  }
  const check = (value) => {
    console.log(value)
    for (let i = 0; i < StrengthTable.length; i++) {
      if (+value == [((i + 1) * 20)]) {
        console.log(StrengthTable[i][value], "VALUE")
        if (type == 1) {
          return (StrengthTable[i][value].good)
        } else if (type == 2) {
          return (StrengthTable[i][value].average)
        } else {
          return (StrengthTable[i][value].bad)
        }
      } else if (+value > [((i + 1) * 20)] && +value < [((i + 2) * 20)]) {
        console.log(StrengthTable[i], StrengthTable[i + 1])
        return interpolar(value, StrengthTable[i], StrengthTable[i + 1])
      }
    }
  }

  const sendDataToBackend = async () => {
    let data = {};
    data["name"] = userData.uname
    let arr = []
    for (let i = 0; i < enteredval.length; i++) {
      let obj = {};
      obj["year"] = enteredval[i].year
      obj["rainfall"] = enteredval[i].val
      arr.push(obj)
    }
    data["data"] = arr
    console.log(data)
    try {
      let res = await axios.post(`https://rainfall.onrender.com/newRain`, data)
      // let res2 = await res.json();

      console.log(res)

    } catch (error) {

    }
  }

  const interpolar = (mainVal, item1, item2) => {
    let obj1 = Object.values(item1)
    let obj2 = Object.values(item2);
    let ob1val = Object.keys(item1)[0]
    let ob2val = Object.keys(item2)[0]
    let c1 = type == 1 ? obj1[0].good : type == 2 ? obj1[0].average : type == 3 ? obj1[0].bad : 0
    let c2 = type == 1 ? obj2[0].good : type == 2 ? obj2[0].average : type == 3 ? obj2[0].bad : 0;
    console.log(c1, c2, ob1val, ob2val, mainVal)
    let upper = ob2val - ob1val
    let lower = ob2val - mainVal
    let u2 = c2 - c1
    let l2 = c2 - "x"
    // console.log(upper, lower, u2, l2)
    let v1 = lower / upper * u2
    return (c2 - v1).toFixed(4)
  }
  async function fetchStrangeTable() {
    try {
      let res = await axios.get("https://rainfall.onrender.com/strangetable");
      localStorage.setItem("strengthTable", JSON.stringify(res.data[0].data))

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStrangeTable()
  }, [enteredval])
  return (
    <div className="App">

      <Routes>
        {/* <Route path="/report" element={<Result type={type} depend={depend} handleDepend={handleDepend} userData={userData} noArea={noArea} finalReport={finalReport} setReport={setReport} check={check} noYear={noYear} enteredval={enteredval} />} /> */}
        <Route path="/allData" element={<AllRainData setRainDataToEdit={setRainDataToEdit} />} />
        {/* <Route path="/" element={<HorizontalLinearStepper sendDataToBackend={sendDataToBackend} handleDepend={handleDepend} handleUserData={handleUserData} generateReport={generateReport} setType={setType} setArea={setArea} setnoYear={setnoYear} setEnteredval={setEnteredval} enteredval={enteredval} handleChange={handleChange} submit={submit} deleteHandle={deleteHandle} />} /> */}
        {/* <Route path="/" element={<HorizontalLinearStepper sendDataToBackend={sendDataToBackend} handleDepend={handleDepend} handleUserData={handleUserData} generateReport={generateReport} setType={setType} setArea={setArea} setnoYear={setnoYear} setEnteredval={setEnteredval} enteredval={enteredval} handleChange={handleChange} submit={submit} deleteHandle={deleteHandle} />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard sendDataToBackend={sendDataToBackend} handleDepend={handleDepend} handleUserData={handleUserData} generateReport={generateReport} setType={setType} setArea={setArea} setnoYear={setnoYear} setEnteredval={setEnteredval} enteredval={enteredval} handleChange={handleChange} submit={submit} deleteHandle={deleteHandle} />} /> */}

        <Route path="/" element={<ProjectData />} />
        <Route path="/projectData" element={<ProjectData />} />
        <Route path="/rainfallValue" element={<ValueEnterPlace />} />
        <Route path="/generateReport" element={<FinalReport />} />
      </Routes>

      {/* {!strangeTabled ? <TableData StrengthTable={StrengthTable} setStrtable={setStrtable} interpolar={interpolar} setEnteredval={setEnteredval} enteredval={enteredval} handleChange={handleChange} submit={submit} /> : ""} */}


    </div>
  );
}

export default App;
