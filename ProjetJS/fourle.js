var vraiment = 1;	//Variable pour déterminer le nombre de vraiment qu'il y a 
var corps = document.getElementById("corps");	
var tentative;	//Variable pour déterminer le nombre d'essais restants.
var reponse;		//Variable pour garder le champ de réponse dans les épreuves d'énigmes
var indice = 0; // Il représente le nombre d'indice qu'aura le joueur
var array = Object.keys(IndiceFinal).map(function (key) { return IndiceFinal[key]; }); //Permet de transformer un Object en un tableau
var Indice_i = Math.floor(Math.random() * array.length); // Choisi aléatoirement dans le tableau IndiceFinal dans IndiceFinal.js
var motFinal = IndiceFinal[Indice_i][0]; //Le mot à chercher et le premier de chaque sous-tableau
var TabMinijeux = [true, true, true, true, true];	//Si true => le jeu n'a pas été joué, si false => le jeu a déjà été joué
var Jeux = document.getElementById("Jeux");			//récupération de la div Jeux pour afficher les jeux

function resetPage() // reset la page 
{
	while (corps.firstChild)
	{
		corps.removeChild(corps.firstChild);
	}
	while (Jeux.firstChild)
	{
		Jeux.removeChild(Jeux.firstChild);
	}
}

function majNon()	//Compte le nombre et affiche quand on appuie sur non sur l'écran de départ
{
	vraiment = vraiment+1;
	var non = document.getElementById("non");
	var oui = document.getElementById("oui");
	non.value = "OUI";
	oui.value = "NON";
	var corps = document.getElementById("corps");
	var question = document.getElementById("question");
	var phrase = "Voulez-vous ";
	for (i=0;i<vraiment;i++)
	{
		phrase = phrase + "vraiment ";
	}
	phrase = phrase + "quitter l'aventure ?";
	question.innerHTML = phrase;
}

function initialisation()	//Initialisation des variables et création de la page de départ
{
	var question = document.createElement("h1");
	question.id = "question";
	question.innerHTML = "Voulez-vous commencer l'aventure ?";
	corps.appendChild(question);
	question.style.position = "relative";
	question.style.width = "71%";
	question.style.top = "150px";
	question.style.left = "15%";
	question.style.textAlign = "center";
	var non = document.createElement("input")
	non.value = "NON";
	non.id = "non";
	non.type = "submit";
	non.style.position = "fixed";
	non.style.top = "250px";
	non.style.left = "40%";
	non.addEventListener('click', majNon);
	corps.appendChild(non);
	var oui = document.createElement("input")
	oui.value = "OUI";
	oui.id = "oui";
	oui.type = "submit";
	oui.style.position = "fixed";
	oui.style.top = "250px";
	oui.style.left = "60%";
	oui.addEventListener('click', depart);
	corps.appendChild(oui);
}

