export function ProgressBar({currentStep, totalSteps}) {
    const progress = ((currentStep ) / (totalSteps)) * 100;
    return <div className="w-full h-2 bg-white rounded-full" style={{boxShadow: '0 0 7px rgba(0, 0, 0, .1)'}}>
        <div className="h-2 bg-green-500 rounded-full transition-all ease-in duration-500" style={{width: `${progress}%`}}></div>
    </div>
}