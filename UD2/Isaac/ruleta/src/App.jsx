import './App.css'
import Ruleta from './Ruleta'
import Tablero from './Tablero'

import { RuletaProvider } from './RuletaContext';
import Dineros from './Dineros';

function App() {

  return (
    <>
      <RuletaProvider>
        <div class="container text-center">
          <div class="row">
            <Ruleta />
            <Dineros />
          </div>
          <Tablero />
        </div>
      </RuletaProvider>
    </>
  )
}

export default App
