export const otherData = [{ name: 'otro', id: '1111' }]

export const toastInfo = (type: string) => {
  switch(type) {
    case 'success':
      return {
        title: 'Producto modificado',
        description: 'El producto ha sido modificado con éxito',
        duration: 5000,
        isClosable: true,
      }
    case 'warning':
      return {
        title: 'Verifique la información',
        description: 'No se pudo modificar el producto, inténtelo de nuevo',
        duration: 5000,
        isClosable: true,
      }
    case 'delete':
      return {
        title: 'Producto eliminado',
        description: 'El producto ha sido eliminado',
        duration: 5000,
        isClosable: true,
    }
  }
}
