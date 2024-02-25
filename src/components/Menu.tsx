import { useSettings } from "../context/SettingsContext";
import { Box } from "../models/box";

interface MenuComponentProps {
  addBox: () => void;
  deleteAllBoxes: () => void;
  boxes: Box[];
}

function Menu(props: MenuComponentProps) {
  let { settings, setSettings } = useSettings();

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
    const newHeight = parseInt(event.target.value, 10);
    setSettings((currentSettings) => ({
      ...currentSettings,
      paletteHeight: newHeight,
    }));
  };

  const handlePaletteWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newWidth = parseInt(event.target.value, 10);
    setSettings((currentSettings) => ({
      ...currentSettings,
      paletteWidth: newWidth,
    }));
  };

  return (
    <div className="container my-3">
      <div className="d-flex flex-wrap justify-content-start">
        {/* Buttons */}
        <div
          className="btn-group mb-4 mt-4 me-4"
          role="group"
          aria-label="Settings Buttons"
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={props.addBox}
          >
            Add Box
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={props.deleteAllBoxes}
          >
            Delete All
          </button>
        </div>
        {/* Input fields */}
        <div className="d-flex flex-wrap">
          <div className="row g-2">
            {/* Box input fields */}
            <div className="col-md-6 mt-3">
              <div className="input-group mb-3">
                <span className="input-group-text">Box Width</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Box Width"
                  aria-label="Box Width"
                  defaultValue={settings.boxWidth}
                  onChange={handleBoxWidthChange}
                  min={0}
                  max={settings.paletteWidth}
                />
                <span className="input-group-text">mm</span>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Box Height</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Box Height"
                  aria-label="Box Height"
                  defaultValue={settings.boxHeight}
                  onChange={handleBoxHeightChange}
                  min={0}
                  max={settings.paletteHeight}
                />
                <span className="input-group-text">mm</span>
              </div>
            </div>
            {/* Palette input fields */}
            <div className="col-md-6 mt-3">
              <div className="input-group mb-3">
                <span className="input-group-text">Palette Width</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Palette Width"
                  aria-label="Palette Width"
                  defaultValue={settings.paletteWidth}
                  onChange={handlePaletteWidthChange}
                  min={0}
                />
                <span className="input-group-text">mm</span>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Palette Height</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Palette Height"
                  aria-label="Palette Height"
                  defaultValue={settings.paletteHeight}
                  onChange={handlePaletteHeightChange}
                  min={0}
                />
                <span className="input-group-text">mm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
