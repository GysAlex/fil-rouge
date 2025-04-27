export function Tags({children})
{
    return <div className="w-fit text-[14px] p-2.5 text-(--text-color) flex items-center justify-center gap-2.5" style={{boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)"}}>
        {children}
    </div>
}


export function HomeTags({children})
{
    return <span className="p-2 font-medium text-white text-[12px] bg-(--light-green) rounded-3xl">
        {children}
    </span> 
}

export function ChoicesTag({children, handleClick})
{
    return <span onClick={handleClick} className=" cursor-pointer select-none p-2 text-(--text-color) text-sm border border-(--primary-green) rounded-2xl flex items-center justify-center gap-2">
        {children}
    </span>
}

export function ChoosedTag({children, handleClick})
{
    return <span onClick={handleClick} className="px-2 py-2 cursor-pointer min-w-max text-sm bg-(--primary-green) rounded-2xl text-white flex items-center justify-between gap-2">

        <div className="flex items-center justify-center gap-2">        
            {children}
        </div>
        <span >
            <i className="fa-solid fa-x"></i>
        </span>
    </span>
}