// src/components/Palette.tsx
import { useSettings } from "../context/SettingsContext";
import { Palette as PaletteType } from "../models/palette";
import BoxComponent from "./Box";

interface PaletteProps {
  palette: PaletteType;
  updateBoxPosition: (id: string, newX: number, newY: number) => void; // Method to update the box's position in the state
  updateBoxRotation: (id: string, newRotation: number) => void;
  deleteBox: (id: string) => void;
}

function Palette({
  palette,
  updateBoxPosition,
  updateBoxRotation,
  deleteBox,
}: PaletteProps) {
  let { settings, setSettings } = useSettings();

  return (
    <div
      style={{
        flex: "none",
        position: "relative",
        width: settings.paletteWidth,
        height: settings.paletteHeight,
        background: "lightgrey",
        outline: "2px solid lightgrey",
      }}
    >
      {palette.boxes.map((box) => (
        <BoxComponent
          key={box.id}
          box={box}
          onMove={updateBoxPosition}
          updateBoxRotation={updateBoxRotation}
          deleteBox={deleteBox}
          palette={palette}
        />
      ))}
    </div>
  );
}

export default Palette;
