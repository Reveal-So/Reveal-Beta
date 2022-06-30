export const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  try{
    const res = await fetch(input, init);
    return res.json();
  }catch(error){
    console.log("error",error);
    return {};
  };
};
