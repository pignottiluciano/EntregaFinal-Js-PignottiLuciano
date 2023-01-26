const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-pagar')
const botonCerrar = document.getElementById('cerrar-pago')
const modalActive = document.getElementsByClassName('modal-cerrar')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', (event)=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalActive.addEventListener('click', (event) => {
    event.stopPropagation() 
})