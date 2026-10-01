import { Header, SideBar } from "../components/ui/index"

export function DashBoard(){
    return <div className="flex h-screen">
        <SideBar />
      
      <div className="flex-1 flex flex-col bg-slate-100">
        <Header />

        <main className="flex-1 p-6">
          
        </main>
      </div>
    </div>
}