function depart()	//Une fois que le joueur a terminer un minijeu ou qu'il commence le jeu
{
	resetPage(); //Toujours faire un reset de la page
	var seconde; //Suivant l'épreuve, augmente ou réduit le temps d'attente entre les jeux
	var Rand = Math.floor(Math.random() * 5);
	var MiniJeux; //Garde le jeu choisi
	var premier = document.createElement("h1");
	var Enigme;	
	var JamaisJouer = true; //Vérifie si un jeu à déjà été jouer.
	var i = 0;
	while(JamaisJouer && TabMinijeux.length != i)
	{
		if(TabMinijeux[i] == true)
		{
			JamaisJouer = false;	//Le jeu a été trouvé donc pas besoin de rentrer dans la boucle précedente
			while(!TabMinijeux[Rand])	//Tant que TabMiniJeux trouve un jeu auxquelle le joueur n'a pas joué, càd quand TabMiniJeu == true
			{
				Rand = Math.floor(Math.random() * 5);
			}
		}
		i++;
	}

	if(JamaisJouer){ //Si tous les MiniJeux ont été joué, alors on lance l'épreuve final
		EpreuveFinal();
		return;
	}
	switch(Rand){
	case 0: //Enigme

		MiniJeux = afficherEnigme;
		Enigme = "Si la réponse tu n’as pas, le père Fourleuh tu décevras";
		seconde = 3000;
		tentative = 3;
		break;

	case 1: //Casse-briques

		MiniJeux = startCB;
		Enigme = "Si les briques tu ne casses pas, alors Mario tu rencontreras <br> *Utiliser les touches directionnelles du clavier pour déplacer la barre*";
		seconde = 5000;
		break;

	case 2: //Snake

		MiniJeux = startSnake;
		Enigme = "Si le serpent se mord la queue, la défaite tu verras <br>  *Utiliser les touches directionnelles du clavier pour déplacer le serpent*";
		seconde = 5000;
		break;

	case 3: //Motus

		MiniJeux = motus;
		Enigme = "Si le mot tu ne découvres pas, en CP tu retourneras";
		seconde = 3000;
		tentative = 7;
		break;

	case 4: //Labyrinth

		MiniJeux = startLab;
		Enigme = "Si dans les flammes tu finis, carbonisé tu seras";
		seconde = 3000;
		break;

	}	
	premier.innerHTML = Enigme;
	premier.style.position = "relative";
	premier.style.width = "71%";
	premier.style.top = "150px";
	premier.style.left = "15%";
	premier.style.textAlign = "center";
	Jeux.appendChild(premier);
	setTimeout(MiniJeux, seconde);	
}

function afficherEnigme()
{
	var max = 6;	//Nombre d'énigme
	var Random = Math.floor(Math.random() * max ); //Choisi aléatoirement un nombre avec le max d'énigme disponibles
	var correction;	//Création de la variable qui va stocker le bonne réponse
	resetPage();
	phrase = document.createElement("h2");
	switch(Random) { // Choisi avec le nombre Random une énigme

	case 0:
		Enigme  = "Je peux donner des coups à tout le monde.<br> Je suis souvent le bienvenue et il ne se passe pas un seul instant dans le monde sans que quelqu'un me voit. <br> Qui suis-je ?";
		correction = ["soleil", "le soleil", "un soleil"]; 
		break;

    case 1: 
        Enigme = "Quelle est le seul oiseau pouvant soulever un éléphant ?<br> Qui suis-je?";
        correction = ["grue", "la grue", "une grue"];	
        break;

    case 2:
        Enigme = "Il peut être rond, <br> Carré et bien moulé. <br> Servi au marché, il est découpé. <br> Ça ne vaut pas le coup d’en faire un, surtout pour de tout petits riens. <br> Qui suis-je?";
        correction = ["fromage", "le fromage", "un fromage"];
        break;

    case 3:
    	Enigme = "1 = 5 <br> 2 = 25 <br> 3 = 325 <br> 4 = 4325 <br> 5 = ? <br>";
        correction = "1";
        break;

    case 4:
    	Enigme = "Je suis dans l'étang et au fond du jardin, je commence la nuit et finis le matin et j'apparais 2 fois dans l'année. <br> Qui suis-je ? ";
    	correction = ["n", "la lettre n"];
    	break;

	case 5:
		Enigme  = "Je suis le maître de 25 soldats et sans moi Paris sera pris. <br> Qui suis-je ?";
		correction = ["a", "la lettre a"];
		break;
    }
	phrase.innerHTML = Enigme;	
    Jeux.appendChild(phrase);	//Affiche la phrase de l'énigme sélectionnée
    reponse = document.createElement("input");	//Création d'un champ pour la réponse du joueur
    reponse.placeholder = "Appuyer sur Entrer pour valider";
    Jeux.appendChild(reponse);	//reponse devient le fils de la Div Jeux pour le faire apparaitre

    var func = function KeyDown(event){ //Vérifie que la touche Entrer soit pressé
		if(TabMinijeux[0])
		{
			if(event.keyCode == 13 && tentative != 0)
			{
				if((Array.isArray(correction) && correction.includes(reponse.value.toLowerCase()) || (!Array.isArray(correction) && (correction == reponse.value.toLowerCase())))) // Vérifie dans correction que la reponse soit à l'interieur
				{
					alert("Bravo !");
					indice++;
					TabMinijeux[0] = false;
					this.removeEventListener('keydown',func);//Faire un remove Event pour ne pas gener les autre jeux
					depart();
					return;
				}
				else if((Array.isArray(correction) && !(correction.includes(reponse.value.toLowerCase())) || (!Array.isArray(correction) && !(correction == reponse.value.toLowerCase())))){ //Le joueur s'est trompé donc on décrémente le nb de tentative
					reponse.value = "";
					alert("Ce n'est pas la bonne réponse ! Il te reste encore " + tentative + " tentative(s)");
					tentative--;
				}
			}
			else{
				if(tentative == 0 && event.keyCode == 13) // Si aucune tentative restante il a perdu
				{
					reponse.value = "";
					alert("Perdu, c’est pas ça !");
					TabMinijeux[0] = false;
					this.removeEventListener('keydown',func);
					depart();
					return;
				}
			}
		}
	}

    var bouton = document.createElement("button");	//Création d'un bouton 
    bouton.innerHTML = "Abandonner";	
    Jeux.appendChild(bouton);	//bouton fils de Jeux
    Jeux.addEventListener('keydown', func);
    bouton.addEventListener('click', function(){						//Si le bouton est cliqué
    	alert("Vous n\'avez pas réussi l'épreuve du Père Fourleuh !");	//Le joueur abandonne
    	TabMinijeux[0] = false;		// Le joueur a terminé le jeu donc il faut préciser dans le TabMiniJeux en mettant à false
		this.removeEventListener('keydown',func);
    	depart();
    	return;
    });

}


