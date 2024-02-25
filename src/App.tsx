import { useState } from "react";
import Palette from "./components/Palette";
import BoxesStateOutput from "./components/BoxesStateOutput";
import Menu from "./components/Menu";
import { Box } from "./models/box";
import { useSettings } from "./context/SettingsContext";

function App() {
  const { settings } = useSettings();

  // Room for improvement: I could've moved the boxes into the settings model
  let [boxes, setBoxes] = useState<Box[]>([]);

  function addBox() {
    const newBox: Box = {
      id: generateUniqueId(),
      x: settings.boxWidth / 2,
      y: settings.boxHeight / 2,
      r: 0,
    };
    setBoxes([...boxes, newBox]);
  }

  // Generate a unique ID based on the current timestamp and a random number
  function generateUniqueId() {
    return `box-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
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
    <div className="container-fluid d-flex flex-column">
      {/* Menu Row */}
      <div className="d-flex flex-wrap align-items-center">
        <div className="p-2">
          <Menu addBox={addBox} deleteAllBoxes={deleteAllBoxes} boxes={boxes} />
        </div>
        {/* Output Area */}
        <div className="d-flex justify-content-center align-items-center p-2">
          {BoxesStateOutput(boxes)}
        </div>
      </div>

      {/* Palette Row */}
      <div className="row flex-grow-1 overflow-hidden">
        <div className="col p-2 border">
          <Palette
            palette={{
              boxes: boxes,
            }}
            updateBoxPosition={updateBoxPosition}
            updateBoxRotation={updateBoxRotation}
            deleteBox={deleteBox}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
