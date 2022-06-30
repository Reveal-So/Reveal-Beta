export function Ckecktypenft(cad:any){
    const primeraLetraMayuscula = (cadena:string) => {
        const primerCaracter = cadena.charAt(0).toUpperCase();
        const restoDeLaCadena = cadena.substring(1, cadena.length);
        return primerCaracter.concat(restoDeLaCadena);
      }
    
    let acad = cad.split('_');
    let aresp:any=[];

    acad.map((elem:any)=>{
        aresp.push(primeraLetraMayuscula(elem));})
        
    

    //if (!fecha){ return ahora;}
    
    //if (!fecha[1]){ return ahora;}

    //let aFecha = aFecha1[0].split('-');
    
    return aresp.join(" ");
    //console.log("operacionDif ["+Math.floor(diff/(1000*60*60))+"]",consulta);
    
}