import axios from 'axios';
import React, { useState } from 'react'

const TableData = ({ setStrtable, StrengthTable }) => {
    const [data, setData] = useState([
        { 20: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 40: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 60: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 80: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 100: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 120: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 140: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 120: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 120: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 20: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 20: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 20: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 20: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 20: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 20: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 20: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 20: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 20: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 20: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 20: { "good": 0.016, "avg": 0.012, "bad": 0.08 } },
        { 20: { "good": 0.016, "avg": 0.012, "bad": 0.08 } }
    ])
    let str = `20 0.016 0.012 0.008
    40 0.052 0.039 0.026
    60 0.147 0.11025 0.0735
    80 0.328 0.256 0.164
    100 0.700 0.525 0.350
    120 1.080 0.810 0.540
    140 1.715 1.28625 0.8575
    160 2.600 1.950 1.300
    180 3.186 2.862 1.908
    200 5.400 4.050 2.700
    220 7.172 5.379 3.586
    240 9.144 6.858 4.752
    260 11.570 8.6775 5.785
    280 14.532 10.899 7.266
    300 17.700 13.275 8.850
    320 21.504 16.126 10.752
    340 25.738 19.3035 12.869
    360 30.780 23.085 15.390
    380 36.910 27.6825 18.455
    400 41.000 30.750 20.500
    420 46.410 34.8075 23.2057
    440 52.800 39.600 26.400
    460 59.570 44.6775 29.786
    480 66.720 50.040 33.360
    500 73.500 55.125 36.750
    520 80.600 60.450 40.300
    540 88.290 66.2175 44.145
    560 96.320 72.240 48.160
    580 104.000 78.000 52.000
    600 114.000 85.500 57.000
    620 123.256 92.444 61.628
    640 132.864 99.648 66.432
    660 142.824 107.118 71.412`


    let str1 = str.split("\n");
    let arr1 = []
    for (let i = 0; i < str1.length; i++) {
        let obj = {}
        // console.log(i)
        let first = str1[i].trim().split(" ")
        // console.log(first)
        obj = {
            value: first[0],
            good: first[1],
            average: first[2],
            bad: first[3],
        }
        arr1.push(obj)
    }
    // console.log(arr1)

    let str2 = `680
    153.136
    114.852
    76.568
    700
    163.800
    122.850
    81.900
    720
    174.816
    131.112
    86.408
    740
    189.440
    142.080
    94.720
    760
    197.907
    148.428
    98.952
    780
    209.976
    157.482
    104.988
    800
    222.400
    166.800
    111.200
    820
    235.176
    176.382
    117.588
    840
    248.304
    186.228
    124.152
    860
    251.784
    196.338
    130.892
    880
    275.610
    206.7075
    137.805
    900
    289.800
    217.350
    144.900
    920
    304.336
    228.252
    152.168
    940
    319.224
    239.418
    159.612
    960
    334.464
    250.848
    167.232
    980
    350.056
    262.590
    175.028
    1000
    366.000
    274.500
    183.000
    1020
    382.290
    286.175
    191.145
    1040
    398.944
    299.208
    199.472
    1060
    415.944
    311.958
    207.972
    1080
    433.296
    325.072
    216.648
    1100
    451.000
    338.250
    225.500
    1120
    469.056
    351.792
    234.528
    1140
    487.464
    365.598
    243.732
    1160
    506.224
    379.669
    253.112
    1180
    527.696
    395.772
    263.848
    1200
    544.800
    408.600
    272.400
    1220
    564.616
    423.462
    282.308
    1240
    584.784
    438.588
    292.392
    1260
    605.304
    453.979
    302.652
    1280
    626.176
    469.632
    313.088
    1300
    647.400
    485.550
    323.700
    1320
    667.656
    500.852
    333.828
    1340
    690.904
    518.178
    345.452
    1360
    713.184
    534.888
    356.592
    1380
    735.816
    551.852
    367.908
    1400
    758.800
    568.100
    379.400
    1420
    782.136
    586.602
    391.063
    1440
    805.824
    604.368
    402.912
    1460
    829.864
    622.398
    414.392
    1480
    854.256
    640.692
    427.128
    1500
    879.000
    659.250
    439.500
    1520
    904.096
    678.072
    452.048
    1540
    929.544
    697.168
    464.772
    1560
    955.844
    710.508
    477.672
    1580
    981.496
    736.122
    490.748
    1600
    1008.000
    756.000
    504.000
    1620
    1034.856
    776.242
    517.428
    1640
    1062.064
    796.548
    531.032
    1660
    1089.624
    817.218
    544.812
    1680
    1117.536
    838.152
    558.768
    1700
    1145.800
    859.350
    572.900
    1720
    1174.416
    880.812
    587.208
    1740
    1203.384
    902.538
    601.692
    1760
    1232.704
    924.528
    616.352
    1780
    1262.376
    946.797
    631.198
    1800
    1292.400
    969.100
    646.200`
    str2 = str2.trim().split("\n")
    let arr2 = []
    for (let i = 0; i < str2.length; i += 4) {
        let obj = {};
        // console.log(str2[i])
        obj = { value: str2[i].trim(), "good": str2[i + 1].trim(), "average": str2[i + 2].trim(), "bad": str2[i + 3].trim() }

        arr2.push(obj)
    }
    // console.log(arr2)
    let strengthTable = [...arr1, ...arr2]
    localStorage.setItem("strengthTable", JSON.stringify(strengthTable))
    async function post() {
        let Data = {
            name: "StrangeTable",
            data: [...strengthTable]
        }
        console.log(Data)
        try {
            let res = await axios.post("http://localhost:8000/strangetable", Data);
            console.log(res)

        } catch (error) {
            console.log(error)
        }
    }
    // post()
    useState(() => {
        setStrtable([...strengthTable])
    }, [])
    return (
        <div>
            {/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Strange table</button> */}

            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasRightLabel">Strange table</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <table className='strtable'>
                        <thead>

                            <tr>
                                <th>Monsoon
                                    rainfall in mm</th>
                                <th>Good</th>
                                <th>Average</th>
                                <th>Bad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {StrengthTable ? StrengthTable.map((item, index) => {
                                // console.log(item[index])
                                return (<tr>
                                    <td>{item.value}</td>
                                    <td>{item.good}</td>
                                    <td>{item.average}</td>
                                    <td>{item.bad}</td>
                                </tr>)
                            }) : ""}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TableData