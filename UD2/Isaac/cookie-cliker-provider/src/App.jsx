import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GameProvider } from "./GameContext";




import CookieAction from "./CookieAction";
import Mejoras from "./Mejoras";
import PanelInfo from "./PanelInfo";



export default function App() {

  return (
    <>
      <GameProvider>
        <PanelInfo />
        <br />
        <CookieAction />
        <br />
        <Mejoras />
        <br />

      </GameProvider>
    </>
  );
}






