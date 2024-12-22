import React, { useState } from "react";
import type { FunctionComponent } from "react";

interface UserProfile {
  userName: string;
  userMail: string;
  restaurantName: string;
  restaurantAddress: string;
  restaurantDescription: string;
  restaurantCoverImage: string;
}

const Profil: FunctionComponent = () => {
  const [formData, setFormData] = useState<UserProfile>({
    userName: "Martin",
    userMail: "contact@legourmet.fr",
    restaurantName: "Le Gourmet",
    restaurantAddress: "123 Rue de la Paix, Paris",
    restaurantDescription: "Le Gourmet est un restaurant français proposant une cuisine raffinée, avec des produits frais et locaux.",
    restaurantCoverImage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, restaurantCoverImage: e.target.files[0].name });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Mon Profil</h1>
          <p>Gérez les informations de votre restaurant</p>
        </div>
        <div className="header-right">
          <img
            src="chef-avatar.jpg"
            alt="Avatar du restaurateur Martin"
            className="avatar"
            loading="lazy"
          />
        </div>
      </header>

      <section className="profile-section">
        <form className="profile-form" onSubmit={handleSubmit}>
          <label htmlFor="restaurantName">Nom du Restaurant :</label>
          <input
            type="text"
            id="restaurantName"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            required
          />

          <label htmlFor="userName">Nom du Propriétaire :</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />

          <label htmlFor="userMail">Email de contact :</label>
          <input
            type="email"
            id="userMail"
            name="userMail"
            value={formData.userMail}
            onChange={handleChange}
            required
          />

          <label htmlFor="restaurantAddress">Adresse :</label>
          <input
            type="text"
            id="restaurantAddress"
            name="restaurantAddress"
            value={formData.restaurantAddress}
            onChange={handleChange}
            required
          />

          <label htmlFor="restaurantDescription">Description :</label>
          <textarea
            id="restaurantDescription"
            name="restaurantDescription"
            rows={5}
            value={formData.restaurantDescription}
            onChange={handleChange}
          />

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
    </>
  );
};

export default Profil;
