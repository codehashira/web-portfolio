//Selectors
let checkbox = document.getElementById('toggle')
let body = document.querySelector('body')
let linksColor = document.querySelectorAll('.div-nav a')
let contentHeight = document.querySelector('body').scrollHeight
let copyright = document.getElementById('copyright')
let closeButton = document.querySelector('.fa-x')
let openButton = document.querySelector('.fa-bars')
let sidemenu = document.querySelector('.div-nav')
let dropdownButton = document.querySelector('.dropdown-btn')
let copyButton = document.querySelector('.copying')
const scriptURL = 'https://script.google.com/macros/s/AKfycbyU-YHrg1lEHVK7iGGCWtHaPpjlWAFalepLUxLlyG9rHtd5ZOqTbC0axokgBgX90DNJEA/exec'
const form = document.forms['submit-to-google-sheet']
const messageNotification = document.getElementById('message-notif')

//Events
document.addEventListener('DOMContentLoaded', checkTheme)
document.addEventListener('DOMContentLoaded', checkPageHeight)
checkbox.addEventListener('change', changeTheme)

closeButton.addEventListener('click', () => {
    sidemenu.style.right = '-205px'
})
openButton.addEventListener('click', () => {
    sidemenu.style.right = '0px'
})

dropdownButton.addEventListener('click', dropdownMenu)
document.addEventListener('click', closeDropdownMenu)
copyButton.addEventListener('click', copyingProcess)

form.addEventListener('submit', getForm)

//Functions
function changeTheme (e) {
    if (e.target.checked) {
        body.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark')
    } else {
        body.removeAttribute('data-theme', 'dark')
        localStorage.removeItem('theme')
    };
}

function checkTheme() {
    const localTheme = localStorage.theme
    if (localTheme == 'dark') {
        body.setAttribute('data-theme', 'dark')
        checkbox.setAttribute('checked', true)
    } else {
        body.removeAttribute('data-theme', 'dark')
    }
}

function checkPageHeight() {
    if (contentHeight > window.innerHeight) {
        copyright.style.position = 'relative'
    } else {
        copyright.style.position = 'absolute'
    }
}

function dropdownMenu() {
    if (document.querySelector('.dropdown-content').style.display === 'none') {
        document.querySelector('.dropdown-content').style.display = 'block'
    } else {
        document.querySelector('.dropdown-content').style.display = 'none'
    }
}

function closeDropdownMenu(e) {
    const outsideClick = !document.querySelector('.dropdown-btn').contains(e.target)
    if (outsideClick) {
        document.querySelector('.dropdown-content').style.display = 'none'
    }
}

function copyingProcess() {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        //copying process
        navigator.clipboard.writeText('smr.artm@gmail.com')
        //creating notification
        const popupWindow = document.createElement('p')
        popupWindow.classList.add('popup-copy')
        popupWindow.innerHTML = 'Email copied!'
        document.getElementsByClassName('dropdown')[0].appendChild(popupWindow)
        popupWindow.style.position = 'absolute'
        popupWindow.style.display = 'inline-block'
        popupWindow.style.backgroundColor = '#30D5C8'
        popupWindow.style.fontSize = '16px'
        popupWindow.style.padding = '5px'
        popupWindow.style.marginTop = '40px'
        popupWindow.style.marginLeft = '-104px'
        popupWindow.style.width = '120px'
        popupWindow.style.borderRadius = '5px'
        //hide the notification
        setTimeout(() => popupWindow.remove(), 1300)
    } else {
        window.alert('The email was not copied. Please, do it manually: email@smthg.ru')
    }
}

//contact form to the google sheets
function getForm(e) {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(() => {
            messageNotification.innerHTML = 'The message has been sent!'
            setTimeout(() => {
                messageNotification.innerHTML = ''
            }, 1300)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
}

