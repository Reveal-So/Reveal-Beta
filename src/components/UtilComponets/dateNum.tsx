export function dateNum(fecha:any){
    //let ahora=new Date().getTime();
    let aFecha1 = fecha.split('T');
    //if (!fecha){ return ahora;}
    
    //if (!fecha[1]){ return ahora;}

    //let aFecha = aFecha1[0].split('-');
    let fechaFin = new Date(fecha).getTime();
    return fechaFin;
    //console.log("operacionDif ["+Math.floor(diff/(1000*60*60))+"]",consulta);
 
    // function convertUTCDateToLocalDate(date) {
    //     var newDate = new Date(date.getTime() - date.getTimezoneOffset()601000);
    //     return newDate;
    //     }
}