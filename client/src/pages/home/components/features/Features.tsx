import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTasks,
  faBoxes,
  faUsers,
  faBullhorn,
  faHeadset,
  faChartPie,
  faUtensils,
  faCashRegister,
  faChartLine,
  faFileAlt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

interface Feature {
  title: string;
  description: string;
  icon: IconDefinition;
  link: string;
}

interface Category {
  category: string;
  features: Feature[];
  image: string;
}

const Features: React.FC = () => {
  const categories: Category[] = [
    {
      category: 'Gestion et Opérations',
      features: [
        {
          title: 'Gestion Opérationnelle',
          description:
            'Organisez et suivez toutes vos opérations quotidiennes, de la gestion des réservations à la planification des menus.',
          icon: faTasks,
          link: '/dashboard',
        },
        {
          title: 'Logiciel de Caisse',
          description:
            'Gérez vos transactions financières efficacement avec notre logiciel de caisse intégré.',
          icon: faCashRegister,
          link: '/caisse',
        },
        {
          title: 'Suivi des Ventes',
          description:
            'Suivez vos ventes en temps réel et identifiez les tendances pour booster votre chiffre d\'affaires.',
          icon: faChartLine,
          link: '/suivi-ventes',
        },
      ],
      image: 'https://media.istockphoto.com/id/1353016905/fr/photo/belle-d%C3%A9coration-de-table-pour-un-d%C3%AEner-romantique-en-plein-air.webp?a=1&b=1&s=612x612&w=0&k=20&c=lZG3NeLxzR_ePqrqLd-_GWI9aTH9sKaSGhzynoZ0m0s=',
    },
    {
      category: 'Produits et Menus',
      features: [
        {
          title: 'Gestion des Stocks',
          description:
            'Suivez vos produits, gérez vos stocks et optimisez vos commandes fournisseurs pour éviter les ruptures.',
          icon: faBoxes,
          link: '/gestion-stocks',
        },
        {
          title: 'Plats & Menus',
          description:
            'Créez, modifiez et gérez vos menus et plats pour offrir une expérience culinaire exceptionnelle.',
          icon: faUtensils,
          link: '/config-plats-menus',
        },
      ],
      image: 'https://media.istockphoto.com/id/1353016905/fr/photo/belle-d%C3%A9coration-de-table-pour-un-d%C3%AEner-romantique-en-plein-air.webp?a=1&b=1&s=612x612&w=0&k=20&c=lZG3NeLxzR_ePqrqLd-_GWI9aTH9sKaSGhzynoZ0m0s=',
    },
    {
      category: 'Ressources Humaines',
      features: [
        {
          title: 'Ressources Humaines',
          description:
            'Gérez vos employés, leurs salaires et améliorez la productivité de votre équipe.',
          icon: faUsers,
          link: '/gestion-employes',
        },
      ],
      image: 'https://media.istockphoto.com/id/1353016905/fr/photo/belle-d%C3%A9coration-de-table-pour-un-d%C3%AEner-romantique-en-plein-air.webp?a=1&b=1&s=612x612&w=0&k=20&c=lZG3NeLxzR_ePqrqLd-_GWI9aTH9sKaSGhzynoZ0m0s=',
    },
    {
      category: 'Marketing et Personnalisation',
      features: [
        {
          title: 'Marketing',
          description:
            'Attirez et fidélisez vos clients grâce à des outils de gestion des promotions et des analyses marketing.',
          icon: faBullhorn,
          link: '/gestion-promotions',
        },
        {
          title: 'Création de Fiche à partir de Template',
          description:
            'Créez facilement votre fiche restaurant à partir de templates personnalisables pour permettre à vos clients de réserver leurs tables en ligne.',
          icon: faFileAlt,
          link: '/choix-template',
        },
      ],
      image: 'https://media.istockphoto.com/id/1353016905/fr/photo/belle-d%C3%A9coration-de-table-pour-un-d%C3%AEner-romantique-en-plein-air.webp?a=1&b=1&s=612x612&w=0&k=20&c=lZG3NeLxzR_ePqrqLd-_GWI9aTH9sKaSGhzynoZ0m0s=',
    },
    {
      category: 'Support et Analyse',
      features: [
        {
          title: 'Support',
          description:
            'Offrez un support client exceptionnel et recueillez des feedbacks pour améliorer continuellement votre service.',
          icon: faHeadset,
          link: '/support-assistance',
        },
        {
          title: 'Reporting et Analyses',
          description:
            'Accédez à des rapports détaillés et des analyses approfondies pour prendre des décisions éclairées.',
          icon: faChartPie,
          link: '/reporting',
        },
      ],
      image: 'https://media.istockphoto.com/id/1353016905/fr/photo/belle-d%C3%A9coration-de-table-pour-un-d%C3%AEner-romantique-en-plein-air.webp?a=1&b=1&s=612x612&w=0&k=20&c=lZG3NeLxzR_ePqrqLd-_GWI9aTH9sKaSGhzynoZ0m0s=',
    },
  ];

  return (
    <div className="features" id='features'>
      {categories.map((category, index) => (
        <section
          className={`category-section ${index % 2 === 1 ? 'reversed' : ''}`}
          key={category.category}
        >
          <div className="category-image">
            <img src={category.image} alt={category.category} />
          </div>
          <div className="category-content">
            <h2 className="category-title">{category.category}</h2>
            <div className="feature-list">
              {category.features.map((feature) => (
                <div className="feature-item" key={feature.title}>
                  <FontAwesomeIcon icon={feature.icon} className="feature-icon" />
                  <div className="feature-info">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    <a href={feature.link} className="learn-more">
                      En savoir plus
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Features;
