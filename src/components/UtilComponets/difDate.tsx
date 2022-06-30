
export function difDate(fecha:any){
    let ahora=new Date().getTime();
    let llega = fecha.split('T');
    if (!fecha){ return <>N/A</>;}
    
    if (!fecha[1]){ return <>N/A</>;}
    
    let aFecha = llega[0].split('-');
    let horasf=parseInt(llega[1].split(':')[0]);
    let fechaFin = new Date(fecha).getTime();
    //fechaFin=fechaFin+horasf;
    
    let diff=ahora<fechaFin?fechaFin-ahora:ahora-fechaFin;
    let consulta={
        "hoy":new Date(),
        "hoyGet":new Date().getTime(),
        "llega":fecha,
        "llegaGet":new Date(fecha).getTime(),
        "final":llega[0],
        "horasfinales":llega[1].split(':'),
        "horasf":llega[1].split(':')[0],
        "finalGet":new Date(llega[0]).getTime(),
        "diff":Math.floor(diff / (1000 * 60 * 60 * 24)),
        "difHoras":Math.floor(diff/(1000*60*60)),
    }
    //if ((Math.floor(diff/(1000*60*60*24)))==0)
    //console.log("consulta",consulta);

    if (ahora<fechaFin){
        let difDias=Math.floor(diff/(1000*60*60*24));
        //if (difDias>9){ return <>{aFecha[1]}/{aFecha[2]}/{aFecha[0]}</>;}
        if (difDias>0) { return <>{difDias}d left</>;}
        let difHoras=Math.floor(diff/(1000*60*60));
        return <>{difHoras}h left</>;
    }else{
        let difDias=Math.floor(diff/(1000*60*60*24));
        if (difDias>9){ return <>{aFecha[1]}/{aFecha[2]}/{aFecha[0]}</>;}
        if (difDias>0&&difDias<10) { return <>{difDias}d</>;}
        let difHoras=Math.floor(diff/(1000*60*60));
        return <>{difHoras}h</>;
    }
    
    //console.log("operacionDif ["+Math.floor(diff/(1000*60*60))+"]",consulta);
    
}