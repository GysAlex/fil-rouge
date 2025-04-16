export function Button({children})
{
    return <button className="p-2.5 h-[44px] cursor-pointer flex items-center justify-center gap-2">
        {children}
    </button>
}