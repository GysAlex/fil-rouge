import { useState } from "react"
import { InputStepForm } from "../Input"
import { Button, StrokeButton } from "../Button"

export function StepOne({nextStep, formData, currentPage})
{
    const [propertyName, setPropertyName] = useState(formData.propertyName || "")
    const [propertyType, setPropertyType] = useState(formData.propertyType || "")
    const [propertyRegion, setPropertyRegion] = useState(formData.propertyRegion || "")
    const [propertyPrice, setPropertyPrice] = useState(formData.propertyPrice || "")
    const [propertyUniversity, setPropertyUniversity] = useState(formData.propertyUniversity || "")
    const [propertyDescription, setPropertyDescription] = useState(formData.propertyDescription || "")
    const [propertyLoc, setPropertyLoc] = useState(formData.propertyLoc || false)


    const handleClick = () => {
        nextStep({propertyDescription, propertyName, propertyType, propertyRegion, propertyPrice, propertyUniversity, propertyLoc})
    }

    const toggleLoc = ()=>{
        setPropertyLoc(!propertyLoc)
    }
    return <div className={ currentPage == 1 ? "active" : ""}>
        <div className="title text-[18px]">
            Informations de base 
        </div>
        <div className="grid lg:grid-cols-2 mt-[40px]">
            <div className="left w-[90%] flex items-stretch justify-start gap-2 flex-col">
                <InputStepForm id="property_name" labelName="Nom du logement" type="text" val={propertyName} handleChange={(e)=>setPropertyName(e.target.value)}/>
                <InputStepForm id="property_type" labelName="type de logement" type="text" val={propertyType} handleChange={(e)=>setPropertyType(e.target.value)}/>
                <InputStepForm id="property_price" labelName="tarif annuel du logement" type="text" val={propertyPrice} handleChange={(e)=>setPropertyPrice(e.target.value)}/>
            </div>
            <div className="right w-[90%] flex items-stretch justify-start gap-2 flex-col">
                <InputStepForm id="property_region" labelName="Région" type="text" val={propertyRegion} handleChange={(e)=>setPropertyRegion(e.target.value)}/>
                <InputStepForm id="property_university" labelName="Université" type="text" val={propertyUniversity} handleChange={(e)=>setPropertyUniversity(e.target.value)}/>
                <div className="flex items-stretch text-[15px] gap-1 flex-col my-2 justify-center w-full">
                    <label htmlFor="actif" className={propertyLoc ? "text-sm text-(--primary-green)" : "text-sm"}>Possibilité de collocation:  {propertyLoc ? "oui" : "non"}</label>
                    <input type="checkbox" id="actif" checked={propertyLoc} onChange={toggleLoc} />
                </div>
            </div>
        </div>
        <div className="mt-2 text-[15px] w-[95%] flex items-stretch justify-start gap-2 flex-col">
            <label htmlFor="property_description" className="text-(--title-color)">Description du logement</label>
            <textarea name="property_description" value={propertyDescription} onChange={(e) => setPropertyDescription(e.target.value)} className="w-full p-2 border border-(--light-green)" id="property_description" rows={4} style={{resize: "none"}}>
            </textarea>
        </div>
        <div className="flex items-center justify-end mt-8 w-[90%] mx-auto">
            <Button handleClick={handleClick}>
                Suivant
                <i className="fa-solid fa-arrow-right"></i>
            </Button>
        </div>
    </div>
}

