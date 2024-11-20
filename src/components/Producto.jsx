import { alertaSuccess, alertaError, alertaWarning } from "../alertas"

const Producto  = () => {
    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <button className="btn btn-primary">
                            <i className="fa-solid fa-circle-plus" /> Añadir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Producto