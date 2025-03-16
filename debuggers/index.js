const products = [
    { id: 1, name: 'Laptop', price: 15000, stock: 5 },
    { id: 2, name: 'Telefon', price: 8000, stock: 10 },
    { id: 3, name: 'Tablet', price: 5000, stock: 8 },
    { id: 4, name: 'Kulaklık', price: 1000, stock: 15 },
    { id: 5, name: 'Mouse', price: 500, stock: 20 }
];

class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.discountApplied = false;
       // console.log("ShoppingCart oluşturuldu:", this);
    }

    addItem(productId, quantity = 1) {
        try {
            debugger;
           // console.log(`Ürün ekleniyor: ID=${productId}, Miktar=${quantity}`);
            
            const product = products.find(p => p.id === productId);
            if (!product) {
                throw new Error('Ürün yok');
            }

            if (product.stock < quantity) {
                throw new Error('Yetersiz stok!');
            }

            const existingItem = this.items.find(item => item.productId === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.items.push({
                    productId,
                    name: product.name,
                    price: product.price,
                    quantity
                });
            }

            //console.log("Sepet güncellendi:", this.items);
            this.calculateTotal();
            this.updateUI();

        } catch (error) {
            
            this.showError(error.message);
        }
    }

    removeItem(productId) {
        try {
            debugger;
            //console.log(`Ürün siliniyor: ID=${productId}`);
            
            const itemIndex = this.items.findIndex(item => item.productId === productId);
            if (itemIndex === -1) {
                throw new Error('Ürün sepette bulunamadı');
            }

            const item = this.items[itemIndex];
            const product = products.find(p => p.id === productId);

            if (product) {
                product.stock += item.quantity; 
            }

            this.items.splice(itemIndex, 1);
            
            this.calculateTotal();
            this.updateUI();

        } catch (error) {
            //console.error("Ürün silme hatası:", error);
            this.showError(error.message);
        }
    }

    calculateTotal() {
        debugger;
        console.log("Toplam hesaplanıyor");
        
        this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        if (this.discountApplied && this.total > 0) {
            this.total *= 0.9;
            
        }

       // console.log("Güncellenmiş toplam:", this.total);
    }

    applyDiscount(code) {
        debugger;
        
        
        if (code === 'INDIRIM10' && !this.discountApplied) {
            this.discountApplied = true;
            this.calculateTotal();
            this.updateUI();
            this.showMessage('🎉 İndirim uygulandı!');
        } else {
            
            this.showError('Geçersiz indirim kodu!');
        }
    }

    updateUI() {
        debugger;
        console.log("güncelleniyor");
        
        const cartElement = document.getElementById('cart');
        const totalElement = document.getElementById('total');
        
        if (cartElement && totalElement) {
            cartElement.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>${item.quantity} adet</span>
                    <span>${item.price} TL</span>
                    <button onclick="cart.removeItem(${item.productId})">Sil</button>
                </div>
            `).join('');

            totalElement.textContent = `Toplam: ${this.total} TL`;
        }
    }

    showError(message) {
        debugger;
        
        
        const errorElement = document.getElementById('error');
        if (errorElement) {
            errorElement.textContent += message + '\n';
        }
    }

    showMessage(message) {
        console.log("Kullanıcıya mesaj göster:", message);
        
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = message;
            setTimeout(() => {
                messageElement.textContent = '';
            }, 3000);
        }
    }
}

class App {
    constructor() {
        debugger;
        //console.log("Uygulama çalıştı");
        
        window.cart = new ShoppingCart();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            debugger;
            //console.log("Sayfa yüklendi");
            
            this.renderProducts();
            this.setupEventHandlers();
        });
    }

    renderProducts() {
        debugger;
        
        
        const productsElement = document.getElementById('products');
        if (productsElement) {
            productsElement.innerHTML = products.map(product => `
                <div class="product-card">
                    <h3>${product.name}</h3>
                    <p>Fiyat: ${product.price}.00 TL</p>
                    <p>Stok: ${product.stock}</p>
                    <button onclick="app.addToCart(${product.id})"
                            ${product.stock === 0 ? 'disabled' : ''}>
                        Sepete Ekle
                    </button>
                </div>
            `).join('');
        }
    }

    setupEventHandlers() {
        const discountForm = document.getElementById('discount-form');
        if (discountForm) {
            discountForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const codeInput = document.getElementById('discount-code');
                if (codeInput) {
                    window.cart.applyDiscount(codeInput.value);
                }
            });
        }

        document.addEventListener('stockUpdate', () => {
            this.renderProducts();
        });
    }

    addToCart(productId) {
        debugger;
        console.log(`Sepete eklenene ID=${productId}`);
        
        window.cart.addItem(productId);
        document.dispatchEvent(new Event('stockUpdate'));
    }
}

const app = new App();
window.app = app;



/* 
________   DEĞİŞİKLİKLER   _________________  

<= yerine < kullanıldı	Stok kontrolü stokta ürün olsa bile izin vermeyebilirdi.

Ürün silindiğinde stok yanlış güncelleniyordu.	Ürün silindiğinde stok güncellenmesi sağlandı. product.stock += item.quantity

price tek başına toplanıyor, quantity çarpımı unutulmuş. price * quantity çarparak düzeltildi.

this.total *= 0.1 ile çarpılıyor toplamı %10’a düşürüyor. Düzeltme: this.total *= 0.9; yapılarak %10 indirim uygulandı.

Kullanıcı stok bitene kadar ekleyebiliyor product.stock -= quantity; eklenerek stok azaltıldı.






*/



