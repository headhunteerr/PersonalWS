var canvas;
var contexte;
var fini;
var Interval;
var Interval2;

function clear(i) // Utilisé pour nettoyer la page du canvas utilisé
{
    TabMinijeux[i] = false;
    fini = true;
    canvas.parentNode.removeChild(canvas);
    depart();
}

function removeImg() //Supprime toutes les images créées 
{
    var Img = document.getElementsByTagName("img"), index;
    for (index = Img.length - 1; index >= 0; index--) {
        Img[index].parentNode.removeChild(Img[index]);
    }
}

function startCB() 
{
    fini = false;
    resetPage();
    //Création du canvas et de son contexte
    canvas = document.getElementById('minijeuCB');
    var corps = document.getElementById("corps");
    canvas.style.backgroundColor = "black";
    contexte = canvas.getContext("2d");

    // Variables pour la balle
    var tailleB = 10;
    var posBX = canvas.width/2;
    var posBY = canvas.height-30;
    var vitBX = 2;
    var vitBY = -2;

    // Variables pour la raquette
    var hautRaq = 10;
    var largRaq = 75;
    var posRaqX = (canvas.width-largRaq)/2;

    // Variables pour la création des briques
    var briques_lignes = 5;
    var briques_colonnes = 3;
    var brique_larg = 75;
    var brique_haut = 20;
    var brique_esp = 10;
    var brique_mar_haut = 30;
    var brique_mar_gauche = 30;
    var briques = [];
    for(c=0; c<briques_colonnes; c++) {
        briques[c] = [];
        for(r=0; r<briques_lignes; r++) {
            briques[c][r] = { posBX: 0, posBY: 0, status: 1 };
        }
    }

    // Variables pour les touches et ajout des attentes d'évènements
    var droite = false;
    var gauche = false;
    document.addEventListener("keydown", bApp, false);
    document.addEventListener("keyup", bNApp, false);

    // Variable pour le score
    var scoreN = 0;

    // Fonctions vérifiant si la touche gauche ou droite sont appuyées ou non
    function bApp(e) {
        if(e.keyCode == 39) {
            droite = true;
        }
        else if(e.keyCode == 37) {
            gauche = true;
        }
    }
    function bNApp(e) {
        if(e.keyCode == 39) {
            droite = false;
        }
        else if(e.keyCode == 37) {
            gauche = false;
        }
    }

    // Fonction vérifiant les collisions de la balle avec les briques et les murs et qui change sa direction si c'est le cas
    function collisionDetection() {
        if(posBX + vitBX > canvas.width-tailleB || posBX + vitBX < tailleB) {
            vitBX = -vitBX;
        }
        if(posBY + vitBY < tailleB) {
            vitBY = -vitBY;
        }
        else if(posBY + vitBY > canvas.height-tailleB) {
            if(posBX > posRaqX && posBX < posRaqX + largRaq) {
                vitBY = -vitBY;
    	    vitBX = (posBX - (posRaqX + (largRaq / 2))) /10;
            }
            else {
                alert("GAME OVER");
                clear(1);
                return;
            }
        }
        if(droite && posRaqX < canvas.width-largRaq) {
            posRaqX += 7;
        }
        else if(gauche && posRaqX > 0) {
            posRaqX -= 7;
        }
        for(c=0; c<briques_colonnes; c++) {
            for(r=0; r<briques_lignes; r++) {
                var b = briques[c][r];
                if(b.status == 1) {
                    if(posBX > b.posBX && posBX < b.posBX+brique_larg && posBY > b.posBY && posBY < b.posBY+brique_haut) {
                        vitBY = -vitBY;
                        b.status = 0;
                        scoreN++;
                        if(scoreN == briques_lignes*briques_colonnes){
                            alert ("Vous avez réussi l'épreuve");
                            indice++;
                            clear(1);
                            return;
                        }
                    }
                }
            }
        }
    }

    // Fonction de dessin de la balle
    function balle() {
        contexte.beginPath();
        contexte.arc(posBX, posBY, tailleB, 0, Math.PI*2);
        contexte.fillStyle = "#0095DD";
        contexte.fill();
        contexte.closePath();
    }

    // Fonction de dessin de la raquette
    function raquette() {
        contexte.beginPath();
        contexte.rect(posRaqX, canvas.height-hautRaq, largRaq, hautRaq);
        contexte.fillStyle = "#0095DD";
        contexte.fill();
        contexte.closePath();
    }

    // Fonction de dessin des briques
    function briquesD() {
        for(c=0; c<briques_colonnes; c++) {
            for(r=0; r<briques_lignes; r++) {
                if(briques[c][r].status == 1) {
                    var brickX = (r*(brique_larg+brique_esp))+brique_mar_gauche;
                    var brickY = (c*(brique_haut+brique_esp))+brique_mar_haut;
                    briques[c][r].posBX = brickX;
                    briques[c][r].posBY = brickY;
                    contexte.beginPath();
                    contexte.rect(brickX, brickY, brique_larg, brique_haut);
                    contexte.fillStyle = "#0095DD";
                    contexte.fill();
                    contexte.closePath();
                }
            }
        }
    }

    // Fonction d'affichage du score
    function score() {
        contexte.font = "16px Arial";
        contexte.fillStyle = "#0095DD";
        contexte.fillText("Score: "+scoreN, 8, 20);
    }

    // Fonction principale qui va être appellée une fois toutes les 10 millisecondes pour faire marcher le jeu
    function update() {
        if(fini){
            clearInterval(Interval);
            return;
        }else {  
            contexte.clearRect(0, 0, canvas.width, canvas.height);
            briquesD();
            balle();
            raquette();
            collisionDetection();
                  
            score();
            posBX += vitBX;
            posBY += vitBY;
        }
    }
    Interval = setInterval(update, 10);
}

