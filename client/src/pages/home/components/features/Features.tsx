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
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

interface Feature {
  title: string;
  description: string;
  icon: IconDefinition;
  link: string;
}

interface FeatureSectionProps {
  title: string;
  features: Feature[];
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ title, features }) => {
  return (
    <section className="feature-section">
      <h2 className="section-title">{title}</h2>
      <div className="feature-categories">
        {features.map((feature) => (
          <div className="feature-category" key={feature.title}>
            <FontAwesomeIcon icon={feature.icon} className="feature-icon" />
            <div className="feature-content">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <a href={feature.link} className="learn-more">En savoir plus</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Features: React.FC = () => {
  // Catégories de fonctionnalités
  const operationalFeatures: Feature[] = [
    {
      title: 'Gestion Opérationnelle',
      description: 'Organisez et suivez toutes vos opérations quotidiennes, de la gestion des réservations à la planification des menus.',
      icon: faTasks,
      link: '/dashboard'
    },
    {
      title: 'Logiciel de Caisse',
      description: 'Gérez vos transactions financières efficacement avec notre logiciel de caisse intégré.',
      icon: faCashRegister,
      link: '/caisse'
    },
    {
      title: 'Suivi des Ventes',
      description: 'Suivez vos ventes en temps réel et identifiez les tendances pour booster votre chiffre d\'affaires.',
      icon: faChartLine,
      link: '/suivi-ventes'
    }
  ];

  const stockFeatures: Feature[] = [
    {
      title: 'Gestion des Stocks',
      description: 'Suivez vos produits, gérez vos stocks et optimisez vos commandes fournisseurs pour éviter les ruptures.',
      icon: faBoxes,
      link: '/gestion-stocks'
    },
    {
      title: 'Plats & Menus',
      description: 'Créez, modifiez et gérez vos menus et plats pour offrir une expérience culinaire exceptionnelle.',
      icon: faUtensils,
      link: '/config-plats-menus'
    }
  ];

  const hrFeatures: Feature[] = [
    {
      title: 'Ressources Humaines',
      description: 'Gérez vos employés, leurs salaires et améliorez la productivité de votre équipe.',
      icon: faUsers,
      link: '/gestion-employes'
    }
  ];

  const marketingFeatures: Feature[] = [
    {
      title: 'Marketing',
      description: 'Attirez et fidélisez vos clients grâce à des outils de gestion des promotions et des analyses marketing.',
      icon: faBullhorn,
      link: '/gestion-promotions'
    },
    {
      title: 'Création de Fiche à partir de Template',
      description: 'Créez facilement votre fiche restaurant à partir de templates personnalisables pour permettre à vos clients de réserver leurs tables en ligne.',
      icon: faFileAlt,
      link: '/choix-template'
    }
  ];

  const supportFeatures: Feature[] = [
    {
      title: 'Support',
      description: 'Offrez un support client exceptionnel et recueillez des feedbacks pour améliorer continuellement votre service.',
      icon: faHeadset,
      link: '/support-assistance'
    }
  ];

  const analysisFeatures: Feature[] = [
    {
      title: 'Reporting et Analyses',
      description: 'Accédez à des rapports détaillés et des analyses approfondies pour prendre des décisions éclairées.',
      icon: faChartPie,
      link: '/reporting'
    }
  ];

  return (
    <div className="features" id='features'>
      <FeatureSection title="Gestion Opérationnelle" features={operationalFeatures} />
      <FeatureSection title="Gestion des Stocks" features={stockFeatures} />
      <FeatureSection title="Ressources Humaines" features={hrFeatures} />
      <FeatureSection title="Marketing et Promotion" features={marketingFeatures} />
      <FeatureSection title="Support et Assistance" features={supportFeatures} />
      <FeatureSection title="Analyses et Rapports" features={analysisFeatures} />
    </div>
  );
};

export default Features;
