
//console.log("çalıştı");


document.body.style.backgroundColor = "#498"; 
document.body.style.fontFamily = "Arial, sans-serif";


function kullanicilariGetir() {
    let kayitliVeri = localStorage.getItem("kullanicilar"); 
    let veriZamani = localStorage.getItem("veriZamani");

    if (kayitliVeri && veriZamani) {
        let suan = new Date().getTime(); 
        let kayitZamani = parseInt(veriZamani); 

        


        if (suan - kayitZamani > 24 * 60 * 60 * 1000) {
            localStorage.removeItem("kullanicilar"); 
            localStorage.removeItem("veriZamani"); 

            //console.log("Veri süresi dolmuş....");
        } else {
            console.log("Veri localStoragedan çekildi");

            ekranaYaz(JSON.parse(kayitliVeri));
            return;
        }
    }

    
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(cevap => {
            if (!cevap.ok) {
                throw new Error("Veri çekilemedi");
            }
            return cevap.json(); 

        })
        .then(veri => {
            localStorage.setItem("kullanicilar", JSON.stringify(veri)); 
            localStorage.setItem("veriZamani", new Date().getTime());

            console.log("Veri çekilip localStorage'a kaydedildi...");

            ekranaYaz(veri); 
        })
        .catch(hata => {
            console.error("Bir hata var: ", hata); 

            document.getElementById("ins-api-users").innerHTML = "<p style='color:red;'>! ! ! Kullanıcı verisi alınamadı ! ! !</p>"; // Hata mesajını ekrana yazdırıyoruz
        });
}


function ekranaYaz(liste) {
    let alan = document.getElementById("ins-api-users");
    alan.innerHTML = ""; 

    alan.style.display = "flex";
    alan.style.flexWrap = "wrap";
    alan.style.gap = "10px";

    
    liste.forEach(kullanici => {
        let eleman = document.createElement("div");

        


        Object.assign(eleman.style, {
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "#fefefe",
            boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
            width: "200px",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
        });

        

        let silButon = document.createElement("button");
        silButon.textContent = "Sil";

        
        Object.assign(silButon.style, {
            marginTop: "10px",
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
        });



        silButon.onclick = function () {
            console.log("silme butonuna tıkalndı kullanıcı si fonks. çalıştılıyor...");
            kullaniciyiSil(kullanici.id);


        };

    
        eleman.innerHTML = `
            <p><strong>${kullanici.name}</strong></p>
            <p>${kullanici.email}</p>
            <p>${kullanici.address.street}, ${kullanici.address.city}</p>
        `;

 
        
        eleman.appendChild(silButon);


        alan.appendChild(eleman);
    });
}


function kullaniciyiSil(id) {
    let kayitliVeri = JSON.parse(localStorage.getItem("kullanicilar")) || [];
    let yeniVeri = kayitliVeri.filter(k => k.id !== id); 


    console.log(`!!! id'si ${id} olan kullanıcı silindi... !!!`);
    
    localStorage.setItem("kullanicilar", JSON.stringify(yeniVeri)); 
    ekranaYaz(yeniVeri); 

    //kullanicilariGetir()

}



//localStorage.removeItem("kullanicilar");
//localStorage.removeItem("veriZamani");
kullanicilariGetir();
