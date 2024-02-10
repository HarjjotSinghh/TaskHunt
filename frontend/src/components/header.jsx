import { Link } from "react-router-dom"
// import { HamburgerButton } from "./HamburgerButton";
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"
import { Avatar, Button, Group, Image, Text } from "@mantine/core"
import { FiLogIn } from "react-icons/fi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

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
  }
  const { user } = useAuthContext()

  return (
    <>
      <nav className="bg-black/5 border-b border-black/50 backdrop-blur-lg z-[999] fixed text-base w-full">
        <div className="flex flex-wrap items-center justify-between p-4 lg:px-12 px-2 first:mr-auto last:ml-auto">
          <Link to="/" className="flex items-center">
            <Image src={"/logo.png"} className="h-8 w-auto opacity-85"></Image>
          </Link>
          <div className="flex items-center lg:order-2">
            <div className="relative">
              {user ? (
                <button type="button" className="flex lg:pl-16 pl-0 lg:mr-3 items-center justify-center text-sm  rounded-full mr-0" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" onClick={toggleDropdown}>
                  <span className="sr-only">Open user menu</span>
                  <Group>
                    <Avatar>Z</Avatar>
                  </Group>
                  {user &&
                    (
                      <span className="pt-1 text-[18px]">{user.name}</span>
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
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md border-b border-gray-500 py-1 ring-1backdrop-blur-lg" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                  <Link to="/profile">
                    <span className="block px-4 py-2 text-sm " role="menuitem">Your Profile</span>
                  </Link>
                  <Link to="/settings">
                    <span className="block px-4 py-2 text-sm " role="menuitem">Settings</span>

                  </Link>

                  <span
                    className="block px-4 py-2 text-sm hover:cursor-pointer"
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
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden focus:outline-none"
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
            <ul className="flex flex-col p-4 lg:p-0 mt-4 rounded-lg lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 md:">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4  rounded"
                  aria-current="page"
                  onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tasks"
                  className="block py-2 pl-3 pr-4 rounded "
                  onClick={closeMobileMenu}>
                  Tasks
                </Link>
              </li>
              <li>
                <Link
                  to="/create-task"
                  className="block py-2 pl-3 pr-4 rounded "
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
