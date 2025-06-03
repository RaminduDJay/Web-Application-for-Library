import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

export const useThemeContext=()=>{
    const context=useContext(ThemeContext)

    if(!context){//component havent wrapped with AuthCOntextProvider
        throw Error('useThemeContext must be used inside an ThemeContextProvider')
    }

    return context
}