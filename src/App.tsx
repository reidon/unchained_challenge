import { useState } from "react";
import Palette from "./components/Palette";
import BoxesStateOutput from "./components/BoxesStateOutput";
import Menu from "./components/Menu";
// import { Palette as PaletteType } from "./models/palette";
import { Box } from "./models/box";
import { useSettings } from "./context/SettingsContext";

function App() {
  const { settings } = useSettings();

  let [boxes, setBoxes] = useState<Box[]>([]);

  function generateUniqueId() {
    // Generate a unique ID based on the current timestamp and a random number
    return `box-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }

  function addBox() {
    const newBox: Box = {
      id: generateUniqueId(),
      x: settings.boxWidth / 2,
      y: settings.boxHeight / 2,
      r: 0,
    };
    setBoxes([...boxes, newBox]);
  }

  const deleteBox = (id: string) => {
    setBoxes(boxes.filter((box) => box.id !== id));
  };

  const deleteAllBoxes = () => {
    setBoxes([]);
  };

  const updateBoxPosition = (id: string, newX: number, newY: number) => {
    const updatedBoxes = boxes.map((box) => {
      if (box.id === id) {
        return { ...box, x: newX, y: newY };
      }
      return box;
    });
    setBoxes(updatedBoxes);
  };

  const updateBoxRotation = (id: string, newRotation: number) => {
    const updatedBoxes = boxes.map((box) => {
      if (box.id === id) {
        return { ...box, r: newRotation };
      }
      return box;
    });
    setBoxes(updatedBoxes);
  };

  return (
    <div className="container-fluid d-flex flex-column vh-100">
      <div className="row flex-grow-1">
        <Menu addBox={addBox} deleteAllBoxes={deleteAllBoxes} boxes={boxes} />
      </div>
      <div className="row flex-grow-1">
        <div className="col border">
          <Palette
            palette={{
              boxes: boxes,
            }}
            updateBoxPosition={updateBoxPosition}
            updateBoxRotation={updateBoxRotation}
            deleteBox={deleteBox}
          />
        </div>
        {/* <div className="col border">
          <Menu addBox={addBox} boxes={boxes} />
        </div> */}
      </div>
      <div className="row flex-grow-1">
        <div className="col border">{BoxesStateOutput(boxes)}</div>
      </div>
    </div>
  );
}

export default App;
