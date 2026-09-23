export function NavBar(){
    return <div className="border flex">
        <Header />
        <NavBarContents />
    </div>
}
import logo from "../assets/logo.png";
function Header() {
  return (
    <div className="flex">
      <div className="w-10 h-10 m-2 border">
        <img src={logo} alt="Second Brain Logo" />
      </div>
      <div className="flex items-center justify-center m-2 ml-0 pl-0 border p-1 h-10">
        <h1 className="font-bold text-2xl">Second Brain</h1>
      </div>
    </div>
  );
}

function NavBarContents() {
  return <div></div>;
}