function motus()
{
	resetPage();
	// Affiche les quelques regles du jeu
	var phrase = document.createElement("h2");
	var regle = "Vous devez faire des mots de 5 lettres. <br> Vous avez 7 tentatives";
	phrase.innerHTML = regle;
	Jeux.appendChild(phrase);
	// Tableau contenant nos mots
	var mots = ["porto", "usure", "zombi", "noyau", "gifle", "salve", "hante", "givre", "sonde", "sable", "strie", "semer", "trous", "titan", "paver", "kiwis", "cogna", "gares", "opine", "relax", "somme", "sonda", "reste", "liait", "dames", "point", "imite", "fonce", "battu", "laids", "nylon", "frigo", "farce", "sirop", "mugir", "niais", "ferme"];

	// Choix aléatoire du mot à trouver
	var mot = mots[Math.floor(Math.random()*(mots.length))];
	// Variable pour seuvegarder la proposition
	var prop;

	// Création et insertion du champ de saisie et du bouton d'envoi avec attente d'appui de l atouche entrée
	var input = document.createElement('input');
	Jeux.appendChild(input);
	var bouton = document.createElement('button');
	bouton.innerHTML = 'Proposer';
	bouton.onclick= envoyer;
	Jeux.appendChild(bouton);
	Jeux.addEventListener("keydown", envoyerE);

	// Fonction appellée par le gestionnaire d'évènements lorsqu'un bouton est appuyé. Si le bout on est 'entrée', on appelle la fontion envoyer
	function envoyerE(e){
	  if (e.keyCode == 13){
	    envoyer();
	  }
	}

	// Fonction qui compte le nombre d'occurences d'une lettre dans un string
	function nb_occ(a, arr){
	  if (arr.includes(a)) {
	    return 1+nb_occ(a, arr.slice(arr.indexOf(a)+1));
	  }
	  else {
	    return 0;
	  }
	}

	// Fonction principale qui va colorier et afficher le mot proposé
	function envoyer(){
	  // On récupère la valeur du champ de saisie puis on le vide
	  prop = input.value;
	  input.value = null;

	  // Création d'un tableau indexé  avec une case pour chaque lettre de l'alphabet. On compte ensuite le nombre d'occurences de chaque lettre du mot cherché
	  var nb_occ_lettre = {"a": 0, "b": 0, "c": 0, "d": 0, "e": 0, "f": 0, "g": 0, "h": 0, "i": 0, "j": 0, "k": 0, "l": 0, "m": 0, "n": 0, "o": 0, "p": 0, "q": 0, "r": 0, "s": 0, "t": 0, "u": 0, "v": 0, "w": 0, "x": 0, "y": 0, "z": 0, };
	  for (var i = 0; i < mot.length; i++) {
	    nb_occ_lettre[mot[i]] = nb_occ(mot[i], mot);
	  }

	  // Création de l'élément qui va contenir le mot proposé colorié. Déclaration de la variable qui va le remplir
	  var p = document.createElement('p');
	  var inPTab = [];

	  // On vérifie la taille du mot proposé. Si elle est différente de 5, on affiche un message d'erreur.
	  if(prop.length != 5){
	    alert("Le mot proposé n'a pas la bonne taille!");
	  }
	  else if (mot == prop && tentative != 0){
	    alert("Bravo !")// A compléter (condition de victoire);
		TabMinijeux[3] = false;
		Jeux.removeEventListener("keydown", envoyerE);
		depart();	    
		return;
	  }
	  else if(tentative == 0)
	  {
		alert("Vous n'avez pas trouvé le bon mot ! Le mot était " + mot);
		TabMinijeux[3] = false;
		Jeux.removeEventListener("keydown", envoyerE);
		depart();
		return;
	  }
	  else{
	    // Coloration des lettres du mot proposé.
	    for (var i=0 ; i<5 ; i++){
	      if (prop[i] == mot[i] && nb_occ_lettre[mot[i]] != 0) {
	        inPTab[i]='<span style="background-color:red">'+prop[i]+'</span>';
	        nb_occ_lettre[mot[i]]-=1;
	      }
	      else{
	        inPTab[i] = prop[i];
	      }
	    }
	    for (var i = 0; i < 5; i++) {
	      if (mot.includes(prop[i]) && nb_occ_lettre[prop[i]]!=0){
	        inPTab[i] = '<span style="background-color:yellow">'+prop[i]+'</span>';
	        nb_occ_lettre[mot[i]]-=1;
	      }
	    }
	    // Remplissage de l'élément contenant le mot proposé colorié
	    for (var i = 0; i < inPTab.length; i++) {
	      p.innerHTML = p.innerHTML + inPTab[i];
	    }
	    tentative--;
	    if(tentative == 0)
	    {
		    regle = "Vous devez faire des mots de 5 lettres. <br> Dernière tentative !";
			phrase.innerHTML = regle;
	    }
	    else{
		    regle = "Vous devez faire des mots de 5 lettres. <br> Vous avez " + tentative + " tentatives";
			phrase.innerHTML = regle;
		}	
		Jeux.appendChild(p);
	  }
	}
}




