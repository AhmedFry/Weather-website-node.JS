console.log('js from client side!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m_1 = document.querySelector('#m_1')
const m_2 = document.querySelector('#m_2')


weatherForm.addEventListener('submit',(e)=>{
     e.preventDefault()

    const location = search.value
    m_1.textContent = 'Loading.....'
    m_2.textContent = ''
    fetch('/weather?address='+ location ).then((res)=>{
    res.json().then((data)=>{
        if (data.error){
            console.log(data.error)
            m_1.textContent = data.error
        }
        else{
            m_1.textContent = data.forecast
            m_2.textContent = data.location
            console.log(data.forecast)
            console.log(data.location)
        }
    })

})
})