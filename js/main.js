/**************** IMAGE SLIDER *******************/

let img_couverture = document.getElementById("img-couverture");
let btn_gauche = document.getElementById("gauche");
let btn_droite = document.getElementById("droite");
let list_images = [
  "./images/cms/slider-coup-coeur.jpg",
  "./images/cms/nouvelle_collection.jpg",
];
let index = 0;
btn_gauche.addEventListener("click", () => {
  index = index - 1;
  if (index < 0) {
    index += 2;
  }
  img_couverture.src = list_images[index];
});
btn_droite.addEventListener("click", () => {
  index = (index + 1) % 2;
  img_couverture.src = list_images[index];
})

/***************************************/

function creerElementAvecClasse(elementType, className) {
  let element = document.createElement(elementType);
  element.classList.add(className);
  return element;
}

/***************************************/

let tousProduits = document.getElementById("tousProduits");
let wrapper = document.getElementById("wrapper");
let nouveautes = document.getElementById("nouveautes");
fetch("./data/data.json")
  .then((response) => response.json())
  .then((data) => {
    function afficherProduit(categorie) {
      tousProduits.innerHTML = "";
      data[categorie].forEach((produit) => {
        /************ CADRE POUR UN PRODUIT ************/
        let produitContainer = creerElementAvecClasse(
          "div",
          "produitContainer"
        );

        /************ IMAGE ************/
        let divImgProduit = creerElementAvecClasse("div", "divImgProduit");
        let imgProduit = creerElementAvecClasse("img", "produit-image");
        imgProduit.src = produit.image;
        divImgProduit.appendChild(imgProduit);

        /************ DESCRIPTION ************/
        let descProduit = creerElementAvecClasse("a", "descProduit");
        descProduit.href = "#";
        descProduit.innerText = produit.description;

        let dReductionPrix = "";
        let dAncienPrix = "";

        /************ PRIX ************/
        let prixProduit = creerElementAvecClasse("p", "prixProduit");

        // ancien prix
        let ancienPrix = creerElementAvecClasse("span", "ancienPrix");
        let ancienPrix_avecVirgule = parseFloat(produit.old_price);
        ancienPrix_avecVirgule = ancienPrix_avecVirgule.toFixed(2);
        ancienPrix.innerHTML = `${ancienPrix_avecVirgule} €`;

        // prix actuel
        let prix = creerElementAvecClasse("span", "prix");
        let prix_avecVirgule = parseFloat(produit.new_price);
        prix_avecVirgule = prix_avecVirgule.toFixed(2);
        prix.innerHTML = `${prix_avecVirgule} €`;

        // prix de reduction
        let reductionPrix = creerElementAvecClasse("span", "reductionPrix");
        let red = parseFloat(produit.old_price) - parseFloat(produit.new_price);
        red = red.toFixed(2);
        reductionPrix.innerHTML = `-${red} €`;

        if (red != 0) {
          prixProduit.appendChild(ancienPrix);
          prixProduit.appendChild(reductionPrix);

          dAncienPrix = ancienPrix_avecVirgule + " €";
          dReductionPrix = "( Économisez " + red + " € )";
        }
        prixProduit.appendChild(prix);

        /************ ETOILES ************/
        let etoilesProduit = document.createElement("p");
        let nb_etoiles = parseInt(produit.nb_stars);
        for (i = 0; i < nb_etoiles; i++) {
          let unEtoile = creerElementAvecClasse("img", "unEtoile");
          unEtoile.src = "../images/svg/iconmonstr-star-3.svg";
          etoilesProduit.appendChild(unEtoile);
        }

        /*************************************/
        produitContainer.appendChild(divImgProduit);
        produitContainer.appendChild(descProduit);
        produitContainer.appendChild(prixProduit);
        produitContainer.appendChild(etoilesProduit);
        tousProduits.appendChild(produitContainer);

        /************ DETAIL D'IMAGE ************/

        produitContainer.addEventListener("click", () => {
          tousProduits.innerHTML = "";
          tousProduits.innerHTML = `
          <div class="nouvProduitContainer">
            <div class="nouvDivImgProduit"> 
              <div class="grande-image">
                <img src=${produit.image} class="produit-image">
              </div>
              <div class="petite-image">
                <img src="${produit.image}"> 
                <img src="${produit.image}"> 
                <img src="${produit.image}"> 
              </div>
            </div>

            <div class="divInfoProduits">
              
              <div class="nouvDescProduit"> ${produit.description} </div>
              
              <div class="nouvPrixProduit"> 
                <span class="dPrix">${prix_avecVirgule} €</span> 
                <span class="dAncienPrix"> ${dAncienPrix} </span> 
                <span class="dReductionPrix"> ${dReductionPrix} </span> 
              </div>
              
              <p class="commentaire"> exemple de commentaire </p>
              
              <div class="pointure">
                <label for="pointure-dispo">
                Pointure
                <select name="pointure-dispo" class="pointure-dispo">
                  <option>36</option>
                  <option>37</option>
                  <option>39</option>
                </select>
              </div>

              <div class="quantite"> 
                <label for="quantite"> Quantité </label>
                <input type=number name="quantite" class="quantite-dispo" min=1>
              </div>

              <div class="ajout_au_panier" id="ajout_au_panier"> 
                <button type="submit" onclick=ajouter_au_panier()><i class="fa fa-shopping-cart"></i> AJOUTER AU PANNIER</button>
              </div>

              <div class="SPLC"> <img src="../images/cms/rea_customer_service.png"> <span>Service client au 06 49 54 94 19</span> </div>
              <div class="SPLC"> <img src="../images/cms/reassurance-joya-le-store-moyens-paiements.png"> <span>Paiements sécurisés & 3x sans frais avec Alma</span> </div>
              <div class="SPLC"> <img src="../images/cms/rea_shipping.png"> <span>Livraison offerte avec Mondial Relay à partir de 100€</span> </div>
              <div class="SPLC click"> <img src="../images/cms/rea_click_collect.png"> <span>Click & Collect à La Grande Motte</span> </div>
            </div>
          </div>

          <div class="navEntreDetailsEtAvis">
            <span id="details-du-produit"> DÉTAILS DU PRODUIT</span>
            <span> / </span>
            <span id="avis"> AVIS </span>
          </div>

          <div class="navEntreDetailsEtAvis-container">
            <p><strong>Marque:</strong></p>
            <p><strong>Référence:</strong></p>
            <p><strong>En stock:</strong></p>
            <input type="email" placeholder="votre@email.com"> <br>
            <button type="submit" id="prevenez-moi">Prévenez-moi lorsque le produit est diponible</button>
          </div>
          `;
          changerSousNav();
          wrapper.innerHTML = "";
          wrapper.innerHTML = `

          `;
          nouveautes.innerHTML = "";
          // detaillerUnProduit();
        });

        /************ AJOUT AU PANIER ************/
    
        function ajouter_au_panier() {
          tousProduits.innerHTML = "";
          // tousProduits.innerText = "ao tsara"
        }

      });
    }

    /**** FONCTION POUR CHANGER L'IMAGE
                  SOUS LA BAR DE NAVIGATION ****/

    function changerSousNav() {
      let sous_nav = document.getElementById("sous_nav");
      let img_couverture = document.getElementById("img-couverture");
      let gauche = document.getElementById("gauche");
      let droite = document.getElementById("droite");

      sous_nav.style.height = "40vh";
      sous_nav.style.width = "100vw";
      gauche.style.display = "none";
      droite.style.display = "none";
      img_couverture.src = "../images/cms/bg-breadcrumb.jpg";
    }

    /**** FONCTION POUR CHANGER 
                  LE CONTENU  ****/

    function handleClick(idProduit) {
      document.getElementById(idProduit).addEventListener("click", () => {
        nouveautes.innerHTML = `<div class="petit-texte">Découvrez la nouvelle collection de votre boutique 
        en ligne de Prêt à porter. Commandez en ligne et faites vous livrer ou bien 
        profitez de notre service Click and Collect afin de venir récuperer votre commande 
        dans votre boutique vetement femme en ligne | Joya le store
        </div>`;
        changerSousNav();
        afficherProduit(idProduit);
        wrapper.innerHTML = "";
      });
    }

    /**** POUR GERER LA NAVIGATION
                  SUR LA BARRRE DE NAVIGATION ****/

    afficherProduit("accueil");

    const categories = [
      "pulls_et_gilets",
      "ceintures",
      "escarpins",
      "mocassins",
      "nouvelle_collection",
      "promo",
      "bijoux",
      "t_shirts",
      "casquette_et_chapeaux",
      "homme",
      "sacs_a_bondouliere",
      "pochettes",
      "robes",
      "jupes",
      "pantalons",
      "sandales",
      "baskets"
    ];
    categories.forEach((categorie) => {
      handleClick(categorie);
    });
  })
  .catch((error) => console.error("Erreur: ", error));
