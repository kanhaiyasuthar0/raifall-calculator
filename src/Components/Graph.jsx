import React, { PureComponent } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts';
import Header from './Navbar';


const Graph = () => {
    let data = JSON.parse(localStorage.getItem("rainfall"))
    let userData = JSON.parse(localStorage.getItem("userData"))
    let max = JSON.parse(localStorage.getItem("max"))
    let min = JSON.parse(localStorage.getItem("min"))
    console.log(max, min)
    return (
        // <ResponsiveContainer width="100%" height="100%">
        <Row>
            <Col lg={2}>
                <Header />
            </Col>
            <Col lg={8} style={{ margin: " 100px auto" }}>
                <LineChart
                    width={900}
                    height={600}
                    data={data}
                    margin={{
                        top: 20,
                        right: 50,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="year" />
                    <YAxis dataKey="rainfall" />
                    <Tooltip />
                    <Legend />
                    {/* <ReferenceLine y="2000" stroke="red" label="" /> */}
                    <ReferenceLine y={max} label="Max rainfall" stroke="green" />
                    <ReferenceLine y={min} label="Min rainfall" stroke="red" />
                    {/* <Line type="monotone" dataKey="year" stroke="#8884d8" /> */}
                    <Line type="monotone" dataKey="rainfall" stroke="blue" />
                </LineChart>

                <div>
                    <table className='tablegraph'>
                        <tbody>
                            <tr>
                                <th>Location</th>
                                <th>Area</th>
                                <th>Catchment type</th>
                                <th>No of year's data</th>
                            </tr>
                            <tr>
                                <td>{userData.project_name}</td>
                                <td>{+userData.area * +userData.unit / 10000} Hect</td>
                                <td>{userData.type == 1 ? "Good" : data.type == 2 ? "Average" : data.type == 3 ? "Bad" : ""}</td>
                                <td>{userData.no_of_year}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Col>

        </Row>
    )
}

export default Graph