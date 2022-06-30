import { SearchIcon } from "@heroicons/react/solid";
import { utils } from "ethers";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";

export const HeaderSearchBar = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onChange = (event:any) => {
    setValue(event.target.value);
  };

  const handleSubmit = useCallback(
    (event:any) => {
      event.preventDefault();
      if (value.endsWith(".eth")) {
        setError("");
        return router.push(`/${value}`);
      }
      if (utils.isAddress(value)) {
        setError("");
        return router.push(`/${value}`);
      }
      setError("Not valid address or ENS");
      return;
    },
    [router, value],
  );

  return (
    <form
      className="justify-center mx-auto w-full max-w-3xl"
      onSubmit={handleSubmit}
    >
      <div className="relative mt-1 ">
        <div className="flex absolute inset-y-0 left-0 items-center pl-2 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          name="address"
          id="address"
          className="block w-full pl-8 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
          
          placeholder="Search by ENS or Address"
          onChange={onChange}
        />
        {error && (
          <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
            <p className="text-sm text-red-500" id="error">
              {error}
            </p>
          </div>
        )}
      </div>
    </form>
  );
};
//right-2
// className="textoSearchbar block pl-14 w-full text-gray-800 Searchbar
//           focus:border-amarillo-real focus:ring-amarillo-real"
