import React from 'react';
// import '../styles/Pricing.scss';

const Contact: React.FC = () => {
  return (
      <section className="contact" id="contact">
        <h2>Contactez-Nous</h2>
        <form action="#" method="post">
          <input type="text" name="name" id="name" placeholder="Votre Nom" required />
          <input type="email" name="email" id="email" placeholder="Votre Email" required />
          <input type="text" name="subject" id="subject" placeholder="Objet" required />
          <textarea name="message" id="message" rows={5} placeholder="Votre Message" required></textarea>
          <button type="submit">Envoyer</button>
        </form>
      </section>
  );
};

export default Contact;
