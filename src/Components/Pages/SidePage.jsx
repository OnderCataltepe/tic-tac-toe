import styles from "./SidePage.module.css";
const SidePage = ({ player, width, lightOn }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.light} ${lightOn ? null : styles.lightOf}`}>
        <div className={styles.wire}></div>
        <div className={styles.bulb}>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={styles.pictureDiv}>
        <img
          alt="first"
          className={lightOn ? null : styles.lightOf}
          src={player.picture}
          style={{ width: width }}
        />
        <p className={lightOn ? null : styles.lightOf}>{player.name}</p>
      </div>
    </div>
  );
};

export default SidePage;
