import { lookupEnsAddressSystem, resolveEnsName } from "../libs/ens";
import { utils } from "ethers";
import { getCounterApi } from "./getCounterApi";
import { getFollowingsAll } from "./getFollowingsAll";
import { createWallet, fetchWallet, fetchWalletENS } from "../libs/wallet";
import { getImagenAvatar } from "../components/UtilComponets/Avatars";
import { useContext } from "react";
import UserContext from "../context/User/UserContext";
import ProfileContext from "../context/Profile/ProfileContext";
const BuscarDBAddress = async ({ keyword }:{keyword:string}) => {
    return await fetchWalletENS(keyword).then(async wallet => {
        console.log("resp de busqueda en la base de datos wallet", wallet);
        if (wallet.data)
            if (wallet.data.id) {
                return wallet.data.id;
            }
        return
    });
}

export const getProfileConsultar = async (keyword: any): Promise<any> => {
    let setEnsConsulta,
        setAvatarConsulta,
        setFollowerCountConsulta,
        setFollowingCountConsulta,
        setAddressTruncatedConsulta,
        setAddressConsulta;
    if (!keyword) {
        return null;
    }
    let address: any;
    let ensName: any;
    let respuesta: any;//= new profile();
    console.log("keyword", keyword);
    const fetchData = async () : Promise<any> => {
        console.log("resgistra Wallet 5", address);
        let res
        try{
            res = await fetchWallet(address);
        }catch(err:any){
            console.log("err",err);
            
        }
        
        console.log("registro", address);
        setEnsConsulta = null;
        setAvatarConsulta = null;
        if (!res?.data) {
            createWallet(address);
            console.log("Se actualizo el ens y avatar");
            if(ensName){
                setEnsConsulta = ensName;
            }else{
                await lookupEnsAddressSystem(address).then((res: any) => {
                    if (res) {
                        setEnsConsulta = res;
                    } else console.log("no hay cambio en el ens");
                });    
            }
            await getImagenAvatar(address).then((res: any) => {
                if (res) {
                    setAvatarConsulta = res;
                } else console.log("no hay cambio en el Avatar");
            });            
        } else {
            console.log("res.data",res.data);
            let avatar = res.data.avatar,
                ens = res.data.ens,
                lastEns = res.data.lastEns,
                lastAvatar = res.data.lastAvatar,
                ahora = new Date().getTime(),
                fechalastEns = new Date(lastEns).getTime(),
                fechalastAvatar = new Date(lastAvatar).getTime();
            // console.log("ahora",ahora);
            // console.log("fechaFin",fechaFin);
            // console.log("menos semana",(ahora-604800000));
            setEnsConsulta = ens;
            setAvatarConsulta = avatar;
            //1 semana 604800000 milisegundos
            if (fechalastEns < ahora - 604800000) {
                console.log("Se actualizo el ens");
                lookupEnsAddressSystem(address).then((res: any) => {
                    if (res) {
                        setEnsConsulta = res;
                    } else console.log("no hay cambio en el ens");
                });
            }
            if (fechalastAvatar < ahora - 604800000) {
                console.log("Se actualizo el avatar");
                getImagenAvatar(address).then((res: any) => {
                    if (res) {
                        setAvatarConsulta = res;
                    } else console.log("no hay cambio en el Avatar");
                });
            }
        }
    };

    if (keyword.endsWith(".eth")) {
        try {
            address = await resolveEnsName(keyword);
        } catch (err) {
            console.log(err);
        }
        if (!address) {
            address = await BuscarDBAddress({ keyword });
        }
        ensName = keyword;
    } else if (utils.isAddress(keyword)) {
        address = keyword;
        try {
            ensName = await lookupEnsAddressSystem(keyword);
        } catch (err) {
            console.log(err);
        }
    }
    else {
        try {
            address = await resolveEnsName(keyword + ".eth");
        } catch (err) {
            console.log(err);
        }
        ensName = keyword + ".eth";
    }
    console.log("address consulta", address);
    if (!utils.isAddress(address)) {
        return {
            notFound: true,
            revalidate: 300,
        };
    }
    /////////////////////////////////////////////////////////////////

    if (!address) {
        return null;
        console.log("error en el address");
    }

    await fetchData();
    console.log("address consulta",address);
    await getCounterApi(address).then((res: any) => {
        //console.log ("res",res);
        if (res) {
            setFollowerCountConsulta = res.followersCount;
            setFollowingCountConsulta = res.followinsCount;
        }
    });
    //  await getFollowingsAll(address).then((res: any) => {
    //     //console.log ("res",res);
    //     if (res) {
    //     setFollowings(res);
    //     }
    // });
    setAddressTruncatedConsulta = address;
    setAddressConsulta = address;
    /////////////////////////////////////////////////////////////////

    // eslint-disable-next-line react-hooks/rules-of-hooks
    //const {followersCount, followinsCount, avatar}=await useResolveFollowProfile(address);

    // console.log("address",address);
    // console.log("ensName",ensName);
    respuesta = {
        setAddressConsulta,
        setEnsConsulta,
        setAvatarConsulta,
        setFollowerCountConsulta,
        setFollowingCountConsulta,
        setAddressTruncatedConsulta,
    };
    // console.log("respuesta",respuesta);
    return respuesta;
}
