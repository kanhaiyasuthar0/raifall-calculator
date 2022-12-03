import logo from './logo.svg';
import './App.css';
import InputData from './Components/InputData';
import TableData from './Components/TableData';
import "../src/Components/common.css"
import { useState } from 'react';
import Result from './Components/Result';
import UserDetails from './Components/UserDetails';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useNavigation } from "react-router-dom";
import CustomizedSteppers from './Components/Progress';
import HorizontalLinearStepper from './Components/Progress';

function App() {
  const [finalReport, setReport] = useState([])
  const navigate = useNavigate()
  const [enteredval, setEnteredval] = useState([])
  const [noYear, setnoYear] = useState(0)
  const [noArea, setArea] = useState(0)
  const [type, setType] = useState(1)
  const [runOff, setRunOff] = useState(0)
  const [StrengthTable, setStrtable] = useState([])
  const [eachval, setEachVal] = useState({
    year: "",
    val: ""
  })
  const handleChange = (e) => {
    console.log()
    setEachVal({ ...eachval, [e.target.name]: e.target.value })
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
        return interpolar(value, StrengthTable[i], StrengthTable[i + 1])
      }
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
  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Routes>

        <Route path="/report" element={<Result finalReport={finalReport} setReport={setReport} check={check} noYear={noYear} enteredval={enteredval} />} />
        <Route path="/" element={<HorizontalLinearStepper generateReport={generateReport} setType={setType} setArea={setArea} setnoYear={setnoYear} setEnteredval={setEnteredval} enteredval={enteredval} handleChange={handleChange} submit={submit} deleteHandle={deleteHandle} />} />
        <Route path="/" element={<HorizontalLinearStepper generateReport={generateReport} setType={setType} setArea={setArea} setnoYear={setnoYear} setEnteredval={setEnteredval} enteredval={enteredval} handleChange={handleChange} submit={submit} deleteHandle={deleteHandle} />} />
        {/* <Route path="/inputs" element={<InputData setType={setType} setArea={setArea} setnoYear={setnoYear} setEnteredval={setEnteredval} enteredval={enteredval} handleChange={handleChange} submit={submit} deleteHandle={deleteHandle} />} /> */}
        {/* <Route path="/inputs" element={<InputData setType={setType} setArea={setArea} setnoYear={setnoYear} setEnteredval={setEnteredval} enteredval={enteredval} handleChange={handleChange} submit={submit} deleteHandle={deleteHandle} />} /> */}
        {/* <Route path="/report" element={<Result check={check} noYear={noYear} enteredval={enteredval} />} /> */}
      </Routes>

      <TableData setStrtable={setStrtable} interpolar={interpolar} setEnteredval={setEnteredval} enteredval={enteredval} handleChange={handleChange} submit={submit} />

      {/* </BrowserRouter> */}

    </div>
  );
}

export default App;
