"use client";
import React from "react";
import Header from "../components/ui/header";
import WhatsAppButton from "../components/ui/whatsapp-button";
import Footer from "../components/ui/footer";
import { SpeedInsights } from "@vercel/speed-insights/next"
import {
  BookOpen,
  Heart,
  Target,
  Users,
  Code,
  Lightbulb,
  MapPin,
  Mail,
  Phone,
  Coffee,
  ArrowLeft,
  Rocket,
  Building,
} from "lucide-react";
import Link from "next/link";

const scrollToReservation = () => {
  document
    .getElementById("reservation")
    ?.scrollIntoView({ behavior: "smooth" });
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
    <SpeedInsights/>
      <Header scrollToReservation={scrollToReservation} />
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            À propos de tinyLMS
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Une solution pensée pour simplifier la gestion des écoles et
            améliorer l’expérience d’apprentissage au Cameroun.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Notre Histoire
            </h2>

            <div className="bg-blue-50 rounded-2xl p-8 mb-12">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 rounded-full p-3 flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Le déclic
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    En travaillant pour plusieurs centres de formation à
                    Yaoundé, nous avons identifié un même constat : une gestion
                    chronophage, des enseignants surchargés par l’administratif,
                    et un suivi étudiant limité. Résultat, moins de temps pour
                    enseigner et plus de difficultés à offrir une expérience
                    d’apprentissage fluide.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8 px-10">
              C’est ainsi qu’est né tinyLMS : une plateforme pensée pour être
              simple, accessible et réellement utilisable au quotidien par les
              écoles et centres de formation. Notre objectif : offrir uniquement
              les fonctionnalités essentielles, parfaitement adaptées, sans
              complexité inutile.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8 px-10">
              C'est là que l'idée de <strong>tinyLMS</strong> a germé. Pourquoi
              "tiny" ? Parce que nous voulons rester simples, accessibles, et
              proches de nos utilisateurs. Pas de fioritures inutiles, juste
              l'essentiel pour un meilleur rendu.
            </p>
          </div>
        </div>
      </section>

      {/* Current Status */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Où en sommes-nous aujourd'hui ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 rounded-full p-3 mr-4">
                  <Rocket className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Phase de conception
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Nous sommes en phase de recherche et développement, en
                co-construction avec des directeurs et enseignants. Chaque
                fonctionnalité est validée par des retours terrain, afin de
                garantir un outil réellement utile et immédiatement exploitable.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Écoute active
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Nous échangeons directement avec les acteurs de l’éducation
                camerounaise pour comprendre leurs défis opérationnels (gestion,
                suivi, communication et mauvaise gestion de temps entre la
                pratique et la théorie) et adapter la solution à leurs
                contraintes réelles.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Développement agile
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Nous adoptons une approche agile, privilégiant la livraison
                rapide de fonctionnalités simples, robustes et immédiatement
                opérationnelles, plutôt qu’un produit lourd et difficile à
                déployer.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <Building className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Partenariats locaux
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Nous collaborons avec des établissements pilotes pour tester,
                affiner et valider chaque fonctionnalité avant le déploiement
                officiel, garantissant ainsi un produit fiable et aligné sur les
                besoins réels du terrain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Notre Mission
            </h2>
            <p className="text-[18px] max-md:text-[16px] text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Démocratiser l'accès aux outils de gestion pédagogique pour tous
              les centres de formation camerounais, quelle que soit leur taille.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Simplicité
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Des outils intuitifs, utilisables immédiatement sans compétences
                techniques ni formations coûteuses.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Efficacité
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Automatisation des tâches administratives pour réduire la charge
                de travail et permettre aux équipes de se concentrer sur la
                pédagogie.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Accessibilité
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Une tarification équitable et adaptée au contexte local, pour
                que même les plus petites structures puissent bénéficier
                d’outils modernes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            L'Équipe (pour l'instant !)
          </h2>

          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">👨‍💻</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              BANAKEN Ariel
            </h3>
            <p className="text-gray-600 mb-6">
              Développeur web et mobile intermédiaire
            </p>
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Aujourd’hui, tinyLMS repose sur une vision portée par un
              développeur passionné par l’éducation et basé à Yaoundé. Le projet
              est conçu pour évoluer rapidement et s’entourer de talents
              complémentaires à mesure qu’il se développe.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            En toute transparence
          </h2>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-8 rounded-r-2xl">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Coffee className="w-6 h-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">
                  Notre réalité
                </h3>
                <div className="text-amber-700 space-y-3 leading-relaxed">
                  <p>
                    • <strong>Un projet en pleine croissance</strong> : tinyLMS
                    est conçu pour évoluer rapidement, en intégrant les besoins
                    réels des établissements de formation.
                  </p>
                  <p>
                    • <strong>Structure agile</strong> : nous opérons avec une
                    équipe compacte, assurant flexibilité et réactivité.
                  </p>
                  <p>
                    • <strong>Approche pragmatique</strong> : nous concentrons
                    nos efforts sur la valeur ajoutée réelle, pas sur des
                    dépenses marketing excessives.
                  </p>
                  <p>
                    • <strong>Livraison concrète</strong> : nous privilégions la
                    qualité et la pertinence à la promesse vide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-green-50 border-l-4 border-green-400 p-8 rounded-r-2xl">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Ce que nous apportons
                </h3>
                <div className="text-green-700 space-y-3 leading-relaxed">
                  <p>
                    • <strong>Une expertise terrain</strong> : nous comprenons
                    les enjeux concrets des établissements et adaptons nos
                    solutions en conséquence.
                  </p>
                  <p>
                    • <strong>Agilité opérationnelle</strong> : capacité à
                    évoluer rapidement pour répondre aux besoins spécifiques.
                  </p>
                  <p>
                    • <strong>Proximité relationnelle</strong> : un contact
                    direct et transparent avec nos clients.
                  </p>
                  <p>
                    • <strong>Passion pédagogique</strong> : une volonté forte
                    de contribuer à l’amélioration continue de l’éducation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Contactez-nous
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-white rounded-2xl border border-gray-200">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">contact@tinyLMS.com</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl border border-gray-200">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Téléphone</h3>
              <p className="text-gray-600">+237 653 189 528</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl border border-gray-200">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Localisation</h3>
              <p className="text-gray-600">Yaoundé, Cameroun</p>
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4 bg-blue-text">
              Discutons de vos besoins
            </h3>
            <p className="text-blue-100 mb-8 leading-relaxed bg-blue-text">
              Que vous soyez directeur d'établissement, responsable pédagogique
              ou partenaire potentiel, nous sommes à votre disposition pour
              échanger sur vos projets et démontrer comment tinyLMS peut
              optimiser vos processus éducatifs.
            </p>
            <a href="https://wa.me/237653189528?text=Bonjour%20je%20voudrais%20en%20savoir%20plus%20sur%20tinyLMS%20" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Contactez nous
            </a>
          </div>
        </div>
      </section>
    {/* Whatsapp icons */}
      <WhatsAppButton />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
