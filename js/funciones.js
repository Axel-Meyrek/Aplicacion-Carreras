/* IMPORTACIONES */
import {cars} from './app.js'

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

export const addEventsColors = () => {
    const btnColors = document.querySelectorAll('.color')
    btnColors.forEach(btnColor => btnColor.addEventListener('click', (e) => {
        btnColors.forEach(btnColorNot => {btnColorNot.classList.remove('select')})
        btnColor.classList.add('select')
    }))
}

export const saveCar = () => {
    const $inputNumberCar = document.querySelector('#inputNumberCar')
    const $inputNumberTurns = document.querySelector('#inputNumberTurns')

    if($inputNumberCar.value == '' || $inputNumberTurns.value == '') return

    const numberCar = $inputNumberCar.value
    const numberTurn = $inputNumberTurns.value


    cars.push({
        numberCar,
        numberTurn,
        colorCar: setColor()
    })

    cleanInputs()

    renderCar()

}

export const cleanInputs = () => {
    const $inputNumberCar = document.querySelector('#inputNumberCar')
    const $inputNumberTurns = document.querySelector('#inputNumberTurns')
    const $customCar = document.querySelector('#customCar')
    $inputNumberCar.value = ''
    $inputNumberTurns.value = ''
    $customCar.classList.remove('active')
}

export const renderCar = () => {
    const $conteinerCars = document.querySelector('#conteinerCars')
    $conteinerCars.innerHTML = ' '
    cars.forEach(car => {
        const $div = document.createElement('div')
        const $span = document.createElement('span')
        const $i = document.createElement('i')

        $div.classList.add('buttonAuto', car.colorCar)
        $i.classList.add('fa-solid', 'fa-car', 'iconAuto')
        $span.classList.add('numberAuto')

        $span.textContent = car.numberCar

        $div.appendChild($span)
        $div.appendChild($i)

        $conteinerCars.appendChild($div)
    })
}

export const setColor = () => {
    let colorSelect
    const btnColors = document.querySelectorAll('.color')
    btnColors.forEach(btnColor => {if(btnColor.classList[2] == 'select') colorSelect = btnColor.classList[1]})
    return colorSelect
}