import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/images/logo-flat.png'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = (
    <div className="hidden md:flex items-center gap-8">
      <NavLink
        to="/donation-requests"
        className="text-gray-700 font-medium hover:text-[#2D9CDB] transition"
      >
        Donation Requests
      </NavLink>

      {user && (
        <NavLink
          to="/funding"
          className="text-gray-700 font-medium hover:text-[#2D9CDB] transition"
        >
          Funding
        </NavLink>
      )}
    </div>
  )

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4">
        <Container>
          <div className="flex items-center justify-between">

            {/* Left: Logo */}
            <Link to="/">
              <img src={logo} alt="logo" width="110" />
            </Link>

            {/* Middle: NavLinks */}
            {navLinks}

            {/* Right: User Menu */}
            <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 md:p-2 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
              >
                <AiOutlineMenu />
                <img
                  className="rounded-full hidden md:block"
                  referrerPolicy="no-referrer"
                  src={user?.photoURL ?? avatarImg}
                  alt="profile"
                  height="32"
                  width="32"
                />
              </div>

              {/* Dropdown */}
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[60vw] md:w-[12vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">

                    {/* Mobile NavLinks */}
                    <NavLink
                      to="/donation-requests"
                      className="md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Donation Requests
                    </NavLink>

                    {user && (
                      <NavLink
                        to="/funding"
                        className="md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                      >
                        Funding
                      </NavLink>
                    )}

                    {/* Login / Dashboard / Logout */}
                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
