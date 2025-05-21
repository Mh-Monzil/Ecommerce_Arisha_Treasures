"use client";

import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";

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
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
        <div className="flex items-center gap-4">
          <Link href="#">
            <ShoppingCart className="h-6 w-6" />
          </Link>
          <Link href="#">
            <User className="h-6 w-6" />
          </Link>

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
                <nav className="flex flex-col gap-6 mt-10">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="font-medium text-gray-800 relative group"
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
