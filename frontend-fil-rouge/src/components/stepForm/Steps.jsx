import { useEffect, useRef, useState } from "react"
import { InputStepForm } from "../Input"
import { Button, StrokeButton } from "../Button"
import { ChoicesTag, ChoosedTag } from "../Tags"
import { SearchInput2 } from "../SearchInput";
import { useLocation } from "../../hooks/useLocation";
import { useTags } from "../../hooks/useTags";
import { useAsset } from "../../hooks/useAsset";

const initialAtoutsFromDB = [
    { id: 1, label: 'Sécurité 24/24' },
    { id: 2, label: 'Espace vert à proximité' },
    { id: 3, label: 'Plusieurs commerces à proximité' },
    { id: 4, label: 'Eau courante toujours disponible' },
    { id: 5, label: 'Lieux de détente à proximité' },
];


const initialTagsFromTheBD = [
    { "id": 1, "value": "zone très calme" },
    { "id": 2, "value": "studio moderne" },
    { "id": 3, "value": "très proche du campus" },
    { "id": 4, "value": "salle d'étude disponible" },
    { "id": 5, "value": "parking" },
    { "id": 6, "value": "groupe electrogène" },
    { "id": 7, "value": "haute qualité" },
    { "id": 8, "value": "qualité standard" },
    { "id": 9, "value": "prix abordables" },
    { "id": 10, "value": "appartement" },
    { "id": 11, "value": "logement meublé" }
]

