import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PodcastCard = ({ id, title, displayImage, delay }) => {
  return (
    <Link to={`/podcast/${id}`}>
      <motion.div
        className="podcasts-cards"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
      >
        <img
          className="display-image-podcasts"
          src={displayImage}
          alt="disImage"
        />
        <p className="title-podcasts">{title}</p>
      </motion.div>
    </Link>
  );
};

export default PodcastCard;
