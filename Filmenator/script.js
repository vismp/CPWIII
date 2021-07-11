function busca(query) {
  const url = `http://api.tvmaze.com/search/shows?q=${query}`;
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      const results = jsonData.map((element) => element.show.image.original);
      renderizarBusca(results);
    });
}

function renderizarBusca(results) {
  const lista = document.getElementById("listaFilmes");
  lista.innerHTML = "";
  results.forEach((result) => {
    const element = document.createElement("li");
    element.innerHTML = `<img src=${result}>`;
    lista.appendChild(element);
  });
}
let TimeOutToken = 0;

window.onload = () => {
  const buscador = document.getElementById("buscar");
  buscador.onkeyup = (event) => {
    clearTimeout(TimeOutToken);
    if (buscador.value.trim().length === 0) {
      return;
    }
    TimeOutToken = setTimeout(() => {
      busca(buscador.value);
    }, 500);
  };
};
