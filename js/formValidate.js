const camposDoForm = document.querySelectorAll("[required]");
const btnEnviar = document.getElementById('submit__button');
const tiposErros = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
];

const mensagemErros = {
    product:{
        valueMissing : 'Campo Obrigratório, preencha com o nome do produto.',
        tooShort: 'Por favor, preencha um nome válido.'
    },
    price:{
        valueMissing: 'Campo Obrigatório. Preencha com um valor em R$!',
        patternMismatch:'Por favor, preencha esse campo com o preço do produto.(Ex. 5,17)',
        customError:'Por favor, preencha esse campo com o preço do produto.(Ex. 5,17)'
    },
    image:{
        valueMissing : 'Campo Obrigatório. Preencha com uma URL válida!(Ex. https://)',
        tooShort: 'Por favor, preencha com um link válido.(Ex. https://)',
        typeMismatch: 'Por favor, preencha com um link válido.(Ex. https://)'
    }
}
 btnEnviar.addEventListener('click', () =>{
    camposDoForm.forEach((campo) => verificaCampo(campo));
});

camposDoForm.forEach((campo) =>{
    campo.addEventListener('blur', () => verificaCampo(campo));
    campo.addEventListener('invalid', e => e.preventDefault());
})


function verificaCampo(formCampo){
    
    let message = "";

    if(formCampo.name == 'price' && formCampo.value.length <= 12){
        formCampo.value = validarPreco(formCampo);
    }

    tiposErros.forEach(error => {
       if (formCampo.validity[error]){
        message = mensagemErros[formCampo.name][error];
       } 
    })

    const messageElement = formCampo.parentNode.querySelector('.error__message');
    const isInputValid = formCampo.checkValidity();

    if (!isInputValid){
        messageElement.textContent = message;
        formCampo.classList.add('form__item-error');
    } else {
        messageElement.textContent = '';
        formCampo.classList.remove('form__item-error');
    }
}

function validarPreco(formCampo){
    let preco = formCampo.value.replace(/\./g,"") 
    preco = formCampo.value.replace(/\./g,"");
    preco = preco.replace(/\,/g,".");
    preco = parseFloat(preco);
    if(preco < 0 || preco == undefined || isNaN(preco)){
        return '';
    }else{
        preco = preco.toLocaleString('pt-br', {minimumFractionDigits: 2});
        return preco;
    }
}