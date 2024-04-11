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
    addEventsColors,
    saveEndTime,
    saveTheBestPositions,
    renderBestPositions
} from './funciones.js'




/* VARIABLES Globales*/

export const cars = []

export let carrerActive = false

export let segundos = 0

export let minutos = 0

let keyInterval = 0





const StartCareer = () => {
    if (carrerActive == true || cars.length == 0) return

    //MOSTRAR LA SECCION DE TIEMPOS
    const $headerTimes = document.querySelector('#headerTimes')
    $headerTimes.classList.add('displayFlex')

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
    if(cars.length == 0) return

    clearInterval(keyInterval);
    carrerActive = false
    minutos = 0
    segundos = 0
    $minutos.textContent = '00'
    $segundos.textContent = '00'

    /* MOSTRAR LA SECCION DE POSICIONES */
    const $sectionTablaPosiciones = document.querySelector('#sectionTablaPosiciones')
    $sectionTablaPosiciones.classList.add('displayFlex')

    /* MOSTRAR LA SECCION DE EXPORTAR */
    const $sectionExport = document.querySelector('#sectionExport')
    $sectionExport.classList.add('displayFlex')
    saveEndTime()

    saveTheBestPositions()

    renderBestPositions()

    
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

