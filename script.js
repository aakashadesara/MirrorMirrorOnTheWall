window.onload=function(){


    SC.initialize({
      client_id: 'YOUR_CLIENT_ID'
    });

    var track_url = 'http://soundcloud.com/forss/flickermood';
    SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
      //console.log('oEmbed response: ', oEmbed);
    });

    setUpAnnyang();
    startTime();

    // Start calendar
    var c = new Cal("divCal");
    c.showcurr();

    // Bind next and previous button clicks
    getId('btnNext').onclick = function() {
      c.nextMonth();
    };
    getId('btnPrev').onclick = function() {
      c.previousMonth();
    };
};


var arrUnknown = [];
var mirrorActive = false;

function setUpAnnyang(){
    if (annyang) {
      // Let's define a command.
      var commands = {
        'hello': activateMirror,
        'mirror on the wall': activateMirror,
        'mirror mirror on the wall': activateMirror,
        'thank you *tag': deactivateMirror,
        'goodbye *tag': deactivateMirror,
        'bye bye': deactivateMirror,
        '*tag': tagger
      };

      // Add our commands to annyang
      annyang.addCommands(commands);

      SpeechKITT.annyang();
      SpeechKITT.setStylesheet('http://cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');
      SpeechKITT.vroom();


      // Start listening.
      annyang.start();
    }
}

function speak(phrase){
    if(phrase != undefined){
        //console.log("Mirror: " + phrase);
        $("#chatHolder").html("<div class=\'chat-message chat-message-recipient\'><div class=\'chat-message-wrapper\'><div class=\'chat-message-content\'><p>" + phrase + "</p></div></div></div>" + $("#chatHolder").html());
        responsiveVoice.setDefaultVoice("UK English Male");
        responsiveVoice.speak(phrase);
    }
}


function activateMirror(){
    mirrorActive = true;
    randomGreeting();
}

function deactivateMirror(){
    if(phrase != undefined && mirrorActive == true){
        mirrorActive = false;
        var i = funGoodbye();
        //console.log("Mirror: " + i);
        $("#chatHolder").html("<div class=\'chat-message chat-message-recipient\'><div class=\'chat-message-wrapper\'><div class=\'chat-message-content\'><p>" + i + "</p></div></div></div>" + $("#chatHolder").html());
        responsiveVoice.setDefaultVoice("UK English Male");
        responsiveVoice.speak(i);
    }
}

function funGoodbye(){
    var i = Math.random();
    if(i < .25){
        speak("Goodbye for now Master.");
        setTimeout(speak, 5000);
    } else if (i < .5){
        speak("No problem. Talk to you soon.");
        setTimeout(speak, 5000);
    } else if (i < .75){
        speak("I hope the rest of your day is pleasant!");
        setTimeout(speak, 5000);
    } else {
        speak("Have a hashtag SOLID day!");
        setTimeout(speak, 5000);
    }
}

function tagger(tag){
    //console.log("User said: " + tag);
    if (mirrorActive){
        $("#chatHolder").html("<div class=\'chat-message chat-message-sender\'><div class=\'chat-message-wrapper\'><div class=\'chat-message-content\'><p>" + tag + "</p></div></div></div>" + $("#chatHolder").html());
        if(tag.includes("clothes") || tag.includes("wear today")){
            speak("You should wear whatever you feel comfortable in.");
            setTimeout(speak, 5000);
            mirrorActive = false;
        } else if (tag.includes("weather")) {
            console.log("WEATHER");
            speak("It is going to be slightly cloudy. Perhaps wear some layers");
            setTimeout(speak, 5000);
            mirrorActive = false;
        } else if ((tag.includes("orchestra") || tag.includes("music")) && tag.includes("play")){
            speak("which symphony do you desire?");
            setTimeout(speak, 5000);
            mirrorActive = false;
        } else if (tag.includes("can you play")){
            speak("sure, I will play " + tag.substring((tag.indexOf("can you play") + 13), tag.length));
            setTimeout(speak, 5000);
            mirrorActive = false;
        } else if (tag == "drop a sick beat"){
            speak("I will drop a sick beat");
            setTimeout(speak, 5000);
            mirrorActive = false;
        } else if(tag.includes("how are you")) {
            speak(howAreYou());
            setTimeout(speak, 5000);
        } else if(tag.includes("today") && tag.includes("date")){
            speak(todaysDate());
            setTimeout(speak, 5000);
            mirrorActive = false;
        } else if(tag == "what's up"){
            speak(philosophy());
            setTimeout(speak, 5000);
            mirrorActive = false;
        } else if(tag.includes("show me")){
            showFlickr(tag.substring(tag.indexOf("show me") + 8));
        } else if ((tag.includes("I want") || tag.includes("give")) && (tag.includes("philosophy") || tag.includes("wisdom"))){
            speak(philosophy());
            setTimeout(speak, 5000);
            mirrorActive = false;
        } else if (tag == "what can you not respond to"){
            var sampleString = "";
            for(var i = 0; i < arrUnknown.length; i++){
                console.log(arrUnknown[i])
                sampleString = sampleString + " " + (i + 1) + " " + arrUnknown[i] + ", "
            }
            speak("I cannot respond to the following. Please teach me how to respond to " + sampleString);
            setTimeout(speak, sampleString.length * 125 + 4000);
            mirrorActive = false;

        }else {
            console.log("ADDED: " + tag);
            arrUnknown.push(tag);
        }
    }

}

