export function toGB(bytes:number){
    const val=bytes/(1024**3);
    const updated=val.toFixed(2);
    return updated;

}