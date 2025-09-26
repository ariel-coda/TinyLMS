"use client";
import React from "react";
import { BookOpen } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface FooterProps {
  scrollToReservation?: () => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToReservation }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleCTAClick = () => {
    if (pathname !== '/') {
      // Si on n'est pas sur la page d'accueil, y aller d'abord
      router.push('/#reservation');
    } else if (scrollToReservation) {
      // Si on est sur la page d'accueil, utiliser la fonction de scroll
      scrollToReservation();
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-md:text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center max-md:justify-center mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">tinyLMS</span>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed bg-blue-text">
              La plateforme d'apprentissage nouvelle génération pour les
              écoles de formation modernes.
            </p>
            <button
              onClick={handleCTAClick}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Commencer maintenant
            </button>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 bg-blue-title text-xl">Contact</h3>
            <div className="space-y-3 text-gray-300 leading-relaxed bg-blue-text text-md">
              <div>Email : tinyLMS@gmail.com</div>
              <div>Téléphone : +237 653 189 528</div>
              <div>Adresse : Yaoundé, Cameroun</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-12 text-center">
          <p className="text-gray-300 leading-relaxed bg-blue-text text-md">
            © 2025 tinyLMS. Tous droits réservés. Révolutionnez votre approche
            pédagogique.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;