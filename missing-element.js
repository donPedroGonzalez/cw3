var firstPart, secondPart, missingElement;
window.onload = onPageLoad();

function onPageLoad()
{   
    document.getElementById("button").disabled = true;
    var reloadButton = document.getElementById("reloadPage");
    reloadButton.addEventListener("click", clearForm);

    var exerciceBody = document.getElementById("exercice-wrapper");
    firstPart = [ "Uzupełnij brakujące słowo", "J'adore la", "J'aime la", "Je n'aime pas la", "Je suis", "J'aime le", "Je déteste l'", "Je ne parle pas", "J'adore la", "J'aime les", "Je n'aime pas le", "Je déteste le", "J'adore la", "J'aime", "J'adore", "Je n'aime pas la", "J'aime le", "Je déteste la", "J'adore", "Je n'aime pas", "J'" ];
    secondPart = [ "W nawiasie polskie znaczenie", "!", ".", ".", ".", ".", "!", ".", "française.", ".", ".", "!", "classique.", ".", "en France.", ".", ".", "!", "le soir.", "seul.", "les fleurs rouges." ];
    missingElement = [ "Les goûts", "mer", "pluie", "bière", "polonais", "fromage", "alcool", "allemand", "cuisine", "fleurs", "vin", "bruit", "musique", "danser", "voyager", "montagne", "soleil", "viande", "danser", "voyager", "aime" ];
    hints = [ "nan", "Uwielbiam morze! (3 lettres)", "Lubię deszcz. (5 lettres)", "Nie lubię piwa. (5 lettres)", "Jestem Polakiem. (8 lettres)", "Lubię ser. (7 lettres)", "Nie znoszę alkoholu! (6 lettres)", "Nie mówię po niemiecku. (8 lettres)", "Uwielbiam kuchnię francuską. (7 lettres)", "Lubię kwiaty. (6 lettres)", "Nie lubię wina. (3 lettres)", "Nie znoszę hałasu! (5 lettres)", "Uwielbiam muzykę klasyczną. (7 lettres)", "Lubię tańczyć. (6 lettres)", "Uwielbiam podróżować po Francji. (7 lettres)", "Nie lubię gór. (8 lettres)", "Lubię słońce. (6 lettres)", "Nie znoszę mięsa! (6 lettres)", "Uwielbiam tańczyć wieczorem. (6 lettres)", "Nie lubię podróżować sam. (7 lettres)", "Lubię czerwone kwiaty. (4 lettres)" ];

    var myForm = document.createElement("form");
    myForm.setAttribute("id", "myExercice"); 
    document.getElementById("premiere-consigne").innerText = firstPart[0];
    document.getElementById("deuxieme-consigne").innerText = secondPart[0];
    document.getElementById("footer-cat-info").innerText = missingElement[0];
    
    var newItemLabel1,newItemLabel2, newItemInput;

    for(var i = 1; i < firstPart.length; i++)
    {
        newItemLabel1 = document.createElement("label");
        newItemLabel1.setAttribute("for", "item"+i);
        newItemLabel1.innerText = firstPart[i] + " ";
        newItemLabel2 = document.createElement("label");
        newItemLabel2.setAttribute("for", "item"+i);        
        //newItemLabel2.innerText = " " + secondPart[i] + " (" + hints[i] + ")";          
        newItemLabel2.innerText = "  " + secondPart[i] + "  ";
        newHintSubItem = document.createElement("span")
        newHintSubItem.innerText =  "(" + hints[i] + ")";
        newHintSubItem.setAttribute("style", "font-style: italic; font-size:12pt;")
        newItemInput = document.createElement("input");
        newItemInput.setAttribute("type", "text");        
        newItemInput.setAttribute("name", "item"+i);
        newItemInput.setAttribute("id", "item"+i);
        newItemInput.setAttribute("style", "min-width: 300px; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size:16pt;");
        var paragraph = document.createElement("p");
        paragraph.appendChild(newItemLabel1);
        paragraph.appendChild(newItemInput);
        paragraph.appendChild(newItemLabel2);
        paragraph.appendChild(newHintSubItem);
        paragraph.setAttribute("id", "par" + i);
        myForm.appendChild(paragraph);
    }
    exerciceBody.appendChild(myForm);

    // VIRTUAL KEYBOARD

    // Creating the virtual keyboard

    var inputs = document.getElementById("myExercice").getElementsByTagName("input");
    var keyb = document.getElementById("keyboard");    
    var keybKeys = keyb.getElementsByTagName("input");
    var exTitleWindow = document.getElementById("main-window-title");
    var keybReset = document.getElementById("reset-keyboard");
    var keybActivate = document.getElementById("activate-keyboard");
    keybReset.addEventListener("click", keyboardDeactivation);  
    keybActivate.addEventListener("click", keyboardReactivation);  

    for(var k=0; k < inputs.length; k++)
    {
        //var activateInput = keyboardActivation.bind(inputs[k]);
        // inputs[k].addEventListener("onclick", activateInput());
        inputs[k].addEventListener("click", keyboardActivation);
    }
    function keyboardActivation(e)
    {                
        var self = this;
        var lastLabelElement = this.parentNode.lastChild;
        /*keyb.style.display = "block";*/
        keyb.setAttribute("class", "");
        // keybReset.setAttribute("class", "");
        keybReset.disabled = false;
        // keyb.style.top = Number(e.clientY + -105) + "px";
        keyb.style.top = Number(lastLabelElement.getBoundingClientRect().top) + "px";
        // keyb.style.left = Number(e.clientX + 275) + "px";
        keyb.style.left = Number(lastLabelElement.getBoundingClientRect().right + 15) + "px";
        // keybReset.style.display = "grid";
        keybReset.addEventListener("click", keyboardDeactivation);  
        for(var m = 0; m < keybKeys.length; m++)
        {
            keybKeys[m].addEventListener("onclick", virtualKeyboard(m));
            function virtualKeyboard(m)
            {   
                keybKeys[m].onclick = function()
                {
                    self.value += this.value;
                }                    
            }  
        }
    }
    function keyboardDeactivation()
    {

        keyb.setAttribute("class", "hidden");
        // keybReset.setAttribute("class", "hidden");
        keybReset.disabled = true;
        // keybActivate.setAttribute("class", "grid");
        keybActivate.disabled = false;
        for(var k=0; k < inputs.length; k++)
        {
            inputs[k].removeEventListener("click", keyboardActivation);
        }            
    }  
    function keyboardReactivation()
    {
        for(var k=0; k < inputs.length; k++)
        {
            inputs[k].addEventListener("click", keyboardActivation);
            // keybActivate.setAttribute("class", "hidden");
            keybActivate.disabled = true;
            keybReset.disabled = false;
        }
    }  
        // CHECKING ANSWERS

    var answer, itemName, itemToCheck, formToCheck, myparagraph, resultWrapper;
    var correctNumber = 0;

    document.getElementById("button").onclick = function()
    {
        correctNumber = 0;
        for(var i = 1; i < firstPart.length; i++)
        {
            keyboardDeactivation();
            answer = missingElement[i];
            itemName = "item" + i;
            formToCheck = document.getElementById("myExercice");
            itemToCheck = formToCheck.elements[itemName].value;
            // removing old result content if present in case of second, third etc. check button click.
            var spans = document.getElementById("par"+i).getElementsByClassName("check-answer");
            for (var m = 0; m < spans.length; m++)
            {
                spans[m].parentNode.removeChild(spans[m]);            
            }
            if (itemToCheck !== missingElement[i])
            {            
                myparagraph = document.createElement("span");
                myparagraph.setAttribute("id", "answer"+i);
                myparagraph.setAttribute("style", "color:red;");
                myparagraph.setAttribute("class", "check-answer");
                myparagraph.innerText = " - La réponse correcte : " + missingElement[i];
                
                document.getElementById("par"+i).appendChild(myparagraph);
            }else
            {
                myparagraph = document.createElement("span");
                myparagraph.setAttribute("id", "answer"+i);
                myparagraph.setAttribute("style", "color:green;");
                myparagraph.setAttribute("class", "check-answer");
                myparagraph.innerText = " - C'est correct, félicitations !";
                document.getElementById("par"+i).appendChild(myparagraph);
                correctNumber++;
            }
            resultWrapper = document.getElementById("result-wrapper");
            resultWrapper.innerText = "Ton résultat : " + correctNumber + " / " + Number(firstPart.length-1);
            resultWrapper.setAttribute("style", "font-size: larger; color: dark-blue; text-shadow: 0px 0px 3px white;" )
        }
    }  
    // clear Button
    function clearForm()
    {
        keyboardReactivation();
        for(var i = 1; i < firstPart.length; i++)
        {
            formToClear = document.getElementById("myExercice");
            formToClear.reset();
            // removing old result content if present in case of second, third etc. check button click.
            var spans = document.getElementById("par"+i).getElementsByClassName("check-answer");
            for (var m = 0; m < spans.length; m++)
            {
                spans[m].parentNode.removeChild(spans[m]);            
            }
            document.getElementById("result-wrapper").innerText = "";
        }
        
    }
}

var inputToFill;
var filledIn;

// VERIRFICATION BUTTON ACTIVATION

window.onkeydown = function()
{
    for(var i = 1; i < firstPart.length; i++)
    {
        filledIn = true;
        itemName = "item" + i;
        formToCheck = document.getElementById("myExercice");
        itemToCheck = formToCheck.elements[itemName].value;
        if (!itemToCheck)
        {
            filledIn = false;
            break;
        }
    }
    if (filledIn === true)
    {
        document.getElementById("button").disabled = false;
    }
}


function clearForm()
{
    for(var i = 1; i < questions.length; i++)
    {
        formToClear = document.getElementById("myExercice");
        formToClear.reset();
        // removing old result content if present in case of second, third etc. check button click.
        var spans = document.getElementById("par"+i).getElementsByTagName("span");
        for (var m = 0; m < spans.length; m++)
        {
            spans[m].parentNode.removeChild(spans[m]);            
        }
        document.getElementById("result-wrapper").innerText = "";
    }
    
}