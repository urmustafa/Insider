const user = {
    name: prompt("Adınız nedir?"),
    age: Number(prompt("Yaşınız kaç?")),
    job: prompt("Mesleğiniz nedir?")
};

console.log("Kullanıcı Bilgileri:", user);

const cart = []; 

function addCart() {
    let productName = prompt("Ürün adı girin:");
    let productPrice = Number(prompt("Ürün fiyatını girin:"));

   
    const product = { name: productName, price: productPrice };
    cart.push(product);

    console.log("sepete eklendi.");
}

addCart();
addCart()
addCart();

console.log("Sepetiniz:", cart);

function calculate() {
    let total = cart.reduce((i, product) => i + product.price, 0);
    console.log(`Toplam Sepet Tutarı: ${total} TL`);
}

calculate();

/*
const cart = []; 


function addCart() {
    let pName = prompt("Ürün adı girin:");
    let pPrice = Number(prompt("Ürün fiyatını girin:"));


    const product = { name: pName, price: pPrice };
    cart.push(product);

    console.log(`${pName} sepete eklendi.`);
}


addCart();
addCart(); 

console.log("Sepetiniz:", cart);

function calculatePrice() {
    let toplam = cart.reduce((i, product) => i + product.price, 0);
    console.log(`Toplam Sepet Tutarı: ${toplam} TL`);
}

calculatePrice();
*/


function removeProductFromCart() {
    let productName = prompt("Silmek istediğiniz ürün");
   
    let item = cart.findIndex(product => product.name.toLowerCase() === productName.toLowerCase());

    if (item !== -1) {
        cart.splice(item, 1);
        console.log(`${productName} sepetten çıkarıldı.`);
    } else {
        console.log(`${productName} sepetinizde bulunamadı.`);
    }

    console.log(cart);
}

removeProductFromCart();



// ***************************      En Uzun Collatz Dizisi     ***************************

function collatz(n) {
    let count = 1; 
    while (n !== 1) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        count++;
    }
    return count;
}
console.log(collatz(100));