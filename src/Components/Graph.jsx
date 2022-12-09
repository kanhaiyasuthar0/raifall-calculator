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
                    <ReferenceLine y="2000" stroke="red" label="" />
                    {/* <ReferenceLine y={9800} label="Max" stroke="red" /> */}
                    {/* <Line type="monotone" dataKey="year" stroke="#8884d8" /> */}
                    <Line type="monotone" dataKey="rainfall" stroke="#82ca9d" />
                </LineChart>
            </Col>

        </Row>
    )
}

export default Graph