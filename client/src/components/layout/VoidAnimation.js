import React from "react";
import { Frame, Stack } from "framer";
import "./VoidAnimation.css";

export default function VoidAnimation() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 5,
        ease: "linear",
        staggerChildren: 0.5
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: -25 }
  };

  const leftChev = {
    hidden: { opacity: 0, x: -500, y: 70 },
    show: { opacity: 1, x: -130, y: 70 }
  };

  const rightChev = {
    hidden: { opacity: 0, x: 600, y: 70 },
    show: { opacity: 1, x: 160, y: 70 }
  };

  return (
    <Stack
      direction={"horizontal"}
      whileHover={{ scale: 1.6 }}
      size={150}
      x={-40}
      y={-250}
      center
      gap={10}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <Frame size={0} x={0} background={"#050617"} variants={item}>
        <p className="letters">V</p>
      </Frame>
      <Frame size={0} x={50} background={"#050617"} variants={item}>
        <p className="letters">O</p>
      </Frame>
      <Frame size={0} x={110} background={"#050617"} variants={item}>
        <p className="letters">I</p>
      </Frame>
      <Frame size={0} x={130} background={"#050617"} variants={item}>
        <p className="letters">D</p>
      </Frame>
      <Frame size={0} x={180} background={"#050617"} variants={leftChev}>
        <i className="material-icons large">chevron_left</i>
      </Frame>
      <Frame size={0} background={"#050617"} variants={rightChev}>
        <i className="material-icons large">chevron_right</i>
      </Frame>
    </Stack>
  );
}