export function StepOne({nextStep, formData, currentPage})
{

    const [propertyName, setPropertyName] = useState(formData.property_name || "")
    const [propertyType, setPropertyType] = useState(formData.type || "")
    const [propertyRegion, setPropertyRegion] = useState(formData.property_region || "")
    const [propertyPrice, setPropertyPrice] = useState(formData.property_price || "")
    const [propertyDescription, setPropertyDescription] = useState(formData.property_description || "")
    const [propertyLoc, setPropertyLoc] = useState(formData.coloc || false)
    const [nomsAppartements, setNomsAppartements] = useState(formData.nomsAppartements || []);
    const [nouveauNomAppartement, setNouveauNomAppartement] = useState('');
    const [propertyUniversity, setPropertyUniversity] = useState("")


    


    const [universities, setUniversities] = useState([]);
    const {regions, getUniversitiesByRegion} = useLocation()


    // Ajoutez un useEffect pour mettre à jour les universités quand la région change
    useEffect(() => {
        if (propertyRegion) {
            const universitiesList = getUniversitiesByRegion(propertyRegion);
            setUniversities(universitiesList);
            setPropertyUniversity(formData?.university?.universitie_name || ''); // Mettre à jour la valeur par défaut de l'université
        }


    }, [propertyRegion]);



    /* Handle first suggestion */
    const inputRef = useRef(null);
    const [showCountriesSuggestion, setshowCountriesSuggestion] = useState(false);
    const [showUniversitiesSuggestion, setShowUniversitiesSuggestion] = useState(false)

    useEffect(() => {
    const handleOutsideClick = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
        setshowCountriesSuggestion(false);
        setShowUniversitiesSuggestion(false)
        }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
    };
    }, [inputRef]);

    const handleCountryInputFocus = () => {
    setshowCountriesSuggestion(true); // Afficher les suggestions au focus
    };

    const handleUniversityInputFocus = () => {
        setShowUniversitiesSuggestion(true); // Afficher les suggestions au focus
    };

    /* Handle Second suggestion */

    const inputRef2 = useRef(null);
    const [showRegionSuggestion, setShowRegionSuggestion] = useState(false)

    useEffect(() => {
    const handleOutsideClick = (event) => {
        if (inputRef2.current && !inputRef2.current.contains(event.target)) {
            setShowRegionSuggestion(false);
        }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
    };
    }, [inputRef2]);


    const handleRegionOnFocusInputFocus = () => {
        setShowRegionSuggestion(true); // Afficher les suggestions au focus
    };

    /* Handle Third suggestion */

    const inputRef3 = useRef(null);
    const [showTypeSuggestion, setshowTypeSuggestion] = useState(false);

    useEffect(() => {

        const handleOutsideClick = (event) => {
            if (inputRef3.current && !inputRef3.current.contains(event.target)) {
                setshowTypeSuggestion(false);
            }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };

    }, [inputRef3]);


    const handleTypeOnFocusInputFocus = () => {
        setshowTypeSuggestion(true); // Afficher les suggestions au focus
    }



    const handleTypeChange = (e) => {
        setPropertyType(e.target.value);
        // Réinitialiser les noms des appartements si le type change
        if (e.target.value !== 'immeuble') {
          setNomsAppartements([]);
        }
      };
    
      const handleNouveauNomAppartementChange = (e) => {
        setNouveauNomAppartement(e.target.value);
      };
    
      const handleAjouterAppartement = () => {
        if (nouveauNomAppartement.trim() !== '') {
          setNomsAppartements([...nomsAppartements, nouveauNomAppartement.trim()]);
          setNouveauNomAppartement(''); // Réinitialiser le champ de saisie
        }
      };
    
      const handleSupprimerAppartement = (indexToDelete) => {
        const newNomsAppartements = nomsAppartements.filter((_, index) => index !== indexToDelete);
        setNomsAppartements(newNomsAppartements);
      };


    const handleClick = () => {
        nextStep({propertyDescription, propertyName, propertyType, propertyRegion, propertyPrice, propertyUniversity, propertyLoc})
    }

    const toggleLoc = ()=>{
        console.log(propertyLoc)
        setPropertyLoc(!propertyLoc)
    }
    return <div className={ currentPage == 1 ? "h-[85%] active" : "h-[85%]"}>
        <div className="h-[95%] mx-auto w-[95%] mt-5 overflow-y-auto px-2 pe-2">
            <div className="title text-[18px]">
                Informations de base 
            </div>
            <div className="grid lg:grid-cols-2 mt-[30px]">
                <div className="left w-[90%] flex items-stretch justify-start gap-2 flex-col">
                    <InputStepForm id="property_name" labelName="Nom du logement" type="text" val={propertyName} handleChange={(e)=>setPropertyName(e.target.value)}/>
                    <div className="flex items-stretch relative text-[15px] gap-1 flex-col my-2 justify-center w-full" ref={inputRef3}>
                        <label htmlFor="universtiy" className="text-(--title-color)">Type de logement</label>
                        <SearchInput2 val={propertyType} parentChange={(val) => setPropertyType(val)} id="types" handleInputFocus={handleTypeOnFocusInputFocus} showSuggestions={showTypeSuggestion} data={['studio', 'immeuble', 'appartement', 'cités', 'chambre' ]}/>
                    </div>
                    <InputStepForm id="property_price" labelName="tarif annuel du logement" type="text" val={propertyPrice} handleChange={(e)=>setPropertyPrice(e.target.value)}/>
                </div>
                <div className="right w-[90%] flex items-stretch justify-start gap-2 flex-col">
                    <div className="flex items-stretch relative text-[15px] gap-1 flex-col my-2 justify-center w-full" ref={inputRef2}>
                        <label htmlFor="universtiy" className="text-(--title-color)">Régions</label>
                        <SearchInput2 val={propertyRegion} parentChange={(val) => setPropertyRegion(val)} id="Régions" handleInputFocus={handleRegionOnFocusInputFocus} showSuggestions={showRegionSuggestion} data={regions.map((el) => el.region_name)}/>
                    </div>
                    
                    <div className="flex items-stretch relative text-[15px] gap-1 flex-col my-2 justify-center w-full" ref={inputRef}>
                        <label htmlFor="universtiy" className="text-(--title-color)">Université</label>
                        <SearchInput2 val={propertyUniversity} parentChange={(val) => setPropertyUniversity(val)} id="universtiy" handleInputFocus={handleUniversityInputFocus} showSuggestions={showUniversitiesSuggestion} data={universities.map((un) => {
                            return un.universitie_name
                        })}/>
                    </div>

                    <div className="flex items-stretch text-[15px] gap-1 flex-col my-2 justify-center w-full">
                        <label htmlFor="actif" className={propertyLoc ? "text-sm text-(--primary-green)" : "text-sm"}>Possibilité de collocation:  {propertyLoc ? "oui" : "non"}</label>
                        <input type="checkbox" id="actif" checked={propertyLoc} onChange={toggleLoc} />
                    </div>
                </div>
            </div>

        {propertyType === 'immeuble' && (
          <div className="mt-4">
            <label className="text-(--title-color) text-[15px]">Noms des appartements</label>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                className="w-full p-2 border border-(--light-green) rounded-md"
                placeholder="Entrer le nom de l'appartement"
                value={nouveauNomAppartement}
                onChange={handleNouveauNomAppartementChange}
              />
              <button
                type="button"
                className="p-2 text-green-500 hover:text-green-700"
                onClick={handleAjouterAppartement}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
                {nomsAppartements.length > 0 && (
                <div className="mt-2">
                    {nomsAppartements.map((nom, index) => (
                    <div key={index} className="flex items-center gap-2 py-1">
                        <span className="text-sm">{nom}</span>
                        <button
                        type="button"
                        className="p-1 text-red-500 hover:text-red-700"
                        onClick={() => handleSupprimerAppartement(index)}
                        >
                        <i className="fa-solid fa-minus"></i>
                        </button>
                    </div>
                    ))}
                </div>
                )}
            </div>
            )}
            <div className="mt-2 text-[15px] w-[95%] flex items-stretch justify-start gap-2 flex-col">
                <label htmlFor="property_description" className="text-(--title-color2)">Description du logement</label>
                <textarea name="property_description" value={propertyDescription} onChange={(e) => setPropertyDescription(e.target.value)} className="w-full p-2 border border-(--light-green)" id="property_description" rows={4} style={{resize: "none"}}>
                </textarea>
            </div>
        </div>

        <div className="flex items-center justify-end mt-3 w-[90%] mx-auto pe-[65px]">
            <Button handleClick={handleClick}>
                Suivant
                <i className="fa-solid fa-arrow-right"></i>
            </Button>
        </div>
    </div>
}

