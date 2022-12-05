let StrengthTable = JSON.parse(localStorage.getItem("strengthTable"))
let rainfall = JSON.parse(localStorage.getItem("rainfall"))
let userData = JSON.parse(localStorage.getItem("userData"))
let { type } = userData

//checking strange table
export const check = (value) => {
    console.log(value, "VALLLUE", typeof value)
    value = +value
    for (let i = 0; i < StrengthTable.length; i++) {
        console.log(StrengthTable, "STRENGTHTABEL")
        if (+value == [((i + 1) * 20)]) {
            console.log(StrengthTable[i][value], "VALUE")
            if (userData.type == 1) {
                return (StrengthTable[i][value].good)
            } else if (type == 2) {
                return (StrengthTable[i][value].average)
            } else {
                return (StrengthTable[i][value].bad)
            }
        } else if (+value > [((i + 1) * 20)] && +value < [((i + 2) * 20)]) {
            console.log(StrengthTable[i], StrengthTable[i + 1])
            let item1 = StrengthTable[i]
            let item2 = StrengthTable[i + 1]
            let obj1 = Object.values(item1)
            let obj2 = Object.values(item2);
            let ob1val = Object.keys(item1)[0]
            let ob2val = Object.keys(item2)[0]
            let c1 = type == 1 ? obj1[0].good : type == 2 ? obj1[0].average : type == 3 ? obj1[0].bad : 0
            let c2 = type == 1 ? obj2[0].good : type == 2 ? obj2[0].average : type == 3 ? obj2[0].bad : 0;


            return interpolar(c1, c2, ob1val, ob2val, +value)
        }
    }
}


//interpolar
const interpolar = (c1, c2, ob1val, ob2val, mainVal) => {
    // let obj1 = Object.values(item1)
    // let obj2 = Object.values(item2);
    // let ob1val = Object.keys(item1)[0]
    // let ob2val = Object.keys(item2)[0]
    // let c1 = type == 1 ? obj1[0].good : type == 2 ? obj1[0].average : type == 3 ? obj1[0].bad : 0
    // let c2 = type == 1 ? obj2[0].good : type == 2 ? obj2[0].average : type == 3 ? obj2[0].bad : 0;
    // console.log(c1, c2, ob1val, ob2val, mainVal)
    let upper = ob2val - ob1val
    let lower = ob2val - mainVal
    let u2 = c2 - c1
    let l2 = c2 - "x"
    // console.log(upper, lower, u2, l2)
    let v1 = lower / upper * u2
    return (c2 - v1).toFixed(4)
}