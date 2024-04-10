/* IMPORTACIONES */
import { cars, minutos, segundos, carrerActive } from './app.js'

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
        btnColors.forEach(btnColorNot => { btnColorNot.classList.remove('select') })
        btnColor.classList.add('select')
    }))
}

export const saveCar = () => {
    const $inputNumberCar = document.querySelector('#inputNumberCar')
    const $numberSubTimes = document.querySelector('#inputNumberTurns')

    if ($inputNumberCar.value == '' || $numberSubTimes.value == '') return

    const numberCar = $inputNumberCar.value
    const numberSubTimes = $numberSubTimes.value


    cars.push({
        numberCar,
        numberSubTimes,
        times: [],
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

        $div.addEventListener('click', () => saveTime(car.numberCar))

        $conteinerCars.appendChild($div)
    })
}

export const setColor = () => {
    let colorSelect
    const btnColors = document.querySelectorAll('.color')
    btnColors.forEach(btnColor => { if (btnColor.classList[2] == 'select') colorSelect = btnColor.classList[1] })
    return colorSelect
}

export const saveTime = (numberCar) => {
    if (carrerActive == false) {
        return
    }

    const carSelect = cars.find(car => car.numberCar == numberCar)
    carSelect.times.push({
        minutos,
        segundos
    })
    renderTimes()
}

export const renderTimes = () => {
    const $conteinerTimes = document.querySelector('#times')
    $conteinerTimes.innerHTML = ' '
    cars.forEach(car => {
        car.times.forEach((time, i) => {
            const $itemTime = document.createElement('div')
            const $numberLap = document.createElement('p')
            const $numberCar = document.createElement('p')
            const $time = document.createElement('p')


            $numberLap.textContent = `VUELTA NUMERO: ${Math.floor(i / car.numberSubTimes) + 1}`
            $numberCar.textContent = `AUTO: ${car.numberCar}`
            $time.textContent = `TIEMPO : ${time.minutos}:${time.segundos}`

            $itemTime.appendChild($numberLap)
            $itemTime.appendChild($numberCar)
            $itemTime.appendChild($time)

            $itemTime.classList.add('item_tiempo', car.colorCar)

            $conteinerTimes.appendChild($itemTime)
        })
    })
}