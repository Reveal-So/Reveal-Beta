import Link from "next/link";
import logo3 from "../../images/logo3.png";

export const Error = () => {
  return (
    <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-[#6F41D8] sm:text-5xl">
            404
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Page not found
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Please check the URL in the address bar and try again.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
            <Link href={"/"}>
            <a
                className="inline-flex items-center px-4 py-2 border border-transparent 
                text-sm font-medium rounded-md shadow-sm text-white bg-[#6F41D8] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go back home
               </a>
          </Link>
              
              {/*<a
                href="#"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Contact support
              </a> */}
            </div>
          </div>
        </main>
      </div>
    </div>
    // <div className="flex flex-col pt-16 pb-12 min-h-screen">
    //   <main className="flex flex-col flex-grow justify-center px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-7xl">
    //     <div className="py-16">
    //       <div className="text-center">
    //         <p className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">
    //           404 error
    //         </p>
    //         <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
    //           Page not found.
    //         </h1>
    //         <p className="mt-2 text-base text-gray-500">
    //           Sorry, we couldn’t find the page you’re looking for.
    //         </p>
    //         <div className="mt-6">
    //           <Link passHref href="/">
    //             <a className="text-base font-medium text-indigo-600 hover:text-indigo-500">
    //               Go back home<span aria-hidden="true"> &rarr;</span>
    //             </a>
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </main>
    // </div>
  );
};
