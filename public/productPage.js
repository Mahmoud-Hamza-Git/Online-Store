var number_of_pieces_available = document.querySelector('#number_of_pieces_available')
var pieces_available_after = document.querySelector('#pieces_available_after')
var number_of_pieces_ordered = document.querySelector('#number_of_pieces_ordered')
var adding_form = document.querySelector('#addToCart')
var err_msg = document.querySelector('.err_msg')
var success_msg = document.querySelector('.success_msg')

const addToCart = async (event)=>{
    event.preventDefault()
    var n_available = Number(number_of_pieces_available.textContent)
    var n_ordered = Number(number_of_pieces_ordered.value)
    if(n_available < n_ordered){
        err_msg.classList.toggle('hidden')
        setTimeout(() => {
            err_msg.classList.toggle('hidden')
        }, 3000);
    }else{
        const n_remain = n_available - n_ordered
        number_of_pieces_available.textContent = n_remain
        pieces_available_after.value=  n_remain

        adding_form.requestSubmit()
        success_msg.classList.toggle('hidden')
        setTimeout(() => {
            success_msg.classList.toggle('hidden')
        }, 3000);
        
    }
}


// adding_form.addEventListener('submit', function(event) {
//     event.preventDefault();
// });