function startSnake()
{
    fini = false
    resetPage();
    canvas = document.getElementById('minijeuS');
    canvas.style.width = "40%";
    canvas.style.height = canvas.clientWidth;
    canvas.style.position = "fixed";
    canvas.style.top = "50px";
    canvas.style.left = "30%";
    canvas.style.backgroundColor = "gray";
    contexte = canvas.getContext("2d");

    // Variables pour le mouvement
    var rotation = (Math.PI / 64);
    var mouvement = [];
    var compteur = 250;
    for (var i = 0; i < 4; i++)
    {
        mouvement.push([]);
        for (var j = 0; j < 15; j++)
        {
            mouvement[i].splice(0, 0, {posMX : 250, posMY : compteur});
            compteur -= 1;
        }
    }

    // Variables pour le corps
    var corps = [];
    for(var i = 0; i < 5; i++) 
    {
            corps[i] = {posX : 0, posY : 0, taille : 0};
    }

    var tete = corps[0];
    tete.posX = canvas.width/2;
    tete.posY = canvas.height/2;
    tete.taille = 15;
    var vitX = 0;
    var vitY = 1;
    for(var i = 1; i < corps.length; i++) 
    {   
        corps[i].posX = corps[i-1].posX;
        corps[i].posY = corps[i-1].posY - 15;
        if (i < 5) 
        {
            corps[i].taille = corps[i-1].taille - 1;
        }
        else
        {
            corps[i].taille = 10;
        }
    }
    var esp = 0;

    // Variables pour la nourriture
    var nourriture = [];
    for(var i = 0; i < 2; i++) 
    {
            nourriture[i] = {   
                posNX : Math.floor(Math.random() * 401) + 50, 
                posNY : Math.floor(Math.random() * 401) + 50, 
                vitNX : Math.floor((Math.random() * 5) + 1) / 10, 
                vitNY : Math.floor((Math.random() * 5) + 1) / 10};
    }

    // Variables pour les touches et ajout des attentes d'évènements
    var droite = false;
    var gauche = false;
    document.addEventListener("keydown", tourne, false);
    document.addEventListener("keyup", avance, false);

    // Variable pour le score
    var score = 0;

    // Fonctions vérifiant si la touche gauche ou droite sont appuyées ou non
    function tourne(event) 
    {
        if(event.keyCode == 39) 
        {
                droite = true;
            }
            else if(event.keyCode == 37) 
        {
                gauche = true;
            }
    }

    function avance(event) 
    {
            if(event.keyCode == 39) 
        {
                droite = false;
            }
            else if(event.keyCode == 37) 
        {
                gauche = false;
            }
    }

    // Fonction vérifiant les collisions de la balle avec les briques et les murs et qui change sa direction si c'est le cas
    function collisionDetection() 
    {
            if(tete.posX + vitX > canvas.width - tete.taille || tete.posX + vitX < tete.taille) 
        {
                alert("GAME OVER");
                clear(2);
                return;
            }
            if(tete.posY + vitY < tete.taille || tete.posY + vitY > canvas.height - tete.taille) 
        {
                alert("GAME OVER");
                clear(2);
                return;
            }
        var maillon;
        for (var i = 2; i < corps.length; i++) 
        { 
            maillon = corps[i];
                    if (tete.posX + vitX * 5 > maillon.posX - maillon.taille && tete.posX + vitX * 5 < maillon.posX + maillon.taille && tete.posY + vitY * 5 > maillon.posY - maillon.taille && tete.posY + vitY * 5 < maillon.posY + maillon.taille) 
                    {
                        alert("GAME OVER");
                        clear(2);
                        return;
                    }
            }
        var aliment;
        for (var i = 0; i < nourriture.length; i++) 
        { 
            aliment = nourriture[i];
                    if (esp == 0 && tete.posX + vitX * 10 > aliment.posNX - 7 && tete.posX + vitX * 10 < aliment.posNX + 7 && tete.posY + vitY * 10 > aliment.posNY - 7 && tete.posY + vitY * 10 < aliment.posNY + 7) 
            {
                if (score + 20 == 300)
                {
                    alert ("Vous avez réussi l'épreuve !");
                    indice++;
                }
                score += 20;
                nourriture.splice(i,1);
                corps[corps.length] = {
                    posX : 0, 
                    posY : 0,  
                    taille : 10};
                corps[corps.length-1].posX = corps[corps.length-2].posX;
                corps[corps.length-1].posY = corps[corps.length-2].posY;
                esp = 15;
                mouvement.push([]);
            }
            else
            {
                if(aliment.posNX + aliment.vitNX > canvas.width - 7 || aliment.posNX + aliment.vitNX < 7) 
                {
                    aliment.vitNX = -aliment.vitNX;
                }
                    if(aliment.posNY + aliment.vitNY > canvas.height - 7 || aliment.posNY + aliment.vitNY < 7) 
                {
                    aliment.vitNY = -aliment.vitNY;
                }
            }
            }
        if (droite || gauche)
        {
            vitX = Math.acos(vitX);
            vitY = Math.asin(vitY);
                if(droite) 
            {
                if (vitY > 0)
                {
                    vitX = Math.cos(vitX + rotation);
                }
                else 
                {
                    vitX = Math.cos(vitX - rotation);
                }
                if (vitX > 0)
                {
                    vitY = Math.sin(vitY + rotation);
                }
                else 
                {
                    vitY = Math.sin(vitY - rotation);
                }
                }
                else if(gauche) 
            {
                if (vitY > 0)
                {
                    vitX = Math.cos(vitX - rotation);
                }
                else 
                {
                    vitX = Math.cos(vitX + rotation);
                }
                if (vitX > 0)
                {
                    vitY = Math.sin(vitY - rotation);
                }
                else 
                {
                    vitY = Math.sin(vitY + rotation);
                }
            }
        }
    }

    // Fonction de dessin de la balle
    function maillonTete() 
    {
            tete.posX = tete.posX + vitX;
            tete.posY = tete.posY + vitY;
            mouvement[0].push({posMX : tete.posX, posMY : tete.posY});
            contexte.beginPath();
            contexte.arc(tete.posX, tete.posY, tete.taille, 0, Math.PI*2);
            contexte.fillStyle = "#0095DD";
            contexte.fill();
            contexte.closePath();
    }

    // Fonction de dessin des briques
    function maillonCorps() 
    {
        var precedent = tete;
        var maillon;    
        for(var i = 1; i < corps.length; i++) 
        {
            maillon = corps[i];
            if (i < corps.length-1 || esp == 0)
            {
                maillon.posX =  mouvement[i-1][0].posMX;
                maillon.posY =  mouvement[i-1][0].posMY;
                mouvement[i-1].splice(0, 1);
                if (i < corps.length - 1)
                {
                    mouvement[i].push({posMX : maillon.posX, posMY : maillon.posY});
                }
            }
            else
            {
                esp -= 1;
            }
            contexte.beginPath();
            contexte.arc(maillon.posX, maillon.posY, maillon.taille, 0, Math.PI*2);
            contexte.fillStyle = "#0095DD";
            contexte.fill();
            contexte.closePath();
            precedent = corps[i];
            }
    }

    function balleAliment() {
        for (var i = 0; i < nourriture.length; i++)
        {
            var aliment = nourriture[i];
            aliment.posNX += aliment.vitNX;
            aliment.posNY += aliment.vitNY;
            contexte.beginPath();
            contexte.arc(aliment.posNX, aliment.posNY, 7, 0, Math.PI*2);
            contexte.fillStyle = "#0095DD";
            contexte.fill();
            contexte.closePath();
        }
    }

    // Fonction d'affichage du score
    function afficherScore() {
        contexte.font = "16px Arial";
        contexte.fillStyle = "#0095DD";
        contexte.fillText("Score: "+ score, 8, 20);
    }

    // Fonction principale qui va être appellée une fois toutes les 10 millisecondes pour faire marcher le jeu
    function updateJeu() 
    {
        if(fini){
            clearInterval(Interval);
            clearInterval(Interval2);
            return;
        } else{
            contexte.clearRect(0, 0, canvas.width, canvas.height);
            maillonTete();
            maillonCorps();
            balleAliment(); 
            collisionDetection();
            afficherScore();
        }
        
    }

    function updateAliment()
    {
        if (nourriture.length < 10)
        {
            var nbAliment = Math.floor(Math.random() * (nourriture.length + 3)) + 1 - nourriture.length;
            if (nbAliment > 0)
            {
                nbAliment += nourriture.length;
                for(var i = nourriture.length; i < nbAliment; i++) 
                {
                    nourriture[i] = {   
                    posNX : Math.floor(Math.random() * 401) + 50, 
                    posNY : Math.floor(Math.random() * 401) + 50, 
                    vitNX : (Math.random() * 0.5), 
                    vitNY : (Math.random() * 0.5),};
                }
            }
        }
    }

    Interval = setInterval(updateJeu, 10);
    Interval2 = setInterval(updateAliment, 7000);

}

