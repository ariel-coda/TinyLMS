"use client";
import React, { useState, useEffect } from "react";
import { BookOpen, Bird, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface HeaderProps {
  scrollToReservation?: () => void;
}

interface NavLink {
  id: string;
  label: string;
  href: string;
  type: "route" | "scroll";
}

const navLinks: NavLink[] = [
  { id: "solution", label: "Notre solution", href: "/", type: "route" },
  { id: "about", label: "À propos de nous", href: "/about", type: "route" },
];

const Header: React.FC<HeaderProps> = ({ scrollToReservation }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 31,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Fonction pour gérer la navigation
  const handleNavClick = (link: NavLink, e: React.MouseEvent) => {
    if (link.type === "scroll") {
      // Pour les liens de scroll sur la même page
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(link.id);
        element?.scrollIntoView({ behavior: "smooth" });
      } else {
        // Si on n'est pas sur la page d'accueil, y aller d'abord
        router.push(`/${link.href}`);
      }
    }
    // Pour les routes, Next.js Link s'en occupe automatiquement
    setMobileMenuOpen(false);
  };

  // Déterminer l'onglet actif
  const getActiveTab = () => {
    if (pathname === "/") return "solution";
    if (pathname === "/about") return "about";
    return "";
  };

  useEffect(() => {
    // Date fixe : 31 jours à partir du 25 septembre 2025
    const targetDate = new Date("2025-10-23T23:59:59");

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="max-md:hidden font-semibold">
                🚀 tinyLMS arrive bientôt !
              </span>
              <div className="sm:flex sm:items-center space-x-2 text-sm">
                <span>Lancement dans :</span>
                <div className="flex space-x-1">
                  <span className="bg-white/20 px-2 py-1 rounded text-xs font-mono">
                    {timeLeft.days}j
                  </span>
                  <span className="bg-white/20 px-2 py-1 rounded text-xs font-mono">
                    {timeLeft.hours}h
                  </span>
                  <span className="bg-white/20 px-2 py-1 rounded text-xs font-mono">
                    {timeLeft.minutes}m
                  </span>
                  <span className="bg-white/20 px-2 py-1 rounded text-xs font-mono">
                    {timeLeft.seconds}s
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                if (pathname !== "/") {
                  router.push("/#reservation");
                } else if (scrollToReservation) {
                  scrollToReservation();
                }
              }}
              className="bg-white text-purple-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Être averti
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <Bird className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-blue-600">
                    tinyLMS
                  </h1>
                </Link>
              </div>
            </div>
            <div className="flex space-x-8 items-center">
              {/* Desktop Menu */}
              <nav className="hidden lg:flex space-x-8">
                {navLinks.map((link) => (
                  <div key={link.id}>
                    {link.type === "route" ? (
                      <Link
                        href={link.href}
                        className={`transition-colors ${
                          getActiveTab() === link.id
                            ? "text-blue-600 font-medium"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={(e) => handleNavClick(link, e)}
                        className={`transition-colors ${
                          getActiveTab() === link.id
                            ? "text-blue-600 font-medium"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {link.label}
                      </button>
                    )}
                  </div>
                ))}
              </nav>

              {/* CTA Button */}
              <div className="hidden lg:flex items-center">
                <button
                  onClick={() => {
                    if (pathname !== "/") {
                      router.push("/#reservation");
                    } else if (scrollToReservation) {
                      scrollToReservation();
                    }
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
                >
                  Réserver maintenant
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <div key={link.id}>
                    {link.type === "route" ? (
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block transition-colors ${
                          getActiveTab() === link.id
                            ? "text-blue-600 font-medium"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={(e) => handleNavClick(link, e)}
                        className={`block text-left transition-colors ${
                          getActiveTab() === link.id
                            ? "text-blue-600 font-medium"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {link.label}
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => {
                    if (pathname !== "/") {
                      router.push("/#reservation");
                    } else if (scrollToReservation) {
                      scrollToReservation();
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium w-full text-center"
                >
                  Réserver maintenant
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
