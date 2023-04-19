import React from "react";
import styles from "@app/styles/components/modal.module.scss";

interface IModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, open, onClose }) => {
  if (open) {
    return (
      <div className={styles["modal"]}>
        <div onClick={onClose} className={styles["modal__overlay"]} />
        <div className={styles["modal__body"]}>{children}</div>
      </div>
    );
  }

  return <></>;
};

export default Modal;
