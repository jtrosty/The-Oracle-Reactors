import React, {UseState} from 'react'


export default function setPersonData(props) {
    const[crashID, setCrashID] = UseState(null)
    const[unitNumber, setUnitNumber] = UseState(null)
    const[personNumber, setPersonNumber] = UseState(null)
    const[citation, setSitation] = UseState(null)
    const[died, setDied] = UseState(null)
    const[age, setAge] = UseState(null)
    const[ethnicity, setEthnicity] = UseState(null)
    const[gender, setGender] = UseState(null)
    const[notInjured, setNotInjured] = UseState(null)

return (
    <div>
        Hello
    </div>
)}