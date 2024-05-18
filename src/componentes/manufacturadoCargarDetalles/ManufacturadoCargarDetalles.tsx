
import { useEffect, useState }from "react";
import ArticuloInsumo from '../../entidades/ArticuloInsumo';
import ArticuloManufacturadoDetalle from '../../entidades/ArticuloManufacturadoDetalle';
import ArticuloInsumoService from "../../servicios/ArticuloInsumoService";

type DetallesManufacturadosArgs = {
    detallesPrevios: ArticuloManufacturadoDetalle[],
    handleChange: (key: keyof object, value: any) => void
}

function ManufacturadoCargarDetalles({ detallesPrevios, handleChange }: DetallesManufacturadosArgs) {
    const [detalles, setDetalles] = useState<ArticuloManufacturadoDetalle []>([]);
    const [insumos, setInsumos] = useState<ArticuloInsumo[]>([]);
    const [selectedInsumo, setSelectedInsumo] = useState("0");
    const [cantidad, setCantidad] = useState(0);
    const [unidadMedida, setUnidadMedida] = useState("");

    const urlapi = import.meta.env.VITE_API_URL;
    const articuloInsumoService = new ArticuloInsumoService(urlapi + "/insumos");

    const getInsumosRest = async () => {
        const datos:ArticuloInsumo[] = await articuloInsumoService.getAll();
        setInsumos(datos.filter(insumo => {return insumo.esParaElaborar}));
    }

    const agregarInsumo = () => {
        if (selectedInsumo === "0") {
            return;
        }
        if (cantidad === 0) {
            return;
        }

        const insumo:ArticuloInsumo = insumos.filter((insumo) => {return insumo.id === Number(selectedInsumo)})[0];

        const detalle:ArticuloManufacturadoDetalle = new ArticuloManufacturadoDetalle;
        detalle.articuloInsumo = insumo;
        detalle.cantidad = cantidad;
        setDetalles( [...detalles.filter(detalle => {return detalle.articuloInsumo.id !== insumo.id}), detalle] );

        setCantidad(0);
        setSelectedInsumo("0");
    }

    const deleteDetalle = (id:number) => {
        setDetalles([...detalles.filter((_detalle, index) => index !== id)]);
    }

    const handleChangeInsumo = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const idInsumo = e.target.value;
        let unidad = "";
        if (idInsumo !== "0") {
            unidad = insumos.filter((insumo) => {return insumo.id === Number(e.target.value)})[0].unidadMedida.denominacion;
        }
        setUnidadMedida(unidad);
        setSelectedInsumo(e.target.value);
    }

    useEffect(() => {
        getInsumosRest();
    }, []);

    useEffect(() => {
        setDetalles(detallesPrevios);
    }, [detallesPrevios]);

    useEffect(() => {
        handleChange('articuloManufacturadoDetalles' as keyof object, detalles);
    }, [detalles]);

    return (
    <div className="p-3 border rounded">
        
        <div style={{height:'248px', overflowY:'auto'}}>
        <table className='table'>
            <thead>
                <tr>
                    <th style={{width:"50%", textAlign:'left', marginLeft: '10%'}}>
                        <label htmlFor="cboDetalleInsumo" className="form-label">Insumo</label>
                        <select id="cboDetalleInsumo" className='form-select' value={selectedInsumo} onChange={e => handleChangeInsumo(e)}>
                                
                            <option value={0}>Seleccionar insumo</option>

                            {insumos?.map((insumo:ArticuloInsumo) => 
                                <option key={insumo.id} value={insumo.id}>{insumo.denominacion}</option>
                            )}

                        </select>
                    </th>

                    <th style={{width:"10%", textAlign:'left'}}>
                        <label htmlFor="txtCantidad" className="form-label">Cantidad</label>
                        <input type="text" id="txtCantidad" className="form-control" pattern="[0-9]+" placeholder="Ingrese la cantidad del insumo" value={cantidad ? cantidad : ''} onChange={e => setCantidad(Number(e.target.value))} />
                    </th>

                    <th style={{width:"20%", textAlign:'center'}}>
                        <label htmlFor="txtUnidadMedida" className="form-label">Medida</label>
                        <input type="text" id="txtUnidadMedida" className="form-control" value={unidadMedida} disabled />
                    </th>

                    <th style={{width:"25%", textAlign:'center'}}>
                        <label htmlFor="btnAgregar" className="form-label">Acciones</label>
                        <a className="btn btn-success mb-0 form-control" id="btnAgregar"  style={{ marginBottom:10 }} onClick={agregarInsumo}>Agregar</a>
                    </th>
                </tr>
            </thead>
            <tbody>
            {detalles.map((detalle, index) => (
                <tr key={index}>
                    <td style={{width:"60%"}}>{detalle.articuloInsumo.denominacion}</td>
                    <td style={{width:"5%", textAlign:'center'}}>{detalle.cantidad}</td>
                    <td style={{width:"10%", textAlign:'center'}}>{detalle.articuloInsumo.unidadMedida.denominacion}</td>
                    <td style={{width:"25%", textAlign:'center'}}><a className="btn btn-danger mb-0" style={{ marginBottom:10 }} onClick={() => deleteDetalle(index)}>Eliminar</a></td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
    );
}

export default ManufacturadoCargarDetalles;