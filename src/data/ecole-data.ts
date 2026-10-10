<<<<<<< HEAD
import { Building2, Award, Users, LucideIcon } from "lucide-react";

export interface EcoleSection {
  slug: string;
  icon: LucideIcon;
  cardTitle: string;
  cardDescription: string;
  detailTitle: string;
  detailSubtitle: string;
  paragraphs: string[];
  highlights: string[];
}

export const ecoleData: Record<string, EcoleSection> = {
  infrastructure: {
    slug: "infrastructure",
    icon: Building2,
    cardTitle: "Infrastructure Moderne",
    cardDescription: "Située au cœur de la cité universitaire Madinat Al Irfane à Rabat, l'école dispose d'amphithéâtres connectés et de laboratoires de soins avancés.",
    detailTitle: "Infrastructure Moderne & Hôpital Virtuel",
    detailSubtitle: "Des équipements de pointe pour une immersion clinique totale dès la première année.",
    paragraphs: [
      "Située au cœur de la cité universitaire Madinat Al Irfane à Rabat, l'ESSI MAROC offre un cadre d'études exceptionnel étalé sur plus de 3000 m².",
      "Nos étudiants bénéficient d'un accès permanent à un hôpital de simulation virtuelle équipé de mannequins haute fidélité (SimMan 3G) permettant la reproduction exacte de situations d'urgence, de réanimation et de bloc opératoire.",
      "L'établissement comprend également des amphithéâtres interactifs, une bibliothèque numérique connectée aux bases de données médicales internationales, et des salles de travaux pratiques thématisées."
    ],
    highlights: [
      "Simulateurs Haute Fidélité SimMan 3G & Bébés SimBaby",
      "Amphithéâtres climatisés de 150 places connectés en fibre optique",
      "Laboratoires de microbiologie, d'anatomie et de pharmacologie",
      "Espaces de détente et médiathèque numérique 24/7"
    ]
  },
  accreditation: {
    slug: "accreditation",
    icon: Award,
    cardTitle: "Accréditation Étatique",
    cardDescription: "Tous nos cursus LMD (Licence, Master, Doctorat) sont reconnus par le Ministère de l'Enseignement Supérieur et le Ministère de la Santé.",
    detailTitle: "Accréditation Étatique & Reconnaissance Diplômante",
    detailSubtitle: "Des diplômes d'État officiels visés par le Ministère de l'Enseignement Supérieur.",
    paragraphs: [
      "Tous les programmes dispensés à l'ESSI MAROC sont accrédités par l'État marocain conformément à la loi 01-00 relative à l'enseignement supérieur.",
      "Nos diplômes de Licence Professionnelle et Master Spécialisé ouvrent directement l'accès au concours de recrutement de la fonction publique (Ministère de la Santé) ainsi qu'à l'exercice dans le secteur privé et international.",
      "L'architecture pédagogique respecte le système LMD (Licence 180 ECTS / Master 120 ECTS), facilitant les équivalences et poursuites d'études en Europe et au Canada."
    ],
    highlights: [
      "Accréditation officielle délivrée par le Ministère de l'Enseignement Supérieur",
      "Reconnaissance intégrale par le Ministère de la Santé et de la Protection Sociale",
      "Conformité totale au système de crédits européens LMD (ECTS)",
      "Accords de partenariat hospitalier avec les CHU Régionaux"
    ]
  },
  "corps-professeur": {
    slug: "corps-professeur",
    icon: Users,
    cardTitle: "Corps Professeur Partenaire",
    cardDescription: "Une équipe pédagogique constituée de professeurs universitaires en médecine, de médecins réanimateurs et d'experts en soins infirmiers.",
    detailTitle: "Corps Professeur & Partenaires Cliniques",
    detailSubtitle: "L'excellence médicale transmise par des praticiens et universitaires chevronnés.",
    paragraphs: [
      "Le corps enseignant de l'ESSI MAROC rassemble des professeurs agrégés de médecine, des médecins chefs de service de CHU, ainsi que des cadres infirmiers supérieurs chevronnés.",
      "Chaque module associe enseignements théoriques rigoureux et retour d'expérience clinique direct des blocs opératoires et services de soins intensifs.",
      "Nos professeurs encadrent personnellement les étudiants lors de leurs travaux de fin d'études (PFE) et la préparation des grilles d'évaluation de stage."
    ],
    highlights: [
      "Plus de 40 professeurs universitaires, réanimateurs et chirurgiens",
      "Encadrement personnalisé avec un ratio de 1 enseignant pour 12 étudiants en TP",
      "Interventions régulières d'experts internationaux invités",
      "Supervision directe des stages en CHU par des tuteurs hospitaliers dédiés"
    ]
  }
=======
import { Building2, Award, Users, LucideIcon } from "lucide-react";

export interface EcoleSection {
  slug: string;
  icon: LucideIcon;
  cardTitle: string;
  cardDescription: string;
  detailTitle: string;
  detailSubtitle: string;
  paragraphs: string[];
  highlights: string[];
}

export const ecoleData: Record<string, EcoleSection> = {
  infrastructure: {
    slug: "infrastructure",
    icon: Building2,
    cardTitle: "Infrastructure Moderne",
    cardDescription: "Située au cœur de la cité universitaire Madinat Al Irfane à Rabat, l'école dispose d'amphithéâtres connectés et de laboratoires de soins avancés.",
    detailTitle: "Infrastructure Moderne & Hôpital Virtuel",
    detailSubtitle: "Des équipements de pointe pour une immersion clinique totale dès la première année.",
    paragraphs: [
      "Située au cœur de la cité universitaire Madinat Al Irfane à Rabat, l'ESSI MAROC offre un cadre d'études exceptionnel étalé sur plus de 3000 m².",
      "Nos étudiants bénéficient d'un accès permanent à un hôpital de simulation virtuelle équipé de mannequins haute fidélité (SimMan 3G) permettant la reproduction exacte de situations d'urgence, de réanimation et de bloc opératoire.",
      "L'établissement comprend également des amphithéâtres interactifs, une bibliothèque numérique connectée aux bases de données médicales internationales, et des salles de travaux pratiques thématisées."
    ],
    highlights: [
      "Simulateurs Haute Fidélité SimMan 3G & Bébés SimBaby",
      "Amphithéâtres climatisés de 150 places connectés en fibre optique",
      "Laboratoires de microbiologie, d'anatomie et de pharmacologie",
      "Espaces de détente et médiathèque numérique 24/7"
    ]
  },
  accreditation: {
    slug: "accreditation",
    icon: Award,
    cardTitle: "Accréditation Étatique",
    cardDescription: "Tous nos cursus LMD (Licence, Master, Doctorat) sont reconnus par le Ministère de l'Enseignement Supérieur et le Ministère de la Santé.",
    detailTitle: "Accréditation Étatique & Reconnaissance Diplômante",
    detailSubtitle: "Des diplômes d'État officiels visés par le Ministère de l'Enseignement Supérieur.",
    paragraphs: [
      "Tous les programmes dispensés à l'ESSI MAROC sont accrédités par l'État marocain conformément à la loi 01-00 relative à l'enseignement supérieur.",
      "Nos diplômes de Licence Professionnelle et Master Spécialisé ouvrent directement l'accès au concours de recrutement de la fonction publique (Ministère de la Santé) ainsi qu'à l'exercice dans le secteur privé et international.",
      "L'architecture pédagogique respecte le système LMD (Licence 180 ECTS / Master 120 ECTS), facilitant les équivalences et poursuites d'études en Europe et au Canada."
    ],
    highlights: [
      "Accréditation officielle délivrée par le Ministère de l'Enseignement Supérieur",
      "Reconnaissance intégrale par le Ministère de la Santé et de la Protection Sociale",
      "Conformité totale au système de crédits européens LMD (ECTS)",
      "Accords de partenariat hospitalier avec les CHU Régionaux"
    ]
  },
  "corps-professeur": {
    slug: "corps-professeur",
    icon: Users,
    cardTitle: "Corps Professeur Partenaire",
    cardDescription: "Une équipe pédagogique constituée de professeurs universitaires en médecine, de médecins réanimateurs et d'experts en soins infirmiers.",
    detailTitle: "Corps Professeur & Partenaires Cliniques",
    detailSubtitle: "L'excellence médicale transmise par des praticiens et universitaires chevronnés.",
    paragraphs: [
      "Le corps enseignant de l'ESSI MAROC rassemble des professeurs agrégés de médecine, des médecins chefs de service de CHU, ainsi que des cadres infirmiers supérieurs chevronnés.",
      "Chaque module associe enseignements théoriques rigoureux et retour d'expérience clinique direct des blocs opératoires et services de soins intensifs.",
      "Nos professeurs encadrent personnellement les étudiants lors de leurs travaux de fin d'études (PFE) et la préparation des grilles d'évaluation de stage."
    ],
    highlights: [
      "Plus de 40 professeurs universitaires, réanimateurs et chirurgiens",
      "Encadrement personnalisé avec un ratio de 1 enseignant pour 12 étudiants en TP",
      "Interventions régulières d'experts internationaux invités",
      "Supervision directe des stages en CHU par des tuteurs hospitaliers dédiés"
    ]
  }
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
};