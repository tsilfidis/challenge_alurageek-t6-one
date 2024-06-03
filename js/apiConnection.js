
async function buscarProdutos(){
        const produtos = await fetch('http://localhost:3000/products');
        const listaProdutos = await produtos.json();
        return listaProdutos;  
}

async function gravarProdutos(product, price, image){

    const novoProduto = await fetch('http://localhost:3000/products', {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            product : product,
            price : price,
            image : image
        })
    });

    const novoProdutoConvertido = await novoProduto.json();
    return novoProdutoConvertido;
}

async function deletarProduto(id){
    const product = await fetch(`http://localhost:3000/products/${id}`,{
        method: 'DELETE'
    });
}

async function buscarAutor () {
    const autor = await fetch('http://localhost:3000/autor/1');
    const descAutor = await autor.json();
    document.querySelector('.autor__footer').innerHTML= `Desenvolvido por ${descAutor.nome}`;
    return descAutor;
}

buscarAutor();

export const apiConnection = {
    buscarProdutos,
    gravarProdutos,
    deletarProduto,
    buscarAutor
}