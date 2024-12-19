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
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

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
        <span className="arrow">{'▲'}</span>
      </button>
      <div className={`nav-group-content ${isActive ? 'expanded' : ''}`}>
        {links.map(link => (
          <a href={link.href} key={link.href} className="nav-link">
            <FontAwesomeIcon icon={link.icon} aria-hidden="true" />
            <span>{link.label}</span>
          </a>
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
        { label: 'Réservations', icon: faCalendarAlt, href: 'reservations.html' },
        { label: 'Plats & Menus', icon: faUtensils, href: 'config_plats_menus.html' },
        { label: 'Logiciel de Caisse', icon: faCashRegister, href: 'caisse.html' },
        { label: 'Suivi des Ventes', icon: faChartLine, href: 'suivi_ventes.html' }
      ]
    },
    {
      title: 'Gestion des Stocks',
      links: [
        { label: 'Gestion des Produits', icon: faBoxOpen, href: 'gestion_produits.html' },
        { label: 'Gestion des Stocks', icon: faWarehouse, href: 'gestion_stocks.html' },
        { label: 'Commandes Fournisseurs', icon: faTruck, href: 'gestion_commandes.html' },
        { label: 'Gestion des Fournisseurs', icon: faUserTie, href: 'gestion_fournisseurs.html' }
      ]
    },
    {
      title: 'Ressources Humaines',
      links: [
        { label: 'Gestion des Employés', icon: faUsers, href: 'gestion_employes.html' },
        { label: 'Gestion des Salaires', icon: faDollarSign, href: 'gestion_salaires.html' }
      ]
    },
    {
      title: 'Marketing',
      links: [
        { label: 'Gestion des Clients', icon: faUserFriends, href: 'gestion_clients.html' },
        { label: 'Gestion des Promotions', icon: faPercent, href: 'gestion_promotions.html' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Support et Assistance', icon: faHeadset, href: 'support_assistance.html' },
        { label: 'Gestion des Feedbacks', icon: faComments, href: 'gestion_feedbacks.html' }
      ]
    },
    {
      title: 'Reporting',
      links: [
        { label: 'Reporting et Analyses', icon: faChartPie, href: 'reporting.html' }
      ]
    }
  ];

  const singleLinks: NavLink[] = [
    { label: 'Mon Profil', icon: faUser, href: 'profil.html' },
    { label: 'Paramètres', icon: faCogs, href: 'parametres.html' },
    { label: 'Personnaliser ma Fiche', icon: faPaintBrush, href: 'choix-template.html' },
    { label: 'Déconnexion', icon: faSignOutAlt, href: 'index.html' }
  ];

  return (
    <nav className="side-nav">
      <a href="dashboard.html" className="nav-link active">
        <FontAwesomeIcon icon={faTachometerAlt} />
        <span>Dashboard</span>
      </a>

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
