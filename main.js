const jsonform = document.querySelector("#jsonform");
const cvsform = document.querySelector("#csvform");
const bConvert = document.querySelector("#bConvert");

bConvert.addEventListener("click", function () {
  convertJSonToCSV();
});

function convertJSonToCSV() {
  let json;
  let keys = [];
  let values = [];

  try {
    json = JSON.parse(jsonform.value);
  } catch (e) {
    alert("Formato json no valido (Debe ser un array de objetos)");
    return;
  }

  if (Array.isArray(json)) {
    json.forEach((objet) => {
      const nkeys = Object.keys(objet);

      if (keys.length === 0) {
        keys = [...nkeys];
      } else {
        if (nkeys.length != keys.length) {
          throw new Error(
            "Formato json no valido (Debe ser un array de objetos)"
          );
        }
      }

      const row = keys.map((key) => {
        return objet[key];
      });
      values.push([...row]);
    });
    values.unshift(keys);
    const csv = values.map((valor) => valor.join(",")).join("\n");
    cvsform.value = csv;
  } else {
    alert("No es un objeto");
  }
}
