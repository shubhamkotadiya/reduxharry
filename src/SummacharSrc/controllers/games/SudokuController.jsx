import { useContext, useEffect, useState } from "react"
import mad5dsudoku from 'mad5dsudoku'

import '../../assets/css/games.css'
import { BootstrapInput } from "../../pages/privatePages/activityCenter/ActivityCenterPage"
import { Grid, MenuItem, Select } from "@mui/material"
import { PulltoRefreshWork } from "../../routes/PrivateRoute"
import correct from '../../assets/images/correct.gif'
import axios from "axios"
import apiUrl from "../../common/apiUrl"
import { getHeaders, getUserUuid, handleError, resetToken } from "../../common/helper"
import NoData from "../../components/NoData"
import Loader from "../../components/Loader"
const SudokuController = () => {
    const [matrixSize, setMatrixSize] = useState(9)
    const [animate, setAnimate] = useState(false)
    const [deficulty, setDifficulty] = useState("hard")
    const [loading, setLoading] = useState(false)
    const [sudokuArray, SetSudokuArray] = useState([])
    const [err, setErr] = useState('')
    const getRandomVal = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1); //January is 0!
    var yyyy = today.getFullYear();

    let month = "january";
    if(mm === "1") {month = "Jan"}
    else if(mm === "2") {month = "Feb"}
    else if(mm === "3") {month = "March"}
    else if(mm === "4") {month = "April"}
    else if(mm === "5") {month = "May"}
    else if(mm === "6") {month = "June"}
    else if(mm === "7") {month = "July"}
    else if(mm === "8") {month = "Aug"}
    else if(mm === "9") {month = "Sept"}
    else if(mm === "10") {month = "Oct"}
    else if(mm === "11") {month = "Nov"}
    else  {month = "Dec"}

// console.log(dd);
// console.log(month);
// console.log(yyyy);


//     console.log(dd);
//     console.log(mm);
//     console.log(yyyy);
let dddd = dd%10;
let supe = "th"
if(dddd === 1 ){supe = "st";}
else if(dddd === 2){supe = "nd";}
else if(dddd === 3){supe = "rd";}
else {supe = "th";}
    
