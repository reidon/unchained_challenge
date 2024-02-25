import React, { useState, useEffect } from "react";
import { Box } from "../models/box"; // Adjust the import path as necessary
import { Palette } from "../models/palette";
import { useSettings } from "../context/SettingsContext";
import "../App.css";

interface BoxComponentProps {
  box: Box;
  palette: Palette;
  onMove: (id: string, newX: number, newY: number) => void;
  updateBoxRotation: (id: string, newRotation: number) => void;
  deleteBox: (id: string) => void;
}

function BoxComponent(props: BoxComponentProps) {
  let { settings, setSettings } = useSettings();
  const { box, onMove, updateBoxRotation, palette } = props;
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const boxes = props.palette.boxes;
  //let color: string = "black";

  const checkCollision = (otherBox: Box, nextX: number, nextY: number) => {
    const currentBoxIsPerpendicular = isPerpendicular(box.r);
    const otherBoxIsPerpendicular = isPerpendicular(otherBox.r);

    console.log("currentBoxIsPerpendicular " + currentBoxIsPerpendicular);
    console.log("otherBoxIsPerpendicular " + otherBoxIsPerpendicular);

    // Adjusted dimensions based on perpendicular state
    const currentBoxWidth = currentBoxIsPerpendicular
      ? settings.boxHeight
      : settings.boxWidth;
    const currentBoxHeight = currentBoxIsPerpendicular
      ? settings.boxWidth
      : settings.boxHeight;

    const otherBoxWidth = otherBoxIsPerpendicular
      ? settings.boxHeight
      : settings.boxWidth;
    const otherBoxHeight = otherBoxIsPerpendicular
      ? settings.boxWidth
      : settings.boxHeight;

    // Calculate the top-left corner based on the center position (nextX, nextY)
    const currentBoxTopLeftX = nextX - currentBoxWidth / 2;
    const currentBoxTopLeftY = nextY - currentBoxHeight / 2;

    // Calculate the top-left corner of the other box based on its center position
    const otherBoxTopLeftX = otherBox.x - otherBoxWidth / 2;
    const otherBoxTopLeftY = otherBox.y - otherBoxHeight / 2;

    // Collision detection logic using top-left corners
    return (
      currentBoxTopLeftX < otherBoxTopLeftX + otherBoxWidth &&
      currentBoxTopLeftX + currentBoxWidth > otherBoxTopLeftX &&
      currentBoxTopLeftY < otherBoxTopLeftY + otherBoxHeight &&
      currentBoxTopLeftY + currentBoxHeight > otherBoxTopLeftY
    );
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX - box.x);
    setStartY(e.clientY - box.y);
    e.preventDefault(); // Prevent text selection
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    let newX = e.clientX - startX;
    let newY = e.clientY - startY;

    if (!isPerpendicular(box.r)) {
      newX = Math.max(
        settings.boxWidth * 0.5,
        Math.min(newX, settings.paletteWidth - settings.boxWidth * 0.5)
      );
      newY = Math.max(
        settings.boxHeight * 0.5,
        Math.min(newY, settings.paletteHeight - settings.boxHeight * 0.5)
      );
    } else if (isPerpendicular(box.r)) {
      newX = Math.max(
        settings.boxHeight * 0.5,
        Math.min(newX, settings.paletteWidth - settings.boxHeight * 0.5)
      );
      newY = Math.max(
        settings.boxWidth * 0.5,
        Math.min(newY, settings.paletteHeight - settings.boxWidth * 0.5)
      );
    }
    // Snap logic
    otherBoxes.forEach((otherBox) => {
      const snapThreshold = 20; // pixels
      const otherBoxX = otherBox.x;
      const otherBoxY = otherBox.y;

      // Calculate the distance to the other box
      const deltaX = Math.abs(newX - otherBoxX);
      const deltaY = Math.abs(newY - otherBoxY);

      // Snap X axis
      if (deltaX < snapThreshold) {
        newX = otherBoxX; // Adjust newX to align with the otherBox's x position
      }

      // Snap Y axis
      if (deltaY < snapThreshold) {
        newY = otherBoxY; // Adjust newY to align with the otherBox's y position
      }
    });
    onMove(box.id, newX, newY);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);

    let snapX = box.x;
    let snapY = box.y;

    otherBoxes.forEach((otherBox) => {
      const snapThreshold = 20; // pixels

      // Considering the transform translate adjustment
      const currentCenterX = snapX;
      const currentCenterY = snapY;

      const otherCenterX = otherBox.x;
      const otherCenterY = otherBox.y;

      // Calculate edges considering the transform and dimensions
      const currentEdges = {
        left: currentCenterX - boxWidth / 2,
        right: currentCenterX + boxWidth / 2,
        top: currentCenterY - boxHeight / 2,
        bottom: currentCenterY + boxHeight / 2,
      };

      const otherEdges = {
        left:
          otherCenterX -
          (isPerpendicular(otherBox.r)
            ? settings.boxHeight
            : settings.boxWidth) /
            2,
        right:
          otherCenterX +
          (isPerpendicular(otherBox.r)
            ? settings.boxHeight
            : settings.boxWidth) /
            2,
        top:
          otherCenterY -
          (isPerpendicular(otherBox.r)
            ? settings.boxWidth
            : settings.boxHeight) /
            2,
        bottom:
          otherCenterY +
          (isPerpendicular(otherBox.r)
            ? settings.boxWidth
            : settings.boxHeight) /
            2,
      };

      // Snap logic for X axis
      if (Math.abs(currentEdges.right - otherEdges.left) <= snapThreshold) {
        snapX = otherEdges.left - boxWidth / 2; // Adjust to snap to the left edge of otherBox
      } else if (
        Math.abs(currentEdges.left - otherEdges.right) <= snapThreshold
      ) {
        snapX = otherEdges.right + boxWidth / 2; // Adjust to snap to the right edge of otherBox
      }

      // Snap logic for Y axis
      if (Math.abs(currentEdges.bottom - otherEdges.top) <= snapThreshold) {
        snapY = otherEdges.top - boxHeight / 2; // Adjust to snap to the top edge of otherBox
      } else if (
        Math.abs(currentEdges.top - otherEdges.bottom) <= snapThreshold
      ) {
        snapY = otherEdges.bottom + boxHeight / 2; // Adjust to snap to the bottom edge of otherBox
      }
    });

    // Update the position with potential snapping adjustments
    onMove(box.id, snapX, snapY);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startX, startY, onMove, box.id]);

  // Filter out the currentBox by id, then check collision with the remaining boxes
  const otherBoxes = boxes.filter((otherBox) => otherBox.id !== box.id);
  function boxColor(): string {
    const collisionDetected = otherBoxes.some((otherBox) => {
      if (checkCollision(otherBox, box.x, box.y)) {
        console.log(`Collision detected with box id: ${otherBox.id}`);
        return true;
        // Handle collision here
      } else {
        return false;
      }
    });
    return collisionDetected ? "red" : "white";
  }

  const handleBoxRotation = () => {
    const newRotation = (box.r + 90) % 360;
    props.updateBoxRotation(box.id, newRotation);
  };

  const handleBoxDeletion = () => {
    props.deleteBox(box.id);
  };

  const isPerpendicular: (r: number) => boolean = (r: number) => {
    return r % 180 === 90 ? true : false;
  };
  const boxWidth = isPerpendicular(box.r)
    ? settings.boxHeight
    : settings.boxWidth;
  const boxHeight = isPerpendicular(box.r)
    ? settings.boxWidth
    : settings.boxHeight;
  return (
    <div
      className="box-shape"
      style={{
        position: "absolute",
        left: box.x,
        top: box.y,
        width: boxWidth,
        height: boxHeight,
        background: boxColor(),
        outline: "2px solid black",
        outlineOffset: "-1px",
        transform: `translate(-50%, -50%)`, // Translate to center before rotating
        transformOrigin: "center", // Ensures the box rotates around its center
      }}
      onMouseDown={handleMouseDown}
    >
      <div>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleBoxDeletion}
          style={{
            float: "right",
            padding: "12px",
          }}
        ></button>
        <button
          type="button"
          className="btn btn-sm bi-arrow-clockwise rotate-button"
          aria-label="Close"
          onClick={handleBoxRotation}
          // style={{
          //   float: "right",
          //   fontSize: "1.5rem",
          //   padding: "2px",
          //   opacity: "0.6",
          // }}
        ></button>
      </div>
    </div>
  );
}

export default BoxComponent;
