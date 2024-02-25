import { useSettings } from "../context/SettingsContext";
import { Box } from "../models/box";

function BoxesStateOutput(boxes: Box[]) {
  let { settings, setSettings } = useSettings();

  const boxOutput = boxes.map(
    (box) =>
      `{"x": ${box.x}, "y": ${settings.paletteHeight - box.y}, "r": ${box.r}}`
  );
  const boxOutputString = `[${boxOutput.join(", ")}]`;
  return (
    <div
      className="d-flex flex-grow-1"
      style={{
        position: "relative",
        background: "lightgrey",
        outline: "2px solid black",
        outlineOffset: "-2px",
        width: "100%", // Take full width of the container
        height: "100%",
        minHeight: "100px", // Minimum height for visibility
        minWidth: "100px", // Minimum height for visibility
      }}
    >
      {boxOutputString}
    </div>
  );
}

export default BoxesStateOutput;
