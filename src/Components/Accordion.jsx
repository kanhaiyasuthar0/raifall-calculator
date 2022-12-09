import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

function Accordion1({ data, index, handleEdit }) {
    console.log(data)
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey={index}>
                <Accordion.Header> View
                </Accordion.Header>
                <Accordion.Body>
                    <Button onClick={() => handleEdit(data?.userEntered)}>Edit</Button>
                    <table style={{ border: "1px solid", margin: "auto", width: "500px" }}>
                        <thead>
                            <tr style={{ border: "1px solid", borderRadius: "10px" }}>
                                <th style={{ border: "1px solid", borderRadius: "10px" }}>Year</th>
                                <th style={{ border: "1px solid", borderRadius: "10px" }}>Rainfall</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.userEntered.map((item, index) => {
                                // console.log(item)
                                return (
                                    <tr key={index}>
                                        <td style={{ border: "1px solid", borderRadius: "10px" }}>{item.year}</td>
                                        <td style={{ border: "1px solid", borderRadius: "10px" }}>{item.rainfall}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default Accordion1;