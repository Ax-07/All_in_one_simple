import type { FunctionComponent } from "react";

const Reporting: FunctionComponent = () => {
  return (
    <div>
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Reporting et Analyses</h1>
          <p>Bienvenue, Chef Martin</p>
        </div>
        <div className="header-right">
          <img
            src="chef-avatar.jpg"
            alt="Avatar du restaurateur"
            className="avatar"
            loading="lazy"
          />
        </div>
      </header>
      <div className="main-section">
      {/* Reporting et Analyses */}
      <section className="advanced-reporting">
        <h2>Rapports et Analyses</h2>
        
        <div className="report-controls">
          <label htmlFor="report-type">Type de Rapport :</label>
          <select id="report-type">
            <option value="">Sélectionner un type</option>
            <option value="sales">Ventes</option>
            <option value="financial">Financier</option>
            <option value="stock">Stocks</option>
          </select>
          
          <label htmlFor="report-start-date">Date de Début :</label>
          <input type="date" id="report-start-date"/>

          <label htmlFor="report-end-date">Date de Fin :</label>
          <input type="date" id="report-end-date"/>
          
          <button id="generate-report-btn">Générer le Rapport</button>
        </div>

        <div className="chart-container">
          <canvas id="report-chart"></canvas>
        </div>
      </section>
    </div>
    </div>
  );
};

export default Reporting;
