import SideNav from "./layouts/Sidenav/Sidenav"
import { Routes, Route, useLocation } from "react-router-dom"
import Pages from "./pages"
import { useEffect, useState } from "react"
import { useScrollToHashElement } from "./utils/hooks/useScrollToHashElement"

function App() {
  const [isHome, setIsHome] = useState<boolean>(false)
  const location = useLocation()
  useScrollToHashElement()
  useEffect(() => {
    if (location.pathname === '/') {
      setIsHome(true)
    } else {
      setIsHome(false)
    }
  }, [location.pathname])

  return (
    <>
      {!isHome && 
        <aside className="sidebar">
          <SideNav />
        </aside>
      }
      <main className={`${isHome ? '' : 'dashboard-content'}`}>
        <Routes>
          <Route path="/" element={<Pages.Home />} />
          <Route path="/dashboard" element={<Pages.Dashboard />} />

          {/* Gestion Opérationnelle */}
          <Route path="/reservations" element={<Pages.Reservations />} />
          <Route path="/config-plats-menus" element={<Pages.Config_plats_menus />} />
          <Route path="/caisse" element={<Pages.Caisse />} />
          <Route path="/suivi-ventes" element={<Pages.Suivi_ventes />} />
          
          {/* Gestion des Stocks */}
          <Route path="/gestion-produits" element={<Pages.Gestion_produits />} />
          <Route path="/gestion-stocks" element={<Pages.Gestion_stocks />} />
          <Route path="/gestion-commandes" element={<Pages.Gestion_commandes />} />
          <Route path="/gestion-fournisseurs" element={<Pages.Gestion_fournisseurs />} />
          
          {/* Ressources Humaines */}
          <Route path="/gestion-employes" element={<Pages.Gestion_employes />} />
          <Route path="/gestion_salaires" element={<Pages.Gestion_salaires />} />
          
          {/* Marketing */}
          <Route path="/gestion-clients" element={<Pages.Gestion_clients />} />
          <Route path="/gestion-promotions" element={<Pages.Gestion_promotions />} />
          
          {/* Support */}
          <Route path="/support-assistance" element={<Pages.Support_assistance />} />
          <Route path="/gestion-feedbacks" element={<Pages.Gestion_feedbacks />} />
          
          {/* Reporting */}
          <Route path="/reporting" element={<Pages.Reporting />} />
          
          {/* SingleLinks */}
          <Route path="/profil" element={<Pages.Profil />} />
          <Route path="/parametres" element={<Pages.Parametres />} />
          <Route path="/choix-template" element={<Pages.Choix_template />} />
        </Routes>
      </main>
    </>
  )
}

export default App
