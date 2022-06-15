export interface ConfigSystemModel{
        searchAddress:string;
        status?:string|boolean;
}
export interface StateCofigSystem {
    listStatus?: StateModel[];
    
}
export interface StateModel {
    name: string;
    value?: string | boolean;
}
