'use strict'

const shedulles = [
    {
        name: "Step Adv",
        time: "11:00",
        maxNumberOfParticipants: 20,
        currentNumberOfParticipants: 10
    },
    {
        name: "Stretch",
        time: "12:30",
        maxNumberOfParticipants: 20,
        currentNumberOfParticipants: 20
    },
    {
        name: "Pump",
        time: "14:00",
        maxNumberOfParticipants: 20,
        currentNumberOfParticipants: 19
    },
    {
        name: "Pilates",
        time: "15:30",
        maxNumberOfParticipants: 20,
        currentNumberOfParticipants: 0
    }
]

const listGroup = document.querySelector('.list-group'); // блок для вставки расписания
const buttons = document.querySelectorAll('button'); 

//функция отрисовки расписания
function showShedulle() {
    shedulles.forEach(element => {
        const isFull = element.currentNumberOfParticipants === element.maxNumberOfParticipants;
        const sheduleItem = document.createElement('a');
        sheduleItem.classList.add("list-group-item")
        sheduleItem.innerHTML = `        
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${element.name}</h5>
                <button type="button" class="btn btn-outline-success"${isFull ? "disabled" : ""}>Записаться</button>
            </div>
            <p class="mb-1">Время проведения: ${element.time}</p>
            <p class="mb-1">Максимальное количество: ${element.maxNumberOfParticipants}</p>
            <small>Записано: ${element.currentNumberOfParticipants}</small>
        </a>
        `;
        listGroup.appendChild(sheduleItem);
    });
};

// обработчик событий на кнопку
listGroup.addEventListener('click', (e) => {
    if (e.target.matches('.btn-outline-success')) {
        signUp(e);
    } else if (e.target.matches('.btn-outline-danger')) {
        cancel(e);
    }
});

// функция записи
function signUp(e) {
    const nameGroup = e.target.previousElementSibling.textContent; // определим название группы
    const groupForSignUp = shedulles.find(item => item.name === nameGroup); // находим группу по имени в расписании
    if (groupForSignUp.currentNumberOfParticipants < groupForSignUp.maxNumberOfParticipants) {
        groupForSignUp.currentNumberOfParticipants++; // увеличим кол-во записанных 
        e.target.classList.remove('btn-outline-success'); // меняем кнопку
        e.target.classList.add('btn-outline-danger');
        e.target.textContent = 'Отменить';
        //находим строку "Записано" и обновляем колличество
        const updateCurrent = e.target.parentElement.parentElement.lastElementChild;  
        updateCurrent.textContent = `Записано: ${groupForSignUp.currentNumberOfParticipants}`;
        const youSignedUp = document.createElement('p'); // создадим и добавим информацию о записи
        youSignedUp.textContent = 'Вы записаны';
        e.target.parentElement.insertBefore(youSignedUp, e.target);
    }
};

// функция отмены
function cancel (e) {
    e.target.previousElementSibling.remove(); // удалим "Вы записаны"
    const nameGroup = e.target.previousElementSibling.textContent; // определим название группы
    const groupForCancel = shedulles.find(item => item.name === nameGroup); // находим группу по имени в расписании
    groupForCancel.currentNumberOfParticipants--; // уменьшаем кол-во записанных
    e.target.classList.remove('btn-outline-danger'); // меняем кнопку
    e.target.classList.add('btn-outline-success');
    e.target.textContent = 'Записаться';
    // меняем кол-во записанных
    const updateCurrent = e.target.parentElement.parentElement.lastElementChild;  
    updateCurrent.textContent = `Записано: ${groupForCancel.currentNumberOfParticipants}`;
}


document.addEventListener("DOMContentLoaded", showShedulle);