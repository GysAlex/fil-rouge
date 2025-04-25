export function Input({name, labelName, id, val, handleChange, type, error=null})
{
    const errStyle = error ? 'red' : null 

    return <div className="flex items-stretch gap-1 flex-col my-2 justify-start w-full">
        <label htmlFor={id}>{labelName}</label>
        <input type={type} style={{borderColor: errStyle}} className="h-[45px] px-2 border border-(--primary-green) " name={name} id={id} value={val} onChange={(e)=>handleChange(e)}/>
        {error && name !="password_confirmation" && <span className="text-xs text-red-400"> {error} </span>}
    </div>
}


export function InputStepForm({name, labelName, id, val, handleChange, type, error=null})
{
    const errStyle = error ? 'red' : null 

    return <div className="flex items-stretch text-[15px] gap-1 flex-col my-2 justify-start w-full">
        <label htmlFor={id} className="text-(--title-color)">{labelName}</label>
        <input type={type} style={{borderColor: errStyle}} className="h-[40px] px-2 border border-(--light-green) " name={name} id={id} value={val} onChange={(e)=>handleChange(e)}/>
        {error && name !="password_confirmation" && <span className="text-xs text-red-400"> {error} </span>}
    </div>
}
