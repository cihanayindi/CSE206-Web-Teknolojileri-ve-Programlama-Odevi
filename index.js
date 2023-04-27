let kelimeler = ["RADYO", "SEHPA", "DOLAP", "KALEM", "KAVUN", "KÖPEK", "MERAK", "GAZAP", "ROMAN", "TAVUK"] 
// var DogruKelime = "CEVİZ";
var DogruKelime = kelimeler[Math.floor(Math.random() * kelimeler.length)];
let tahminler = []

let DenemeSayac = 0; // deneme hakkı için sayac
let durum = 0; // kazanıp kazanmama durumunu kontrol etmek için değişken

const guessInput = document.querySelector('.guess-control'); 

function TabloyuDoldur() { // girilen tahmini kutucuklara yazar.
  const cells = document.querySelectorAll('.cell');
  let tahminlerString = tahminler.join("");
  
  var i = 0;
  for(let tahminHarf of tahminlerString){
    cells[i].textContent = tahminHarf;
    i++;
  }
}

function TabloyuBosalt() { // Tahminleri kutucuklardan siler
  const cells = document.querySelectorAll('.cell');
  
  var i;
  for(i=0; i<30; i++){
    cells[i].textContent = "";
    cells[i].style.backgroundColor = "white";
  }
}

function TahminKutuBosalt() {
  guessInput.value = "";
}

function RestartButonu() { // Oyuncu oyunu tekrar başlatmak isterse gerekli işlemleri yapan fonksiyon
  DogruKelime = kelimeler[Math.floor(Math.random() * kelimeler.length)];
  tahminler = []
  
  DenemeSayac = 0;
  durum = 0;
  TabloyuBosalt();
  const KlavyeHarfleri = document.querySelectorAll('.keyboard-row button');
  for (let KlavyeHarfi of KlavyeHarfleri) {
    KlavyeHarfi.style.backgroundColor = 'rgb(219, 219, 219)';
  }

  let mesajElemani = document.getElementById("mesaj");
  mesajElemani.style.display = 'none';

  let restartButtonElemani = document.getElementById("restart-button");
  restartButtonElemani.style.display="none";
  TahminKutuBosalt();
}

function Confetti(){ // Kazanma durumunda alkış sesi ve confetti efekti veren fonksiyon
  var applauseSound = new Audio('alkis.mp3');
  applauseSound.play();
  const start = () =>{
    setTimeout(function(){
      confetti.start();
    },1000);
  };
  const stop = () =>{
    setTimeout(function(){
      confetti.stop();
    },5000);
  }
  start();
  stop();
}

