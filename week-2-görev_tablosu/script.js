document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("taskForm");
    const liste = document.getElementById("taskList");
    const filtreBtn = document.getElementById("filter");
    const siraliBtn = document.getElementById("sort");


    let sadeceTamamlanan = false;
    let gorevler = [];

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        try {

            const baslik = document.getElementById("taskTitle").value.trim();
            const aciklama = document.getElementById("taskDesc").value.trim();
            const oncelikler = document.getElementsByName("priority");


            
            let secilenOncelik = null;
            for (let i = 0; i < oncelikler.length; i++) {
                if (oncelikler[i].checked) {
                    secilenOncelik = oncelikler[i].value;
                    break; 


                }
            }

            if (!baslik) {
                alert("Görev başlığı boş olamaz");
                return;
            }
            if (!aciklama) {
                alert("Görev açıklaması boş olamaz");
                return;
            }
            if (!secilenOncelik) {
                alert("Lütfen bir öncelik seçin");
                return;
            }



            let gorevObj = {
                baslik: baslik,
                aciklama: aciklama,
                oncelik: secilenOncelik,
                tamamlandi: false
            };

                    console.log("Yeni görev ekleniyor:", gorevObj);

            gorevler.push(gorevObj);
            gorevleriGoster();
            form.reset();
        } catch (error) {
            console.error("Bir hata oluştu:", error);
                alert(error.message);
        }
    });

    function gorevleriGoster() {
        liste.innerHTML = "";
        gorevler.forEach((gorev, index) => {
              if (sadeceTamamlanan && !gorev.tamamlandi) return;

            const gorevDiv = document.createElement("div");
            gorevDiv.classList.add("task");
            if (gorev.tamamlandi) gorevDiv.classList.add("completed");

            gorevDiv.innerHTML = 
            `
                <div>
                    <strong>${gorev.baslik}</strong> - ${gorev.aciklama} (${gorev.oncelik})
                </div>
                <button class="complete-btn" data-index="${index}">Tamamlandı</button>
                <button class="delete-btn" data-index="${index}">Sil</button>
            `
            ;

            liste.appendChild(gorevDiv);
        });
    }

    liste.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.dataset.index;
                console.log(`Görev siliniyor: ${gorevler[index].baslik}`);
              gorevler.splice(index, 1);
              gorevleriGoster();


        }
        if (event.target.classList.contains("complete-btn")) {
            const index = event.target.dataset.index;
            gorevler[index].tamamlandi = !gorevler[index].tamamlandi;
            gorevleriGoster();


        }
    });

    filtreBtn.addEventListener("click", () => {

        sadeceTamamlanan = !sadeceTamamlanan;
        filtreBtn.textContent = sadeceTamamlanan ? "Tümünü Göster" : "Sadece Tamamlananları Göster";
        console.log(`Filtre değişti: ${sadeceTamamlanan}`);
        gorevleriGoster();


    });

    siraliBtn.addEventListener("click", () => {
        const oncelikSirasi = { "Düşük": 1, "Orta": 2, "Yüksek": 3 };
        gorevler.sort((a, b) => oncelikSirasi[a.oncelik] - oncelikSirasi[b.oncelik]);
          console.log("Görevler sıralandı.");
          gorevleriGoster();
    });
});



















