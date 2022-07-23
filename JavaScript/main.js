// Tip Selector
const tipBox = document.querySelector('.tips') // Tip Container
const tips = [5, 10, 15, 25, 50, "Custom"] // Tips
// Create tip boxes automatically
tips.map((amount, index) => {
    if (index === tips.length - 1) {
        let tip = document.createElement("input")
        tipBox.appendChild(tip)
        // classes for tip
        tip.classList.add(`tip`)
        tip.classList.add(`center`)
        tip.classList.add(`tip-${amount}`)
        tip.type = 'text'
        tip.value = 'Custom'
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
for (let x of document.querySelectorAll('.tip')) {
    if (x.classList.contains("tip-Custom")) {
        x.addEventListener('click', () => {
            for (let y of document.querySelectorAll('.tip')) { y.classList.remove('active') }
            x.type = 'number'
            x.value = null
            x.style.textAlign = 'right'
            x.style.paddingRight = '17px'
            x.style.color= 'hsla(183, 100%, 15%, 1)';         
        })
    } else {
        x.addEventListener('click', () => {
            for (let y of document.querySelectorAll('.tip')) { y.classList.remove('active') }
            x.classList.add('active')
            let cust=document.querySelector('.tip-Custom')
            cust.type = 'text'
            cust.value = 'Custom'
            cust.style.textAlign = 'center'
            cust.style.paddingRight = '2px'
            cust.style.color= 'hsla(180, 18%, 40%, 1)'; 
        })
    }

}
