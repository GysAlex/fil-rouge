
export function FilterItem({children})
{
    return <div className="min-w-max w-fit select-none pointer-events-none text-sm  rounded-2xl  flex flex-col items-center justify-center px-3 py-2 border border-(--primary-green) text-(--primary-green)">
        {children}
    </div>
}