import Base from "../../entidades/Base";

export type GrillaGenericaTableProps<T> = {
  entidades: T[],
  labels: string[],
  categoria: number,
  keys: Array<keyof T>,
  openModalPedidos: () => void,
  handleOpenModal: (id: number) => void,
  deleteEntidad: (id: number) => void,
  sinEditar: boolean
};

function CardGenericaCard<T extends Base>({
  entidades,
  categoria,
  handleOpenModal,
  deleteEntidad,
  sinEditar
}: GrillaGenericaTableProps<T>) {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2 justify-content-center">
      {entidades.filter(entidadI => (categoria === 0 || entidadI.categoria.id === categoria)).map((entidadI: T) => (
        <div key={entidadI.id} className="col">
        <div className="card" style={{width: "18rem"}}>
          <div className="d-flex justify-content-between m-3">
            {!sinEditar && (
              <a className="btn btn-info " style={{ marginBottom: 10 }} onClick={() => { handleOpenModal(entidadI.id) }}>Modificar</a>
            )}
            <a className="btn btn-danger " style={{ marginBottom: 10 }} onClick={() => deleteEntidad(entidadI.id)}>Eliminar</a>
          </div>
          
          <img src={entidadI.imagen.url} className="card-img-top" style={{height:'200px'}} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{entidadI.nombre}</h5>
            <p className="card-text">{entidadI.razonSocial}</p>
            <p className="card-text">{entidadI.cuil}</p>
          </div>
        </div>
        </div>
      ))}
    </div>
  );
}

export default CardGenericaCard;
