import React from "react";

const Aprendizaje = () => {
  return (
    <section className="flex flex-col items-center justify-center ">
      <div className="container px-6 py-10 mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-black text-center">Cursos que has comprado</h1>

        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
          {[{
            img: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            title: "How to use sticky note for problem solving",
            date: "20 October 2019",
          }, {
            img: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            title: "How to use sticky note for problem solving",
            date: "20 October 2019",
          }, {
            img: "https://images.unsplash.com/photo-1544654803-b69140b285a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            title: "Morning routine to boost your mood",
            date: "25 November 2020",
          }, {
            img: "https://images.unsplash.com/photo-1530099486328-e021101a494a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1547&q=80",
            title: "All the features you want to know",
            date: "30 September 2020",
          }].map((item, idx) => (
            <div key={idx} className="lg:flex  p-4 ">
              <img
                className="object-cover w-24 h-24 rounded-lg lg:w-32 lg:h-32 border border-black"
                src={item.img}
                alt={item.title}
              />

              <div className="flex flex-col justify-between py-2 px-4">
                <a
                  href="#"
                  className="text-lg font-semibold text-gray-800 hover:underline dark:text-black"
                >
                  {item.title}
                </a>

                <span className="text-sm text-gray-500 ">
                  On: {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Component */}
      <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
        <nav>
          <ul className="flex">
            <li>
              <a className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-black bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300" href="#" aria-label="Previous">
                <span className="material-icons text-sm"></span>
              </a>
            </li>
            <li>
              <a className="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 p-0 text-sm text-white shadow-md transition duration-150 ease-in-out" href="#">1</a>
            </li>
            <li>
              <a className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-black bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300" href="#">2</a>
            </li>
            <li>
              <a className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border  border-black bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300" href="#">3</a>
            </li>
            <li>
              <a className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-black bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300" href="#" aria-label="Next">
                <span className="material-icons text-sm"></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Aprendizaje;