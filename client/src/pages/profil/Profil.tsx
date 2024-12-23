import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile, updateField } from "./profileSlice";
import type { RootState, AppDispatch } from "../../stores/store";

const Profil: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.profile);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof data, string>>>({});

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof typeof data, string>> = {};

    if (!data.restaurantName.trim()) {
      newErrors.restaurantName = "Le nom du restaurant est requis.";
    }
    if (!data.userName.trim()) {
      newErrors.userName = "Le nom du propriétaire est requis.";
    }
    if (!data.userMail.trim() || !/\S+@\S+\.\S+/.test(data.userMail)) {
      newErrors.userMail = "Une adresse email valide est requise.";
    }
    if (!data.restaurantAddress.trim()) {
      newErrors.restaurantAddress = "L'adresse est requise.";
    }
    if (!data.restaurantDescription.trim()) {
      newErrors.restaurantDescription = "La description est requise.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch(updateField({ field: "restaurantCoverImage", value: e.target.files[0].name }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Modifications enregistrées !");
      console.log("Données finales :", data);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <section className="profile-section">
      <form className="profile-form" onSubmit={handleSubmit}>
        <label htmlFor="restaurantName">Nom du Restaurant :</label>
        <input
          type="text"
          id="restaurantName"
          name="restaurantName"
          value={data.restaurantName}
          onChange={handleChange}
          required
        />
        {errors.restaurantName && <span className="error-message">{errors.restaurantName}</span>}

        <label htmlFor="userName">Nom du Propriétaire :</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={data.userName}
          onChange={handleChange}
          required
        />
        {errors.userName && <span className="error-message">{errors.userName}</span>}

        <label htmlFor="userMail">Email de contact :</label>
        <input
          type="email"
          id="userMail"
          name="userMail"
          value={data.userMail}
          onChange={handleChange}
          required
        />
        {errors.userMail && <span className="error-message">{errors.userMail}</span>}

        <label htmlFor="restaurantAddress">Adresse :</label>
        <input
          type="text"
          id="restaurantAddress"
          name="restaurantAddress"
          value={data.restaurantAddress}
          onChange={handleChange}
          required
        />
        {errors.restaurantAddress && <span className="error-message">{errors.restaurantAddress}</span>}

        <label htmlFor="restaurantDescription">Description :</label>
        <textarea
          id="restaurantDescription"
          name="restaurantDescription"
          rows={5}
          value={data.restaurantDescription}
          onChange={handleChange}
        />
        {errors.restaurantDescription && (
          <span className="error-message">{errors.restaurantDescription}</span>
        )}

        <label htmlFor="restaurantCoverImage">Image de couverture :</label>
        <input
          type="file"
          id="restaurantCoverImage"
          name="restaurantCoverImage"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button type="submit">Enregistrer les modifications</button>
      </form>
    </section>
  );
};

export default Profil;
