document.addEventListener("DOMContentLoaded", () => {
    const baslatButonu = document.getElementById("startBtn");
    const sifirlaButonu = document.getElementById("resetBtn");
    const zamanGirdisi = document.getElementById("timeInput");
    const geriSayimEkrani = document.getElementById("countdownDisplay");

    let geriSayim;
    let kalanZaman;

    baslatButonu.addEventListener("click", () => {
        kalanZaman = parseInt(zamanGirdisi.value);
          console.log("Başlangıç çalıştı ", kalanZaman);



        if (isNaN(kalanZaman) || kalanZaman <= 0) {

            alert("Geçerli bir süre girin, lütfen!");
            console.log("sayı girilmedi");

            return;
           }

        geriSayimEkrani.textContent = kalanZaman;

        console.log("Geri sayım: ", kalanZaman);

        geriSayim = setInterval(() => {

            kalanZaman--;
            geriSayimEkrani.textContent = kalanZaman;
                 console.log("zaman", kalanZaman);



            if (kalanZaman <= 0) {
                clearInterval(geriSayim);
                geriSayimEkrani.textContent = "Süre doldu!";

                console.log("süre bitişi çalışıyor");



            }
        }, 1000);
    });

    sifirlaButonu.addEventListener("click", () => {

        clearInterval(geriSayim);
        geriSayimEkrani.textContent = "0";


        console.log("Sayaç sıfırlandı");

    });
});
