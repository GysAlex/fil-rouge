import { useModal } from "../../hooks/useModal"


export function SearchModal()
{
    const {closeModal} = useModal()
    return <>

        <form action="" className="h-[200px] w-3/4 mx-auto bg-white">

            Hello from inside the modal
            <button type="button" onClick={closeModal}>
                fermer moi
            </button>
        </form>
    
    </>
    
 
}