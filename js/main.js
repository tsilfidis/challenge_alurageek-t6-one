import { apiConnection } from "./apiConnection.js";

const lista = document.querySelector('.products__list');
const form = document.querySelector('.form__container');
const btnlimpar = document.querySelector('.btnlimpar');

criarListaDeProdutos();

form.addEventListener('submit', e => criarNovoProduto(e));

btnlimpar.addEventListener('click', () => {
    let camposInput = document.querySelectorAll('[required]');
    let spanMessage = document.querySelectorAll('.error__message');
    for (let i=0; i < camposInput.length; i++) {
        camposInput[i].classList.remove('form__item-error');
        spanMessage[i].innerHTML = '';
    }
});
    

function criarCards(id, product, price, image){
    const novoProduto = document.createElement('div');
    novoProduto.classList.add('products__card');
    novoProduto.innerHTML =`<img src="${image}" alt="${product}" class="card__image">
                         <p class="card__information">${product}</p>
                         <p class="card__information bold">R$ ${price}</p>
                         <button class="card__delete-button" data-id="${id}"></button>`;

    
    const btnDelete = novoProduto.querySelector('.card__delete-button');
    btnDelete.addEventListener('click', () => apiConnection.deletarProduto(id));
    
    return novoProduto;
}

async function criarListaDeProdutos(){
    const produtosListaAPI = await apiConnection.buscarProdutos();
    lista.innerHTML='';
    produtosListaAPI.forEach(elemento => lista.appendChild(criarCards(elemento.id, elemento.product, elemento.price, elemento.image)))
}

async function criarNovoProduto(event){
    event.preventDefault();
    
    const product = document.getElementById('form-product').value;
    const price = document.getElementById('form-price').value;
    const image = document.getElementById('form-image').value;

    await apiConnection.gravarProdutos(product, price, image);
}

