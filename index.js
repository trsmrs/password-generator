const inputEl = document.querySelector('#password')
const passwordLenghtEl = document.querySelector('#password-lenght')
const copyButton = document.querySelector('#copyPass')
const copyButton2 = document.querySelector('#copy2')
const refreshButton = document.querySelector('#renew')
const sizeBarValue = document.querySelector('#password-lenght-text')
const securityBar = document.querySelector('#security-indicator-bar')

const upperCase = document.querySelector('#uppercase-check')
const numberCase = document.querySelector('#number-check')
const symbolCase = document.querySelector('#symbol-check')

let passwordLenght = 16

const generatePassword = () => {
    let chars = "abcdefghjklmnpqrstuvxwyz"
    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVXWYZ"
    const numbersChars = "123456789"
    const symbolsChars = "?!@&*()[]%$#"


    if (upperCase.checked) {
        chars += upperCaseChars
    }
    if (numberCase.checked) {
        chars += numbersChars
    }
    if (symbolCase.checked) {
        chars += symbolsChars
    }

    let password = ''

    for (let i = 0; i < passwordLenght; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }

    calculateQuality()
    calculateFontSize()
    return inputEl.value = password
}
function calculateQuality() {
    const percent = Math.round(
        (passwordLenght / 64) * 25 +
        (upperCase.checked ? 15 : 0) +
        (numberCase.checked ? 25 : 0) +
        (symbolCase.checked ? 35 : 0)
    )
    securityBar.style.width = `${percent}%`

    if (percent > 69) {
        securityBar.classList.remove('critical')
        securityBar.classList.remove('warning')
        securityBar.classList.add('safe')
    } else if (percent > 50) {
        securityBar.classList.remove('critical')
        securityBar.classList.add('warning')
        securityBar.classList.remove('safe')
    } else {
        securityBar.classList.add('critical')
        securityBar.classList.remove('warning')
        securityBar.classList.remove('safe')
    }

    if (percent >= 100) {
        securityBar.classList.add('completed')
    } else {
        securityBar.classList.remove('completed')
    }
}

function calculateFontSize() {
    if (passwordLenght > 45) {
        inputEl.classList.remove('font-sm')
        inputEl.classList.remove('font-xs')
        inputEl.classList.add('font-xxs')

    } else if (passwordLenght > 32) {
        inputEl.classList.remove('font-sm')
        inputEl.classList.add('font-xs')
        inputEl.classList.remove('font-xxs')

    } else if (passwordLenght > 22) {
        inputEl.classList.remove('font-sm')
        inputEl.classList.remove('font-xs')
        inputEl.classList.remove('font-xxs')

    } else {

    }
}

passwordLenghtEl.addEventListener('input', () => {
    passwordLenght = passwordLenghtEl.value
    sizeBarValue.innerText = passwordLenghtEl.value
    generatePassword()

})

upperCase.addEventListener('click', generatePassword)
numberCase.addEventListener('click', generatePassword)
symbolCase.addEventListener('click', generatePassword)

const copyPassword = () => {
    navigator.clipboard.writeText(inputEl.value)

}

generatePassword()
copyButton.addEventListener('click', copyPassword)
copyButton2.addEventListener('click', copyPassword)
refreshButton.addEventListener('click', generatePassword)



