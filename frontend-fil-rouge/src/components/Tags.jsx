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