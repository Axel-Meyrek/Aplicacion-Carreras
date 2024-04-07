export const openMenu = () => {
    const menu = document.querySelector('#menu')
    menu.classList.toggle('active')
}

export const openCustomCar = () => {
    const customCar = document.querySelector('#customCar')
    customCar.classList.add('active')
}

export const closeCustomCar = () => {
    const customCar = document.querySelector('#customCar')
    customCar.classList.remove('active')
}

