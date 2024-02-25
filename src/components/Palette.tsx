// src/components/Palette.tsx
import { useSettings } from "../context/SettingsContext";
import { Palette as PaletteType } from "../models/palette";
import BoxComponent from "./Box";

interface PaletteProps {
  palette: PaletteType;
  updateBoxPosition: (id: string, newX: number, newY: number) => void;
  updateBoxRotation: (id: string, newRotation: number) => void;
  deleteBox: (id: string) => void;
}

function Palette({
  palette,
  updateBoxPosition,
  updateBoxRotation,
  deleteBox,
}: PaletteProps) {
  let { settings } = useSettings();

  return (
    <div
      className="d-flex flex-wrap position-relative"
      style={{
        // Palette dimensions
        width: `${settings.paletteWidth}px`,
        height: `${settings.paletteHeight}px`,

        background: "#f8f9fa", // Bootstrap's light grey background
        border: "2px solid #dee2e6", // Bootstrap's grey border for contrast
        padding: "10px",
        boxSizing: "border-box", // Ensures padding does not affect overall dimensions
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
