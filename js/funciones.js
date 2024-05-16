/* IMPORTACIONES */
import { cars, minutos, segundos, microsegundos, carrerActive } from './app.js'

export const openMenu = () => {
    const menu = document.querySelector('#menu')
    menu.classList.toggle('active')
}

export const openCustomCar = () => {
    if (carrerActive == true) return
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

    if ($inputNumberCar.value == '') return

    if($numberSubTimes.value == '') $numberSubTimes.value = 1
    
    let existente = false
    cars.forEach(car => {
        if($inputNumberCar.value == car.numberCar){
            console.log('Este auto ya existe')
            existente = true;
        }
    })

    if(existente){
        return
    }

    cars.push({
        numberCar : $inputNumberCar.value,
        numberSubTimes : $numberSubTimes.value,
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

        $div.addEventListener('click', () => {
            saveTime(car.numberCar)
            renderAutoVueltas()
        })

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
    if (carrerActive == false) return

    const carSelect = cars.find(car => car.numberCar == numberCar)

    let timeAnterior = carSelect.times.length - 1;

    if (carSelect.times.length == 0) {
        carSelect.times.push({
            clockTimeMinutos: minutos,
            clockTimeSeconds: segundos,
            clockTimeMicrosegundos: microsegundos,
            minutos,
            segundos,
            microsegundos
        })
    } else {
        if (segundos - carSelect.times[timeAnterior].clockTimeSeconds < 0) {
            carSelect.times.push({
                clockTimeMinutos: minutos,
                clockTimeSeconds: segundos,
                clockTimeMicrosegundos: microsegundos,
                minutos: (minutos - carSelect.times[timeAnterior].clockTimeMinutos) - 1,
                segundos: Math.abs(segundos - carSelect.times[timeAnterior].clockTimeSeconds),
                microsegundos
            })
        } else {
            carSelect.times.push({
                clockTimeMinutos: minutos,
                clockTimeSeconds: segundos,
                clockTimeMicrosegundos: microsegundos,
                minutos: minutos - carSelect.times[timeAnterior].clockTimeMinutos,
                segundos: segundos - carSelect.times[timeAnterior].clockTimeSeconds,
                microsegundos
            })
        }
    }
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
            $time.textContent = `TIEMPO : ${time.minutos}:${time.segundos}.${time.microsegundos}`

            $itemTime.appendChild($numberLap)
            $itemTime.appendChild($numberCar)
            $itemTime.appendChild($time)

            $itemTime.classList.add('item_tiempo', car.colorCar)

            $conteinerTimes.appendChild($itemTime)
        })
    })
}


export const saveEndTime = () => {
    cars.forEach(car => {
        let endTime = 0
        const { times } = car
        times.forEach(time => {
            endTime += (time.minutos * 60) + time.segundos + (time.microsegundos / 1000) // Convertir microsegundos a segundos
        })

        car.endTime = endTime
    })
}


export const saveTheBestPositions = () => {
    cars.sort((a, b) => {
        // Primero, comparamos el número de vueltas
        const lapsA = Math.floor(a.times.length / a.numberSubTimes);
        const lapsB = Math.floor(b.times.length / b.numberSubTimes);
        if (lapsA !== lapsB) {
            return lapsB - lapsA; // Ordenamos de mayor a menor número de vueltas
        } else {
            // Si el número de vueltas es el mismo, comparamos los tiempos finales
            return a.endTime - b.endTime; // Ordenamos de menor a mayor tiempo final
        }
    });
};

export const renderBestPositions = () => {
    const $tablaPositions = document.querySelector('#tablaPositions')
    $tablaPositions.innerHTML = ''

    cars.forEach((car, i) => {
        const $div = document.createElement('div')
        const $position = document.createElement('p')
        const $numberLaps = document.createElement('p')
        const $numberCar = document.createElement('p')
        const $endTime = document.createElement('p')

        $div.classList.add('item_position', car.colorCar)

        $position.textContent = `POSICION: ${i + 1}`
        $numberLaps.textContent = `NUMERO DE VUELTAS: ${Math.floor(car.times.length / car.numberSubTimes)}`
        $numberCar.textContent = `AUTO: ${car.numberCar}`
        $endTime.textContent = `TIEMPO: ${formatTime(car.endTime)}`

        $div.appendChild($position)
        $div.appendChild($numberLaps)
        $div.appendChild($numberCar)
        $div.appendChild($endTime)

        $tablaPositions.appendChild($div)
    })
}

const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    const milliseconds = Math.floor((timeInSeconds - Math.floor(timeInSeconds)) * 100)

    const formattedTime = `${minutes}:${seconds}.${milliseconds.toString().padStart(3, '0')}`
    return formattedTime
}


export const exportData = () => {

    cars.forEach(car => {
        fetch("https://sheet.best/api/sheets/e5351bcb-9969-463a-bee1-22d227443399", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'DATE': fechaActual(),
                'NUMBER CAR': car.numberCar,
                'NUMBER SUBTIMES': car.numberSubTimes,
                'END TIMES (s)': car.endTime,
            }),
        })

    })
    
    
    const btnExportData = document.querySelector('#btnExportData')
    btnExportData.classList.add('buttonExportar--off')
    btnExportData.textContent = 'Los datos se exportaron correctamente'
}

export const fechaActual = () => {
    let fechaActual = new Date()

    let dia = fechaActual.getDate()
    let mes = fechaActual.getMonth() + 1
    let año = fechaActual.getFullYear()

    let fechaFormateada = dia.toString().padStart(2, '0') + '/' + mes.toString().padStart(2, '0') + '/' + año

    return fechaFormateada
}


export const renderAutoVueltas = () => {
    const $conteinerVueltas = document.querySelector('.conteinerVueltas')
    $conteinerVueltas.innerHTML = ``

    
    const sortedCars = [...cars]
    sortedCars.sort((a, b) => {
        const lapsA = Math.floor(a.times.length / a.numberSubTimes); // Número de vueltas completadas por el auto A
        const lapsB = Math.floor(b.times.length / b.numberSubTimes); // Número de vueltas completadas por el auto B
        return lapsB - lapsA; // Ordenamos de mayor a menor número de vueltas
    });
    sortedCars.forEach((car) => {
        const {numberCar, times, colorCar} = car
        const numberVuelta = Math.floor(times.length / car.numberSubTimes)

        $conteinerVueltas.innerHTML += 
        `<div class="itemVueltas ${colorCar}">
            <p>NUMERO VUELTA: ${numberVuelta}</p>
            <p>AUTO: ${numberCar} </p> 
        </div>`
    })
}