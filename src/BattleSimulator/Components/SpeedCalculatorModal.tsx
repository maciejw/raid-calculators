import React, { useState } from "react";
import { SpeedCalculator } from "../../internal-contracts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
type SpeedCalculatorModalProps = {
  onSetSpeed: (speed: number) => void;
} & Modal["props"];
export function SpeedCalculatorModal({
  onSetSpeed,
  ...modalProps
}: SpeedCalculatorModalProps) {
  const [speed, setSpeed] = useState(0);
  return (
    <Modal
      {...modalProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Real Speed Calculator
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SpeedCalculator onSpeedCalculated={setSpeed} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            if (speed > 0) {
              onSetSpeed(speed);
            }
          }}
        >
          Set speed
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
