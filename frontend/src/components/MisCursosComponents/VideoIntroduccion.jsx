import React, { useEffect } from "react";
import anime from "animejs";

function VideoIntroduccion({ video }) {
  useEffect(() => {
    anime({
      targets: ".video-container",
      opacity: [0, 1],
      translateY: [20, 0],
      easing: "easeOutExpo",
      duration: 800,
    });

    anime({
      targets: ".video-element",
      scale: [0.9, 1],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1000,
      delay: 300,
    });
  }, [video]); // Vuelve a ejecutar la animación cuando el video cambia

  if (!video) {
    return <p className="text-black">Selecciona una clase para ver el video.</p>;
  }

  return (
    <div className="relative flex flex-col justify-center overflow-hidden border rounded-lg border-black bg-white p-5 video-container">
      <div className="w-full max-w-4xl">
        <div className="flex justify-center">
          <div className="rounded-3xl shadow-2xl overflow-hidden video-element">
            <video
              autoPlay
              loop
              controls
              width="100%"
              height="auto"
            >
              <source src={`http://localhost:4000/${video.video_url}`} type="video/mp4" />
              Tu navegador no soporta la etiqueta de video.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoIntroduccion;
