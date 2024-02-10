import { Link } from "react-router-dom"
// import { HamburgerButton } from "./HamburgerButton";
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { useEffect, useState } from "react"
import { Avatar, Button, Group, Image, Text, Title } from "@mantine/core"
import { FiLogIn } from "react-icons/fi";
import axios from "axios"
import { Router } from "react-router-dom"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true)
        await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/profile`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }).then((res) => {
          setUserData(res)
        }).catch((err) => {
          if (err.status === 401) {
            return <Title order={3} ta={"center"}>You are not logged in.</Title>
          }
          console.error(err)
        })
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, [])
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const { logout } = useLogout()
  const handleLogout = () => {
    logout()
    window.location.reload();
  }
  const { user } = useAuthContext()


  return (
    <>
      <nav className="bg-black/5 border-b border-[var(--mantine-color-dark-6)] backdrop-blur-lg z-[999] fixed text-base w-full">
        <div className="flex flex-wrap items-center justify-between p-4 lg:px-12 px-2 first:mr-auto last:ml-auto">
          <Link to="/" className="flex items-center">
            <Image src={"/logo.png"} className="h-8 w-auto opacity-80"></Image>
          </Link>
          <div className="flex items-center lg:order-2">
            <div className="relative">
              {userData.status === 200 ? (

                <button type="button" className="flex gap-2 items-center justify-center text-md  rounded-full mr-0" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" onClick={toggleDropdown}>
                  {/* <span className="sr-only">Open user menu</span> */}

                  {userData.data.user &&
                    (
                      <>
                        <span className="text-base md:block hidden max-w-[200px] truncate">{userData.data.user.name}</span>
                        <Group>
                          <Avatar>{userData.data.user.name[0].toUpperCase()}</Avatar>
                        </Group>
                      </>
                    )
                  }

                </button>
              ) : (
                <Link to="/login" >
                  <Button size="md" variant="subtle" rightSection={<FiLogIn className="size-4" />} className="flex gap-2 justify-center items-center">
                    <h1 className="-mt-0.5 font-medium">
                      Login
                    </h1>
                  </Button>


                </Link>
              )}
              {(isOpen && user) && (
                <div className="origin-top-right absolute right-0 mt-4 w-48 rounded-md border-b border-[var(--mantine-color-dark-3)] bg-[var(--mantine-color-dark-7)] py-1 backdrop-blur-xl" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                  <Link to="/profile">
                    <span onClick={toggleDropdown} className="block px-4 py-2 text-base " role="menuitem">Your Profile</span>
                  </Link>
                  <Link to="/settings">
                    <span onClick={toggleDropdown} className="block px-4 py-2 text-base " role="menuitem">Settings</span>

                  </Link>

                  <span
                    className="block px-4 py-2 text-base hover:cursor-pointer"
                    role="menuitem"
                    onClick={handleLogout}>
                    Sign out
                  </span>
                </div>
              )}
            </div>

            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-md text-gray-500 rounded-lg lg:hidden focus:outline-none"
              aria-controls="mobile-menu-2"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
              onClick={toggleMobileMenu}>
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6 text-white"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full lg:flex  lg:w-auto lg:order-1 ${isMobileMenuOpen ? "" : "hidden"}`}
            id="mobile-menu-2">
            <ul className="flex text-base flex-col p-4 lg:p-0 mt-4 rounded-lg lg:flex-row lg:gap-12 gap-8 lg:mt-0 lg:border-0 md:">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3  rounded"
                  aria-current="page"
                  onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tasks"
                  className="block py-2 px-3 rounded "
                  onClick={closeMobileMenu}>
                  Tasks
                </Link>
              </li>
              <li>
                <Link
                  to="/create-task"
                  className="block py-2 px-3 rounded "
                  onClick={closeMobileMenu}>
                  Create Task
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/contact-us"
                  className="block py-2 pl-3 pr-4 rounded "
                  onClick={closeMobileMenu}>
                  Contact Us
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
