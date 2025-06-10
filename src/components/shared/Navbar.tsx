"use client";

import { Button } from "@/components/ui/button";
import { LogOut, Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setUser } from "@/features/authSlice";
import { removeToken } from "@/hooks/auth";
import { useCart } from "../cart/CartProvider";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const { items, setIsCartOpen } = useCart();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  if (
    user?.role === "admin" &&
    !navLinks.some(
      (link) => link.name === "Dashboard" && link.href === "/dashboard"
    )
  ) {
    navLinks.push({
      name: "Dashboard",
      href: "/dashboard",
    });
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 0;

      if (window.scrollY > scrollThreshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        isScrolled ? " sticky top-0 z-50" : ""
      } mx-auto px-3 w-full bg-rose-900 text-white
      `}
    >
      <div
        className={`max-w-[95vw] md:max-w-[1440px] mx-auto flex h-16 items-center justify-between `}
      >
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center font-bold text-[27px]">
            Arisha&#39;s Treasure
          </Link>
          {/* desktop nav */}
          <nav className="hidden lg:flex gap-8 text-base items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber duration-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <span
            onClick={() => {
              setIsCartOpen(true);
            }}
            className="relative cursor-pointer border-2 p-1.5 rounded-lg"
          >
            <ShoppingCart className="h-6 w-6" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 text-sm bg-white text-rose-900 rounded-full px-2 py-0.5">
                {items.length}
              </span>
            )}
          </span>
          {user ? (
            <span
              onClick={() => {
                dispatch(setUser(null));
                removeToken();
              }}
              className="cursor-pointer border-2 p-1.5 rounded-lg"
            >
              <LogOut className="h-6 w-6" />
            </span>
          ) : (
            <Link
              href="/login"
              className="cursor-pointer border-2 p-1.5 rounded-lg"
            >
              <User className="h-6 w-6" />
            </Link>
          )}

          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full cursor-pointer"
                >
                  <Menu className="h-6 w-6 text-black" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-white p-6">
                <SheetTitle className="text-2xl">
                  Arisha&#39;s Treasure
                </SheetTitle>
                <nav className="flex flex-col gap-4 mt-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="font-medium text-gray-800 relative group border-b p-2 rounded-md"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber duration-500 transition-all group-hover:w-full"></span>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
