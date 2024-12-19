import React, { useEffect } from "react";
import anime from "animejs";

function VideoIntroduccion() {
  useEffect(() => {
    // Animación para el contenedor del video
    anime({
      targets: '.video-container',
      opacity: [0, 1],
      translateY: [20, 0],
      easing: 'easeOutExpo',
      duration: 800,
    });

    // Animación para el video
    anime({
      targets: '.video-element',
      scale: [0.9, 1],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1000,
      delay: 300,
    });
  }, []);

  return (
    <div className="relative flex flex-col justify-center overflow-hidden border rounded-lg border-black bg-white p-5 video-container">
      <div className="w-full max-w-4xl">
        <div className="flex justify-center">
          {/* Video component */}
          <div className="rounded-3xl shadow-2xl overflow-hidden video-element">
            <video
              autoPlay
              loop
              controls
              width="100%" // Hace que el video ocupe todo el contenedor disponible
              height="auto" // Mantiene la relación de aspecto
            >
              <source
                src="https://cruip-tutorials.vercel.app/modal-video/video.mp4"
                type="video/mp4"
              />
              Tu navegador no soporta la etiqueta de video.
            </video>
          </div>
          {/* End: Video component */}
        </div>
      </div>
    </div>
  );
}

export default VideoIntroduccion;
