import { useEffect, useState } from "react"

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

    const handleChange = (e)=>{
        
        if(newC)
        {
            setNewC(false)
        }
        setVal(e.target.value)
    }


    return <>
        <input type="text" value={val} onClick={handleCLick} onChange={(e) => handleChange(e)} name="country" onFocus={handleInputFocus} id="country" className={val ? "relative hasVal w-full px-[10px] rounded-xl h-[50px] border border-(--primary-green)" : "relative z-20 w-full px-[10px] rounded-xl h-[50px] border border-(--primary-green)" } />
        <label htmlFor="country" className="absolute z-10 top-[30%] left-10">{label}</label>
        {showSuggestions && choice  && <ul className="absolute bg-white top-[110%]  z-70 rounded-2xl w-full flex flex-col items-stretch justify-start text-sm" style={{boxShadow: "0 0 7px rgba(0, 0, 0, .1)" }}>
            {filteredValues.map((val, index) => <li key={index} onClick={()=>handleChoice(val)} className="p-3 rounded-2xl">{val}</li>)}

        </ul> }    
    </>

}

export function SearchInput2({handleInputFocus, val, parentChange, showSuggestions, id, data=null})
{
    const [values, setValues] = useState(data)
    const [newC, setNewC] = useState(false)


    const [choice, setChoice] = useState(true)


    useEffect(()=>{
        setValues(data)
        const filteredValues  = values;
    }, [])

    
    const filteredValues  = !newC ? values.filter((suggestion) =>
        suggestion.toLowerCase().includes(val.toLowerCase())
      ) : values;

    const handleChoice = (val) =>{
        parentChange(val)
        setChoice(false)
        setNewC(false)
    }

    const handleCLick = ()=>{
        setNewC(true)
        setChoice(true)
    }

    const handleChange = (e)=>{
        
        if(newC)
        {
            setNewC(false)
        }
        parentChange(e.target.value)
    }


    return <>
        <input type="text" value={val} onClick={handleCLick} onChange={(e) => handleChange(e)} name={id} onFocus={handleInputFocus} id={id} className="relative  w-full px-[10px] h-[40px] border border-(--light-green2)"  />
        {showSuggestions && choice  && <ul className="absolute bg-white top-[110%]  z-70 rounded-2xl w-full flex flex-col items-stretch justify-start text-sm" style={{boxShadow: "0 0 7px rgba(0, 0, 0, .1)" }}>
            {filteredValues.map((val, index) => <li key={index} onClick={()=>handleChoice(val)} className="p-3 cursor-pointer rounded-2xl transition-all ease-in duration-300 hover:bg-(--light-green2)">{val}</li>)}

        </ul> }    
    </>

}