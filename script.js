const amount = document.getElementById('amount')
let from = document.getElementById('from')
let to = document.getElementById('to')
const convertBtn = document.getElementById('convert')
const reverseBtn = document.getElementById('reverseBtn')
const resultEl = document.querySelector('.result')
const time = document.querySelector('.time')
const currencies = {
    USD: 'US dollars',
    EUR: 'Euros',
    HKD: 'Hong Kong dollars',
    GBP: 'Pounds',
    JPY: 'Japanese Yen',
    RMB: 'Chinese Yuan',
    ISK: 'Icelandic kronas'
}

reverseBtn.addEventListener('click', swap)
convertBtn.addEventListener('click', convert)
document.addEventListener('keydown', (e) => (e.key === 'Enter') && convert())

async function convert() {
    const data = await getData()
    const rate = data.conversion_rates
    const date = data.time_last_update_utc.replace('+0000', 'UTC')

    const inputAmount = +amount.value
    const outputAmount = inputAmount * rate[to.value]
    insertResult(outputAmount, date)
}

async function getData() {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/1de0c29170ef93e051257bb0/latest/${from.value}`)    
    const data = await res.json()
    return data
}

function insertResult(result, date) {
    resultEl.innerHTML = 
    `<span class="input-amount">${new Intl.NumberFormat('en-IN').format(+amount.value)} ${currencies[from.value]} =</span>
     <h3 class="output-amount">${new Intl.NumberFormat('en-IN').format(result.toFixed(2))} ${currencies[to.value]}</h3>
    `
    time.innerText = `Conversion rate last updated at: ${date}`
}

function swap() {
    let swapper = ''
    swapper = from.value
    from.value = to.value
    to.value = swapper
}