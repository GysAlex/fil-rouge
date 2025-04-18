export function Button({children})
{
    return <button className="p-5 h-[44px] bg-(--primary-green) rounded-3xl min-w-max lg:w-fit text-white cursor-pointer flex items-center justify-center gap-2">
        {children}
    </button>
}

export function SmallButton({children})
{
    return <button className="p-2.5 text-[12px] h-[30px] bg-(--primary-green) rounded-3xl w-fit text-white cursor-pointer flex items-center justify-center gap-2">
        {children}
    </button>
}

export function StrokeButton({children})
{
    return <button className="p-5 text-[16px] h-[30px] text-(--primary-green) rounded-3xl w-fit border border-(--primary-green) cursor-pointer flex items-center justify-center gap-2">
    {children}
</button>
}

export function LittleStrokeButton({children})
{
    return <button className="p-4 text-[14px] h-[20px] text-(--primary-green) rounded-3xl w-fit border border-(--primary-green) cursor-pointer flex items-center justify-center gap-2">
    {children}
</button>
}