// let cDate = dd +" "+ month +" "+ yyyy;

    const getSudokuArray = async () => {
        return await axios({
            url: apiUrl.sudokuUrl + "?user-uuid=" + getUserUuid(),
            method: "GET",
            headers: getHeaders()
        }).then((res) => {
            return { status: 1, data: res.data }
        }).catch(async (err) => {
            if (err.response.status === 401) {
                return resetToken(async () => { await getSudokuArray() })
            }else{
                handleError(err)
            }
            return { status: 0 }
        })
    }
    const submitArr = async () => {
        const passArray = []
        const arr = [...sudokuArray]
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].currentVal) {
                passArray[i] = arr[i].currentVal
            } else {
                passArray[i] = 0
            }

        }
        return await axios({
            url: apiUrl.sudokuUrl + "?user-uuid=" + getUserUuid(),
            method: "POST",
            data: {
                attempt_param: {
                    grid: passArray
                }
            },
            headers: getHeaders()
        }).then((res) => {
            return { status: 1, data: res.data }
        }).catch(async (err) => {
            if (err.response.status === 401) {
                return resetToken(async () => { await getSudokuArray() })
            }else{
                handleError(err)
            }
            return { status: 0 }
        })
    }
    const createPuzzle = async () => {
        setLoading(true)

        const response = await getSudokuArray()

        if (response.status) {
            const finalArray = []
            const solution = response.data.output_param.solved
            const arrayWithHoles = response.data.output_param.grid
            const attemtedVal = response.data.output_param.user_attempts ? response.data.output_param.user_attempts.grid : Array((matrixSize * matrixSize) - 1)
            for (let index = 0; index < solution.length; index++) {
                const objectTopass = {
                    answer: solution[index],
                    initialVal: arrayWithHoles[index],
                    currentVal: arrayWithHoles[index] ? arrayWithHoles[index] : attemtedVal[index] != 0 ? attemtedVal[index] : '',
                    color: "#5c56d4"
                }
                finalArray.push(objectTopass)
            }
            SetSudokuArray(finalArray)
        } else {
            setLoading(false)
        }


    }


    useEffect(() => {
        setLoading(false)
    }, [sudokuArray])
    const handleInput = (val, index) => {
        const temp = [...sudokuArray]
        if (val > 0 && val <= 9) {
            temp[index]['currentVal'] = val
            temp[index]['color'] = '#5c56d4'
        } else {
            temp[index]['currentVal'] = ''
            temp[index]['color'] = '#5c56d4'
        }
        SetSudokuArray(temp)
    }

    const check = () => {
        const temp = [...sudokuArray]
        let wrongCount = 0
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].answer != temp[i].currentVal) {
                wrongCount++
                if (!(temp[i].initialVal && temp[i].initialVal != "") && (temp[i].currentVal && temp[i].currentVal != "")) {
                    temp[i]['fontColor'] = "#FF6D6D"
                }
            }
        }
        if (wrongCount == 0) {
            for (let i = 0; i < temp.length; i++) {
                const objectTopass = {
                    answer: temp[i].answer,
                    initialVal: temp[i].answer,
                    currentVal: temp[i].answer,
                    color: "#5c56d4",
                    fontColor: "#5c56d4"
                }
                temp[i] = objectTopass
            }
            setAnimate(true)
            setTimeout(() => {
                setAnimate(false)
            }, 2000)
        }
        SetSudokuArray(temp)
        submitArr()


    }
    const pullTorefreshContext = useContext(PulltoRefreshWork)

    const onActicateTab = (tabIndex) => {
        const oldArray = [...sudokuArray]
        const rowStart = (Math.floor(tabIndex / matrixSize)) * matrixSize
        const columnModula = tabIndex % matrixSize
        for (let i = 0; i < oldArray.length; i++) {
            if ((i >= rowStart && i < rowStart + matrixSize)
                ||
                (i % matrixSize == columnModula)
                ||
                ((i >= (((rowStart / matrixSize) - ((rowStart / matrixSize) % Math.sqrt(matrixSize))) * matrixSize) && i < (rowStart + ((Math.sqrt(matrixSize) - ((rowStart / matrixSize) % Math.sqrt(matrixSize)))) * matrixSize))
                    &&
                    ((i % matrixSize) >= (columnModula - (columnModula % Math.sqrt(matrixSize)))))
                &&
                ((i % matrixSize) < (columnModula + (Math.sqrt(matrixSize) - (columnModula % Math.sqrt(matrixSize)))))
            ) {
                oldArray[i].color = "#FDF8E2"
            } else {
                oldArray[i].color = "transparent"
            }
            if (i == tabIndex) {
                oldArray[i].color = "#FFEA97"
            }
            if (oldArray[tabIndex].currentVal == oldArray[i].currentVal && oldArray[tabIndex].currentVal && oldArray[tabIndex].currentVal != "") {
                oldArray[i].color = "#FFEA97"
            }
            oldArray[i]['fontColor'] = "#5c56d4"
        }
        SetSudokuArray(oldArray)
    }
    useEffect(() => {
        createPuzzle()
    }, [matrixSize, deficulty])

    if (err == "") {
        if (loading) {
            return <Loader />
        } else {
            return (
                <div className="df row column fit-content ">
                    <div className="title-div row " style={{ margin: "auto 0" }} >
                        <div className="title heading-text " style={{ margin: "0px 0 16px 0" }}><b>Sudoku of the Day - {dd}{<sup>{supe}</sup>} {month} {yyyy} </b></div>
                    </div>
                    {!loading && sudokuArray && sudokuArray.length > 0 && <div className="flex-1 row df m-v-primary column" style={{ maxWidth: "400px" }}>


                        <div className="row df  sudoku-container p-relative " style={{ flexWrap: "wrap" }}>


                            {
                                sudokuArray && sudokuArray.length > 0 &&
                                sudokuArray.map((data, index) => {
                                    return (
                                        <div style={{
                                            border: "1px solid lightgray",
                                            borderBottom: (((Math.floor(index / matrixSize) + 1) % Math.sqrt(matrixSize) == 0) && Math.floor(index / matrixSize) < (matrixSize - 1)) ? "2px solid #000" : "1px solid lightgray",
                                            borderRight: ((index + 1) % Math.sqrt(matrixSize) == 0 && (index + 1) % 9 != 0) ? "2px solid #000" : "1px solid lightgray", background: data.color == "#5c56d4" ? "white" : data.color
                                        }} key={index.toString() + data.answer.toString() + deficulty + matrixSize.toString()} className={"sudokubox-" + matrixSize + "  p-relative"}>
                                            <div className="row" style={{ paddingTop: "100%" }}>

                                            </div>
                                            <div className="fit-absolute center fit-content">
                                                <span style={{ color: "#5c56d4" }} >
                                                    {data.initialVal ?
                                                        <input type="number" key={data.answer} disabled={true} defaultValue={data.initialVal} style={{ color: "#000", padding: "0px" }} className="fit-content df center typo-headings  font-bold" max={9} min={0} />
                                                        :
                                                        <input key={data.answer} value={data.currentVal} className="fit-content df center typo-headings blank-hole" onFocus={() => { onActicateTab(index) }} onInput={(e) => { handleInput(e.target.value, index) }} style={{ color: data.fontColor, padding: "0px" }} type="number" max={9} min={0} />}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            {animate && <
                                div className="animation-tile radius-primary fit-content df center pointer right" >
                                <img src={correct + "?" + new Date().getTime()} />
                            </div>}

                        </div>


                        {sudokuArray && sudokuArray.length > 0 && <button className="btn-primary btn row m-v-primary radius-primary" onClick={() => { check() }}>Check</button>}



                    </div>}

                    {!loading && !(sudokuArray && sudokuArray.length > 0) && <NoData />}

                </div>
            )
        }

    } else {
        return (<>
            <NoData text="No Game is available" />
        </>)
    }

}
export default SudokuController