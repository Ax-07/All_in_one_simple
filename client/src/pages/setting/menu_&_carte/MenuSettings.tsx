// MenuSettings.tsx
import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, store } from "../../../stores/store";
import { addDocument, removeDocument, updateDocument, updateMenuSettings } from "./menuSettingsSlice";


const MenuSettings: FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { showMenuOnline, showWineList, documents } = useSelector(
    (state: RootState) => state.menuSettings.menuSettings
  );

  // Gestion des cases à cocher
  const handleShowMenuOnline = (checked: boolean) => {
    console.log('checked', checked);
    dispatch(updateMenuSettings({ field: "showMenuOnline", value: checked }));
  };

  const handleShowWineList = (checked: boolean) => {
    dispatch(updateMenuSettings({ field: "showWineList", value: checked }));
  };

  // Ajouter un nouveau document
  const handleAddDocument = () => {
    dispatch(
      addDocument({
        type: "menu",
        fileName: "",
        url: "",
      })
    );
  };

  // Mettre à jour un document existant
  const handleUpdateDocumentType = (index: number, newType: string) => {
    dispatch(updateDocument({ index, data: { type: newType } }));
  };

  const handleUpdateDocumentURL = (index: number, newURL: string) => {
    dispatch(updateDocument({ index, data: { url: newURL } }));
  };

  const handleUpdateDocumentFileName = (index: number, newName: string) => {
    dispatch(updateDocument({ index, data: { fileName: newName } }));
  };

  // Supprimer un document
  const handleRemoveDocument = (index: number) => {
    dispatch(removeDocument(index));
  };

  return (
    <div className="settings-block">
      <h2>Menu &amp; Carte</h2>
      <p className="section-desc">
        Gérez l’affichage de votre menu, de votre carte des vins, et importez plusieurs
        documents PDF (menus, cartes, boissons, vins) pour vos clients.
      </p>

      {/* Cases à cocher */}
      <div className="menu-options">
        <h3>Options d’Affichage</h3>
        <p className="section-desc">
          Contrôlez la visibilité du menu et de la carte des vins sur votre page.
        </p>
        <label className="check-label">
          <input
            type="checkbox"
            name="show-menu-online"
            checked={showMenuOnline}
            onChange={(e) => handleShowMenuOnline(e.target.checked)}
          />
          Afficher le menu en ligne
        </label>
        <label className="check-label">
          <input
            type="checkbox"
            name="show-wine-list"
            checked={showWineList}
            onChange={(e) => handleShowWineList(e.target.checked)}
          />
          Afficher la carte des vins
        </label>
      </div>

      {/* Gestion des documents PDF */}
      <div className="menu-documents-section">
        <h3>Documents PDF</h3>
        <p className="section-desc">
          Ajoutez autant de documents PDF que nécessaire. Choisissez le type de document,
          puis importez un fichier PDF ou fournissez une URL.
        </p>

        <div id="documents-container">
          {/* Liste dynamique des documents dans le store */}
          {documents.map((doc, index) => (
            <div key={index} className="document-row">
              <div className="document-type">
                <label>Type de document :</label>
                <select
                  name={`document-type-${index}`}
                  value={doc.type}
                  onChange={(e) => handleUpdateDocumentType(index, e.target.value)}
                >
                  <option value="menu">Menu</option>
                  <option value="carte">Carte</option>
                  <option value="boissons">Carte des Boissons</option>
                  <option value="vins">Carte des Vins</option>
                </select>
              </div>

              <div className="document-inputs">
                <label>Fichier PDF :</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      // Récupérez le nom du fichier
                      const fileName = e.target.files[0].name;
                      handleUpdateDocumentFileName(index, fileName);
                    }
                  }}
                />

                <span className="or-text">OU</span>

                <label>URL du PDF :</label>
                <input
                  type="url"
                  value={doc.url}
                  placeholder="https://example.com/document.pdf"
                  onChange={(e) => handleUpdateDocumentURL(index, e.target.value)}
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemoveDocument(index)}
                style={{ marginLeft: "1rem" }}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>

        <button type="button" className="btn-secondary" onClick={handleAddDocument}>
          + Ajouter un document
        </button>
      </div>
    </div>
  );
};

export default MenuSettings;