function EpreuveFinal()
{
	var afficher = document.createElement("h1");
	if(indice != 0 ) // Si le nombre d'indice = 0, il n'est pas nécessaire de rentrer dans la boucle
	{
		if(indice > 3)
		{
			indice = 3;
		}
		for(i = 1; i <= indice + 1; i++) // Cela va chercher pour le nombre d'indice voulu les phrases
		{
			afficher = document.createElement("h1");
			afficher.innerHTML = IndiceFinal[Indice_i][i];
			Jeux.appendChild(afficher);
		}
	}
	afficher.innerHTML = IndiceFinal[Indice_i][4]; // Affiche 
	Jeux.appendChild(afficher);

	reponse = document.createElement("input");
    reponse.placeholder = "Appuyer sur Entrer pour valider";
    Jeux.appendChild(reponse);
    Jeux.addEventListener('keydown', function(event){
		if(event.keyCode == 13 && tentative != 0)
		{
			if(motFinal == reponse.value.toLowerCase())
			{
				alert("Bravo ! Vous avez remporté l'épreuve final du Père Fourleuh !");
				resetPage();
				document.location.reload();
			}
			else {
				reponse.value = "";
				alert("Ce n'est pas la bonne réponse ! Il te reste encore " + tentative + " tentative(s)");
				tentative--;
			}
		}
		else{
			if(tentative == 0 && event.keyCode == 13)
			{
				reponse.value = "";
				alert("Le Père Fourleuh a été plus fort que vous !");
				document.location.reload();
			}
		}
	});
}

initialisation();


