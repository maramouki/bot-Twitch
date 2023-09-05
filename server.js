require('dotenv').config();


/*
*| ------------------------------
*|	Les Options
*| ------------------------------
*/

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


	if (message.toLowerCase() === '!random') {
		client.say(channel, `📝 ${tags['display-name']}, Tu dois choisir une classe [dps, tank, soutien]. ( 🔫 !random dps | 🛡️ !random tank | 💉 !random soutien )`);
	} else if (message.toLowerCase() === '!random dps') {
		client.say(channel, "🌟 Votre personnage choisi est : " + choisirNomAleatoire(dps));
	} else if (message.toLowerCase() === '!random tank') {
		client.say(channel, "🌟 Votre personnage choisi est : " + choisirNomAleatoire(tank));
	} else if (message.toLowerCase() === '!random soutien') {
		client.say(channel, "🌟 Votre personnage choisi est : " + choisirNomAleatoire(soutien));
	};

});
