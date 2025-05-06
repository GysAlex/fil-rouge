export function ProgressBar({currentStep, totalSteps}) {
    const progress = ((currentStep ) / (totalSteps + 1)) * 100;
    return <div className="w-full h-2 bg-white rounded-full" style={{boxShadow: '0 0 7px rgba(0, 0, 0, .1)'}}>
        <div className="relative">
            <div className="absolute -top-[60px] w-full flex items-between justify-evenly">
                <div className={ currentStep < 2 ? "one size-[50px] transition-all ease-in duration-500 rounded-full border-2 border-(--light-green) flex items-center justify-center": "one size-[50px] transition-all ease-in duration-500 rounded-full bg-(--primary-green) border-2 border-(--light-green) flex items-center justify-center"} >{currentStep < 2 ? "1": <i className="fa-solid fa-check text-sm text-white"></i>}</div>
                <div className={ currentStep < 3 ? "one size-[50px] transition-all ease-in duration-500 rounded-full border-2 border-(--light-green) flex items-center justify-center": "one size-[50px] transition-all ease-in duration-500 rounded-full bg-(--primary-green) border-2 border-(--light-green) flex items-center justify-center"} >{currentStep < 3 ? "2": <i className="fa-solid fa-check text-sm text-white"></i>}</div>
                <div className={ currentStep < 4 ? "one size-[50px] transition-all ease-in duration-500 rounded-full border-2 border-(--light-green) flex items-center justify-center": "one size-[50px] transition-all ease-in duration-500 rounded-full bg-(--primary-green) border-2 border-(--light-green) flex items-center justify-center"} >{currentStep < 4 ? "3": <i className="fa-solid fa-check text-sm text-white"></i>}</div>
                <div className={ currentStep < 5 ? "one size-[50px] transition-all ease-in duration-500 rounded-full border-2 border-(--light-green) flex items-center justify-center": "one size-[50px] transition-all ease-in duration-500 rounded-full bg-(--primary-green) border-2 border-(--light-green) flex items-center justify-center"} >{currentStep < 5 ? "4": <i className="fa-solid fa-check text-sm text-white"></i>}</div>
            </div>
        </div>
        <div className="h-2 bg-green-500 relative rounded-full transition-all ease-in duration-500" style={{width: `${progress}%`}}>

        </div>
    </div>
}