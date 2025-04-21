import { use, useEffect, useState } from "react"

export function SearchInput({handleInputFocus, showSuggestions, choosed, label, data=null})
{
    const [val, setVal] = useState('')
    const [values, setValues] = useState(data)
    const [newC, setNewC] = useState(false)


    const [choice, setChoice] = useState(true)


    useEffect(()=>{
        setValues(data)
    }, [])

    const filteredValues  = !newC ? values.filter((suggestion) =>
        suggestion.toLowerCase().includes(val.toLowerCase())
      ) : values;

    const handleChoice = (val) =>{
        setVal(val)
        setChoice(false)
        setNewC(false)
    }

    const handleCLick = ()=>{
        setNewC(true)
        setChoice(true)
    }

    return <>
        <input type="text" value={val} onClick={handleCLick} onChange={(e) => setVal(e.target.value)} name="country" onFocus={handleInputFocus} id="country" className={val ? "relative hasVal w-[210px] px-[10px] rounded-xl h-[50px] border border-(--primary-green)" : "relative z-40 w-[210px] px-[10px] rounded-xl h-[50px] border border-(--primary-green)" } />
        <label htmlFor="country" className="absolute z-10 top-[30%] left-10">{label}</label>
        {showSuggestions && choice  && <ul className="absolute bg-(--light-green) top-[110%]  z-10 rounded-2xl w-full flex flex-col items-stretch justify-start text-sm" style={{boxShadow: "0 0 7px rgba(0, 0, 0, .1)", zIndex: "9999" }}>
            {filteredValues.map((val, index) => <li key={index} onClick={()=>handleChoice(val)} className="p-3 rounded-2xl z-40">{val}</li>)}

        </ul> }    
    </>

}