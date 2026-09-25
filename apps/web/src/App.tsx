import { PlusIcon } from "./components/icons/Plus.tsx";
import { ShareIcon } from "./components/icons/share.tsx";
import Button from "./components/ui/Button.tsx";
import DarkButton from "./components/ui/Button.tsx";
import {Card} from "./components/ui/Card.tsx";

function App() {
  return <>
  <Button text="Button" startIcon= <ShareIcon size={1}/> variant="secondary" />
  <Button text="Button" startIcon= <PlusIcon size={2}/> />
    {/* <DarkButton type = "secondary" onClick = {() => {console.log("Hi there...");}} buttonText="Hello"></DarkButton> */}
    <Card type = "youtube" link = "https://www.youtube.com/watch?v=YsB4Vhlv8ns&list=RDYsB4Vhlv8ns&start_radio=1" title="Youtube Video" />
    
  </>
}

export default App;

