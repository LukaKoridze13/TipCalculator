let calcStatus = false;
// Inputs 
let bill = document.querySelector('#bill')
let tip; // will be valid after click
let people = document.querySelector('#people')
let reset = document.querySelector('button')
// document event listeners
document.addEventListener('mousemove', (event) => {
    if (Number(document.querySelector('.tip-Custom').value) > 1) {
        let val = Number(document.querySelector('.tip-Custom').value) * 10
        val = Math.floor(val) / 10 // roundign to floor decimal, to avoid rounding to more value then the user entered
        document.querySelector('.tip-Custom').value = val
        tip = val
    }
    if (event.target !== bill && bill.value > 0) {
        bill.value = Math.round(bill.value * 100) / 100
    }
    if (event.target !== people && people.value > 0) {
        people.value = Math.round(people.value)
    }
    activateCalculations()
})
document.addEventListener('click', () => {
    if ((document.querySelector('.tip-Custom').value === '' || document.querySelector('.tip-Custom').value == 0) && event.target !== document.querySelector('.tip-Custom')) {
        let x = document.querySelector('.tip-Custom')
        x.placeholder = 'Custom'
    }
    activateCalculations()
})
document.addEventListener('keypress', () => {
    activateCalculations()

})
// Tip Selector
const tipBox = document.querySelector('.tips') // Tip Container
const tips = [5, 10, 15, 25, 50, "Custom"] // Tips
// Create tip boxes automatically
createTips()
// creating tip clickable elements
function createTips() {
    // create tips
    tips.map((amount, index) => {
        if (index === tips.length - 1) {
            let tip = document.createElement("input")
            tipBox.appendChild(tip)
            // classes for tip
            tip.classList.add(`tip`)
            tip.classList.add(`center`)
            tip.classList.add(`tip-${amount}`)
            tip.type = 'number'
            tip.placeholder = 'Custom'
        } else {
            let tip = document.createElement("div")
            tipBox.appendChild(tip)
            // classes for tip
            tip.classList.add(`tip`)
            tip.classList.add(`center`)
            tip.classList.add(`tip-${amount}`)
            // tip text
            tip.innerText = `${amount}%`
        }
    })
    // add event listeners
    for (let x of document.querySelectorAll('.tip')) {
        if (x.classList.contains("tip-Custom")) {
            x.addEventListener('click', () => {
                for (let y of document.querySelectorAll('.tip')) { y.classList.remove('active') }
                x.removeAttribute('placeholder')
                if(calcStatus===false){
                    calcStatus = true;
                    messagesOn()
                }
                document.querySelectorAll('.alert')[1].classList.remove('deactivate')
            })

        } else {
            x.addEventListener('click', () => {
                for (let y of document.querySelectorAll('.tip')) { y.classList.remove('active') }
                x.classList.add('active')
                let cust = document.querySelector('.tip-Custom')
                cust.value = '';
                tip = Number(x.innerText.slice(0, -1))
                cust.placeholder = 'Custom'
                document.querySelectorAll('.alert')[1].classList.add('deactivate')
                if(calcStatus===false){
                    calcStatus = true;
                    messagesOn()
                }
            })
        }

    }
}

// input information validations 
let customTip = document.querySelector('.tip-Custom')
customTip.addEventListener('input', () => {
    let value = Number(customTip.value)
    if (value <= 0) {
        value = 0;
        customTip.value = '';
    }
    tip = value;
    activateCalculations()
    if(Number(customTip.value)>=1){
        document.querySelectorAll('.alert')[1].classList.add('deactivate')
    }else{
        document.querySelectorAll('.alert')[1].classList.remove('deactivate')
    }
})
bill.addEventListener('input', () => {
    let value = Number(bill.value)
    if (value < 1) {
        bill.value = ''
    }
    activateCalculations()
    if(Number(bill.value)>=1){
        document.querySelectorAll('.alert')[0].classList.add('deactivate')
    }else{
        document.querySelectorAll('.alert')[0].classList.remove('deactivate')
    }
})
people.addEventListener('input', () => {
    let value = Number(people.value)
    if (value < 1) {
        people.value = ''
    }
    activateCalculations()
    if(Number(people.value)>=1){
        console.log('done')
        document.querySelectorAll('.alert')[2].classList.add('deactivate')
    }else{
        document.querySelectorAll('.alert')[2].classList.remove('deactivate')
    }
})
bill.addEventListener('click', () => {
    if(calcStatus===false){
        calcStatus = true;
        messagesOn()
    } 
})
people.addEventListener('click', () => {
    if(calcStatus===false){
        calcStatus = true;
        messagesOn()
    } 
})
// Calculations
function calculate() {
    let tipper = Math.floor(Number(bill.value) / 100 * tip / Number(people.value) * 100) / 100 // avoid overpaying, use floor
    document.querySelector('.personTip__right').innerText = `$${tipper}`
    let total = Math.round((Number(bill.value) / Number(people.value) + tipper) * 100) / 100 // avoid overpaying
    document.querySelector('.totalTip__right').innerText = `$${total}`
    if (document.querySelector('.totalTip__right').innerText.length >= 9 || document.querySelector('.personTip__right').innerText >= 8) {
        document.querySelector('.totalTip__right').style.fontSize = "30px"
        document.querySelector('.personTip__right').style.fontSize = "30px"
    } else {
        document.querySelector('.totalTip__right').style.fontSize = "48px"
        document.querySelector('.personTip__right').style.fontSize = "48px"
    }
}
function clearCalculations() {
    document.querySelector('.personTip__right').innerText = '$0.00'
    document.querySelector('.totalTip__right').innerText = `$0.00`
}
function activateCalculations() {
    // activating calculations
    if (Number(bill.value) >= 1 && Number(tip) >= 1 && Number(people.value) >= 1) {
        reset.removeAttribute('disabled')
        reset.classList.add('activeButton')
        messagesOff()
        calculate()
    } else {
        reset.setAttribute('disabled', true)
        reset.classList.remove('activeButton')
        clearCalculations()
        if (calcStatus === true) {
            if (Number(bill.value) < 1) {
                document.querySelectorAll('.alert')[0].classList.remove('deactivate')
            }
            if (Number(tip) < 1 || Number(tip) === NaN) {
                document.querySelectorAll('.alert')[1].classList.remove('deactivate')
            }
            if (Number(people.value) < 1) {
                document.querySelectorAll('.alert')[2].classList.remove('deactivate')
            }
        }
    }
}

// reset 
reset.addEventListener('click', () => {
    clearCalculations();
    activateCalculations();
    bill.value = ''
    tip = 0;
    people.value = ''
    for (let y of document.querySelectorAll('.tip')) { y.classList.remove('active') }
    document.querySelector('.tip-Custom').value = '';
    document.querySelector('.tip-Custom').placeholder = "Custom"
    document.querySelector('.totalTip__right').style.fontSize = "48px"
    document.querySelector('.personTip__right').style.fontSize = "48px"
    messagesOn()
    calcStatus = false;
})


// Activate all validation messages
function messagesOff() {
    for (let x of document.querySelectorAll('.alert')) {
        x.classList.add('deactivate')
    }
}
function messagesOn() {
    if (calcStatus === true) {
        for (let x of document.querySelectorAll('.alert')) {
            x.classList.remove('deactivate')
        }
    }
}