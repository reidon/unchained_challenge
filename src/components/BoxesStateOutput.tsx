import { useSettings } from "../context/SettingsContext";
import { Box } from "../models/box";

function BoxesStateOutput(boxes: Box[]) {
  let { settings } = useSettings();

  const boxOutput = boxes.map(
    (box) =>
      `{"x": ${box.x}, "y": ${settings.paletteHeight - box.y}, "r": ${box.r}}`
  );
  const boxOutputString = `[${boxOutput.join(", ")}]`;
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div
            className="p-3 bg-light border rounded"
            style={{
              whiteSpace: "pre-wrap", // Ensures line breaks and spaces are respected
              maxHeight: "400px",
              overflowY: "auto", // Allows scrolling within the box if content is too long
            }}
          >
            {boxOutputString}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxesStateOutput;
