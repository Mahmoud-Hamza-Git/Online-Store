var number_of_pieces_available = document.querySelector('#number_of_pieces_available')
var number_of_pieces_ordered = document.querySelector('#number_of_pieces_ordered')
var adding_form = document.querySelector('#addToCart')
var err_msg = document.querySelector('.err_msg')

function addToCart(event){
    event.preventDefault()
    var n_available = Number(number_of_pieces_available.textContent)
    var n_ordered = Number(number_of_pieces_ordered.value)
    if(n_available<n_ordered){
        err_msg.classList.toggle('hidden')
        setTimeout(() => {
            err_msg.classList.toggle('hidden')
        }, 2000);
    }else{
        adding_form.submit((event)=>{return false})
    }
}