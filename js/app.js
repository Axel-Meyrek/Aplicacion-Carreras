/* COMPONENTES */
import {
    btnMenu,
    btnAddAutos,
    btnCloseCustomCar,
    btnStart,
    $minutos,
    $segundos,
    btnPause,
    btnStop,
    btnCreateCar
} from './components.js'

/* FUNCIONES */
import {
    openMenu,
    openCustomCar,
    closeCustomCar,
    saveCar,
    addEventsColors
} from './funciones.js'




/* VARIABLES Globales*/

export const cars = []

let carrerActive = false

let keyInterval = 0

let segundos = 0

let minutos = 0




const StartCareer = () => {
    if (carrerActive == true) {
        return
    }
    carrerActive = true
    keyInterval = setInterval(() => {
        segundos++
        if (segundos == 60) {
            segundos = 0
            minutos++
            if (minutos < 10) $minutos.textContent = `0${minutos}`
            else $minutos.textContent = minutos
            $segundos.textContent = `0${segundos}`
        } else {
            if (segundos < 10) $segundos.textContent = `0${segundos}`
            else $segundos.textContent = segundos
        }
    }, 1000)
}

const pauseCarrer = () => {
    clearInterval(keyInterval);
    carrerActive = false
}

const stopCarrer = () => {
    clearInterval(keyInterval);
    carrerActive = false
    minutos = 0
    segundos = 0
    $minutos.textContent = '00'
    $segundos.textContent = '00'
}



/* CARGAR APP */
document.addEventListener('DOMContentLoaded', () => {
    addEventsColors()

    btnMenu.addEventListener('click', openMenu)

    btnAddAutos.addEventListener('click', openCustomCar)

    btnCloseCustomCar.addEventListener('click', closeCustomCar)

    btnStart.addEventListener('click', StartCareer)

    btnPause.addEventListener('click', pauseCarrer)

    btnStop.addEventListener('click', stopCarrer)

    btnCreateCar.addEventListener('click', saveCar)

})

