import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";  // Importamos el componente Pagination
import Stack from "@mui/material/Stack";  // Importamos Stack para la disposición de los componentes

// Estilizado del Accordion con colores personalizados
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid black`,
  backgroundColor: "#FFFFFF",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "#000000" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#9B111E",
  color: "#FFFFFF",
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: "rotate(90deg)",
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#C0C0C0",
  borderTop: "1px solid black",
}));

function DescripcionCurso({ course, units }) {
  const [expanded, setExpanded] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const unidadesPorPagina = 10;

  // Función para manejar el cambio de página
  const handleChangePagina = (event, value) => {
    setPaginaActual(value);
  };

  // Calculamos las unidades que se deben mostrar en la página actual
  const unidadesAMostrar = units.slice(
    (paginaActual - 1) * unidadesPorPagina,
    paginaActual * unidadesPorPagina
  );

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Calculamos el número total de páginas
  const totalPaginas = Math.ceil(units.length / unidadesPorPagina);

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          textAlign: "left",
          color: "white",
          fontSize: "2rem",
          marginBottom: "20px",
          textDecoration: "underline",
        }}
      >
        {course.titulo}
      </h1>

      {unidadesAMostrar.map((unit, index) => (
        <Accordion
          key={unit.unidad_id}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">
              Unidad {index + 1}: {unit.unidad_titulo}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" component="div">
              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                {unit.videos.map((video, videoIndex) => (
                  <li
                    key={video.video_id}
                    style={{
                      fontSize: "1.1rem",
                      color: "#000000",
                      marginBottom: "10px",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>
                      {videoIndex + 1}. {video.video_nombre}
                    </span>
                  </li>
                ))}
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Paginación con el componente de Material-UI, centrado */}
      <Stack
        spacing={2}
        style={{
          marginTop: "20px", 
          display: "flex", // Usamos flexbox
          justifyContent: "center", // Centramos horizontalmente
          alignItems: "center", // Alineamos también verticalmente si es necesario
        }}
      >
        <Pagination
          count={totalPaginas}
          page={paginaActual}
          onChange={handleChangePagina}
          color="primary"  // Puedes cambiar el color si lo deseas
          siblingCount={1}  // Número de botones de páginas adyacentes
        />
      </Stack>
    </div>
  );
}

export default DescripcionCurso;
