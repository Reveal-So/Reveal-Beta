import { parseTransaction } from "ethers/lib/utils";

export function Checkvaltokens(cad:any){
    const separardecenas = (cadena:string) => {
        let asep:any=[];
        //toLocaleString
        //cadena.toLo
        //asep.push(cadena.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        asep.push(`-${cadena}`);
    return cadena.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    //console.log(cad);
    let acad = `${cad}`.split('.');
    let aresp:any=[];
    aresp.push(separardecenas(acad[0]));
    if (acad.length>1){
        let temp="";
        let ind=1;
        do {
            ind++;
            temp=acad[1].substring(0,ind);
        }while (ind < acad[1].length&&!parseInt(temp));
        aresp.push(temp);
    }
    //if (!fecha){ return ahora;}
    //if (!fecha[1]){ return ahora;}
    //let aFecha = aFecha1[0].split('-');
    return aresp.join(".");
}