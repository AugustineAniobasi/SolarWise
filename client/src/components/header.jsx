import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "@assets/logo.svg";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { buttonVariants, Button } from "./ui/button";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`wrapper bg-white w-full sticky top-0 z-50 transition-all duration-200 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="flex items-center p-4 space-x-12">
        <img src={logo} alt="Solarwise company logo" className="" />
        <NavigationMenu>
          <NavigationMenuList>
            {[
              { path: "/", label: "Home" },
              { path: "/marketplace", label: "Marketplace" },
              { path: "/assessment", label: "Assessment" },
              // { path: "/products", label: "Products" },
              // { path: "/solar-hub", label: "Solar Hub" },
              { path: "/about-us", label: "About Us" },
            ].map((item) => (
              <NavigationMenuItem key={item.path}>
                <NavigationMenuLink asChild>
                  <NavLink to={item.path}>
                    {({ isActive }) => (
                      <span
                        className={`font-semibold p-2 ${
                          isActive
                            ? "text-primary-500 border-b-2 border-b-primary-500 bg-white"
                            : "text-neutral-900"
                        }`}
                      >
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        {/* Authentication Buttons */}
        <div className="flex gap-2 ml-auto">
          <Button disabled="true" to="/login" variant="ghost">
            Log in
          </Button>
          <Link
            to="/register"
            className={buttonVariants({ variant: "secondary" })}
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
