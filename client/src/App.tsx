import SideNav from "./layouts/Sidenav/Sidenav"

function App() {

  return (
    <>
      <aside className="sidebar">
        <SideNav />
      </aside>
      <main className="dashboard-content">
        hello world
      </main>
    </>
  )
}

export default App
