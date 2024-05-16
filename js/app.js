/* COMPONENTES */
import {
    btnMenu,
    btnAddAutos,
    btnCloseCustomCar,
    btnStart,
    $minutos,
    $segundos,
    $microSegundos,
    btnPause,
    btnStop,
    btnCreateCar,
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
    renderBestPositions,
    exportData,
    renderAutoVueltas
} from './funciones.js'




/* VARIABLES Globales*/
export let cars = []

let datosExport = false

export let carrerActive = false

export let segundos = 0

export let minutos = 0

export let microsegundos = 0


let keyInterval = 0






const StartCareer = () => {
    if (carrerActive == true || cars.length == 0) return

    //MOSTRAR LA SECCION DE TIEMPOS
    const $headerTimes = document.querySelector('#headerTimes')
    $headerTimes.classList.add('displayFlex')

    /* MOSTAR LA SECCION DE VUELTAS */
    const $sectionVueltas = document.querySelector('#sectionVueltas')
    $sectionVueltas.classList.add('displayFlex')
    renderAutoVueltas()

    carrerActive = true
    keyInterval = setInterval(() => {
        microsegundos++
        if (microsegundos == 100) {
            microsegundos = 0
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
        } else {
            if (microsegundos < 10) $microSegundos.textContent = `0${microsegundos}`
            else $microSegundos.textContent = microsegundos
        }
    }, 10)
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
    
    const btnExportData = document.querySelector('#btnExportData')
    btnExportData.addEventListener('click', () => {
        if(datosExport){
            return
        }
        exportData()
        datosExport = true
    })
    
    window.location.href = '#sectionTablaPosiciones'
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


window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    // Muestra un mensaje de advertencia personalizado
    const confirmationMessage = '¿Estás seguro de salir de la página? Si lo haces, podrías perder la información que has ingresado.';
    return confirmationMessage;
});