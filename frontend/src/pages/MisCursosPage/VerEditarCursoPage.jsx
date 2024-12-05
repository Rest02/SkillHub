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
    <div>
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "20px", 
        width: "100%", 
        maxWidth: "1200px", 
        margin: "0 auto" 
      }}>
        <div style={{ 
          flex: "1", 
          paddingTop: "15px", 
          paddingRight: "20px", 
          paddingLeft: "20px",
          minWidth: "200px",
        }}>
          <div style={{ marginBottom: "10px" }}>
            <VideoIntroduccion />
          </div>
          <MenuEditsCourse />
        </div>
        <div style={{
          flex: "2",  
          paddingRight: "20px", 
          paddingLeft: "20px", 
          minWidth: "300px",  
        }}>
          <DescripcionCurso course={courseData.course} units={courseData.units} />
        </div>
      </div>
      <div style={{
        width: "60%",  
        maxWidth: "1200px",  
        margin: "0 auto",  
        paddingTop: "30px",  
      }}>
        <ValoracionesEnInstructor />
      </div>
    </div>
  );
};

export default CourseDetailsPage;
