require('dotenv').config();


/*
*| ------------------------------
*|	Les Options
*| ------------------------------
*/
const fs = require('fs');
const tmi = require('tmi.js');
const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: process.env.TWITCH_BOT_USERNAME,
		password: process.env.TWITCH_OAUTH_TOKEN
	},
	channels: [process.env.TWITCH_CHANNEL_NAME]
});

client.connect();




/*
*| ------------------------------
*|	Les Functions
*| ------------------------------
*/
// Fonction pour choisir un nom aléatoirement


const dps = ["Ashe", "Bastion", "Cassidy", "Chacal", "Écho", "Fatale", "Faucheur", "Genji", "Hanzo", "Mei", "Pharah", "Sojourn", "Soldat: 76", "Sombra", "Symmetra", "Torbjörn", "Tracer"];
const tank = ["Bouldozer", "Chopper", "D.Va", "Doomfist", "Orisa", "Ramattra", "Reine des Junkers", "Reinhardt", "Sigma", "Winston", "Zarya"];
const soutien = ["Illari", "Ana", "Ange", "Batiste", "Brigitte", "Kiriko", "Lucio", "Moira", "Vital", "Zenyatta"];

function choisirNomAleatoire(tableau) {
	// Sélectionnez un nom aléatoire à partir du tableau passé en argument
	const indexAleatoire = Math.floor(Math.random() * tableau.length);
	return tableau[indexAleatoire];
}



/*
*| ------------------------------
*|	Les output
*| ------------------------------
*/

client.on('message', (channel, tags, message, self) => {
	// if(self) return;

	console.log();
	// if (message.toLowerCase() === '!random' && tags['mod'] === true || message.toLowerCase() === '!random' && tags['display-name'] === process.env.TWITCH_CHANNEL_NAME) {
	// client.say(channel, `📝 ${tags['display-name']}, Tu dois choisir une classe [dps, tank, soutien]. ( 🔫 !random dps | 🛡️ !random tank | 💉 !random soutien )`);
	// }

	if (message.toLowerCase() === '!random dps' && tags['mod'] === true || message.toLowerCase() === '!random dps' && tags['display-name'] === '#' + process.env.TWITCH_CHANNEL_NAME) {
		client.say(channel, "🌟 Le personnage que tu dois jouer est : " + choisirNomAleatoire(dps));
	} else if (message.toLowerCase() === '!random tank' && tags['mod'] === true || message.toLowerCase() === '!random tank' && tags['display-name'] === '#' + process.env.TWITCH_CHANNEL_NAME) {
		client.say(channel, "🌟 Le personnage que tu dois jouer est : " + choisirNomAleatoire(tank));
	} else if (message.toLowerCase() === '!random soutien' && tags['mod'] === true || message.toLowerCase() === '!random soutien' && tags['display-name'] === '#' + process.env.TWITCH_CHANNEL_NAME) {
		client.say(channel, "🌟 Le personnage que tu dois jouer est : " + choisirNomAleatoire(soutien));
	}
});





// Tableau pour stocker les noms des followers
const followersList = [];
const subList = [];


/*
*| ------------------------------
*|	On essaye de recupérer les follow
*| ------------------------------
*/

// Écoutez l'événement "newfollower"
client.on('newfollower', (channel, tags, self) => {
	// Ajoutez le nom du follower à la liste
	followersList.push(tags['display-name']);
	console.log(`${tags['display-name']} a suivi la chaîne.`);
	console.log(followersList);
});


/*
*| ------------------------------
*|	On essaye de recupérer les sub
*| ------------------------------
*/
client.on("subscription", (channel, tags, username, method, message, userstate) => {
	// Ajoutez le nom du follower à la liste
	const subInfo = {
		username: tags['display-name'],
		dateAdded: new Date(), // Stocke la date et l'heure actuelle
	};
	subList.push(subInfo);
	console.log(channel, tags, username, method, message, userstate)
	console.log(`${tags['display-name']} c'est abonnée ! Merci à toi! 🎉`);
	console.log(subList)
});


function supprimerAnciens() {
	const dateLimite = new Date();
	dateLimite.setDate(dateLimite.getDate() - 30); // Calcul de la date limite (30 jours en arrière)

	// Filtrer les followers dont la date d'ajout est antérieure à la date limite
	const newSubList = subList.filter((sub) => {
		return sub.dateAdded >= dateLimite;
	});

	// Mettre à jour la liste des followers avec ceux qui ne sont pas encore supprimés
	subList = newSubList;
	console.log('Les anciens Sub ont été supprimés.');
	console.log(subList);
	return subList;
}

/*
*| ------------------------------
*|	On creer un fichier
*| ------------------------------
*/
// Enregistrez les noms des Sub dans un fichier texte
function enregistrerSubDansFichier() {
	const contenuFichier = subList.join('\n');
	fs.writeFile('followers.txt', contenuFichier, (err) => {
		if (err) {
			console.error('Erreur lors de l\'enregistrement dans le fichier :', err);
		} else {
			console.log('Les noms des followers ont été enregistrés dans le fichier "followers.txt".');
		}
	});
}