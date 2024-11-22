import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { MisCursosContext } from "../../context/MisCursosContext.jsx";
import DescripcionCurso from "../../components/MisCursosComponents/DescripcionCurso.jsx";
import MenuEditsCourse from '../../components/MisCursosComponents/MenuEditsCourse.jsx'

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
    <div style={{ display: "flex", justifyContent: "space-between", gap: "20px"}}>
      <div style={{ flex: "1", maxWidth: "50%"  , paddingTop : "27px", border: "1px solid black"}}>
        <MenuEditsCourse />
      </div>
      <div style={{ flex: "2", maxWidth: "50%", border: "1px solid black"}}>
        <DescripcionCurso course={courseData.course} units={courseData.units} />
      </div>
    </div>
  );
};

export default CourseDetailsPage;
