"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Zap, ZapOff, Wrench } from "lucide-react";

function subscribeMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("motion-toggle", callback);
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("motion-toggle", callback);
    mediaQuery.removeEventListener("change", callback);
  };
}

function getMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  const localSetting = localStorage.getItem("reduced-motion");
  if (localSetting !== null) return localSetting === "true";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getMotionServerSnapshot(): boolean {
  return false;
}

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isMotionDisabled = useSyncExternalStore(
    subscribeMotion,
    getMotionSnapshot,
    getMotionServerSnapshot,
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMotionDisabled) {
      document.documentElement.classList.add("reduced-motion");
    } else {
      document.documentElement.classList.remove("reduced-motion");
    }
  }, [isMotionDisabled]);

  const toggleMotion = () => {
    const nextState = !isMotionDisabled;
    localStorage.setItem("reduced-motion", String(nextState));
    if (nextState) {
      document.documentElement.classList.add("reduced-motion");
    } else {
      document.documentElement.classList.remove("reduced-motion");
    }
    // Dispatch custom event to notify ThreeJS/animation components
    window.dispatchEvent(
      new CustomEvent("motion-toggle", { detail: { disabled: nextState } }),
    );
  };

  const isVaultVossRoute = pathname.startsWith("/apps/vaultvoss");
  const isLabRoute = pathname.startsWith("/troubleshooting-lab");

  const navItems = isVaultVossRoute
    ? [
        { name: "App Home", href: "/apps/vaultvoss" },
        { name: "Privacy Policy", href: "/apps/vaultvoss/privacy" },
        { name: "Terms of Service", href: "/apps/vaultvoss/terms" },
        { name: "Developer Portfolio", href: "/" },
      ]
    : [
        { name: "About", href: "/#about" },
        { name: "Skills", href: "/#skills" },
        { name: "Projects", href: "/#projects" },
        { name: "Experience", href: "/#experience" },
        { name: "Troubleshooting Lab", href: "/troubleshooting-lab" },
        { name: "Contact", href: "/#contact" },
        { name: "VaultVoss App", href: "/apps/vaultvoss" },
      ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setIsOpen(false);

    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(href);
      }
    } else if (href.startsWith("#")) {
      const targetId = href.replace("#", "");
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl rounded-full transition-all duration-300 ${
        scrolled ? "glass shadow-lg py-2.5 px-6" : "bg-transparent py-4 px-6"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden rounded-full border border-white/5 group-hover:border-indigo-500/30 transition-colors duration-300">
            <Image
              src="/images/logo.png"
              alt="Matthias Amire Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-semibold text-white tracking-wide group-hover:text-indigo-400 transition-colors duration-300 hidden sm:inline-block">
            Matthias Amire
          </span>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3">
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5">
            {navItems.map((item) => {
              const isExternal =
                item.href.startsWith("http") ||
                item.href.startsWith("/apps/vaultvoss") ||
                (isVaultVossRoute && item.href === "/");
              const isLabItem = item.href === "/troubleshooting-lab";
              const isCurrentActive = isLabItem ? isLabRoute : false;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  target={
                    item.href === "/apps/vaultvoss" ? "_blank" : undefined
                  }
                  onClick={(e) =>
                    !isExternal && !isLabItem
                      ? handleLinkClick(e, item.href)
                      : undefined
                  }
                  className={`relative px-2.5 py-1 text-xs xl:text-sm font-medium tracking-wide transition-colors duration-300 hover:text-white flex items-center gap-1 ${
                    isCurrentActive
                      ? "text-indigo-400 font-semibold"
                      : isLabItem
                        ? "text-indigo-300 hover:text-white"
                        : "text-slate-400"
                  }`}
                >
                  {isLabItem && (
                    <Wrench className="w-3.5 h-3.5 text-indigo-400" />
                  )}
                  <span>{item.name}</span>
                  {isExternal && item.href !== "/" && (
                    <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                  )}
                  {isCurrentActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Accessibility Motion Control Toggle */}
          <button
            onClick={toggleMotion}
            className="p-2 rounded-full hover:bg-slate-900/60 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer focus-visible:outline-none"
            title={isMotionDisabled ? "Enable Animations" : "Reduce Motion"}
            aria-label={
              isMotionDisabled ? "Enable Animations" : "Reduce Motion"
            }
          >
            {isMotionDisabled ? (
              <ZapOff className="w-4 h-4 text-indigo-400" />
            ) : (
              <Zap className="w-4 h-4 text-emerald-400" />
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 p-6 bg-[#0E1322]/98 border border-white/10 backdrop-blur-lg rounded-2xl shadow-xl flex flex-col gap-2 lg:hidden"
          >
            {navItems.map((item, index) => {
              const isExternal =
                item.href.startsWith("http") ||
                item.href.startsWith("/apps/vaultvoss") ||
                (isVaultVossRoute && item.href === "/");
              const isLabItem = item.href === "/troubleshooting-lab";

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (!isExternal && !isLabItem) {
                      handleLinkClick(e, item.href);
                    } else {
                      setIsOpen(false);
                    }
                  }}
                  className={`text-slate-300 hover:text-white text-base font-semibold py-2.5 transition-colors flex items-center justify-between focus-visible:outline-none ${
                    index !== navItems.length - 1
                      ? "border-b border-white/5"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isLabItem && (
                      <Wrench className="w-4 h-4 text-indigo-400" />
                    )}
                    <span>{item.name}</span>
                  </div>
                  {isExternal && item.href !== "/" && (
                    <ArrowUpRight className="w-4 h-4 text-slate-500" />
                  )}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
