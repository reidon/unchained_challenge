import { useSettings } from "../context/SettingsContext";
import { Box } from "../models/box";

interface MenuComponentProps {
  addBox: () => void;
  deleteAllBoxes: () => void;
  boxes: Box[];
}

function Menu(props: MenuComponentProps) {
  let { settings, setSettings } = useSettings();

  // Function to handle changing the box width
  const handleBoxWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure the value is within the allowed range
    const newWidth = Math.max(
      0,
      Math.min(settings.paletteWidth, parseInt(event.target.value, 10) || 0)
    );
    setSettings((currentSettings) => ({
      ...currentSettings,
      boxWidth: newWidth,
    }));
  };

  // Function to handle changing the box height
  const handleBoxHeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Ensure the value is within the allowed range
    const newHeight = Math.max(
      0,
      Math.min(settings.paletteHeight, parseInt(event.target.value, 10) || 0)
    );
    setSettings((currentSettings) => ({
      ...currentSettings,
      boxHeight: newHeight,
    }));
  };

  const handlePaletteHeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Ensure the value is within the allowed range
    // const newHeight = Math.max(
    //   0,
    //   Math.min(settings.paletteHeight, parseInt(event.target.value, 10) || 0)
    // );
    const newHeight = parseInt(event.target.value, 10);
    setSettings((currentSettings) => ({
      ...currentSettings,
      paletteHeight: newHeight,
    }));
  };

  const handlePaletteWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Ensure the value is within the allowed range
    // const newHeight = Math.max(
    //   0,
    //   Math.min(settings.paletteHeight, parseInt(event.target.value, 10) || 0)
    // );
    const newWidth = parseInt(event.target.value, 10);
    setSettings((currentSettings) => ({
      ...currentSettings,
      paletteWidth: newWidth,
    }));
  };

  return (
    <div
      className="d-flex flex-grow-1"
      style={{
        position: "relative",
      }}
    >
      <div className="btn-group" role="group" aria-label="Settings Buttons">
        <button
          type="button"
          className="btn btn-primary"
          onClick={props.addBox}
        >
          Add Box
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={props.deleteAllBoxes}
        >
          Delete All
        </button>
        {/* <button type="button" className="btn btn-primary">
          Auto
        </button> */}
      </div>
      <div className="input-group">
        <span className="input-group-text">Box Width</span>
        <input
          type="number"
          className="form-control"
          placeholder="Box Width"
          aria-label="Box Width"
          defaultValue={settings.boxWidth}
          onChange={handleBoxWidthChange}
          min={0}
          max={settings.paletteWidth} // Ensure boxWidth cannot exceed paletteWidth
        />
      </div>
      <div className="input-group">
        <span className="input-group-text">Box Height</span>
        <input
          type="number"
          className="form-control"
          placeholder="Box Height"
          aria-label="Box Height"
          defaultValue={settings.boxHeight}
          onChange={handleBoxHeightChange}
          min={0}
          max={settings.paletteHeight} // Ensure boxHeight cannot exceed paletteHeight
        />
      </div>
      <div className="input-group">
        <span className="input-group-text">Palette Width</span>
        <input
          type="number"
          className="form-control"
          placeholder="Palette Width"
          aria-label="Palette Width"
          defaultValue={settings.paletteWidth}
          onChange={handlePaletteWidthChange}
          min={0}
          //max={settings.paletteWidth} // Ensure boxWidth cannot exceed paletteWidth
        />
      </div>
      <div className="input-group">
        <span className="input-group-text">Palette Height</span>
        <input
          type="number"
          className="form-control"
          placeholder="Palette Height"
          aria-label="Palette Height"
          defaultValue={settings.paletteHeight}
          onChange={handlePaletteHeightChange}
          min={0}
          //max={settings.paletteWidth} // Ensure boxWidth cannot exceed paletteWidth
        />
      </div>
    </div>
  );
}

export default Menu;
