"use client";
import React, { useState } from "react";
import { supabase } from "./lib/supabaseConfig";
import AlertPopup from "./components/ui/alertPopup";
import Header from "./components/ui/header";
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
  const [formData, setFormData] = useState({
    name: "",
    school_name: "",
    school_post: "",
    email: "",
    phone: "",
    school_size: "",
  });

  const [suggestionData, setSuggestionData] = useState({
    school_name: "",
    role: "",
    feature: "",
    priority: "",
  });

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
        "Libérez-vous des tâches répétitives grâce à notre système d'automatisation avancé. Notifications automatiques de cours, rappels personnalisés aux étudiants, génération de rapports de performance, et alertes de suivi - laissez tinyLMS gérer les détails pendant que vous vous concentrez sur l'enseignement.",
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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<String>("");
  const [alert, setAlert] = useState<{
    type: "error" | "success" | "info" | "warning";
    title: string;
    description?: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeSuggestion = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setSuggestionData({ ...suggestionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Regex pour validations
    const phoneRegex = /^\+2376\d{8}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-ZÀ-ÿ]+([ '\-][a-zA-ZÀ-ÿ]+)*$/;
    const schoolNameRegex = /^[a-zA-ZÀ-ÿ0-9\s\-.']{2,100}$/;
    const postRegex = /^[a-zA-ZÀ-ÿ\s\-']{2,100}$/;

    // 1. Validation côté client
    const validateForm = () => {
      const errors = [];

      // Vérifier que tous les champs requis sont remplis
      if (!formData.name.trim() || !nameRegex.test(formData.name.trim())) {
        errors.push(
          "Le nom est requis et doit contenir au moins 02 caractères."
        );
      }
      if (
        !formData.school_name.trim() ||
        !schoolNameRegex.test(formData.school_name.trim())
      ) {
        errors.push(
          "Le nom de l'institution est requis et doit contenir au moins 05 caractères"
        );
      }
      if (!formData.email.trim()) {
        errors.push("L'adresse email est requise");
      } else if (!emailRegex.test(formData.email.trim())) {
        // Validation du format email SEULEMENT si le champ est rempli
        errors.push("Format d'email invalide");
      }
      if (
        !formData.school_post.trim() ||
        !postRegex.test(formData.school_post.trim())
      ) {
        errors.push(
          `Le poste que vous effectuez au sein de ${formData.school_name} est requis et doit comprendre entre 02 et 25 caractères espaces y compis.`
        );
      }
      if (!formData.school_size.trim()) {
        errors.push("La taille de l'établissement est requise");
      }

      // Validation du numéro de téléphone
      if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
        errors.push(
          "Numéro de téléphone invalide. Veuillez entrer un numéro de téléphone camerounais ex:+2376XXXXXXXX"
        );
      }

      return {
        isValid: errors.length === 0,
        errors: errors,
      };
    };

    const validation = validateForm();

    // Si validation échoue, afficher les erreurs
    if (!validation.isValid) {
      setAlert({
        type: "error",
        title: "Erreur de validation",
        description: validation.errors[0], // Affiche la première erreur
      });
      setLoading(false);
      return;
    }

    try {
      // 2. Vérification des doublons en base de données
      const { data: existingRecords, error: checkError } = await supabase
        .from("liste_attente")
        .select("email, phone, school_name")
        .or(
          `email.eq.${formData.email},phone.eq.${formData.phone.replace(
            /\s+/g,
            ""
          )},school_name.eq.${formData.school_name}`
        );

      if (checkError) {
        console.error("Erreur lors de la vérification:", checkError);
        setAlert({
          type: "error",
          title: "Erreur de connexion",
          description: "Erreur lors de la vérification des données.",
        });
        setLoading(false);
        return;
      }

      // Vérifier s'il y a des doublons
      if (existingRecords && existingRecords.length > 0) {
        const duplicate = existingRecords[0];
        let duplicateMessage = "";

        if (duplicate.email === formData.email) {
          duplicateMessage = "Cette adresse email est déjà enregistrée.";
        } else if (duplicate.phone === formData.phone.replace(/\s+/g, "")) {
          duplicateMessage = "Ce numéro de téléphone est déjà enregistré.";
        } else if (duplicate.school_name === formData.school_name) {
          duplicateMessage = "Cette institution est déjà enregistrée.";
        }

        setAlert({
          type: "warning",
          title: "Doublon détecté",
          description: duplicateMessage,
        });
        setLoading(false);
        return;
      }

      // 3. Si pas de doublon, insérer les données
      const { error: insertError } = await supabase
        .from("liste_attente")
        .insert([
          {
            ...formData,
            phone: formData.phone.replace(/\s+/g, ""), // Nettoyer le numéro
          },
        ]);

      if (insertError) {
        console.error("Erreur lors de l'insertion:", insertError);
        setAlert({
          type: "error",
          title: "Erreur d'inscription",
          description: "Erreur lors de l'inscription.",
        });
      } else {
        // 4. Succès - réinitialiser le formulaire et afficher le message
        setAlert({
          type: "success",
          title: "Inscription réussie !",
          description: "Bienvenue à bord 🚀 ! Votre inscription est validée. Regardez votre messagerie pour la confirmation",
        });
        setFormData({
          name: "",
          school_name: "",
          email: "",
          school_post: "",
          phone: "",
          school_size: "",
        });
      }
      // Envoi du mail de confirmation 
      await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
        }),
      });
    } catch (error) {
      console.error("Erreur inattendue:", error);
      setAlert({
        type: "error",
        title: "Erreur système",
        description: "Une erreur inattendue s'est produite.",
      });
    }

    setLoading(false);
  };

  const handleSubmitSuggestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Regex de sécurité
    const schoolNameRegex = /^[a-zA-ZÀ-ÿ0-9\s\-.']{2,100}$/;
    const featureRegex = /^[a-zA-ZÀ-ÿ0-9\s\-.,!?'()\/\n]{10,1000}$/; // Texte libre mais contrôlé
    const allowedRoles = [
      "Directeur/Directrice",
      "Responsable pédagogique",
      "Coordinateur académique",
      "Enseignant",
      "Autre",
    ];
    const allowedPriorities = ["Faible", "Moyenne", "Élevée", "Critique"];

    // Fonction de sanitisation
    const sanitizeInput = (input: string) => {
      return input
        .trim()
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Supprimer scripts
        .replace(/<[^>]*>/g, "") // Supprimer HTML tags
        .replace(/javascript:/gi, "") // Supprimer javascript:
        .replace(/on\w+\s*=/gi, ""); // Supprimer event handlers
    };

    // Validation et sanitisation
    const validateSuggestionForm = () => {
      const errors: string[] = [];

      // Sanitiser les données
      const sanitizedData = {
        school_name: sanitizeInput(suggestionData.school_name),
        role: suggestionData.role.trim(),
        feature: sanitizeInput(suggestionData.feature),
        priority: suggestionData.priority.trim(),
      };

      // Validation nom établissement
      if (!sanitizedData.school_name) {
        errors.push("Nom de l'établissement requis.");
      } else if (sanitizedData.school_name.length < 2) {
        errors.push(
          "Nom de l'établissement trop court (minimum 2 caractères)."
        );
      } else if (sanitizedData.school_name.length > 100) {
        errors.push(
          "Nom de l'établissement trop long (maximum 100 caractères)."
        );
      } else if (!schoolNameRegex.test(sanitizedData.school_name)) {
        errors.push(
          "Nom de l'établissement contient des caractères non autorisés."
        );
      }

      // Validation rôle
      if (!sanitizedData.role) {
        errors.push("Veuillez sélectionner votre rôle.");
      } else if (!allowedRoles.includes(sanitizedData.role)) {
        errors.push("Rôle sélectionné non valide.");
      }

      // Validation fonctionnalité
      if (!sanitizedData.feature) {
        errors.push("Veuillez décrire la fonctionnalité.");
      } else if (sanitizedData.feature.length < 10) {
        errors.push("Description trop courte (minimum 10 caractères).");
      } else if (sanitizedData.feature.length > 1000) {
        errors.push("Description trop longue (maximum 1000 caractères).");
      } else if (!featureRegex.test(sanitizedData.feature)) {
        errors.push("Description contient des caractères non autorisés.");
      }

      // Validation priorité
      if (!sanitizedData.priority) {
        errors.push("Veuillez sélectionner une priorité.");
      } else if (!allowedPriorities.includes(sanitizedData.priority)) {
        errors.push("Priorité sélectionnée non valide.");
      }

      return {
        isValid: errors.length === 0,
        errors: errors,
        sanitizedData: sanitizedData,
      };
    };

    const validation = validateSuggestionForm();

    // Si validation échoue
    if (!validation.isValid) {
      setAlert({
        type: "error",
        title: "Erreur de validation",
        description: validation.errors[0],
      });
      setLoading(false);
      return;
    }

    try {
      // Vérification des doublons (suggestion similaire du même établissement)
      const { data: existingSuggestions, error: checkError } = await supabase
        .from("suggestions")
        .select("school_name, feature")
        .eq("school_name", validation.sanitizedData.school_name)
        .ilike(
          "feature",
          `%${validation.sanitizedData.feature.substring(0, 50)}%`
        ); // Vérifier similarité

      if (checkError) {
        console.error("Erreur lors de la vérification:", checkError);
        setAlert({
          type: "error",
          title: "Erreur de connexion",
          description: "Erreur lors de la vérification des données.",
        });
        setLoading(false);
        return;
      }

      // Si suggestion similaire existe
      if (existingSuggestions && existingSuggestions.length > 0) {
        setAlert({
          type: "warning",
          title: "Suggestion similaire détectée",
          description:
            "Une suggestion similaire de votre établissement existe déjà.",
        });
        setLoading(false);
        return;
      }

      // Insertion des données sanitisées
      const { error: insertError } = await supabase
        .from("suggestions")
        .insert([validation.sanitizedData]);

      if (insertError) {
        console.error("Erreur lors de l'insertion:", insertError);
        setAlert({
          type: "error",
          title: "Erreur d'envoi",
          description: "Impossible d'envoyer la suggestion. Réessayez.",
        });
      } else {
        setAlert({
          type: "success",
          title: "Merci !",
          description: "Votre suggestion a été enregistrée avec succès.",
        });

        // Réinitialisation du formulaire
        setSuggestionData({
          school_name: "",
          role: "",
          feature: "",
          priority: "",
        });
      }
    } catch (error) {
      console.error("Erreur inattendue:", error);
      setAlert({
        type: "error",
        title: "Erreur système",
        description: "Une erreur inattendue s'est produite.",
      });
    }

    setLoading(false);
  };

  const scrollToReservation = () => {
    document
      .getElementById("reservation")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header scrollToReservation={scrollToReservation} />

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-60"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-100 rounded-full opacity-40"></div>
        <div className="absolute top-40 right-1/3 w-24 h-24 bg-green-100 rounded-full opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="xl:grid xl:grid-cols-12 xl:gap-8 items-center">
            <div className="text-center lg:col-span-6 xl:text-left">
              <h1 className="text-6xl font-bold text-gray-900 tracking-tight">
                Des formations
                <span className="block text-blue-600">
                  plus organisées, plus efficaces et plus attractives.
                </span>
                <span className="block"></span>
              </h1>
              <p className="mt-8 text-[18px] max-md:text-[18px] text-gray-600 leading-relaxed">
                tinyLMS aide les centres de formation à organiser leurs cours de
                manière optimale, en trouvant le juste équilibre entre théorie
                et pratique. Suivez facilement les performances de vos
                apprenants, automatisez la gestion administrative et offrez une
                expérience d’apprentissage claire, engageante et réellement
                efficace.
              </p>
              <div className="mt-10 flex flex-col md:flex-row items-center max-md:items-center md:space-x-4 space-y-4 md:space-y-0 justify-center xl:justify-start lg:justify-center">
                <button
                  onClick={scrollToReservation}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <span>Démarrer maintenant</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={scrollToReservation}
                  className="text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <span>En savoir plus</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="mt-16 lg:mt-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative w-[900px] h-[700px] max-xl:w-0 max-xl:h-0">
                {/* Desktop: Image qui prend toute la partie droite */}
                <div className="hidden xl:block relative bg-yellow-400 rounded-2xl w-full h-full">
                  <img
                    src="/classroom-2.webp"
                    alt="school manager"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  {/* Décorations */}
                  <div className="absolute -top-4 -right-4 bg-orange-500 rounded-full p-3">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-green-500 rounded-full p-3">
                    <Users className="w-6 h-6 text-white" />
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
              Pourquoi choisir tinyLMS ?
            </h2>
            <p className="mt-4 text-[20px] max-md:text-[18px]  text-gray-600 max-w-3xl mx-auto">
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
                <div className="flex items-start space-x-6 max-md:flex-col max-md:items-center max-md:text-center">
                  <div
                    className={`${feature.color} text-white p-3 rounded-xl max-md:mb-4`}
                  >
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
          <p className="text-[18px] max-md:text-[16px] text-blue-100 max-w-3xl bg-blue-text mx-auto mb-12 leading-relaxed">
            Rejoignez la liste d’attente dès aujourd’hui et soyez parmi les
            premiers à découvrir une solution qui centralise cours, exercices et
            inscriptions. Simplifiez la gestion de votre école et offrez une
            meilleure expérience à vos étudiants.
          </p>

          {alert && (
            <AlertPopup
              type={alert.type}
              title={alert.title}
              description={alert.description}
              onClose={() => setAlert(null)}
            />
          )}

          <div className="bg-white rounded-2xl p-8 max-w-md mx-auto">
            <div className="space-y-6">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl max-w-md mx-auto space-y-6"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Votre nom complet"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full outline-0 px-4 py-3 border-2 focus:border-blue-600 border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="school_name"
                  placeholder="Nom de votre institution"
                  value={formData.school_name}
                  onChange={handleChange}
                  required
                  className="w-full outline-0 px-4 py-3 border-2 focus:border-blue-600 border-gray-300 rounded-lg"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Votre adresse mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full outline-0 px-4 py-3 border-2 focus:border-blue-600 border-gray-300 rounded-lg"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Votre numéro de téléphone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full outline-0 px-4 py-3 border-2 border-gray-300 focus:border-blue-600 rounded-lg"
                />
                <input
                  type="text"
                  name="school_post"
                  placeholder="Votre poste dans l'institution"
                  value={formData.school_post}
                  onChange={handleChange}
                  className="w-full outline-0 px-4 py-3 border-2 focus:border-blue-600 border-gray-300 rounded-lg"
                />
                <select
                  name="school_size"
                  value={formData.school_size}
                  onChange={handleChange}
                  required
                  className="w-full outline-0 px-4 py-3 border-2 focus:border-blue-600 border-gray-300 rounded-lg"
                >
                  <option value="">Taille de votre établissement</option>
                  <option>Moins de 100 étudiants</option>
                  <option>100 - 500 étudiants</option>
                  <option>500 - 1000 étudiants</option>
                  <option>Plus de 1000 étudiants</option>
                </select>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {loading
                    ? "Envoi en cours..."
                    : "Réserver ma démonstration gratuite"}
                </button>

                {message && <p className="mt-4 text-sm">{message}</p>}
              </form>
            </div>
            <p className="text-sm text-gray-500 mt-6 leading-relaxed">
              Sans engagement • Aucune carte bancaire requise • Aucun paiement
              requis
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
            <p className="mt-4 text-[20px] max-md:text-[18px] text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
              <p className="text-[18px] max-md:text-[16px] text-gray-700 leading-relaxed max-w-4xl mx-auto">
                Plusieurs études comme celles citées ci-dessus démontrent que
                les institutions qui investissent dans la digitalisation
                aujourd'hui deviennent les références de demain. Prenez un temps
                d'avance sur vos concurrents dans cette révolution éducative.
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
            <p className="mt-4 text-[18px] max-md:text-[16px] text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Vos besoins guident notre développement. Partagez vos suggestions
              de fonctionnalités et participez à la création de tinyLMS.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8">
              <form onSubmit={handleSubmitSuggestion} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de votre établissement
                  </label>
                  <input
                    type="text"
                    name="school_name"
                    placeholder="Entrez le nom de votre institution"
                    value={suggestionData.school_name}
                    onChange={handleChangeSuggestion}
                    className="outline-0 w-full bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Votre rôle
                  </label>
                  <select
                    name="role"
                    value={suggestionData.role}
                    onChange={handleChangeSuggestion}
                    className="outline-0 bg-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
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
                    name="feature"
                    rows={4}
                    value={suggestionData.feature}
                    onChange={handleChangeSuggestion}
                    placeholder="Décrivez de façon brève et concise une ou plusieurs fonctionnalités qui faciliteraient le plus votre travail quotidien..."
                    className="outline-0 bg-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priorité de cette fonctionnalité
                  </label>
                  <div className="flex space-x-4 max-md:flex-col max-md:space-y-2">
                    {["Faible", "Moyenne", "Élevée", "Critique"].map(
                      (priority) => (
                        <label key={priority} className="flex items-center">
                          <input
                            type="radio"
                            name="priority"
                            value="faible"
                            onChange={handleChangeSuggestion}
                            className="outline-0 bg-white w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
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
                  onClick={() => handleSubmitSuggestion}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {loading ? "Envoi..." : "Envoyer ma suggestion"}
                </button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 leading-relaxed">
                  💡 <strong>Participez activement !</strong> Les meilleures
                  suggestions seront intégrées en priorité et leurs auteurs
                  bénéficieront d'un accès gratuit de 60 jours à tinyLMS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <div>Email : tinyLMS@gmail.com</div>
                <div>Téléphone : +237 653 189 528</div>
                <div>Adresse : Yaoundé, Cameroun</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-12 text-center">
            <p className="bg-blue-text leading-relaxed">
              © 2025 tinyLMS. Tous droits réservés. Révolutionnez votre approche
              pédagogique.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TinyLMSLanding;
