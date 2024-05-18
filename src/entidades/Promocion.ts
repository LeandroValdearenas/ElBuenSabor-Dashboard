import Base from "./Base";
import Imagen from "./Imagen";
import PromocionDetalle from "./PromocionDetalle";
import Sucursal from "./Sucursal";

export default class Promocion extends Base {
    denominacion:string = '';
    fechaDesde:Date = new Date();
    fechaHasta:Date = new Date();
    horaDesde:Date = new Date();
    horaHasta:Date = new Date();
    descripcionDescuento:string = '';
    precioPromocional:number = 0;
    tipoPromocion:string = '';
    imagenes:Imagen[] = [];
    sucursales:Sucursal[] = [];
    promocionDetalles:PromocionDetalle[] = [];
    
    static labels:string[] = [
        "Id", 
        "Denominación", 
        "Fecha desde", 
        "Fecha hasta", 
        "Hora desde", 
        "Hora hasta", 
        "Descripción", 
        "Precio promocional", 
        "Tipo de promoción", 
        "Imágenes", 
        "Tiene sucursales", 
        "Cargar detalles"
        ];
}