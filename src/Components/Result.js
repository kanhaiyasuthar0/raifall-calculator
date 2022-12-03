import React from 'react'

const Result = ({ enteredval, noYear, check }) => {
    let sorted = enteredval.sort((a, b) => b.val - a.val)
    // console.log(1 / (noYear + 1))

    return (
        <div>
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>

            <div style={{ width: "50%" }} class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasRightLabel"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <table style={{ border: "1px solid", display: "inline-block" }}>
                        <thead>

                            <tr>
                                <th style={{ width: "200px", border: "1px solid" }}>Monsoon Rainfall in descending order in mm</th>
                                <th style={{ width: "200px", border: "1px solid" }}>Run off depth as per strange table in mm per</th>
                                <th style={{ width: "200px", border: "1px solid" }}>Dependabilty</th>
                                <th style={{ width: "200px", border: "1px solid" }}>Yield in cum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sorted?.map((item, index) => {
                                // console.log(index + 1 / 21)
                                return (<tr>
                                    <td style={{ width: "200px", border: "1px solid" }}>{item.val}</td>
                                    <td style={{ width: "200px", border: "1px solid" }}>{item.val ? check(item.val) : ""}</td>
                                    <td style={{ width: "200px", border: "1px solid" }}>{((index + 1) / (1 + +noYear)) * 100}</td>
                                    <td style={{ width: "200px", border: "1px solid" }}>{item.val}</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>

                </div>
            </div>



        </div>
    )
}

export default Result