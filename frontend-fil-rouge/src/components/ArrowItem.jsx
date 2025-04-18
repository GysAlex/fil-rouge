export function ArrowItem({children})
{
    return <div className="w-fit flex items-center justify-start gap-6">
        <i className="fa-solid fa-arrow-right text-2xl text-(--primary-green)"></i>
        {children}
    </div>
}