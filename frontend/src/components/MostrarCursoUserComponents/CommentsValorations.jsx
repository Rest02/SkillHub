import React from 'react';

function CommentCard() {
  return (
    // <div className="flex justify-center py-4 px-6 bg-gray-100">
      <div className="relative flex flex-col w-full  rounded-xl bg-white shadow-lg p-6">
        <div className="relative flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
            alt="Commentor"
            className="relative inline-block h-[58px] w-[58px] rounded-full object-cover object-center shadow-md"
          />
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between">
              <h5 className="font-sans text-xl font-semibold text-blue-gray-900">
                Tania Andrew
              </h5>
              <div className="flex items-center gap-0">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`h-5 w-5 ${
                      index < 4 ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600">Frontend Lead @ Google</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-base text-gray-700">
            "I found solution to all my design needs from Creative Tim. I use them
            as a freelancer in my hobby projects for fun! And its really affordable,
            very humble guys !!!"
          </p>
        </div>
      </div>
    // </div>
  );
}

export default CommentCard;
