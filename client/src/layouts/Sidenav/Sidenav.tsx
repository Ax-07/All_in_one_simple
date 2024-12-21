import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faCalendarAlt, 
  faUtensils, 
  faCashRegister, 
  faChartLine, 
  faBoxOpen, 
  faWarehouse, 
  faTruck, 
  faUserTie, 
  faUsers, 
  faDollarSign, 
  faUserFriends, 
  faPercent, 
  faHeadset, 
  faComments, 
  faChartPie, 
  faUser, 
  faCogs, 
  faPaintBrush, 
  faSignOutAlt,
  faAngleUp 
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';

/** Type représentant un lien de navigation */
interface NavLink {
  label: string;
  icon: IconDefinition;
  href: string;
}

/** Type représentant les données des groupes de navigation */
interface NavGroupData {
  title: string;
  links: NavLink[];
}

/** Props du composant NavGroup (avec isActive et onToggle) */
interface NavGroupProps extends NavGroupData {
  isActive: boolean;
  onToggle: (groupTitle: string) => void;
}

const NavGroup: React.FC<NavGroupProps> = ({ title, links, isActive, onToggle }) => {
  const toggleGroup = () => onToggle(title);

  return (
    <div className={`nav-group ${isActive ? 'active' : ''}`}>
      <button 
        className="nav-group-btn" 
        onClick={toggleGroup} 
        aria-expanded={isActive}
      >
        {title}
        <span className="arrow">
          <FontAwesomeIcon icon={faAngleUp}/>
        </span>
      </button>
      <div className={`nav-group-content ${isActive ? 'expanded' : ''}`}>
        {links.map(link => (
          <Link to={link.href} key={link.href} className="nav-link">
            <FontAwesomeIcon icon={link.icon} aria-hidden="true" />
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const SideNav: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const toggleNavGroup = (groupTitle: string) => {
    setActiveGroup(prevGroup => (prevGroup === groupTitle ? null : groupTitle));
  };
  const navGroups: NavGroupData[] = [
    {
      title: 'Gestion Opérationnelle',
      links: [
        { label: 'Réservations', icon: faCalendarAlt, href: '/reservations' },
        { label: 'Plats & Menus', icon: faUtensils, href: '/config-plats-menus' },
        { label: 'Logiciel de Caisse', icon: faCashRegister, href: '/caisse' },
        { label: 'Suivi des Ventes', icon: faChartLine, href: '/suivi-ventes' }
      ]
    },
    {
      title: 'Gestion des Stocks',
      links: [
        { label: 'Gestion des Produits', icon: faBoxOpen, href: '/gestion-produits' },
        { label: 'Gestion des Stocks', icon: faWarehouse, href: '/gestion-stocks' },
        { label: 'Commandes Fournisseurs', icon: faTruck, href: '/gestion-commandes' },
        { label: 'Gestion des Fournisseurs', icon: faUserTie, href: '/gestion-fournisseurs' }
      ]
    },
    {
      title: 'Ressources Humaines',
      links: [
        { label: 'Gestion des Employés', icon: faUsers, href: '/gestion-employes' },
        { label: 'Gestion des Salaires', icon: faDollarSign, href: '/gestion_salaires' }
      ]
    },
    {
      title: 'Marketing',
      links: [
        { label: 'Gestion des Clients', icon: faUserFriends, href: '/gestion-clients' },
        { label: 'Gestion des Promotions', icon: faPercent, href: '/gestion-promotions' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Support et Assistance', icon: faHeadset, href: '/support-assistance' },
        { label: 'Gestion des Feedbacks', icon: faComments, href: '/gestion-feedbacks' }
      ]
    },
    {
      title: 'Reporting',
      links: [
        { label: 'Reporting et Analyses', icon: faChartPie, href: '/reporting' }
      ]
    }
  ];

  const singleLinks: NavLink[] = [
    { label: 'Mon Profil', icon: faUser, href: '/profil' },
    { label: 'Paramètres', icon: faCogs, href: '/parametres' },
    { label: 'Personnaliser ma Fiche', icon: faPaintBrush, href: '/choix-template' },
    { label: 'Déconnexion', icon: faSignOutAlt, href: '/' }
  ];

  return (
    <nav className="side-nav">
      <Link to="/dashboard" className="nav-link active">
        <FontAwesomeIcon icon={faTachometerAlt} />
        <span>Dashboard</span>
      </Link>

      {navGroups.map(group => (
        <NavGroup 
          key={group.title} 
          title={group.title} 
          links={group.links} 
          isActive={activeGroup === group.title} 
          onToggle={toggleNavGroup} 
        />
      ))}

      {singleLinks.map(link => (
        <a href={link.href} key={link.href} className="nav-link">
          <FontAwesomeIcon icon={link.icon} />
          <span>{link.label}</span>
        </a>
      ))}
    </nav>
  );
};

export default SideNav;
