import styles from "./CustomButton.module.css";

const CustomButton = ({ value, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.customButton} ${styles[color]}`}
    >
      {value}
    </button>
  );
};

export default CustomButton;
