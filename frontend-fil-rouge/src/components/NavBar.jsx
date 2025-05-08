import { Link, useParams } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { useModal } from "../hooks/useModal";
import { SearchModal } from "../containers/modals.jsx/SearchModal";
import { useAuth } from "../hooks/useAuth";
import { OwnerLoginModal } from "../containers/modals.jsx/OwnerLoginModal";
import { useState } from "react";

export function NavBar() {


const { region, university } = useParams();
const { openModal } = useModal();
const {state, user, logout, role} = useAuth()
const [menuVisible, setMenuVisible] = useState(false);

const toggleMenu = () => {
  setMenuVisible(!menuVisible); // Alterne la visibilité du menu
};

const handleLogout = () => {
  logout(); // Appelle la méthode de déconnexion
};

const handleSearchClick = () => {


    openModal(SearchModal, {
        defaultValues: {
            region: region || 'Ouest',
            university: university?.replace(/-/g, ' ') || 'Université...'
        }
    });

};

  return (
    <div
      className="w-full h-[89px] sticky top-0 bg-white z-50 flex items-center justify-center"
      style={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="w-full max-w-[1258px] px-4 md:px-2 lg:px-0 mx-auto flex items-center justify-between">
        <div className="brand mx-2 md:mx-0 flex items-center justify-start gap-[15px]">
          <div className="burger ">
            <button className="burger flex items-center justify-center size-[46px] bg-(--primary-green) rounded-full">
              <i className="fa-solid fa-bars text-2xl text-white"></i>
            </button>
          </div>
          <div className="mother hidden md:flex ">
            <span className="text-(--primary-green) font-extrabold text-[20px]">
              Metch
            </span>
            <span className="font-extrabold text-(--text-color) text-[20px]">
              App
            </span>
          </div>
        </div>
        <div id="modalSearch" 
          className="modalSearch flex rounded-4xl items-center bg-(--light-green) justify-start w-[454px] max-w-[454px] h-[53px]">
          <button onClick={handleSearchClick} className="w-full h-full px-8 lg:px-15 cursor-pointer flex items-center justify-around">
            <div className="text-[18px]">{region || 'Ouest'}</div>
            <div className="w-[2px] bg-(--text-color) h-[65%] my-auto"></div>
            <div className="text-[18px]">{university?.replace(/-/g, ' ') || 'Université...'}</div>
          </button>
        </div>
      
      {!state ? (<>
        <div className="nav hidden xl:flex items-center justify-center gap-8">
          <Link className="n-item font-medium text[14px] text-(--primary-green)">
            Logements
          </Link>
          <Link className="n-item font-medium text[14px] ">Affiliations</Link>
        </div>
        <button  className="ownerButton hidden lg:flex cursor-pointer text-[14px] gap-2 font-medium  items-center justify-center w-full max-w-[285px] h-[40px]  bg-(--primary-green)">
          <i className="fa-solid fa-plus text-white"></i>
          <span className="text-white">Ajouter mon logement sur metch</span>
        </button>
      </>) : (<>
        
        <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="flex items-center justify-center gap-3 cursor-pointer"
                >
                  <div className="profile size-[45px] object-cover">
                    <img
                      src={
                        user?.image
                          ? `http://localhost:8000/storage/${user.image}`
                          : "http://localhost:5173/images/team2.jpg"
                      }
                      className="rounded-full w-full h-full"
                      alt="Profile"
                    />
                  </div>
                  <span className="text-(--primary-green) font-medium">
                    {user.name}
                  </span>
                </button>
                {menuVisible && (
                  <div
                    className="absolute right-0 mt-2 w-[200px] bg-white rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out transform opacity-100 scale-100"
                    style={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" }}
                  >
                    <ul className="flex flex-col items-stretch py-4">
                      {role.includes("renter") && (
                        <li>
                          <Link
                            to="/renter/favoris"
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 text-sm"
                            onClick={() => setMenuVisible(false)}
                          >
                            <i className="fa-solid fa-heart text-(--primary-green)"></i>
                            <span>Mes Favoris</span>
                          </Link>
                        </li>
                      )}
                      {role.includes("owner") && (
                        <li>
                          <Link
                            to="/owner/dashboard"
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 text-sm"
                            onClick={() => setMenuVisible(false)}
                          >
                            <i className="fa-solid fa-chart-line text-(--primary-green)"></i>
                            <span>Dashboard</span>
                          </Link>
                        </li>
                      )}
                      <hr className="my-2 border-gray-200" />
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 text-sm"
                        >
                          <i className="fa-solid fa-right-from-bracket text-red-500"></i>
                          <span>Déconnexion</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
      
        </>)
    

    }

      </div>
    </div>
  );
}

export function HomeNavBar() {
  const { openModal } = useModal();

  return (
    <div
      className="w-full h-[89px] sticky top-0 bg-white z-50 hidden md:flex items-center justify-center"
      style={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="w-full max-w-[1258px] px-4 md:px-4 lg:px-4 xl:px-0 mx-auto flex items-center justify-between">
        <div className="brand mx-2 md:mx-0 flex items-center justify-start gap-[15px]">
          <div className="burger ">
            <button className="burger flex items-center justify-center size-[46px] bg-(--primary-green) rounded-full">
              <i className="fa-solid fa-bars text-2xl text-white"></i>
            </button>
          </div>
          <Link to="home" className="mother flex ">
            <span className="text-(--primary-green) font-extrabold text-[20px]">
              Metch
            </span>
            <span className="font-extrabold text-(--text-color) text-[20px]">
              App
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-[30px]">
          <div className="nav hidden xl:flex items-center justify-center gap-8">
            <Link className="n-item font-medium text[14px] text-(--primary-green)">
              Logements
            </Link>
            <Link className="n-item font-medium text[14px] ">Affiliations</Link>
          </div>
          <button
            onClick={() => openModal(OwnerLoginModal)}
            className="ownerButton hidden lg:flex cursor-pointer text-[14px] px-2 gap-2 font-medium  items-center justify-center w-full max-w-[285px] h-[40px]  bg-(--primary-green)"
          >
            <i className="fa-solid fa-plus text-white"></i>
            <span className="text-white">Ajouter mon logement sur metch</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function HomeSmaller() {
  const { openModal } = useModal();

  return (
    <div
      className="w-full h-[89px] md:hidden sticky top-0 bg-white z-50 flex items-center justify-center"
      style={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="w-full max-w-[1258px] px-4 md:px-2 lg:px-0 mx-auto flex items-center justify-between">
        <div className="brand mx-2 md:mx-0 flex items-center justify-start gap-[15px]">
          <div className="burger ">
            <button className="burger flex items-center justify-center size-[46px] bg-(--primary-green) rounded-full">
              <i className="fa-solid fa-bars text-2xl text-white"></i>
            </button>
          </div>
          <div className="mother hidden sm:flex ">
            <span className="text-(--primary-green) font-extrabold text-[20px]">
              Metch
            </span>
            <span className="font-extrabold text-(--text-color) text-[20px]">
              App
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-[30px]">
          <div
            id="modalSearch"
            className="modalSearch flex pe-8 rounded-4xl items-center bg-(--light-green) justify-start w-fit h-[53px]"
          >
            <button
              onClick={() => openModal(SearchModal)}
              className="w-full h-full px-8 lg:px-15 cursor-pointer flex items-center justify-around"
            >
              <div className="text-[18px]  ">Rechercher maintement</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//header de la notification
 export function Navnotifi(){
    return <div className="w-full h-[89px] sticky top-0 bg-white z-50 flex items-center justify-center" style={{boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.05)"}}>
                <div className="w-full max-w-[1258px] px-4 md:px-2 lg:px-0 mx-auto flex items-center justify-between">
                   <div className="brand mx-2 md:mx-0 flex items-center justify-start gap-[15px]">

                        <div className="burger ">
                            <button className="burger flex items-center justify-center size-[46px] bg-(--primary-green) rounded-full">
                                <i className="fa-solid fa-bars text-2xl text-white"></i>
                            </button>
                        </div>
                        <div className="mother hidden sm:flex ">
                            <span className="text-(--primary-green) font-extrabold text-[20px]">Metch</span>
                            <span className="font-extrabold text-(--text-color) text-[20px]">App</span>
                        </div>
                    
                    </div>
                    <div className="">
                        <button className="burger flex items-center  size-[46px]bg-(--primary-green) rounded ">
                        </button>
                        <span>Megane Tessa</span>

                    </div> 
                </div>
               
            </div>

 }
 /*
                *<div>
                <i class="fa-solid fa-user" style="color: #24b446;"></i>
                <i class="fa-solid fa-heart" style="color: #24b446;"></i>
                <i class="fa-solid fa-user-plus" style="color: #24b446;"></i>
                <i class="fa-solid fa-bell" style="color: #24b446;"></i>
                <i class="fa-solid fa-book" style="color: #24b446;"></i>
                </div>
                **/
export function AuthNavBar() {
    const { user, logout, role } = useAuth(); // Ajout de la méthode logout pour gérer la déconnexion
    const [menuVisible, setMenuVisible] = useState(false); // État pour gérer la visibilité du menu
  
    const toggleMenu = () => {
      setMenuVisible(!menuVisible); // Alterne la visibilité du menu
    };
  
    const handleLogout = () => {
      logout(); // Appelle la méthode de déconnexion
    };
  
    return (
      <div
        className="w-full h-[89px] sticky top-0 bg-white z-50 flex items-center justify-center"
        style={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.05)" }}
      >
        <div className="w-full max-w-[1258px] px-4 md:px-2 mx-auto  flex items-center justify-between">
          <Link to='/home' className="brand mx-2 md:mx-0 flex items-center  justify-start gap-[15px]">
            <div className="burger ">
              <button className="burger flex items-center justify-center size-[46px] bg-(--primary-green) rounded-full">
                <i className="fa-solid fa-bars text-2xl text-white"></i>
              </button>
            </div>
            <div className="mother hidden md:flex ">
              <span className="text-(--primary-green) font-extrabold text-[20px]">
                Metch
              </span>
              <span className="font-extrabold text-(--text-color) text-[20px]">
                App
              </span>
            </div>
          </Link>
          <div className="flex items-center justify-center gap-[30px]">
            <div className="nav flex items-center justify-center gap-8">
              <Link className="n-item font-medium text[14px] text-(--primary-green) relative p-2">
                <i className="fa-solid fa-bell text-[22px]"></i>
                <span className="absolute size-2 rounded-full top-0 right-0 bg-(--primary-green)"></span>
              </Link>
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="flex items-center justify-center gap-3 cursor-pointer"
                >
                  <div className="profile size-[45px] object-cover">
                    <img
                      src={
                        user?.image
                          ? `http://localhost:8000/storage/${user.image}`
                          : "http://localhost:5173/images/team2.jpg"
                      }
                      className="rounded-full w-full h-full"
                      alt="Profile"
                    />
                  </div>
                  <span className="text-(--primary-green) font-medium">
                    {user.name}
                  </span>
                </button>
                {menuVisible && (
                  <div
                    className="absolute right-0 mt-2 w-[200px] bg-white rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out transform opacity-100 scale-100"
                    style={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" }}
                  >
                    <ul className="flex flex-col items-stretch py-4">
                      {role.includes("renter") && (
                        <li>
                          <Link
                            to="/renter/favoris"
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 text-sm"
                            onClick={() => setMenuVisible(false)}
                          >
                            <i className="fa-solid fa-heart text-(--primary-green)"></i>
                            <span>Mes Favoris</span>
                          </Link>
                        </li>
                      )}
                      {role.includes("owner") && (
                        <li>
                          <Link
                            to="/owner/dashboard"
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 text-sm"
                            onClick={() => setMenuVisible(false)}
                          >
                            <i className="fa-solid fa-chart-line text-(--primary-green)"></i>
                            <span>Dashboard</span>
                          </Link>
                        </li>
                      )}
                      <hr className="my-2 border-gray-200" />
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 text-sm"
                        >
                          <i className="fa-solid fa-right-from-bracket text-red-500"></i>
                          <span>Déconnexion</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
