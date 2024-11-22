import { useState } from "react"
import Swal from "sweetalert2"
import { alertaSuccess, alertaError, alertaWarning } from "../alertas"

const useProducto = () => {
    const [productos, setProductos] = useState([])
    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')
    const [titleModal, setTitleModal] = useState('')
    const [operacion, setOperacion] = useState(1)

    const getProductos = () => {
        const localStorageProductos = localStorage.getItem('PRODUCTOS')
        const parsedProductos = localStorageProductos ? JSON.parse(localStorageProductos) : []

        if (!Array.isArray(parsedProductos)) {
            setProductos([])
        } else {
            setProductos(parsedProductos)
        }
    }

    const openModal = (operation, id, nombre, descripcion, precio) => {
        setId('')
        setNombre('')
        setDescripcion('')
        setPrecio('')

        if (operation === 1) {
            setTitleModal('Registrar Producto')
            setOperacion(1)
        } else if (operation === 2) {
            setTitleModal('Editar Producto')
            setOperacion(2)
            setId(id)
            setNombre(nombre)
            setDescripcion(descripcion)
            setPrecio(precio)
        }
    }

    return {
        getProductos,
    }

}

export default useProducto