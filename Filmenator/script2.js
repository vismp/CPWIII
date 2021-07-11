const d = document,
  $shows = d.getElementById("shows"),
  $template = d.getElementById("show-template").content,
  $fragment = d.createDocumentFragment();

d.addEventListener("keypress", async (e) => {
  if (e.target.matches("#busca")) {
    //console.log(e.key,e.key);
    if (e.key === "Enter") {
      try {
        $shows.innerHTML = `<img class="loader" src="/img/Eclipse-1s-35px.svg" alt="Carregando...">`;

        let query = e.target.value.toLowerCase(),
          api = `http://api.tvmaze.com/search/shows?q=${query}`,
          rest = await fetch(api),
          json = await rest.json();
        // console.log(api, rest, json);
        if (!rest.ok)
          throw { status: rest.status, statusText: rest.statusText };
        if (json.length === 0) {
          $shows.innerHTML = `<h2>Não existem resultados para a pesquisa: <mark> ${query}</mark></h2>`;
        } else {
          json.forEach((el) => {
            $template.querySelector("img").src = el.show.image
              ? el.show.image.medium
              : "http://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
            $template.querySelector("img").alt = el.show.name;
            $template.querySelector("img").style.maxWidth = "100%";
            $template.querySelector("a").href = el.show.url ? el.show.url : "#";
            $template.querySelector("a").target = el.show.url
              ? "_blank_"
              : "self";
            $template.querySelector("a").textContent = el.show.url
              ? "Ver mais..."
              : "";
            $template.querySelector("h3").textContent = el.show.name;

            let $clone = d.importNode($template, true);
            $fragment.appendChild($clone);
          });
          $shows.innerHTML = "";
          $shows.appendChild($fragment);
        }
      } catch (err) {
        console.log(err);
        let message = err.statusText || "Vish, deu ruim";
        $shows.innerHTML = `<p> Erro: ${err.status}:${message}</p>`;
      }
    }
  }
});
