import Palette from "./components/Palette";
import { Palette as PaletteType } from "./models/palette";

function App() {
  const initialPalette: PaletteType = {
    width: 1200,
    height: 800,
  };

  return (
    <div className="App">
      <Palette palette={initialPalette} />
    </div>
  );
}

export default App;
