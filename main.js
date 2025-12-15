const app = Vue.createApp({
    data() {
        return {
            // Exercice 1
            product: "Chaussettes",
            // Exercice 1 non guidé
            description: "Chaussettes confort premium pour l’entraînement (matière respirante).",

            // Exercice 2
            image: "./src/assets/images/socks_blue.jpeg",
            // Exercice 2 non guidé
            url: "https://www.cpnv.ch/",
            linkLabel: "Voir plus d’infos (CPNV)",

            // Exercice 3
            inStock: false,
            inventory: 11,
            // Exercice 3 non guidé
            onSale: true,
        };
    }
});

app.mount("#app");
