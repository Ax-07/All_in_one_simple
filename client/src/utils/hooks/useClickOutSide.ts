import { useEffect, RefObject } from 'react';

/**
 * Hook personnalisé qui détecte les clics à l'extérieur d'un élément DOM référencé
 * et exécute un callback lorsqu'un clic est détecté en dehors de cet élément.
 * 
 * @param {RefObject<HTMLElement>} ref - Référence à l'élément DOM surveillé.
 * @param {() => void} callback - Fonction à exécuter lorsqu'un clic est détecté en dehors de l'élément.
 * 
 * @example
 * const ref = useRef(null);
 * useClickOutside(ref, () => {
 *   console.log("Clic en dehors de l'élément détecté !");
 * });
 * 
 * return <div ref={ref}>Cliquez en dehors de moi !</div>;
 */
export const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void): void => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    // Ajout de l'écouteur d'événements pour les clics
    document.addEventListener('mousedown', handleClick);

    // Nettoyage de l'écouteur d'événements lors du démontage
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]); // Ajout des dépendances pour éviter une exécution répétée
};
