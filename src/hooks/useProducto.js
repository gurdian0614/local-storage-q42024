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

    const enviarSolicitud = (metodo, parametros = {}) => {
        const saveUpdateProducto = [...productos]
        let mensaje

        if (metodo === 'POST') {
            saveUpdateProducto.push({ ...parametros, id: Date.now()})
            mensaje = 'Producto ingresado correctamente'
        } else if(metodo === 'PUT') {
            const productoIndex = saveUpdateProducto.findIndex(producto => producto.id === parametros.id)

            if(productoIndex !== -1) {
                saveUpdateProducto[productoIndex] = {...parametros}
                mensaje = 'Producto actualizado correctamente'
            }
        } else if (metodo === 'DELETE') {
            console.log(parametros.id)
            const productosArr = saveUpdateProducto.filter(producto => producto.id !== parametros.id)
            setProductos(productosArr)
            localStorage.setItem('PRODUCTOS', JSON.stringify(productosArr))
            alertaSuccess('Producto eliminado correctamente')
            return
        }

        localStorage.setItem('PRODUCTOS', JSON.stringify(saveUpdateProducto))
        setProductos(saveUpdateProducto)
        alertaSuccess(mensaje)
        document.getElementById('btnCerrarModal').click()
    }

    const validar = () => {
        let metodo = ''

        if (nombre === '') {
            alertaWarning('Nombre del producto en blanco', 'nombre')
        } else if (descripcion === '') {
            alertaWarning('Descripción del producto en blanco', 'descripcion')
        } else if (precio === '') {
            alertaWarning('Precio del producto en blanco', 'precio')
        } else {
            let payload = {
                id: id || Date.now(),
                nombre: nombre,
                descripcion: descripcion,
                precio: parseFloat(precio)
            }

            if (operacion === 1) {
                metodo = 'POST'
            } else {
                metodo = 'PUT'
            }

            enviarSolicitud(metodo, payload)
        }
    }

    const deleteProducto = (id) => {
        Swal.fire({
            title: '¿Está seguro de eliminar el producto?',
            icon: 'question',
            text: 'No habrá marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                enviarSolicitud('DELETE', { id })
            }
        }).catch((error) => {
            alertaError(error)
        })
    }

    return {
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
    }

}

export default useProducto