function startLab()
{
    resetPage();
    fini = false;
    canvas = document.getElementById("minijeuL");
    canvas.style.width = "100%";
    canvas.style.position = "fixed";
    var contexte = canvas.getContext("2d");

    function height(){
        var hauteur;
        if (typeof(window.innerWidth) == 'number')
        {
            hauteur = window.innerHeight;
        }
        else if (document.documentElement && document.documentElement.clientHeight)
        {
            hauteur = document.documentElement.clientHeight;
        }
        return hauteur;
    }

    window.onload = function()
            { 
                canvas.style.height = height() + "px";
            };
    window.onresize = function()
            { 
                canvas.style.height = height() + "px";
            };

    var murFeu = [];
    for (var i = 0; i < 40; i++)
    {
        murFeu[i] = {vitX1 : 0, vitX2 : 0, vitX3 : 0,posX1 : 0, posX2 : 0, posX3 : 0, image1 : null, image2 : null, image3 : null, longueur1 : 0, longueur2 : 0, longueur3 : 0};
    }
    var posY = 500;
    var plateau;
    var coordonneeX;
    var coordonneeY;
    var indiceX;

    function initialisationLab()
    {
        for(i = 0; i < 10; i++)
        {
            var flamme = document.createElement("img");
            flamme.src = "images/flamme" + i + ".png";
            flamme.id = "flamme";
            flamme.alt = "indice";
            flamme.style.display = "none";
            canvas.parentNode.appendChild(flamme);
        }
        var corps = document.body;
        var fond = document.createElement("img");
        fond.src = "images/fond.jpg";
        fond.id = "fond";
        fond.alt = "fond";
        var indice = document.createElement("img");
        indice.src = "images/indice.png";
        indice.id = "indice";
        indice.alt = "indice";
        var happy = document.createElement("img");
        happy.src = "images/personnage.png";
        happy.id = "happy";
        happy.alt = "happy";
        corps.appendChild(fond);
        corps.appendChild(indice);
        corps.appendChild(happy);
        var debut;
        fond.style.width = "40%";
        fond.style.height = fond.clientWidth;
        fond.style.position = "fixed";
        fond.style.top = "50px";
            fond.style.left = "30%";
            happy.style.width = "2%";
            happy.style.position = "fixed";
        coordonneeX = getPremiereCase();
        coordonneeY = 0;
        debut = getPositionCase(coordonneeX, coordonneeY);
        happy.style.top = debut[1] + "px";
        happy.style.left = debut[0] + "%";
        indice.style.width = "2%";
        indice.style.position = "fixed";
        indiceX = getDerniereCase();
        debut = getPositionCase(indiceX, 19);
        indice.style.top = debut[1] + "px";
        indice.style.left = debut[0] + "%";
        corps.addEventListener('keydown', function(event)
            {
                if (event.keyCode == 37) 
                {
                    if (coordonneeX > 0 && plateau[coordonneeX-1][coordonneeY] == false)
                    {
                        coordonneeX--;
                        debut = getPositionCase(coordonneeX, coordonneeY);
                        happy.style.left = debut[0] + "%";
                    }
                }
                else if (event.keyCode == 38) 
                {
                    if (coordonneeY < 19 && plateau[coordonneeX][coordonneeY+1] == false)
                    {
                        coordonneeY++;
                        debut = getPositionCase(coordonneeX, coordonneeY);
                        happy.style.top = debut[1] + "px";
                    }
                }
                else if (event.keyCode == 39) 
                {
                    if (coordonneeX < 19 && plateau[coordonneeX+1][coordonneeY] == false)
                    {
                        coordonneeX++;
                        debut = getPositionCase(coordonneeX, coordonneeY);
                        happy.style.left = debut[0] + "%";
                    }
                }
                else if (event.keyCode == 40) 
                {
                    if (coordonneeY > 0 && plateau[coordonneeX][coordonneeY-1] == false)
                    {
                        coordonneeY--;
                        debut = getPositionCase(coordonneeX, coordonneeY);
                        happy.style.top = debut[1] + "px";
                    }
                }
                if (coordonneeX == indiceX && coordonneeY == 19 )
                {
                    alert ("Vous avez réussi l'épreuve");
                    indice++;
                    removeImg();
                    clear(4);
                    return;
                }
            });
        var pierre;
        for (var i = 0; i < 20; i++)
        {
            for (var j = 0; j < 20; j++)
            {
                if (plateau[i][j] == true)
                {   
                    pierre = document.createElement("img");
                    pierre.src = mur[Math.floor(Math.random() * mur.length)];
                    pierre.id = "pierre-" + i + "-" + j;
                    pierre.alt = "pierre";
                    corps.appendChild(pierre);
                    pierre.style.width = "2%";
                        pierre.style.position = "fixed";
                    debut = getPositionCase(i, j);
                    pierre.style.top = debut[1] + "px";
                    pierre.style.left = debut[0] + "%";
                }
            }
        }
    }


    function initialiserPlateau()
    {
        var terrain = labyrinthe[Math.floor(Math.random() * labyrinthe.length)];
        plateau = [];
        var compteur = 0;
        for (var i = 0; i < 20; i++)
        {
            plateau.push([]);
            for (var j = 0; j < 20; j++)
            {
                if (terrain.charAt(compteur) == '1')
                {
                    plateau[i].push(true);
                }
                else
                {
                    plateau[i].push(false);
                }
                compteur++;
            }
        }
    }

    function getPremiereCase()
    {
        var trouve = false;
        var index;
        while (!trouve)
        {
            index = Math.floor(Math.random() * 20);
            if (plateau[index][0] == false)
            {
                trouve = true;
            } 
        }
        return index;
    }

    function getDerniereCase()
    {
        var trouve = false;
        var index;
        while (!trouve)
        {
            index = Math.floor(Math.random() * 20);
            if (plateau[index][19] == false)
            {
                trouve = true;
            } 
        }
        return index;
    }

    function getPositionCase(x, y)
    {
        var tab = [30 + (x * 2), 50 + (document.getElementById("fond").clientWidth * ((20-(y+1))/20))];
        return tab;
    }

    // Fonction principale qui va être appellée une fois toutes les 10 millisecondes pour faire marcher le jeu
    function updateFlamme() 
    {
        if(fini){
            clearInterval(Interval);
            return;
        } else{
            var width = canvas.width * 0.05;
            contexte.clearRect(0, 0, canvas.width, canvas.height);
            var position = getPositionCase(coordonneeX, coordonneeY);
            for (var i = 0; i < 40; i++)
            {
                if (((posY * height()) / 500) + 10 <= position[1])
                {
                    alert("GAME OVER");
                    removeImg();
                    clear(4);
                    return;
                }
                if (murFeu[i].longueur1 <= 0)
                {
                    murFeu[i].image1 = document.createElement("img");
                    murFeu[i].image1.src = flamme[Math.floor(Math.random() * flamme.length)];
                    murFeu[i].posX1 = 0;
                    murFeu[i].vitX1 = (Math.random() * 4) - 1;
                    murFeu[i].longueur1 = (Math.random() * 5);
                }
                if (murFeu[i].longueur2 <= 0)
                {
                    murFeu[i].image2 = document.createElement("img");
                    murFeu[i].image2.src = flamme[Math.floor(Math.random() * flamme.length)];
                    murFeu[i].posX2 = 0;
                    murFeu[i].vitX2 = (Math.random() * 4) - 1;
                    murFeu[i].longueur2 = (Math.random() * 5);
                }
                if (murFeu[i].longueur3 <= 0)
                {
                    murFeu[i].image3 = document.createElement("img");
                    murFeu[i].image3.src = flamme[Math.floor(Math.random() * flamme.length)];
                    murFeu[i].posX3 = 0;
                    murFeu[i].vitX3 = (Math.random() * 4) - 1;
                    murFeu[i].longueur3 = (Math.random() * 5);
                }       
                    contexte.beginPath();
                    contexte.drawImage(murFeu[i].image1, (i * (canvas.width * 0.025) - 5) + murFeu[i].posX1, posY, width, width * 2);
                contexte.drawImage(murFeu[i].image2, (i * (canvas.width * 0.025) - 5) + murFeu[i].posX2, posY, width, width * 2);
                contexte.drawImage(murFeu[i].image3, (i * (canvas.width * 0.025) - 5) + murFeu[i].posX3, posY, width, width * 2);
                    contexte.closePath();
                murFeu[i].posX1 += murFeu[i].vitX1;
                murFeu[i].posX2 += murFeu[i].vitX2;
                murFeu[i].posX3 += murFeu[i].vitX3;
                murFeu[i].longueur1 -= Math.sqrt(Math.pow(murFeu[i].vitX1, 2) + Math.pow(3, 2));
                murFeu[i].longueur2 -= Math.sqrt(Math.pow(murFeu[i].vitX2, 2) + Math.pow(3, 2));
                murFeu[i].longueur3 -= Math.sqrt(Math.pow(murFeu[i].vitX3, 2) + Math.pow(3, 2));
            }
            posY -= 3;
        }
    }

    Interval = setInterval(updateFlamme, 100);
    initialiserPlateau();
    initialisationLab();



}