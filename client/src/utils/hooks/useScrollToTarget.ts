import { useEffect } from "react";

/**
 * Hook personnalisé React qui permet de scroller de manière fluide vers des sections cibles
 * lors du clic sur des liens de navigation. Il ajoute également une classe "active" au lien cliqué
 * et la retire des autres liens.
 *
 * Ce hook suppose que les liens ont la classe `.nav-section__link` et contiennent un attribut 
 * `data-target` pointant vers l'ID de la section cible (exemple : `#about`).
 * 
 * @example
 * // Structure HTML :
 * <nav class="nav-section">
 *   <a href="#about" data-target="#about" class="nav-section__link">À propos</a>
 *   <a href="#services" data-target="#services" class="nav-section__link">Services</a>
 *   <a href="#contact" data-target="#contact" class="nav-section__link">Contact</a>
 * </nav>
 * 
 * <section id="about">...</section>
 * <section id="services">...</section>
 * <section id="contact">...</section>
 * 
 * // Dans votre composant React :
 * const MonComposant = () => {
 *   useScrollToTarget();
 *   
 *   return (
 *     <nav className="nav-section">
 *       <a href="#about" data-target="#about" className="nav-section__link">À propos</a>
 *       <a href="#services" data-target="#services" className="nav-section__link">Services</a>
 *       <a href="#contact" data-target="#contact" className="nav-section__link">Contact</a>
 *     </nav>
 *   );
 * };
 * 
 * @returns {void}
 */

export const useScrollToTarget = () => {
  useEffect(() => {
    const navContainer = document.querySelector('.nav-section');
    
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;

      // Vérification si le click vient d'un lien avec la classe 'nav-section__link'
      if (target && target.classList.contains('nav-section__link')) {
        e.preventDefault();

        // Récupération de l'identifiant de la section cible
        const targetId = target.getAttribute('data-target'); 
        const targetSection = document.querySelector(targetId as string);

        // Gérer l'état 'active' pour les liens
        const links = navContainer?.querySelectorAll('.nav-section__link');
        links?.forEach(link => {
          link.classList.remove('active');
        });
        target.classList.add('active');

        // Si la section cible existe, on scrolle avec un comportement fluide
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: "start"
          });
        }
      }
    };

    // Vérification que le conteneur existe avant d'ajouter l'écouteur d'événements
    if (navContainer) {
      navContainer.addEventListener('click', handleLinkClick);
    }

    // Nettoyage lors du démontage du composant
    return () => {
      if (navContainer) {
        navContainer.removeEventListener('click', handleLinkClick);
      }
    };
  }, []);
};
