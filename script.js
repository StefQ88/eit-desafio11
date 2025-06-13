
const BASE_URL = "https://684b1ce0165d05c5d35b8f75.mockapi.io/products"
let allProducts = []

//cargo una sola vez
const loadAllProducts = async () => {
    try {
        const response = await fetch(BASE_URL)
        const products = await response.json();
        allProducts = products
        console.log("Productos cargados:",allProducts)
        // renderResults(allProducts)
    } catch (error) {
        console.error("Error al cargar productos:", error)
    }
}

//funcion obtener y filtrar
const getProducts = (query) => {

    let filtered = allProducts //uso la lista
    if (!query) {
        // renderResults(filtered) //si no hay texto muestro todo
        return
    }
    filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    )
    renderResults(filtered)
}


//al enviar el form, busco
const searchProduct = (event) => {
    event.preventDefault()
    const value = document.getElementById("search-product").value.trim()
    getProducts(value)
}


//funcion para mostrar
const renderResults = (products) => {
    const resultContainer = document.getElementById("results-container")
    const noResultContainer = document.getElementById("no-results-container")

    resultContainer.innerHTML = ""
    noResultContainer.innerHTML = ""

    //caso si no tengo resultado
    if (products.length === 0) {
        noResultContainer.innerHTML = `
        <div class="no-results">
        <img src="./img/no-results.png" alt="Sin resultados" width="150">
        <h3>No se encontraron productos</h3>
        <p>Intenta buscar con otro nombre</p>
        </div>
        `
        return
    }

    //si hay resultado
    products.forEach(product => {
        const item = document.createElement("li")
        item.classList.add("product")

        item.innerHTML = `
        <img src="${product.image}" alt="${product.name}" width="150">
        <div class="info-product">
        <h3>${product.name}</h3>
        <p>USD ${product.price}</p>
        </div>
        `
        resultContainer.appendChild(item)
    })
}

document.addEventListener("DOMContentLoaded", () => {
    loadAllProducts()
    const form = document.getElementById("search-form")
    form.addEventListener("submit", searchProduct)


    const input = document.getElementById("search-product")
    input.addEventListener("input", () => {
        if (input.value.trim() === "") {
            getProducts("");
        }
    })

})




