import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from "react"
import useProducto from '../hooks/useProducto'

const Producto  = () => {
    const {
      getProductos, 
      openModal,
      validar,
      deleteProducto,
      productos,
      titleModal,
      nombre,
        setNombre,
        descripcion,
        setDescripcion,
        precio,
        setPrecio,
    } = useProducto()
    
    useEffect(() => {
        getProductos()
    }, [])

    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-grid mx-auto">
              <button onClick={() => openModal(1)}
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalProductos"
              >
                <i className="fa-solid fa-circle-plus" /> Añadir
              </button>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-lg-2">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {
                    productos.map((producto, i) =>(
                      <tr key={producto.id}>
                        <td>{i + 1}</td>
                        <td>{producto.nombre}</td>
                        <td>{producto.descripcion}</td>
                        <td>{producto.precio.toLocaleString('es-HN', { style: 'currency', currency: 'HNL'})}</td>
                        <td>
                          <button onClick={() => openModal(2, producto.id, producto.nombre, producto.descripcion, producto.precio)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target = '#modalProductos'>
                            <i className='fa-solid fa-edit' />
                          </button>
                          <button onClick={() => deleteProducto(producto.id)} className='btn btn-danger'>
                            <i className='fa-solid fa-trash' />
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div id="modalProductos" className="modal fade" aria-hidden="true" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <label className="h5">{titleModal}</label>
                <button
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="close"
                />
              </div>
              <div className="modal-body">
                <input type="hidden" id="id" />

                <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa-solid fa-gift" /></span>
                    <input type="text" id='nombre' className="form-control" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa-solid fa-comment" /></span>
                    <input type="text" id='descripcion' className="form-control" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa-solid fa-dollar-sign" /></span>
                    <input type="text" id='precio' className="form-control" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={() => validar()}>
                    <i className="fa-solid fa-floppy-disk" /> Guardar
                </button>
                <button id="btnCerrarModal" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Producto