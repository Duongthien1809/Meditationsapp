 const script = () => {
     var play = document.querySelector(".play");
     var song = document.querySelector(".song");
     var video = document.querySelector(".vid-container video");
     var outline = document.querySelector(".moving-outline circle");


     //Sound
     var sounds = document.querySelectorAll(".audio-option button");
     //Time Display
     var timedisplay = document.querySelector(".time-display");
     // outline Länge
     var outlineLength = outline.getTotalLength();

     //Dauer
     var zeitAuswahl = document.querySelectorAll(".zeit-option button");
     var zeitDauer = 600;

     outline.style.strokeDasharray = outlineLength;
     outline.style.strokeDashoffset = outlineLength;


     //sound spielen
     play.addEventListener("click", () => {
         einchecken(song);
     });


     //sound ändern
     sounds.forEach(sound => {
         sound.addEventListener("click", function() {
             song.src = this.getAttribute("data-sound");
             video.src = this.getAttribute("data-video");
             einchecken(song);
         });
     });

     //Zeit auswahlen
     zeitAuswahl.forEach(element => {
         element.addEventListener("click", function() {
             zeitDauer = this.getAttribute("data-time");
             timedisplay.textContent = `${Math.floor(zeitDauer/60)}:${Math.floor(zeitDauer%60)}`;

         });
     });

     //Sound pause und play Methode
     var einchecken = song => {
         if (song.paused) {
             video.play();
             song.play();
             play.src = './MeditationApp/svg/pause.svg';
         } else {
             song.pause();
             video.pause();
             play.src = './MeditationApp/svg/play.svg';
         }
     }

     //Zeit einsetzen
     song.ontimeupdate = () => {
         let aZeit = song.currentTime;
         let elapseTime = zeitDauer - aZeit;
         let sekunde = Math.floor(elapseTime % 60);
         let minute = Math.floor(elapseTime / 60);

         //Animieren den Kreis

         let a = outlineLength - (aZeit / zeitDauer) * outlineLength;
         outline.style.strokeDashoffset = a;

         //animieren time text
         timedisplay.textContent = `${minute}:${sekunde}`;

         if (minute == 0 && sekunde == 0) {
             song.pause();
             song.aZeit = 0;
             play.src = "./MeditationApp/svg/play.svg";
             video.pause();
             outline.style.strokeDasharray = outlineLength;
             outline.style.strokeDashoffset = outlineLength;
         }

     }
 }

 script();