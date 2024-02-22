// src/components/Palette.tsx
import { Palette as PaletteType } from "../models/palette";

interface PaletteProps {
  palette: PaletteType;
}

function Palette({ palette }: PaletteProps) {
  return (
    <div
      style={{
        width: palette.width,
        height: palette.height,
        background: "lightgrey",
      }}
    >
      {/* Boxes will be rendered here */}
    </div>
  );
}

export default Palette;
