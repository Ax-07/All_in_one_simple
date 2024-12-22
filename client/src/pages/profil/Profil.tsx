import type { FunctionComponent } from 'react';

const user = {
  user_name: "Martin",
  user_mail: "",
  restaurant_name : "Le Gourmet",
  restaurant_address: "",
  restaurant_description: "",
  restaurant_cover_image: "",

}
const Profil: FunctionComponent = () => {
  return (
    <>
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Mon Profil</h1>
          <p>Gérez les informations de votre restaurant</p>
        </div>
        <div className="header-right">
          <img src="chef-avatar.jpg" alt="Avatar du restaurateur" className="avatar" loading="lazy"/>
        </div>
    </header>

    <section className="profile-section">
      <form className="profile-form">
        <label htmlFor="restaurant-name">Nom du Restaurant :</label>
        <input type="text" id="restaurant-name" name="restaurant-name" value="Le Gourmet" required/>

        <label htmlFor="owner-name">Nom du Propriétaire :</label>
        <input type="text" id="owner-name" name="owner-name" value="Chef Martin" required/>

        <label htmlFor="email">Email de contact :</label>
        <input type="email" id="email" name="email" value="contact@legourmet.fr" required/>

        <label htmlFor="address">Adresse :</label>
        <input type="text" id="address" name="address" value="123 Rue de la Paix, Paris" required/>

        <label htmlFor="description">Description :</label>
        <textarea id="description" name="description"
          rows={5}>Le Gourmet est un restaurant français proposant une cuisine raffinée, avec des produits frais et locaux.</textarea>

        <label htmlFor="cover-image">Image de couverture :</label>
        <input type="file" id="cover-image" name="cover-image" accept="image/*"/>

        <button type="submit">Enregistrer les modifications</button>
      </form>
    </section>
    </>
  );
};

export default Profil;