export function StepTwo({currentPage, prevStep}) 
{
    const handleClick = () => {
        prevStep()
    }

    const handleNext = ()=> {
        nextStep()
    }



    const reduceChambre = ()=>{
        if(chambre.number <= 1)
        {
            setChambre({
                ...chambre,
                available: false,
                number: 0
            })
        }
        else
        {
            setChambre({
                ...chambre,
                number: chambre.number - 1,
            })
        }
    }

    const addChambre = () =>
    {
        if(chambre.number >= 0)
        {
            setChambre({
                ...chambre,
                available: true,
                number: chambre.number + 1
            })
        }
        else 
        {
            setChambre({
                ...chambre,
                number: chambre.number + 1
            })
        }
    }

    const resetChambre = ()=>{
        if(chambre.number > 0)
        {
            setChambre({
                ...chambre,
                number: 0,
                available: false
            })
        }

        else
        {
            setChambre({
                ...chambre,
                number: 1,
                available: true
            })
        }
    }

    const [chambre, setChambre] = useState({
        name: 'chambre',
        number: 0,
        available: false
    })
    const [salon, setSalon] = useState({
        name: 'salon',
        number: 0,
        available: false

    })

    const [douche, setDouche] = useState({
        name: 'douche',
        number: 0,
        available: false

    })
    const [cuisine, setCuisine] = useState({
        name: 'cuisine',
        number: 0,
        available: false
    })


    return <div div className={ currentPage == 2 ? "active" : ""}>
        <div className="title text-[18px]">
            plus détails sur le logement 
        </div>
        <div className="mt-[40px] mb-3">
            <div className=" flex flex-col items-stretch justify-start gap-4">
                <div className=" bg-[#f5f5f5] flex items-center justify-between gap-2 p-2 w-[98%] ">
                    <div className="flex items-center justify-center gap-8" >
                        <input type="checkbox" id="salon" onChange={resetChambre} checked={chambre.available} className="checkbox-custom" />
                        <label htmlFor="salon" className="text-(--text-color) text-sm">{chambre.name}</label>
                    </div>
            {chambre.available && <div className="flex items-center justify-center gap-4 me-30" >
                        <button type="button" onClick={reduceChambre} className="text-xl bg-(--primary-green) size-10 text-white rounded-full"> <i className="fa-solid fa-minus"></i> </button>
                            <span>{chambre.number}</span>
                        <button type="button"  onClick={addChambre} className="text-xl bg-(--primary-green) size-10 text-white rounded-full"><i className="fa-solid fa-plus"></i></button>
                    </div>}
                </div>
                <div className=" bg-[#f5f5f5] flex items-center justify-between gap-2 p-2 w-[98%]">
                    <div className="flex items-center justify-center gap-8" >
                        <input type="checkbox" id="salon" className="checkbox-custom" />
                        <label htmlFor="salon" className="text-(--text-color) text-sm">Douches</label>
                    </div>
                    <div className="flex items-center justify-center gap-4 me-30" >
                        <button className="text-xl bg-(--primary-green) size-10 text-white rounded-full"> <i className="fa-solid fa-minus"></i> </button>
                            <span>1</span>
                        <button className="text-xl bg-(--primary-green) size-10 text-white rounded-full"><i className="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <div className=" bg-[#f5f5f5] flex items-center justify-between gap-2 p-2 w-[98%]">
                    <div className="flex items-center justify-center gap-8" >
                        <input type="checkbox" id="salon" className="checkbox-custom" />
                        <label htmlFor="salon" className="text-(--text-color) text-sm">Chambres</label>
                    </div>
                    <div className="flex items-center justify-center gap-4 me-30" >
                        <button className="text-xl bg-(--primary-green) size-10 text-white rounded-full"> <i className="fa-solid fa-minus"></i> </button>
                            <span>1</span>
                        <button className="text-xl bg-(--primary-green) size-10 text-white rounded-full"><i className="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <div className=" bg-[#f5f5f5] flex items-center justify-between gap-2 p-2 w-[98%]">
                    <div className="flex items-center justify-center gap-8" >
                        <input type="checkbox" id="salon" className="checkbox-custom" />
                        <label htmlFor="salon" className="text-(--text-color) text-sm">Cuisine</label>
                    </div>
                    <div className="flex items-center justify-center gap-4 me-30" >
                        <button className="text-xl bg-(--primary-green) size-10 text-white rounded-full"> <i className="fa-solid fa-minus"></i> </button>
                            <span>1</span>
                        <button className="text-xl bg-(--primary-green) size-10 text-white rounded-full"><i className="fa-solid fa-plus"></i></button>
                    </div>
                </div>
            </div>
            <div className="recap h-[120px] p-3 mt-4 bg-[#27b4461a] w-[98%]">
                <div className="little mx-auto title w-[80%]">
                    recapitulatif
                </div>
                <div className="grid lg:grid-cols-2 mt-2 w-[80%] mx-auto">
                    <div className="left flex flex-col items-stretch justify-start gap-4">
                        <div className="flex items-center justify-start gap-4">
                            <i className="fa-solid fa-couch text-(--primary-green)"></i>
                            <span>salon: </span>
                            <span>1</span>
                        </div>
                        <div className="flex items-center justify-start gap-4">
                            <i className="fa-solid fa-bed text-(--primary-green)"></i>
                            <span>chambre: </span>
                            <span>1</span>
                        </div>
                    </div>
                    <div className="right left flex flex-col items-stretch justify-start gap-4">
                        <div className="flex items-center justify-start gap-4">
                            <i className="fa-solid fa-utensils text-(--primary-green)"></i>
                            <span>cuisine: </span>
                            <span>1</span>
                        </div>
                        <div className="flex items-center justify-start gap-4">
                            <i className="fa-solid fa-bath text-(--primary-green)"></i>
                            <span>salle de bain: </span>
                            <span>1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex items-center justify-between w-[80%]  mx-auto mt-8">
            <StrokeButton handleClick={handleClick}>
                <i className="fa-solid fa-arrow-left"></i>
                Précédent
            </StrokeButton>
            <Button handleClick={handleNext}>
                Suivant
                <i className="fa-solid fa-arrow-right"></i>
            </Button>
        </div>
    </div>
}


export function StepThree({currentPage}) 
{
    return <div className={ currentPage == 3 ? "active" : ""}>
        I'm the third step of the form
    </div>
}

export function StepFour({currentPage}) 
{
    return <div className={ currentPage == 4 ? "active" : ""}>
        I'm the fourth step of the form
    </div>
}
