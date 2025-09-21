"use client";
import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  BarChart3,
  Zap,
  Clock,
  CheckCircle,
  Star,
  Menu,
  X,
  ArrowRight,
  Monitor,
  Target,
  TrendingUp,
} from "lucide-react";

const TinyLMSLanding = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 22,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

useEffect(() => {
    // Date fixe : 20 jours à partir du 21 septembre 2025
    const targetDate = new Date('2025-10-13T23:59:59');

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        // Si la date est dépassée, afficher 0
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToReservation = () => {
    document
      .getElementById("reservation")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Centralisation pédagogique",
      description:
        "Gérez l'intégralité de vos programmes éducatifs depuis une interface unique. Organisez vos cours par filières, créez des modules interactifs, et structurez vos exercices avec une hiérarchie claire. Fini les documents éparpillés et les outils multiples - tout votre contenu pédagogique est centralisé pour une efficacité maximale.",
      color: "bg-blue-500",
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "E-learning simplifié",
      description:
        "Offrez à vos étudiants une expérience d'apprentissage moderne avec des cours accessibles 24h/24. Créez des parcours personnalisés, intégrez du contenu multimédia, et proposez des évaluations interactives. Vos apprenants progressent à leur rythme tout en bénéficiant d'un suivi personnalisé.",
      color: "bg-green-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Automatisation intelligente",
      description:
        "Libérez-vous des tâches répétitives grâce à notre système d'automatisation avancé. Notifications automatiques de cours, rappels personnalisés aux étudiants, génération de rapports de performance, et alertes de suivi - laissez TinyLMS gérer les détails pendant que vous vous concentrez sur l'enseignement.",
      color: "bg-purple-500",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Suivi et analytics avancés",
      description:
        "Analysez les performances de vos étudiants avec des tableaux de bord intuitifs. Suivez les progrès individuels et collectifs, identifiez les points d'amélioration, et générez des rapports détaillés en un clic. Prenez des décisions éclairées grâce à des données précises et visuelles.",
      color: "bg-orange-500",
    },
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Directrice pédagogique",
      school: "École Supérieure de Commerce",
      content:
        "TinyLMS a révolutionné notre approche pédagogique. Nos étudiants sont plus engagés et nos équipes plus efficaces.",
      rating: 5,
    },
    {
      name: "Pierre Martin",
      role: "Responsable formation",
      school: "Institut Technique Avancé",
      content:
        "L'automatisation des tâches nous fait gagner 10 heures par semaine. Un outil indispensable pour toute institution moderne.",
      rating: 5,
    },
    {
      name: "Sophie Laurent",
      role: "Coordinatrice académique",
      school: "Centre de Formation Continue",
      content:
        "Interface intuitive, support réactif, résultats mesurables. TinyLMS dépasse toutes nos attentes.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="font-semibold">🎉 TinyLMS arrive bientôt !</span>
              <div className="hidden sm:flex sm:items-center space-x-2 text-sm">
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
            <nav className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Fonctionnalités
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Témoignages
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                À propos
              </a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={scrollToReservation}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
              >
                Réserver maintenant
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
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
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Fonctionnalités
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Témoignages
                </a>
                <a href="#about" className="text-gray-600 hover:text-gray-900">
                  À propos
                </a>
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

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-60"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-100 rounded-full opacity-40"></div>
        <div className="absolute top-40 right-1/3 w-24 h-24 bg-green-100 rounded-full opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="text-center lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                La plateforme qui fait
                <span className="block text-blue-600">gagner du temps</span>
                <span className="block">à votre école</span>
              </h1>
              <p className="mt-8 text-[18px] max-md:text-[16px] text-gray-600 leading-relaxed">
                TinyLMS révolutionne la gestion pédagogique des écoles de
                formation. Centralisez vos cours, automatisez vos tâches, et
                offrez une expérience d'apprentissage moderne à vos étudiants.
                Simplicité, efficacité et performance au service de l'excellence
                éducative.
              </p>
              <div className="mt-10 text-center lg:text-left">
                <button
                  onClick={scrollToReservation}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto lg:mx-0"
                >
                  <span>Démarrer maintenant</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="mt-16 lg:mt-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full lg:max-w-md">
                {/* Desktop: Image qui dépasse à gauche */}
                <div className="hidden lg:block relative bg-yellow-400 rounded-2xl">
                  <div className="relative">
                    <img
                      src="/classroom.png"
                      alt="school manager"
                      className="w-[500px] h-[300px] object-cover rounded-2xl"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-orange-500 rounded-full p-3">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-green-500 rounded-full p-3">
                    <Users className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Pourquoi choisir TinyLMS ?
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Une solution complète pensée pour les besoins spécifiques des
              écoles de formation modernes
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border border-gray-100"
              >
                <div className="flex items-start space-x-6">
                  <div className={`${feature.color} text-white p-3 rounded-xl`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="reservation" className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold bg-blue-title sm:text-4xl mb-6">
            Réservez votre place maintenant
          </h2>
          <p className="text-lg text-blue-100 max-w-3xl bg-blue-text mx-auto mb-12 leading-relaxed">
            Rejoignez les institutions qui ont déjà fait le choix de
            l'excellence pédagogique. Optimisez la gestion de votre école et
            offrez une expérience d'apprentissage exceptionnelle à vos
            étudiants.
          </p>

          <div className="bg-white rounded-2xl p-8 max-w-md mx-auto">
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Votre nom complet"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Nom de votre institution"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Votre email professionnel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Votre téléphone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Taille de votre établissement</option>
                  <option>Moins de 100 étudiants</option>
                  <option>100 - 500 étudiants</option>
                  <option>500 - 1000 étudiants</option>
                  <option>Plus de 1000 étudiants</option>
                </select>
              </div>
              <button
                onClick={() =>
                  alert(
                    "Merci ! Nous vous contacterons sous 24h pour programmer votre démonstration personnalisée."
                  )
                }
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Réserver ma démonstration gratuite
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-6 leading-relaxed">
              Démonstration personnalisée • Sans engagement • Support inclus
            </p>
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section id="why-now" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Pourquoi digitaliser maintenant ?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Le secteur éducatif camerounais connaît une transformation
              digitale accélérée. Les établissements qui s'adaptent maintenant
              prennent une longueur d'avance décisive.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="text-center p-8 bg-white rounded-2xl border border-gray-200">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">+340%</h3>
              <p className="text-gray-600 leading-relaxed">
                Croissance de l'e-learning en Afrique subsaharienne depuis 2020.
                Les étudiants camerounais adoptent massivement l'apprentissage
                digital.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl border border-gray-200">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                15h/semaine
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Temps administratif économisé par semaine grâce à
                l'automatisation. Plus de temps pour se concentrer sur la
                qualité pédagogique.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl border border-gray-200">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">83%</h3>
              <p className="text-gray-600 leading-relaxed">
                Des employeurs camerounais préfèrent recruter des diplômés
                formés avec des outils numériques modernes.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-blue-50 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                L'avenir appartient aux établissements connectés
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                À Yaoundé et dans tout le Cameroun, les institutions qui
                investissent dans la digitalisation aujourd'hui deviennent les
                références de demain. Ne laissez pas vos concurrents prendre
                l'avance dans cette révolution éducative.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Suggestions Box Section */}
      <section id="suggestions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Aidez-nous à construire votre LMS idéal
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Vos besoins guident notre développement. Partagez vos suggestions
              de fonctionnalités et participez à la création de TinyLMS.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de votre établissement
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: École Supérieure de Commerce de Yaoundé"
                    className="w-full bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Votre rôle
                  </label>
                  <select className="bg-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Sélectionnez votre fonction</option>
                    <option>Directeur/Directrice</option>
                    <option>Responsable pédagogique</option>
                    <option>Coordinateur académique</option>
                    <option>Enseignant</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quelle fonctionnalité vous manque le plus ?
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Décrivez la fonctionnalité qui faciliterait le plus votre travail quotidien..."
                    className="bg-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priorité de cette fonctionnalité
                  </label>
                  <div className="flex space-x-4">
                    {["Faible", "Moyenne", "Élevée", "Critique"].map(
                      (priority) => (
                        <label key={priority} className="flex items-center">
                          <input
                            type="radio"
                            name="priority"
                            className="bg-white w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {priority}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <button
                  onClick={() =>
                    alert(
                      "Merci pour votre suggestion ! Nous l'étudierons attentivement pour l'intégrer dans TinyLMS."
                    )
                  }
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Envoyer ma suggestion
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 leading-relaxed">
                  💡 <strong>Participez activement !</strong> Les meilleures
                  suggestions seront intégrées en priorité et leurs auteurs
                  bénéficieront d'un accès gratuit de 60 jours à TinyLMS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">TinyLMS</span>
              </div>
              <p className="bg-blue-text mb-8 leading-relaxed">
                La plateforme d'apprentissage nouvelle génération pour les
                écoles de formation modernes.
              </p>
              <button
                onClick={scrollToReservation}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Commencer maintenant
              </button>
            </div>

            <div>
              <h3 className="font-semibold bg-blue-title mb-6">Contact</h3>
              <div className="space-y-3 bg-blue-text leading-relaxed">
                <div>Email : tinylms@gmail.com</div>
                <div>Téléphone : +237 653 189 528</div>
                <div>Adresse : Yaoundé, Cameroun</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-12 text-center">
            <p className="bg-blue-text leading-relaxed">
              © 2025 TinyLMS. Tous droits réservés. Révolutionnez votre approche
              pédagogique.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TinyLMSLanding;
