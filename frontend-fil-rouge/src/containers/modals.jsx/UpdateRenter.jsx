import { useState } from "react"
import { useModal } from "../../hooks/useModal"
import { ButtonModal } from "../../components/Button"
import { Input } from "../../components/Input"
import { useHandleUser } from "../../hooks/useUser"
import { toast } from "sonner"

export function UpdateRenter(user)
{
    const [newUser, setNewUser] = useState({...user,
        phone_number: user.phone_number ? user.phone_number : ""
    })

    console.log(newUser)

    const [loading, setLoading] = useState(false)

    const {updateUser} = useHandleUser()
    const {closeModal} = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Appeler la méthode `updateUser` et attendre qu'elle se termine
            await updateUser(e, newUser);
            closeModal(); // Fermer la modal après une mise à jour réussie
        } catch (error) {
            toast.error("Erreur lors de la mise à jour :", error);
        } finally {
            setLoading(false); // Réinitialiser l'état de chargement
        }
    };



    return  <form onSubmit={handleSubmit} className="max-w-[500px] flex flex-col items-stretch gap-1 md:w-[70%] w-[80%] bg-white mt-[300px] p-4 rounded-xl" style={{boxShadow: "1px 5px 10px rgba(0, 0, 0, .2)"}} >
                <div className="my-4">
                    <span className="text-xl text-(--primary-green)">Modifier mes informations</span>
                    <button onClick={closeModal} type="button" className="cursor-pointer float-right p-2 rounded-full bg-red-100 size-[30px] flex items-center justify-center" style={{transform: 'translateY(-5px)'}}><i className="fa-solid fa-x text-sm text-red-800"></i></button>
                </div>
                <Input name="name" labelName="Nom" id="name" val={newUser.name} handleChange={(e)=> setNewUser({
                    ...newUser,
                    name: e.target.value
                })} type="text" />
                <Input name="family_name" labelName="Prenom" id="family_name" val={newUser.family_name} handleChange={(e)=>setNewUser({
                    ...newUser,
                    family_name: e.target.value
                })} type="text" />
                <Input name="phone_number" labelName="Numéro de téléphone" id="phone_number" val={newUser.phone_number} handleChange={(e)=>setNewUser({
                    ...newUser,
                    phone_number: e.target.value
                })} type="text" />
                <ButtonModal>
                    <span>Modifier</span>
                </ButtonModal>
            </form>
}