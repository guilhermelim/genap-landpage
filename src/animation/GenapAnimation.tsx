// src/animation/GenapAnimation.tsx
import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { Box } from "@mui/system";

const GenapAnimation: React.FC = () => {
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configurar a animação usando animejs
    const animation = anime({
      targets: animationRef.current,
      translateY: [20, 0], // Mover de 20 pixels para baixo para 0 pixels
      opacity: [0, 1], // Mudar de completamente transparente para completamente visível
      duration: 1000, // Duração da animação em milissegundos
      easing: "easeOutQuad", // Tipo de easing
      autoplay: true, // Iniciar a animação automaticamente
    });

    return () => {
      // Parar a animação ao desmontar o componente
      animation.pause();
    };
  }, []);

  return (
    <Box
      component="div"
      ref={animationRef}
      sx={{
        display: "inline-block",
        marginLeft: "10px",
        textTransform: "uppercase",
      }}
    >
      {/* Casa do Software */}
      Sua Visão, Nossa Engenharia Tecnológica.
      {/* Sua Ideia, Nossa Tecnologia, Seu Sucesso. */}
    </Box>
  );
};

export default GenapAnimation;
