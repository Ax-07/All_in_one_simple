import React from "react";

/**
 * T représente le type de vos options. Il peut s’agir de n’importe quel objet
 * tant que vous savez extraire un label et une valeur grâce aux callbacks.
 */
interface GenericSelectProps<T> {
  /**
   * Tableau d’options (par exemple, [{ id: 1, name: "A" }, { id: 2, name: "B" }])
   */
  options: T[];

  /**
   * Fonction pour récupérer la "value" d’une option (ex: option => option.id)
   * => Doit retourner un string ou number (pour <option value="...">).
   */
  getOptionValue: (option: T) => string | number;

  /**
   * Fonction pour récupérer le label d’une option (ex: option => option.name)
   * => Sera le texte affiché dans la liste déroulante.
   */
  getOptionLabel: (option: T) => string;

  /**
   * Valeur actuellement sélectionnée
   */
  value: T | null;

  /**
   * Callback lorsqu’une nouvelle option est sélectionnée
   */
  onChange: (newValue: T | null) => void;

  /**
   * Label pour le champ (optionnel)
   */
  label?: string;

  /**
   * Placeholder pour le champ (optionnel)
   */
  placeholder?: string;

  /**
   * Désactive le select (optionnel)
   */
  disabled?: boolean;
}

/**
 * Composant générique pour un champ de type "select" (liste déroulante)
 * @param props Les propriétés du composant
 * @returns JSX.Element
 * @template T
 * @example
 * ```tsx
 * <Select
 *  options={[{ id: 1, name: "A" }, { id: 2, name: "B" }]}
 *  getOptionValue={option => option.id}
 *  getOptionLabel={option => option.name}
 *  value={selectedOption}
 *  onChange={setSelectedOption}
 *  label="Choisissez une option"
 *  placeholder="Sélectionnez une option"
 *  disabled={false}
 * />
 */
function Select<T>(props: GenericSelectProps<T>) {
  const {
    options,
    getOptionValue,
    getOptionLabel,
    value,
    onChange,
    label,
    placeholder,
    disabled,
  } = props;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (!selectedValue) {
      // L’utilisateur a choisi l’option "vide"
      onChange(null);
    } else {
      // On retrouve l’objet option correspondant
      const selectedOption = options.find(
        (option) => String(getOptionValue(option)) === selectedValue
      );
      onChange(selectedOption || null);
    }
  };

  return (
    <div className="generic-select">
      {label && <label className="generic-select__label">{label}</label>}

      <select
        className="generic-select__input"
        value={value ? String(getOptionValue(value)) : ""}
        onChange={handleSelectChange}
        disabled={disabled}
      >
        {/* Option vide pour placeholder */}
        {placeholder && <option value="">{placeholder}</option>}

        {options.map((option) => {
          const optValue = getOptionValue(option);
          const optLabel = getOptionLabel(option);
          return (
            <option key={optValue} value={optValue}>
              {optLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
