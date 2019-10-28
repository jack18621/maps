export class Mark{
    public titulo:string
    public desc:string
    constructor(public lat : number,
                public lng:number,
                ){
    this.lat=lat;
    this.lng=lng;                
    this.titulo="Sin titulo";                
    this.desc="Sin desc";                

    }
}