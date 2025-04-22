import { createContext, useContext, useState } from "react";

const HandleSibeBar = createContext();

export const HandleSibeBarProvider = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const changeExpanded = ()=>{
        setIsExpanded(!isExpanded)
        console.log(isExpanded)
    }

    return (
        <HandleSibeBar.Provider value={{ isExpanded, changeExpanded }}>
            {children}
        </HandleSibeBar.Provider>
    );
}

export const useHandleSibeBar = () => {
    return useContext(HandleSibeBar);
}

