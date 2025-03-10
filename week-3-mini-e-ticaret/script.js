$(document).ready(function () {
    const apiURL = "https://fakestoreapi.com/products";

   // console.log("çalıştı");

    $.getJSON(apiURL)
        .done(function (data) {
            let productsHTML = "";

                 console.log("veri çekildi....");

            data.forEach(product => {
                productsHTML += `

                    <div class="product-card" 
                        data-id="${product.id}" 

                        data-title="${product.title}" 
                        data-price="${product.price}" 
                        data-image="${product.image}" 
                        data-description="${product.description}">
                        
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>${product.price} $</p>
                        <button class="view-details">Detay</button>
                        <button class="add-to-cart">Sepete Ekle</button>
                    </div>

                `;
            });

            $(".products-container").html(productsHTML);

            console.log("ekran kontol et ürünler geldi");
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
           // console.log("Hata durumu (error)");

            alert("Ürünleri çekerken bir hata oluştu: ");
        });

    $(document).on("click", ".view-details", function () {

        let productCard = $(this).closest(".product-card");
        let productTitle = productCard.data("title");
        let productPrice = productCard.data("price");
        let productImage = productCard.data("image");
        let productDescription = productCard.data("description");

        console.log("detaylar: ", productTitle);

        $("#modal-title").text(productTitle);
        $("#modal-price").text(`${productPrice} $`);
        $("#modal-image").attr("src", productImage);
         $("#modal-description").text(productDescription);

        $("#product-modal").fadeIn().addClass("show");

        console.log("Modal açıldı");
    });

    $(".close-modal").click(function () {
        console.log("Modal kapatıldı.");

        $("#product-modal").fadeOut().removeClass("show");
    });

    $("#modal-add-to-cart").click(function () {

        let productTitle = $("#modal-title").text();
        let productPrice = parseFloat($("#modal-price").text());
        let productImage = $("#modal-image").attr("src");

        let cartItem = `
            <div class="cart-item" data-price="${productPrice}">

                <img src="${productImage}" alt="${productTitle}">
                <h4>${productTitle}</h4>
                <p>${productPrice} $</p>

                <button class="remove-from-cart">Kaldır</button>
            </div>
        `;

        console.log("Sepete ürün eklendi:", productTitle);

        $("#cart-menu .cart-items").append(cartItem);
        saveCartToLocalStorage();
        updatecartToplam();
        updatesepetSayisi();
        $("#product-modal").fadeOut().removeClass("show");
    });

    $(document).on("click", ".add-to-cart", function () {
        let productCard = $(this).closest(".product-card");

        let productTitle = productCard.data("title");
        let productPrice = parseFloat(productCard.data("price"));
        let productImage = productCard.data("image");

        let cartItem = `
            <div class="cart-item" data-price="${productPrice}">
                <img src="${productImage}" alt="${productTitle}">
                <h4>${productTitle}</h4>
                <p>${productPrice} $</p>
                <button class="remove-from-cart">Kaldır</button>
            </div>
        `;

        console.log("Sepete ürün eklenidi", productTitle);

        $("#cart-menu .cart-items").append(cartItem);
        $(".cart-item:last-child").hide().fadeIn(500);
        saveCartToLocalStorage();
        updatecartToplam();
        updatesepetSayisi();
    });

    $("#view-cart").click(function () {

        console.log("Sepeti göster");
        $("#cart-menu").toggleClass("show");
    });

    $("#clear-cart").click(function () {

        console.log("Sepeti temzle");

        $("#cart-menu .cart-items").empty();
        saveCartToLocalStorage();
        updatecartToplam();
        updatesepetSayisi();

    });

    $(document).on("click", ".remove-from-cart", function () {
        let cartItem = $(this).closest(".cart-item");
       // console.log("Sepetten kaldır);
        
        cartItem.fadeOut(300, function () {
            $(this).remove();
            saveCartToLocalStorage();
            updatecartToplam();
            updatesepetSayisi();
        });
    });

    function updatecartToplam() {
        let total = 0;
        $(".cart-item").each(function () {
            total += parseFloat($(this).data("price"));
        });
        $("#cart-total").text("Toplam: " + total.toFixed(2) + " $");
        console.log("Sepet toplamı güncellendi:", total.toFixed(2));
    }

    function updatesepetSayisi() {
        let sayac = $(".cart-item").length;
        $("#cart-count").text(sayac);
        console.log("Sepet sayısı", sayac);
    }

    function saveCartToLocalStorage() {
        let cartItems = [];
        $(".cart-item").each(function () {
            cartItems.push({
                title: $(this).find("h4").text(),
                price: $(this).data("price"),
                image: $(this).find("img").attr("src")
            });
        });
        localStorage.setItem("cart", JSON.stringify(cartItems));
        console.log("Sepet locale pushlandı");



    }




    function loadCartFromLocalStorage() {
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        cartItems.forEach(function (item) {
            let cartItem = `
                <div class="cart-item" data-price="${item.price}">
                    <img src="${item.image}" alt="${item.title}">
                    <h4>${item.title}</h4>
                    <p>${item.price} $</p>
                    <button class="remove-from-cart">Kaldır</button>
                </div>
            `;
            $("#cart-menu .cart-items").append(cartItem);
        });

        updatecartToplam();
        updatesepetSayisi();

        //   console.log("localden çekilecek");
    }

    loadCartFromLocalStorage();

    $("#searchInput").on("input", function () {
        let searchQuery = $(this).val().toLowerCase();

        console.log("arama yapılıyor");

        $(".product-card").each(function () {
            let title = $(this).data("title").toLowerCase();

            if (title.includes(searchQuery)) {
                $(this).show();

                console.log("bulıundu", title);
            } else {
                $(this).hide();
                console.log("gizlendi", title);
            }
        });
    });
});
