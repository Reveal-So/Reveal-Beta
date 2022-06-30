
import { useRouter } from 'next/router'
import { useGetProfile } from "../hooks/useGetProfile";
import { ErrorScreen } from "../components/ErrorScreen";
import { Error } from "../components/Error";
import { GalleryFeed } from "../components/GalleryFeed";
import { getUpdate } from "../services/getfollowings";
 import { useContext, useEffect,useState } from "react";
 import type { ReactElement } from "react";
 import { SWRConfig } from "swr";

 import { AppLayout } from "../components/AppLayout";
 import { GalleryScreen } from "../components/GalleryScreen";
 import { ProfileFollowersScreen } from "../components/ProfileFollowersScreen";
 import { ProfileFollowingScreen } from "../components/ProfileFollowingScreen";
 import { useRecoilValue, useRecoilState } from "recoil";
import ProfileContext from '../context/Profile/ProfileContext';
import { getProfileConsultar } from '../services/getProfileConsultar';
import { GalleryPoap } from '../components/GalleryPoap';
 
///////////////////////////////////////////////////////////////////////////////

const INITIAL_PAGE = 0

export function useWalletProfile ({ keyword }:{ keyword:any } = { keyword: null }) {
  const [loading, setLoading] = useState(true);
  const [loadingNextPage, setLoadingNextPage] = useState(false)
  const [page, setPage] = useState(INITIAL_PAGE)
  const [error,setError]=useState(false)

  const {
    ensConsulta,
    addressConsulta,
    setAddressConsulta,
    setFollowingsConsulta,
    setEnsConsulta,
    setAvatarConsulta,
    setFollowerCountConsulta,
    setFollowingCountConsulta,
    setAddressTruncatedConsulta,
  } = useContext(ProfileContext);
  // const [profile, setProfile] = useRecoilState(consultarProfileAtom);//useState({});//useContext()
  
  // const { address, setAddress } = useAddress();
 
  
  // recuperamos la keyword del localStorage
  const keywordToUse = keyword //|| localStorage.getItem('lastKeyword') || 'random'

  useEffect(function () {
    setLoading(true)
    //console.log("keywordToUse",keywordToUse);
    //profile
    //console.log("profileConsulta99",profile);
    
    
    if(keywordToUse==undefined) { return }
    
    if (keyword==addressConsulta||keyword==ensConsulta){ setLoading(false); return}

    // if (profile){
    //   if (profile.address==keywordToUse||profile.ensName==keywordToUse){
    //     //console.log("Profile es99",profile)
    //     return
    //   }
    // }
    //useGetProfile({ keyword: keywordToUse })
    getProfileConsultar(keywordToUse).then((Profile:any) => {
        console.log("Profile consulta",Profile) 
        if (Profile?.notFound||!Profile){
          setError(true);
        }
        setAddressConsulta(Profile.setAddressConsulta);
        setFollowingsConsulta(Profile.setFollowingsConsulta);
        setEnsConsulta(Profile.setEnsConsulta);
        setAvatarConsulta(Profile.setAvatarConsulta);
        setFollowerCountConsulta(Profile.setFollowerCountConsulta);
        setFollowingCountConsulta(Profile.setFollowingCountConsulta);
        setAddressTruncatedConsulta(Profile.setAddressTruncatedConsulta);
        getUpdate(Profile.setAddressConsulta);
        setLoading(false);
        // setProfile(Profile)
        // setAddress(Profile.address);        
        
        console.log("Profile.setEnsConsulta",Profile)
        // 
        // guardamos la keyword en el localStorage
        //localStorage.setItem('lastKeyword', keyword)
      })//, keywordToUse, rating, setGifs,setProfile
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywordToUse,])

  return {loading, loadingNextPage, error, setPage}
}


//import Header from '../../components/header'

const Slug = ()=>{

  const router = useRouter()
  const slug = router.query.slug || []
  const keyword=slug[0];
  const { loading, error } = useWalletProfile({ keyword })
//console.log(slug);
  // useEffect(() => {
  //   setAddress(slugAddress);
    
  //   //console.log("ensName",ensName);
  //   setConsultarProfile({
  //     address: slugAddress,
  //     ensName: ensName,
  //     bandens: ensName ? true : false,
  //     AddressTruncated: formatAddressShort(slugAddress),
  //   });
  // }, [setAddress, slugAddress]);
  
  if(error){
    console.log("error error",error);
    return <AppLayout><Error/></AppLayout>;
   }
   console.log("paso slug",error);
  return (
    <>
      {loading?
      <AppLayout>
        <div className="h-[300px] pt-3 pl-5">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
      </AppLayout>
         :slug.length==1 ? <AppLayout><GalleryScreen /></AppLayout>
         :slug[1]=="followers"? <AppLayout><ProfileFollowersScreen /></AppLayout>
         :slug[1]=="following"? <AppLayout><ProfileFollowingScreen /></AppLayout>
         :slug[1]=="feed"? <AppLayout><GalleryFeed /></AppLayout>
         :slug[1]=="poap"? <AppLayout><GalleryPoap /></AppLayout>
         :<AppLayout><Error/></AppLayout>
      }
    </>
  )
}

export default Slug;
