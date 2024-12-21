import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook personnalisé qui fait défiler vers un élément spécifique dans la page
 * en fonction du hash présent dans l'URL (ex: #section1).
 * 
 * Utilise un MutationObserver pour s'assurer que l'élément est présent dans le DOM
 * avant de tenter de faire défiler la page.
 * 
 * @example
 * // URL: https://monsite.com/#about
 * // Si un élément avec l'ID "about" existe, la page défilera automatiquement vers cet élément.
 * 
 * @returns {void}
 */
export const useScrollToHashElement = (): void => {
  const location = useLocation();

  useEffect(() => {
    const elementId = location.hash.slice(1); // Supprime le caractère '#'
    
    if (!elementId) return; // Si pas de hash, ne rien faire

    // Fonction qui tente de faire défiler vers l'élément cible
    const scrollToElement = () => {
      const element = document.getElementById(elementId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", inline: "nearest" });
      }
    };

    // Tente de trouver l'élément immédiatement
    scrollToElement();

    // Utilise MutationObserver pour surveiller l'ajout d'éléments dans le DOM
    const observer = new MutationObserver(() => {
      scrollToElement();
    });

    // Surveille les modifications dans tout le document
    observer.observe(document.body, { childList: true, subtree: true });

    // Nettoyage lorsque le composant est démonté
    return () => {
      observer.disconnect();
    };
  }, [location]);
};
