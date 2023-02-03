const articles = [
  {
    id: 1,
    nom: "Coca",
    prix: 5,
  },
  {
    id: 2,
    nom: "Fanta",
    prix: 10,
  },
  {
    id: 3,
    nom: "IceTea",
    prix: 15,
  },
];

let client = { nom: "", civ: "" };
let facture = {
  articles: [],
  client,
};

const ARTICLE = document.getElementById("articleInput");
const QUANTITE = document.getElementById("quantiteInput");
const DETAILS_FACTURE = document.getElementById("detailsFactureInput");
const DETAILS_TOTAL = document.getElementById("detailsTotalInput");
const CLIENT = document.getElementById("clientInput");

const valider = () => {
  const article = articles.find((item) => item.id === Number(ARTICLE.value));
  const ligne = { ...article, quantite: Number(QUANTITE.value) };
  ajouterLigne(ligne);

  facture.client = client;
  facture.prixTotal = getPrixTotal();
  client.nom = CLIENT.value;
  client.civ = getCivilite();

  setDetails();
  setTotal();
  setNom();
  console.log(facture);
};

function getCivilite() {
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  let selectedValue;
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      return radioButtons[i].value;
    }
  }
}

function loadArticles() {
  str = "";
  for (a of articles) {
    str +=
      '<option value="' +
      a.id +
      '">' +
      a.nom +
      " Prix: " +
      a.prix +
      " euros</option>";
  }
  ARTICLE.innerHTML = str;
}

function afficherTotal() {
  document.getElementById("detailsTotal").style.display = DETAILS_TOTAL.checked
    ? "block"
    : "none";
}

function afficherDetails() {
  document.getElementById("detailsFacture").style.display =
    DETAILS_FACTURE.checked ? "block" : "none";
}

function setNom() {
  document.getElementById("nomClient").innerHTML =
    client.civ + " " + client.nom;
}

function setDetails() {
  str = "";
  for (const article of facture.articles) {
    str +=
      "<li>" +
      article.nom +
      " - Quantite: " +
      article.quantite +
      " - Prix: " +
      article.prix * article.quantite +
      "</li>";
  }
  document.getElementById("details").innerHTML = str;
}

function setTotal() {
  document.getElementById("prixTotal").innerHTML = facture.prixTotal + " euros";
}

function getPrixTotal() {
  total = 0;
  for (const item of facture.articles) {
    total += item.prix * item.quantite;
  }

  return total;
}

function ajouterLigne(ligne) {
  for (a of facture.articles) {
    if (a.id == ligne.id) {
      a.quantite += ligne.quantite;
      return;
    }
  }

  facture.articles = [...facture.articles, ligne];
}