function ClickMe() {  // check me butona tıklanınca çalışacak fonksiyon
    // boşluğa girilen string değerini büyük harflere dönüştürüp
    // kelimeler listesinin içinde var mı diye sorguluyor
    // eğer varsa direkt oyunu bitirecek yoksa hangi harfler 
    // yerler vb uyuşuyor diye bir geri dönüş yapacak.

    let inputValue = guessInput.value.toLocaleUpperCase('tr-TR');
  
    if (DenemeSayac < 6 && durum == 0) {
        console.log("bire girildi");
        if ((/\d/.test(inputValue))) { // TAHMİN SAYI İÇERİYORSA
          TahminKutuBosalt();
          alert("Kutucukta sayı olmamalı.");
          return 0;
        }

        if (inputValue.length != 5) { // TAHMİN 5 HARFLİ DEĞİLSE
          TahminKutuBosalt();
          alert("Girdiğiniz kelime 5 harfli olmalı.");
          return 0;
        }
        
        if (inputValue == DogruKelime) { // TAHMİN DOĞRUYSA
          
          TahminKutuBosalt();

          const cellStyle = document.querySelectorAll('.cell');
          for(e = 0; e<5; e++){
            const KlavyeHarfi = document.querySelector(`button[data-key="${inputValue[e].toLocaleLowerCase('tr-TR')}"]`);
            cellStyle[e + (DenemeSayac*5)].style.backgroundColor = '#538d4e';
            KlavyeHarfi.style.backgroundColor = '#538d4e';
          }
          
          tahminler.push(inputValue);
          TabloyuDoldur();

          let mesaj= ("Kazandınız!🏆");
          let mesajElemani = document.getElementById("mesaj");
          mesajElemani.style.display="flex";
          mesajElemani.innerHTML = mesaj;

          let restartButtonElemani = document.getElementById("restart-button");
          restartButtonElemani.style.display="flex";
          restartButtonElemani.className = "btn";
          restartButtonElemani.addEventListener('click', RestartButonu);
          Confetti();
          durum = 1;
        } 
        
        else {
            tahminler.push(inputValue)
            for (var i = 0; i < inputValue.length; i++) { // TAHMİN : ALARA 3  KELİME : KALFA 2 
                var letter = inputValue[i];
                
                const KlavyeHarfi = document.querySelector(`button[data-key="${letter.toLocaleLowerCase('tr-TR')}"]`);
                // let countTahmin = inputValue.split("").filter(char => char === letter).length;
                // let countDogru = DogruKelime.split("").filter(char => char === letter).length;
                
                if (DogruKelime.includes(letter)) { 
                    var index = DogruKelime.indexOf(letter);

                    if (index == i) {
                        // console.log(letter, " harfi kelime içinde var ve yeri doğru. Kelime: ", DogruKelime);
                        const cellStyle = document.querySelectorAll('.cell');
                        KlavyeHarfi.style.backgroundColor = '#538d4e';
                        cellStyle[i + (DenemeSayac*5)].style.backgroundColor = '#538d4e';
                        
                    } else { // else if (index  != i && countDogru >= countTahmin)
                        // console.log(letter, " harfi kelime içinde var ama yeri doğru değil. Kelime: ", DogruKelime); 
                        const cellStyle = document.querySelectorAll('.cell');
                        KlavyeHarfi.style.backgroundColor = '#dde632';
                        cellStyle[i + (DenemeSayac*5)].style.backgroundColor = '#dde632';

                    }
                } else {
                    // console.log(letter, " harfi kelimede yok. Kelime: ", DogruKelime);
                    const cellStyle = document.querySelectorAll('.cell');
                    KlavyeHarfi.style.backgroundColor = 'gray';
                    cellStyle[i + (DenemeSayac*5)].style.backgroundColor = 'gray';
                }
            }
            TabloyuDoldur();
            guessInput.value="";
        }
        DenemeSayac++;
    }

    else if (durum == 1){
      console.log("üçe girildi");
      TahminKutuBosalt();
      alert("Yarışmayı zaten kazandınız tekrar başlatmak için aşağıdaki tekrar oyna butonunu kullanınız.");
    }
    
    if (DenemeSayac == 6){  // toplam deneme hakları biterse alert veriyor.
      console.log("ikiye girildi");
      TabloyuDoldur();
      TahminKutuBosalt();
      let mesaj= ("Kaybettiniz!☹");
      let mesajElemani = document.getElementById("mesaj");
      mesajElemani.innerHTML = mesaj;
      mesajElemani.style.display="flex";
      let restartButtonElemani = document.getElementById("restart-button");
      restartButtonElemani.style.display="block";
      restartButtonElemani.className = "btn";
      restartButtonElemani.addEventListener('click', RestartButonu);
    }
}

document.querySelector('#check-button').addEventListener('click', ClickMe);

function KeyboardActivies() {
    const buttons = document.querySelectorAll(".keyboard-row button");
    const input = document.querySelector(".guess-control");
    
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.getAttribute("data-key");
        if (key === "enter") {
          ClickMe();
        } else if (key === "del") {
          // Burada inputtan son karakteri silmek için bir kod yazabilirsiniz.
          input.value = input.value.slice(0, -1);
        } else {
          if (input.value.length < 5) {
            // Butona basıldığında inputa key değerini ekleme
            input.value += key;
          }
        }
      });
    });
  }
  
  KeyboardActivies();
  
  