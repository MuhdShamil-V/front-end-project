import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { motion } from 'framer-motion';

const HeartIcon = () => {
    const [isLiked, setIsLiked] = useState(false);
  
    const handleClick = () => {
      setIsLiked(!isLiked);
    };
  
    return (
        <div>
            <button>
                <motion.div
                    className={`cursor-pointer inline-block ${isLiked ? 'text-red-500' : 'text-black'}`}
                    onClick={handleClick}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                >
                    <FiHeart fill={isLiked ? 'red' : 'none'} />
                </motion.div>
            </button>
        </div>
    );
}

export default HeartIcon;
