"use client";
import React, { useState, useEffect } from "react";
import { BookOpen, Menu, X } from "lucide-react";

interface HeaderProps {
  scrollToReservation: () => void;
}

interface NavLink {
  id: string;
  label: string;
}

const navLinks: NavLink[] = [
  { id: "features", label: "Fonctionnalités" },
  { id: "suggestions", label: "Vos suggestions" },
  { id: "about", label: "À propos" },
];

const Header: React.FC<HeaderProps> = ({ scrollToReservation }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 31,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("features");

  useEffect(() => {
    // Date fixe : 20 jours à partir du 21 septembre 2025
    const targetDate = new Date("2025-10-22T23:59:59");

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
        // Si la date est dépassée, afficher 0
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
                TinyLMS arrive bientôt !
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
              onClick={scrollToReservation}
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
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  TinyLMS
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setActiveTab(link.id)}
                  className={`transition-colors ${
                    activeTab === link.id
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={scrollToReservation}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
              >
                Réserver maintenant
              </button>
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
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setActiveTab(link.id)}
                    className={`transition-colors ${
                      activeTab === link.id
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={scrollToReservation}
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
