import Image from "next/image";
import styles from "./card.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

const Card = ({ imgUrl, size = "medium", id }) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };
  const handleOnError = () => {
    setImgSrc("/static/clifford.webp");
  };
  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };
  return (
    <div className={styles.container}>
      <motion.div
        className={classNames(classMap[size], styles.imgMotionWrapper)}
        whileHover={{ ...scale }}
      >
        <Image
          src={imgSrc}
          onError={handleOnError}
          alt="img"
          fill
          className={styles.cardImg}
        />
      </motion.div>
    </div>
  );
};

export default Card;
