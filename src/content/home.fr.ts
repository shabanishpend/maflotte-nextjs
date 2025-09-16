import type { HeroContent } from "@/components/Hero";
import type { FeaturesContent } from "@/components/Features";
import type { VehiclesContent } from "@/components/Vehicules";
import type { DevicesContent } from "@/components/Devices";
import type { SensorContent } from "@/components/Sensor";
import type { ReferencesContent } from "@/components/References";
import type { AboutContent } from "@/components/About";
import type { ContactContent } from "@/components/Contact";

export const homeFR = {
  // =============================== HERO SECTION ===============================
  hero: {
    title: "Suivez vos véhicules en temps réel grâce à",
    subtitle:
      "Une solution digitale complète pour suivre, contrôler et optimiser votre flotte de véhicules où que vous soyez.",
    ctaPrimary: { label: "Demander une démo", href: "#contact" }, // ancre
    ctaSecondary: { label: "Voir les fonctionnalités", href: "#services" },
    videoSrc: "https://maflotte.ch/website/videos/geo_loc.mp4",
  } satisfies HeroContent,

  // ============================ FEATURES SECTION ==============================
  features: {
    kicker: "Nos fonctionnalités",
    title: "Des outils puissants pour piloter vos véhicules",
    note: "Gagnez du temps dès aujourd'hui.\nAucun engagement, aucun papier, 100% en ligne.",
    cta: { label: "Demander une démo", href: "#contact" },
    items: [
      {
        title: "Gestion de la vitesse",
        description:
          "Assurez-vous que chacun respecte les limitations de vitesse",
        icon: "/icons/gauge.svg",
      },
      {
        title: "Comportement de conduite",
        description:
          "Analysez les accélérations, freinages et virages brutaux des chauffeurs",
        icon: "/icons/car-simple.svg",
      },
      {
        title: "Alertes en temps réel",
        description:
          "Soyez avertis en cas de zone à risque, dépassement horaire, etc.",
        icon: "/icons/bell-ringing.svg",
      },
      {
        title: "Coupe moteur à distance",
        description:
          "Coupez le moteur de votre véhicule directement depuis votre téléphone",
        icon: "/icons/engine.svg",
      },
      {
        title: "Gestion des heures de travail",
        description:
          "Comptabilisez les heures de travail de votre employé automatiquement",
        icon: "/icons/clock.svg",
      },
    ],
  } satisfies FeaturesContent,

  // ============================ VEHICLES SECTION ==============================
  vehicles: {
    sectionTitle: "Compatibilité véhicules",
    taglineTitle: "Une seule plateforme pour tous vos véhicules.",
    taglineText:
      "Que vous gériez des voitures, camions, taxis ou engins de chantier, MAFLOTTE centralise tout pour vous faire gagner du temps.",
    items: [
      {
        title: "Gérer vos véhicules de location",
        image: "/vehicles/vehicule_location.png",
      },
      {
        title: "Gérez vos véhicules d’entreprise",
        image: "/vehicles/vehicule_tourisme.png",
      },
      {
        title: "Suivez vos camions en temps réel",
        image: "/vehicles/vehicule_camion.png",
      },
      // {
      //   title: "Une plateforme pour tout votre parc",
      //   image: "/photos/logo/icon_black.svg",
      //   isLogo: true,
      // },
      {
        title: "Pilotez vos engins de chantier",
        image: "/vehicles/vehicule_chantier.png",
      },
      {
        title: "Optimisez vos taxis et bus",
        image: "/vehicles/vehicule_taxi.png",
      },
    ],
  } satisfies VehiclesContent,

  // ============================= DEVICES SECTION ==============================
  devices: {
    title: "Une plateforme accessible partout, sur tous vos appareils",
    description:
      "MAFLOTTE simplifie la gestion de vos véhicules en centralisant toutes vos données sur une plateforme accessible partout — au bureau, en déplacement ou sur le terrain. Compatible ordinateur, tablette et smartphone, vous suivez et gérez votre flotte en temps réel pour décider vite et collaborer efficacement. Interface fluide, intuitive et sécurisée : vous gagnez du temps et gardez le contrôle, seul ou en équipe.",
    imageSrc: "/photos/multiplatfome.png",
    imageAlt: "Interfaces Maflotte sur plusieurs appareils",
  } satisfies DevicesContent,

  // ============================= CAMERA SECTION ===============================
  cameraSection: {
    title: "Supervisez vos marchandises en temps réel",
    subtitle:
      "Des caméras connectées pour visualiser vos trajets, analyser les événements et sécuriser votre flotte.",
    videoSrcMp4: "https://maflotte.ch/website/videos/camera_camion.mp4",
    height: "md",
    showCTA: false, // pas de CTA pour l’instant (sinon cf. note plus bas)
  },

  // ============================== SENSOR SECTION ==============================
  sensor: {
    slides: [
      {
        type: "video",
        src: "https://maflotte.ch/website/videos/sensor_tag.mp4",
        poster: "/photos/eye-sensor-side.png",
        alt: "Camion détecté par antenne sur autoroute",
        title: "Détection en temps réel sur la route",
        text: "Nos routeurs embarqués détectent automatiquement les tags Bluetooth à proximité lors des trajets. Visualisez en direct la position de vos véhicules et la présence de vos équipements, même hors contact GPS.",
      },
      {
        type: "image",
        src: "/photos/eye-sensor-side.png",
        alt: "Capteur Bluetooth Maflotte",
        title: "Le capteur Bluetooth intelligent",
        text: "Ce tag compact permet de localiser vos biens, de surveiller température, humidité, mouvement et état magnétique. Il s’intègre facilement à tous vos véhicules et équipements.",
      },
    ],
  } satisfies SensorContent,

  // =========================== REFERENCES SECTION =============================
  references: {
    sectionTitle: "Nos références",
    sectionSubtitle: "Des clients satisfaits.",
    items: [
      {
        title: "Un gain de temps considérable",
        href: "#",
        description:
          "Grâce à MAFLOTTE, nous avons pu centraliser tous nos véhicules, y compris ceux en location courte durée. La gestion est fluide et nous gagnons un temps précieux au quotidien.",
        date: "Mai 2025",
        datetime: "2025-05-01",
        category: { title: "GVA CARS", href: "#" },
        author: {
          name: "Nicolas Berisha",
          role: "Directeur Général",
          href: "#",
          imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        },
      },
      {
        title: "Une solution claire et efficace",
        href: "#",
        description:
          "Nous gérons une trentaine de véhicules utilitaires, et MAFLOTTE nous a permis d’y voir beaucoup plus clair. Les rappels automatiques et les rapports sont top.",
        date: "Avril 2025",
        datetime: "2025-04-01",
        category: { title: "TransLog Suisse", href: "#" },
        author: {
          name: "Claire Dupuis",
          role: "Responsable logistique",
          href: "#",
          imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
        },
      },
      {
        title: "Idéal pour une PME comme la nôtre",
        href: "#",
        description:
          "Interface simple, support réactif, prix honnête. On recommande MAFLOTTE à toutes les entreprises locales qui veulent digitaliser leur gestion de flotte.",
        date: "Mars 2025",
        datetime: "2025-03-01",
        category: { title: "Electricité Favre SA", href: "#" },
        author: {
          name: "Yvan Favre",
          role: "Co-gérant",
          href: "#",
          imageUrl: "https://randomuser.me/api/portraits/men/55.jpg",
        },
      },
      {
        title: "Adapté à tous nos véhicules",
        href: "#",
        description:
          "Qu’il s’agisse de nos camionnettes, de nos véhicules de chantier ou même des scooters de livraison, tout est intégré dans une seule interface. Super pratique.",
        date: "Février 2025",
        datetime: "2025-02-01",
        category: { title: "Servibat Genève", href: "#" },
        author: {
          name: "Laura Perret",
          role: "Responsable d’exploitation",
          href: "#",
          imageUrl: "https://randomuser.me/api/portraits/women/30.jpg",
        },
      },
      {
        title: "Un onboarding rapide et intuitif",
        href: "#",
        description:
          "Nous avons mis en place la solution en moins d’une semaine. Même nos chauffeurs trouvent l’interface facile à utiliser sur mobile.",
        date: "Janvier 2025",
        datetime: "2025-01-01",
        category: { title: "TransAlp Distribution", href: "#" },
        author: {
          name: "Julien Martin",
          role: "Chef de flotte",
          href: "#",
          imageUrl: "https://randomuser.me/api/portraits/men/41.jpg",
        },
      },
      {
        title: "La meilleure plateforme qu’on ait testée",
        href: "#",
        description:
          "On a essayé plusieurs outils avant de tomber sur MAFLOTTE. Le rapport qualité-prix et la stabilité de la plateforme font la différence.",
        date: "Décembre 2024",
        datetime: "2024-12-01",
        category: { title: "AlpiCar Service", href: "#" },
        author: {
          name: "Sophie Blanc",
          role: "Assistante administrative",
          href: "#",
          imageUrl: "https://randomuser.me/api/portraits/women/22.jpg",
        },
      },
    ],
  } satisfies ReferencesContent,

  // ============================== ABOUT SECTION ===============================
  about: {
    kicker: "Plateforme intelligente",
    title: "Ce que vous offre MAFLOTTE",
    subtitle:
      "Simplifiez la gestion de vos véhicules avec une solution complète, claire et puissante.",
    videoSrc: "https://maflotte.ch/website/videos/about-section.mp4",
    items: [
      {
        title: "Suivi en temps réel",
        text: "Visualisez en direct la position de vos véhicules, consultez l'historique des trajets et recevez des alertes en cas d’anomalie.",
      },
      {
        title: "Tableau de bord centralisé",
        text: "Pilotez votre flotte avec des graphiques clairs, KPIs et alertes automatiques.",
      },
      {
        title: "Kilométrage automatique",
        text: "Rapports périodiques et alertes d’entretien basées sur les données réelles.",
      },
      {
        title: "Entretien et éco-conduite",
        text: "Planifiez les entretiens et réduisez les coûts grâce à l’analyse des comportements.",
      },
      {
        title: "Gestion des conducteurs",
        text: "Attribuez les véhicules, suivez l’activité et le style de conduite.",
      },
      {
        title: "Coupe-moteur à distance",
        text: "Sécurisez vos véhicules grâce à la désactivation à distance en cas de vol.",
      },
      {
        title: "Alertes & règles personnalisées",
        text: "Vitesse excessive, sortie de zone, déconnexion GPS : soyez notifié.",
      },
      {
        title: "Accompagnement humain + démo",
        text: "On vous assiste de A à Z. Essayez MAFLOTTE sans engagement.",
      },
    ],
  } satisfies AboutContent,

  // ============================= CONTACT SECTION ==============================
  contact: {
    left: {
      addressTitle: "Adresse",
      addressLines: [
        "Membre de GVA Group SA",
        "Rue du Pré-Bouvier 8",
        "1242 Satigny",
        "Genève, Suisse",
      ],
      phoneTitle: "Téléphone",
      phoneDisplay: "+41 21 211 26 22",
    },
    form: {
      title: "Contactez-nous",
      placeholders: {
        name: "Nom et Prénom",
        company: "Société",
        email: "E-mail",
        phone: "Téléphone",
        address: "Adresse",
        fleetSize: "Nb de véhicules à équiper",
        message: "Message",
      },
      submitLabel: "Envoyer",
      submittingLabel: "Envoi en cours...",
      successMsg: "Merci ! Nous revenons vers vous rapidement.",
      errorMsg: "Une erreur est survenue. Veuillez réessayer.",
      validation: {
        nameRequired: "Le nom est requis",
        emailRequired: "L'email est requis",
        emailInvalid: "Veuillez entrer une adresse email valide",
        messageRequired: "Le message est requis",
      },
      modal: {
        success: {
          title: "Envoi Réussi !",
          message: "Votre message a été envoyé avec succès. Nous vous répondrons dès que possible. Merci de nous avoir contactés !"
        },
        error: {
          title: "L'envoi a Échoué",
          message: "Malheureusement, nous n'avons pas pu recevoir votre message en raison d'un problème technique. Veuillez essayer de nouveau plus tard ou nous contacter directement par e-mail ou téléphone."
        }
      }
    },
    map: { lat: 46.22425, lng: 6.05705, title: "GVA Group SA", zoom: 15 },
  } satisfies ContactContent,
};
