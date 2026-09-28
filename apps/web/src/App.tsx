import { SideBar } from "./components/ui/SideBar.tsx";
import { Header } from "./components/ui/HomeContent.tsx";

function App() {
  
  return <>
    
    <div className="flex h-screen">
      <SideBar />
      
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6">
          
        </main>
      </div>
    </div>
   
  </>
}

export default App;

