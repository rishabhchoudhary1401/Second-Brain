import { useState } from "react";
import { PlusIcon } from "./components/icons/Plus.tsx";
import { ShareIcon } from "./components/icons/share.tsx";
import Button from "./components/ui/Button.tsx";
import DarkButton from "./components/ui/Button.tsx";
import {Card} from "./components/ui/Card.tsx";
import { CreateContentModal } from "./components/ui/CreateContentModal.tsx";
import { SideBar } from "./components/ui/SideBar.tsx";

function App() {
  const [createModal, setCreateModal] = useState(false);
  return <>
    <CreateContentModal opened={createModal} onClose={() => {setCreateModal(false)}} />
    <SideBar />
    <div>
        {/* header  */}
      <div className="flex justify-end">
        <div className="m-2"><Button text = "Add Content" variant="primary" startIcon={<PlusIcon size={2}/>} onClick={() => {setCreateModal(true);}} /></div>
        <div className="m-2"><Button text = " Share Brain" variant="secondary" startIcon={<ShareIcon size={1} />} /></div>
      </div>
      {/* content */}
      <div className="flex ">
        <Card title="Youtube Video" type="youtube" link="https://www.youtube.com/watch?v=F_Kflq6ZFp0&list=RDYsB4Vhlv8ns&index=20" tags= {["youtube", "kale sheeshe"]} />
        <Card title="Trendin tweet" type="twitter" link="https://x.com/fearlessfella7/status/2104217940203917517?s=20" tags= {["twittor", "trending...."]} />
      </div>
    </div>
  </>
}

export default App;

