// class User { // создание класса
//     constructor(name, age, phone, mail) { // инициализация объекта, содержит аргументы
//         this.name = name // аргумент name, this - объект
//         this.age = age // аргумент age, this - объект
//         this.phone = phone // аргумент phone, this - объект
//         this.mail = mail // аргумент mail, this - объект
//     }
//     hello(){ // создание метода hello
//         return `Hello! I'm ${this.name}, I'm ${this.age} years old` // возвращение строки с обращениями к определенным аргументам
//     }
// }

// const Liza = new User('Liza', 26, 89255445867, 'liza.ngo@mail.ru') // создание нового объекта из класса
// console.log(Liza) // вывод через консоль
// console.log(Liza.hello()) // вызов у объекта Liza метода hello

// const Sasha = new User('Sasha', 26, 89773897459, 'blatov_a@mail.ru') // создание нового объекта из класса
// console.log(Sasha) // вывод через консоль
// console.log(Sasha.hello()) // вызов у объекта Sasha метода hello

const btn = document.querySelector('.create_btn')
const retry = document.querySelector('.retry')

let count = 0


class Round {
    elem = document.createElement('div')
    className = 'round'
    constructor(color, count) {
        this.color = color
        this.count = count
    }
    create(seconds) {
        if(seconds >= 0 && count <= 30) {
            this.elem.classList.add(this.className)
            this.elem.style.backgroundColor = this.color
            document.querySelector('.container').append(this.elem)
        } 
    }
   
    remove() {
        this.elem.addEventListener('click', () => {
            this.elem.classList.add('scale')
            console.log(++count)
            setTimeout(() => {
                this.elem.classList.add('zero')
                setTimeout(() => {
                     this.elem.remove()
                     let list = document.getElementsByClassName('round')
                     let n = Math.floor(Math.random() * list.length) 
                        for(let i = list.length; i--;) {
                            list[i].style.opacity = '0'
                            i == n && (list[i].style.opacity = '1')
                    } 
                }, 100)
               
            }, 100)
        })
    }
}
Round.online = false //состояние игры - игра не идет 

const arrColors = []

const timerVal = document.querySelector('.timer')


let seconds = parseInt(timerVal.textContent.match(/(\d+)/)[0])

function initTimer() {
    seconds = parseInt(timerVal.textContent.match(/(\d+)/)[0])
    Round.online = true // игра идет 
    const timer = setInterval(() => {
     if(seconds < 1) {
       timerVal.innerHTML = `Time is over! You have ${count} balls!`
       Round.online = false // the game is over
       count = 0 // reset the counter
       clearInterval(timer);
     } 
     else
     timerVal.textContent = `You have ${seconds} seconds to collect`;
     seconds -= 1;
   }, 1000)
}

    btn.addEventListener('click', () => {
        let color
        // the game isn't going, reset the function
        if(Round.online) return

        //to do random from 20 to 50 balls
        for(let i = 0; i < Math.floor(Math.random() * (50 - 20 + 1)) + 20; i++){
            while(true) {
                color = '#'+(0x1000000 + Math.random()*0xffffff).toString(16).substr(1,6)
                if(!arrColors.includes(color)) {
                 break
                }
             }
            if(count <= 30) {
                const obj = new Round(color, count)
                obj.create(0) // was "seconds", btnt using "seconds", cos it's negative after a round
                obj.remove()
               
                console.log(count)
            }
            
        }

        let list = document.getElementsByClassName('round')
        let n = Math.floor( Math.random() * list.length )
        
        for(let i = list.length; i--;) {
            list[i].style.opacity = '0'
            if(i == n) {
                list[i].style.opacity = '1'
            }
        }
        
        initTimer() 
    })
    
    retry.addEventListener('click', () => {
        window.location.reload()
    })
    

