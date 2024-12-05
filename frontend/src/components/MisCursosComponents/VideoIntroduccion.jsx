import React, { useState } from 'react';

function VideoIntroduccion() {
    return (
      <div className="relative flex flex-col justify-center overflow-hidden">
        <div className="w-full max-w-4xl  pt-14 ">
          <div className="flex justify-center">
            {/* Video component */}
            <div className="rounded-3xl shadow-2xl overflow-hidden">
            <video
  autoPlay
  loop
  controls
  width="100%"  // Hace que el video ocupe todo el contenedor disponible
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