var showFlickr = function(tag) {
  var url = 'http://api.flickr.com/services/rest/?tags='+tag;
  alert(url);
  $.getJSON(url);
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('timeHolder').innerHTML = (h + ":" + m + ":" + s);

    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

/* FUNCTIONS OF THE MIRROR */
function randomGreeting(){
    var i = Math.random();
    if(i < .25){
        speak("Yes master, what may I do for you?");
        setTimeout(speak, 5000);
    } else if (i < .5){
        speak("Greetings! How may I assist you?");
        setTimeout(speak, 5000);
    } else if (i < .75){
        speak("I am here, at your service");
        setTimeout(speak, 5000);
    } else {
        speak("Ask me whatever your heart desires.");
        setTimeout(speak, 5000);
    }
}

function howAreYou(){
    var i = Math.random();
    if(i < .25){
        speak("I am doing well. Thank you for asking!");
        setTimeout(speak, 5000);
    } else if (i < .5){
        speak("I am doing well, sorry it doesn't reflect on my face.");
        setTimeout(speak, 5000);
    } else if (i < .75){
        speak("I am meerly your reflection, I am as well as you are.");
        setTimeout(speak, 5000);
    } else {
        speak("I am hashtag solid.");
        setTimeout(speak, 5000);
    }
}

function clothingOptions(){

}

function weather(){

}

function todaysDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    var tM = "";
    var tD = "";
    var tY = "";

    switch (mm) {
        case 01:
            tM = "January";
            break;
        case 02:
            tM = "February";
            break;
        case 03:
            tM = "March";
            break;
        case 04:
            tM = "April";
            break;
        case 05:
            tM = "May";
            break;
        case 06:
            tM = "June";
            break;
        case 07:
            tM = "July";
            break;
        case 08:
            tM = "August";
            break;
        case 09:
            tM = "September";
            break;
        case 10:
            tM = "October";
            break;
        case 11:
            tM = "November";
            break;
        case 12:
            tM = "December";
            break;
    }

    switch(dd){
        case 01: tD = "First"; break;
        case 02: tD = "Second"; break;
        case 03: tD = "Third"; break;
        case 04: tD = "Fourth"; break;
        case 05: tD = "Fifth"; break;
        case 06: tD = "Sixth"; break;
        case 07: tD = "Seventh"; break;
        case 08: tD = "Eight"; break;
        case 09: tD = "Ninth"; break;
        case 10: tD = "Tenth"; break;
        case 11: tD = "Eleventh"; break;
        case 12: tD = "Twelth"; break;
        case 13: tD = "Thirteenth"; break;
        case 14: tD = "Fourteenth"; break;
        case 15: tD = "Fifteenth"; break;
        case 16: tD = "Sixteenth"; break;
        case 17: tD = "Seventeenth"; break;
        case 18: tD = "Eighteenth"; break;
        case 19: tD = "Nineteenth"; break;
        case 20: tD = "Twentieth"; break;
        case 21: tD = "Twenty first"; break;
        case 22: tD = "Twenty second"; break;
        case 23: tD = "Twenty third"; break;
        case 24: tD = "twenty fourth"; break;
        case 25: tD = "twenty fifth"; break;
        case 26: tD = "twenty sixth"; break;
        case 27: tD = "twenty seventh"; break;
        case 28: tD = "twenty eight"; break;
        case 29: tD = "twenty ninth"; break;
        case 30: tD = "thirtieth"; break;
        case 31: tD = "thirty first"; break;
        default: tD = ""; break;
    }

    today = "Today is the " + tD + " of " + tM + ". The year is " + yyyy;
    return today;
}


function philosophy(){
    var arr = ["Books shouldn't be judged by their covers. Neither should people.",
                "Everyone is part of this massive water filtration system.",
                "Dig holes. Fill them in. Repeat.",
                "Would you rather be hot or cool?",
                "Life is your restaraunt.",
                "Floating kangaroo parades are really hard to spot.",
                "Why live on the ceiling if you can live on the floor.",
                "Ring the doorbell. Or knock. It's genuine.",
                "Haha, the monkeys were swinging on green chains.",
                "It's not lit, it really isn't. It's more of a sauna.",
                "It's wavy like the carrot slices.",
                "It's complicated. Unwind, relax, chill.",
                "Hopping over the cloudy moon to help the bro catch ants.",
                "Crack em open for the watermelon slices."];
    return arr[Math.floor(Math.random() * arr.length)];
}
