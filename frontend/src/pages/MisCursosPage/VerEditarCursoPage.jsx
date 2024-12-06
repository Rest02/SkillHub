import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { MisCursosContext } from "../../context/MisCursosContext.jsx";
import DescripcionCurso from "../../components/MisCursosComponents/DescripcionCurso.jsx";
import MenuEditsCourse from '../../components/MisCursosComponents/MenuEditsCourse.jsx';
import VideoIntroduccion from '../../components/MisCursosComponents/VideoIntroduccion.jsx';
import ValoracionesEnInstructor from '../../components/MisCursosComponents/ValoracionesEnInstructor.jsx';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const { getUnitsAndVideos } = useContext(MisCursosContext);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const data = await getUnitsAndVideos(courseId);
      setCourseData(data);
    };

    fetchCourseDetails();
  }, [courseId, getUnitsAndVideos]);

  if (!courseData) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex flex-col items-center px-4 py-6">
      {/* Contenedor principal con la disposición de los elementos */}
      <div className="flex flex-col md:flex-row gap-6 max-w-[1200px] w-full">
        {/* Columna de VideoIntroduccion y MenuEditsCourse */}
        <div className="w-full md:w-1/3">
          <div className="mb-6">
            <VideoIntroduccion />
          </div>
          <MenuEditsCourse />
        </div>

        {/* Columna de DescripcionCurso */}
        <div className="w-full md:w-2/3">
          <DescripcionCurso course={courseData.course} units={courseData.units} />
        </div>
      </div>

      {/* Sección de ValoracionesEnInstructor */}
      <div className="w-full max-w-[1200px] mt-6">
        <ValoracionesEnInstructor />
      </div>
    </div>
  );
};

export default CourseDetailsPage;
