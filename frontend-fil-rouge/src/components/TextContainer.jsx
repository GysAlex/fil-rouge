export function TextContainer({children})
{
    return <div className="text-[14px] text-(--text-color)" style={{lineHeight: "20px"}}>
        {children}
    </div>
}