export function StepTwo({currentPage, prevStep, nextStep, formData}) 
{

    console.log(formData)
    // Initialisation des états avec les données de `formData` ou des valeurs par défaut
    const [chambre, setChambre] = useState({
        name: "nombre_chambres",
        number: formData?.nombre_chambres || 0,
        available: formData?.nombre_chambres > 0 || false,
    });

    const [salon, setSalon] = useState({
        name: "nombre_salon",
        number: formData?.nombre_salon || 0,
        available: formData?.nombre_salon > 0 || false,
    });

    const [douche, setDouche] = useState({
        name: "nombre_douche",
        number: formData?.nombre_douches || 0,
        available: formData?.nombre_douches > 0 || false,
    });

    const [cuisine, setCuisine] = useState({
        name: "nombre_cuisine",
        number: formData?.nombre_cuisine || 0,
        available: formData?.nombre_cuisine > 0 || false,
    });
    

    const handleClick = () => {
        prevStep()
    }

    const handleNext = ()=> {
        nextStep({cuisine, chambre, douche, salon})
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


    //fonctionnalitées des pieces

    const reduceDouche = ()=>{
        if(douche.number <= 1)
        {
            setDouche({
                ...douche,
                available: false,
                number: 0
            })
            
        }
        else
        {
            setDouche({
                ...douche,
                number: douche.number - 1,
            })
        }
    }

    const addDouche = () =>
    {
        if(douche.number >= 0)
        {
            setDouche({
                ...douche,
                available: true,
                number: douche.number + 1
            })
        }
        else 
        {
            setDouche({
                ...douche,
                number: douche.number + 1
            })
        }
    }

    const resetDouche = ()=>{
        if(douche.number > 0)
        {
            setDouche({
                ...douche,
                number: 0,
                available: false
            })
        }

        else
        {
            setDouche({
                ...douche,
                number: 1,
                available: true
            })
        }
    }

    const reduceSalon = ()=>{
        if(salon.number <= 1)
        {
            setSalon({
                ...salon,
                available: false,
                number: 0
            })
            
        }
        else
        {
            setSalon({
                ...salon,
                number: salon.number - 1,
            })
        }
    }

    const addSalon = () =>
    {
        if(salon.number >= 0)
        {
            setSalon({
                ...salon,
                available: true,
                number: salon.number + 1
            })
        }
        else 
        {
            setSalon({
                ...salon,
                number: salon.number + 1
            })
        }
    }
    
    const resetSalon = ()=>{
        if(salon.number > 0)
        {
            setSalon({
                ...salon,
                number: 0,
                available: false
            })
        }

        else
        {
            setSalon({
                ...salon,
                number: 1,
                available: true
            })
        }
    }


    const reduceCuisine = ()=>{
        if(cuisine.number <= 1)
        {
            setCuisine({
                ...cuisine,
                available: false,
                number: 0
            })
            
        }
        else
        {
            setCuisine({
                ...cuisine,
                number: cuisine.number - 1,
            })
        }
    }
        
    const addCuisine = () =>
        {
            if(cuisine.number >= 0)
            {
                setCuisine({
                    ...cuisine,
                    available: true,
                    number: cuisine.number + 1
                })
            }
            else 
            {
                setCuisine({
                    ...cuisine,
                    number: cuisine.number + 1
                })
            }
        }
        
        const resetCuisine = ()=>{
            if(cuisine.number > 0)
            {
                setCuisine({
                    ...cuisine,
                    number: 0,
                    available: false
                })
            }
    
            else
            {
                setCuisine({
                    ...cuisine,
                    number: 1,
                    available: true
                })
            }
        }

    return <div div className={ currentPage == 2 ? "active" : ""}>
        <div className="h-[95%] mx-auto w-[95%] mt-5 overflow-y-auto px-2 pe-2">
            <div className="title text-[18px]">
                plus détails sur le logement 
            </div>
            <div className="mt-[30px] mb-3">
                <div className=" flex flex-col items-stretch justify-start gap-4">
                    <div className=" bg-[#f5f5f5] flex items-center justify-between gap-2 p-2 w-[98%] ">
                        <div className="flex items-center justify-center gap-8" >
                            <input type="checkbox" id="chambre" onChange={resetChambre} checked={chambre.available} className="checkbox-custom" />
                            <label htmlFor="chambre" className="text-(--text-color) text-sm">{chambre.name}</label>
                        </div>
                {chambre.available && <div className="flex items-center justify-center gap-4 me-30" >
                            <button type="button" onClick={reduceChambre} className="text-xl bg-(--primary-green) size-10 text-white rounded-full"> <i className="fa-solid fa-minus"></i> </button>
                                <span>{chambre.number}</span>
                            <button type="button"  onClick={addChambre} className="text-xl bg-(--primary-green) size-10 text-white rounded-full"><i className="fa-solid fa-plus"></i></button>
                        </div>}
                    </div>
                    <div className=" bg-[#f5f5f5] flex items-center justify-between gap-2 p-2 w-[98%]">
                        <div className="flex items-center justify-center gap-8" >
                            <input type="checkbox" id="douche" onChange={resetDouche} checked={douche.available}  className="checkbox-custom" />
                            <label htmlFor="douche" className="text-(--text-color) text-sm">{douche.name}</label>
                        </div>
            {douche.available  &&  <div className="flex items-center justify-center gap-4 me-30" >
                            <button type="button" onClick={reduceDouche} className="text-xl bg-(--primary-green) size-10 text-white rounded-full"> <i className="fa-solid fa-minus"></i> </button>
                                <span> {douche.number}</span>
                            <button  type="button" onClick={addDouche} className="text-xl bg-(--primary-green) size-10 text-white rounded-full"><i className="fa-solid fa-plus"></i></button>
                        </div>}
                    </div>
                    <div className=" bg-[#f5f5f5] flex items-center justify-between gap-2 p-2 w-[98%]">
                        <div className="flex items-center justify-center gap-8" >
                            <input type="checkbox" id="salon" onChange={resetSalon} checked={salon.available} className="checkbox-custom" />
                            <label htmlFor="salon" className="text-(--text-color) text-sm">{salon.name} </label>
                        </div>
                {salon.available && <div className="flex items-center justify-center gap-4 me-30" >
                            <button type="button"  onClick={reduceSalon} className="text-xl bg-(--primary-green) size-10 text-white rounded-full"> <i className="fa-solid fa-minus"></i> </button>
                                <span>{salon.number} </span>
                            <button type="button" onClick={addSalon} className="text-xl bg-(--primary-green) size-10 text-white rounded-full"><i className="fa-solid fa-plus"></i></button>
                        </div>}
                    </div>
                    <div className=" bg-[#f5f5f5] flex items-center justify-between gap-2 p-2 w-[98%]">
                        <div className="flex items-center justify-center gap-8" >
                            <input type="checkbox" id="cuisine" onChange={resetCuisine} checked={cuisine.available} className="checkbox-custom" />
                            <label htmlFor="cuisine" className="text-(--text-color) text-sm"> {cuisine.name} </label>
                        </div>
                {cuisine.available && <div className="flex items-center justify-center gap-4 me-30" >
                            <button type="button"  onClick={reduceCuisine} className="text-xl bg-(--primary-green) size-10 text-white rounded-full"> <i className="fa-solid fa-minus"></i> </button>
                                <span> {cuisine.number} </span>
                            <button type="button"  onClick={addCuisine} className="text-xl bg-(--primary-green) size-10 text-white rounded-full"><i className="fa-solid fa-plus"></i></button>
                        </div>}
                    </div>
                </div>
                <div className="recap h-fit lg:h-[120px] p-3 mt-4 bg-[#27b4461a] w-[98%]">
                    <div className="little mx-auto title w-[80%]">
                        recapitulatif
                    </div>
                    <div className="grid lg:grid-cols-2 mt-2 gap-4 w-[80%]  mx-auto">
                        <div className="left flex flex-col items-stretch justify-start gap-4">
                            <div className="flex items-center justify-start gap-4">
                                <i className="fa-solid fa-couch text-(--primary-green)"></i>
                                <span>salon: </span>
                                <span>{salon.number}</span>
                            </div>
                            <div className="flex items-center justify-start gap-4">
                                <i className="fa-solid fa-bed text-(--primary-green)"></i>
                                <span>chambre: </span>
                                <span>{chambre.number}</span>
                            </div>
                        </div>
                        <div className="right left flex flex-col items-stretch justify-start gap-4">
                            <div className="flex items-center justify-start gap-4">
                                <i className="fa-solid fa-utensils text-(--primary-green)"></i>
                                <span>cuisine: </span>
                                <span>{cuisine.number}</span>
                            </div>
                            <div className="flex items-center justify-start gap-4">
                                <i className="fa-solid fa-bath text-(--primary-green)"></i>
                                <span>salle de bain: </span>
                                <span>{douche.number}</span>
                            </div>
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


export function StepThree({currentPage, prevStep, nextStep}) 
{
    const handleClick = ()=>{
        prevStep()
    }

    const handleNext = ()=>{
        nextStep({})
    }

    return <div className={ currentPage == 3 ? "active" : ""}>
        <div className="title text-[18px]">
            Ajouter des images à votre logement
        </div>
        <div className="main-container relative grid lg:grid-cols-2 mt-[30px]">
            <div className="">

            </div>
        </div>
        <div className="flex items-center justify-between w-[80%]  mx-auto mt-4">
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

export function StepFour({currentPage, prevStep, nextStep, formData}) 
{

    const [selectedTags, setSelectedTags] = useState(formData.tags || []);
    const [selectedAssets, setSelectedAssets] = useState(formData.assets || []);

    // Pré-remplir les tags sélectionnés
    useEffect(() => {
        if (formData.tags) {
            setSelectedTags(formData.tags);
        }
    }, [formData.tags]);

    // Pré-remplir les atouts sélectionnés
    useEffect(() => {
        if (formData.assets) {
            setSelectedAssets(formData.assets);
        }
    }, [formData.selectedAssets]);

    const {availableTags, addTag, removeTag} = useTags()

    const {availableAssets, toggleAsset, isAssetSelected} = useAsset()


    const handleTagClick = (tag) => {
        if (selectedTags.some((t) => t.id === tag.id)) {
            setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleAssetClick = (asset) => {
        if (selectedAssets.some((a) => a.id === asset.id)) {
            setSelectedAssets(selectedAssets.filter((a) => a.id !== asset.id));
        } else {
            setSelectedAssets([...selectedAssets, asset]);
        }
    };

    const handlePrev = ()=>{
        prevStep()
    }

    const handleNext = () => {
        nextStep({selectedTags, selectedAssets });
    };


    return <div className={ currentPage == 4 ? "h-[85%] active" : "h-[85%]"}>
        <div className="h-[95%] mx-auto w-[95%] mt-5 overflow-y-auto px-2 pe-2">
            <div className="title text-[18px] flex flex-col items-stretch justify-start gap-1">
            <span>Ajouter les tags à votre logement</span> 
            <span className="text-[15px] text-(--text-color)">
                    choisissez au plus 05 tags qui décrivent le le mieux to votre logement
            </span>
            </div>
            <div className="mt-[30px] ">
                {selectedTags.length <= 0 ?  <div className="choosed">

                </div> : <div className="choosed my-5 flex items-center justify-start gap-2 flex-wrap">
                        {selectedTags.map((val, index) => (<ChoosedTag handleClick={()=>handleTagClick(val)} key={index}>{val.tag_name}</ChoosedTag>))}
                    </div>}

                <div className="choices flex flex-wrap items-center justify-start gap-3">
                    {availableTags.map((val, index) => (<ChoicesTag handleClick={()=>handleTagClick(val)} key={index}>{val.tag_name}</ChoicesTag>))}
                </div>
            </div>

            <div className="mt-[30px]">
                <div className="text-[18px]">
                    Autres atouts de votre logements
                </div>
                <div className="flex items-center justify-start flex-wrap gap-5 mt-2">
                <div className="flex items-center justify-start flex-wrap gap-5 mt-2">
                {availableAssets.map(atout => (
                    <div key={atout.id} className="atout text-(--text-color) flex items-center justify-start gap-1.5">
                        <input
                            type="checkbox"
                            name={atout.id} 
                            id={`atout-${atout.id}`}
                            checked={selectedAssets.some((a) => a.id === atout.id)}
                            onChange={()=> handleAssetClick(atout)}
                        />
                        <label htmlFor={`atout-${atout.id}`}>{atout.asset_name}</label>
                    </div>
                ))}
            </div>
                </div>
            </div>
            <div className="title mt-[30px] text-[18px] flex mb-2  items-stretch justify-start gap-1">
                <span>Autorisé l'affiliation</span> 
            </div>

            <div className= "flex items-start justify-start flex-wrap gap-3 mb-[20px] flex-col p-3" style={{boxShadow: "0 0 7px rgba(0, 0, 0, .25 )"}} >
                <div className="flex items-center justify-start gap-4">
                    <div className="atout text-(--text-color) flex items-center justify-start gap-1.5">
                        <input type="checkbox" name="rest_space" id="rest_space" />
                        <label htmlFor="rest_space">oui</label>
                    </div>
                    <div className="atout text-(--text-color) flex items-center justify-start gap-1.5">
                        <input type="checkbox" name="rest_space" id="rest_space" />
                        <label htmlFor="rest_space">non</label>
                    </div>
                </div>

                <div className="bg-[#27ae5f69] w-[70%] p-4 flex items-start gap-4 justify-content">
                    <div className="">
                        <i className="fa-solid fa-circle-info text-white text-2xl"></i>
                    </div>
                    <div className="text-white w-[90%]">
                        <span>En autorisan l’affiliation vous offrez la possiblité a d’autre personne de pouvoir faire la promotion de ce logement via un lien d’affiliation</span>
                    </div>
                </div>

            </div>            
        </div>

        <div className="flex items-center justify-between w-[80%] mx-auto mt-4">
            <StrokeButton handleClick={handlePrev}>
                <i className="fa-solid fa-arrow-left"></i>
                Précédent
            </StrokeButton>
            <Button type="submit" handleClick={handleNext}>
                Terminer la modification
            </Button>
        </div>

    </div>
}


const ImageUploader = ({ currentPage, formData, nextStep, prevStep }) => {

    const [mainImage, setMainImage] = useState(formData.images?.filter(el => el.is_main == 1).map(al => "http://localhost:8000/storage/" + al.image_path) || null); // Image principale
    const [secondaryImages, setSecondaryImages] = useState(
        formData.images?.filter((el)=> el.is_main != 1).map((image, index) => ({
            id: `secondary-${index}`,
            url: "http://localhost:8000/storage/" + image.image_path,
        })) || []
    );

    const [mainImageFile, setMainImageFile] = useState(formData.mainImageFile || null);
    const [secondaryImageFiles, setSecondaryImageFiles] = useState(formData.secondaryImageFiles || {});

    const handleMainImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setMainImage(URL.createObjectURL(file));
            setMainImageFile(file);
        }
    };

    const removeMainImage = () => {
        setMainImage(null);
        setMainImageFile(null);
    };

    const handleSecondaryImageChange = (event, id) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setSecondaryImages(prevImages =>
                prevImages.map(img =>
                    img.id === id ? { ...img, url: imageUrl } : img
                )
            );
            setSecondaryImageFiles(prevFiles => ({ ...prevFiles, [id]: file }));
        }
    };

    const addSecondaryImage = () => {
        const newId = `secondary-${Date.now()}-${Math.random()}`; // Générer un ID simple
        setSecondaryImages(prevImages => [...prevImages, { id: newId, url: null }]);
    };

    const removeSecondaryImage = (id) => {
        setSecondaryImages(prevImages => prevImages.filter(img => img.id !== id));
        const newSecondaryImageFiles = { ...secondaryImageFiles };
        delete newSecondaryImageFiles[id];
        setSecondaryImageFiles(newSecondaryImageFiles);
    };

    const handleNext = () => {
        nextStep({ mainImageFile, secondaryImageFiles });
    };

    const handlePrev = () => {
        prevStep();
    };

    return (
        <div className={`step  h-[85%] ${currentPage === 3 ? "active" : ""}`}>
            <div className="h-[95%] mx-auto w-[95%] mt-5 overflow-y-auto px-2 pe-2">
                <div className="flex flex-col gap-6">
                    <div className="w-[95%]">
                        <div className="text-[18px] text-(--title-color) mb-2"> Ajouter des images à votre logement</div>
                        <div className="border-2 border-(--text-color) border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden">
                        {mainImage ? (
                            <div className="relative">
                                <img src={mainImage} alt="Image de couverture" className="max-w-full max-h-48 object-contain rounded-md" />
                                <button
                                    type="button"
                                    className="absolute z-20 top-2 right-2 bg-(--light-green) bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                    onClick={removeMainImage}
                                >
                                    <i className="fa-solid fa-x"></i>
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <i className="fa-solid fa-upload text-(--primary-green) text-xl mb-2"></i>
                                <span className="text-(--primary-green) text-xs">Ajouter une image de couverture à ce logement</span>
                            </div>
                        )}
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute z-10 inset-0 opacity-0 cursor-pointer"
                                onChange={handleMainImageChange}
                            />
                        </div>
                    </div>


                    <div className="w-[95%]">
                        <div className="text-(--title-color) text-[18px] mb-2">Autres images</div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                            {secondaryImages.map((image) => (
                                <div key={image.id} className="relative border border-dashed rounded-md overflow-hidden">
                                    {image.url ? (
                                        <img src={image.url} alt="Image secondaire" className="w-full h-32 object-cover" />
                                    ) : (
                                        <div className="w-full h-32 flex flex-col items-center justify-center">
                                            <p className="text-(--primary-green) text-xs">choisir une image</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(event) => handleSecondaryImageChange(event, image.id)}
                                    />
                                    {image.url && (
                                        <button
                                            type="button"
                                            className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                            onClick={() => removeSecondaryImage(image.id)}
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    )}
                                </div>
                            ))}
                            <div className="flex items-center justify-start">
                                <button
                                    type="button"
                                    className="bg-(--light-green) w-fit h-fit p-2 gap-2 rounded-md flex items-center justify-center cursor-pointer"
                                    onClick={addSecondaryImage}
                                >
                                    {secondaryImages.length == 0 && <span className="text-xs text-white">ajouter une image</span>}
                                    <i className="fa-solid fa-plus text-white text-xl "></i>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between w-[80%] mx-auto mt-4">
                <StrokeButton handleClick={handlePrev}>
                    <i className="fa-solid fa-arrow-left"></i>
                    Précédent
                </StrokeButton>
                <Button handleClick={handleNext}>
                    Suivant
                    <i className="fa-solid fa-arrow-right"></i>
                </Button>
            </div>
        </div>
        
    );
};

export default ImageUploader;