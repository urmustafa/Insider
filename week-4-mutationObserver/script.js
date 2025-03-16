//localStorage.clear();
//sessionStorage.clear();

let appendLocation = '#userContainer';

const style = document.createElement('style');
style.innerHTML = `
    body {
        font-family: Arial, sans-serif;
        margin: 20px;
        padding: 20px;
    }
    #userContainer {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 20px;
    }
    #userContainer div {
        background-color: #f9f9f9;
        padding: 10px 15px;
        border-radius: 8px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 200px;
    }
    button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
    }
    button:hover {
        background-color: #0056b3;
    }
    #reloadUsers {
        margin-top: 20px;
        display: block;
        padding: 10px 15px;
        font-size: 16px;
    }
`;
document.head.appendChild(style);


const container = document.createElement('div');
container.id = 'userContainer';
document.body.appendChild(container);

const reloadBtn = document.createElement('button');
reloadBtn.id = 'reloadUsers';
reloadBtn.style.display = 'none';
reloadBtn.innerText = 'Kullanıcıları Yeniden Yükle';
reloadBtn.onclick = reloadUsers;
document.body.appendChild(reloadBtn);


async function fetchUsers() {
    try {
       // console.log('Kullanıcılar APIden çekiliyor...');
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('API yanıtı başarısız...');
        }
        const users = await response.json();
        console.log('API\'den gelen kullanıcılar:', users);
        localStorage.setItem('users', JSON.stringify(users));
        renderUsers(users);
    } catch (error) {
        console.error('Veri çekme hatası:', error);
    }
}


function renderUsers(users) {
    //console.log('Kullanıcılar ekrana yazdırılıyor:', users);
    const container = document.querySelector(appendLocation);
    if (!container) {
        console.error('Hata yok');
        return;
    }
    container.innerHTML = '';
    if (users && users.length > 0) {
        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `<p>${user.name} <button onclick="deleteUser(${user.id})">Sil</button></p>`;
            container.appendChild(userDiv);
        });
    } else {
        container.innerHTML = '<p>Hiç bir kullanıcı bulunamadı...</p>';
    }
    checkUsers();
}


function deleteUser(id) {
   // console.log(`Kullanıcı siliniyor: ID ${id}`);
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const initialLength = users.length;
    users = users.filter(user => user.id !== id);
    localStorage.setItem('users', JSON.stringify(users));
    
    if (users.length < initialLength) {
        console.log(`Kullanıcı başarıyla silindi: ID ${id}`);
    } else {
        console.warn(`Silme işlemi başarısız: ID ${id} bulunamadı`);
    }

    renderUsers(users);
}


function checkUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];


    if (users.length === 0) {
        sessionStorage.removeItem('reloaded'); 
        reloadBtn.style.display = 'block';

        console.log('Tüm kullanıcılar silindi--- Yeniden yükleme butonu gösterildi.');
    } else {
        reloadBtn.style.display = 'none';
    }
}


function reloadUsers() {
    
    if (!sessionStorage.getItem('reloaded')) {
        sessionStorage.setItem('reloaded', 'true');
        //console.log('Kullanıcılar tekrar yükleniyor...');
        fetchUsers();
    } else {
        console.warn('Bu buton zaten bir kere kullanıldı, tekrar yüklenemez!');
    }
}

if (container) {
    const observer = new MutationObserver(checkUsers);
    observer.observe(container, { childList: true });
    
    //console.log('MutationObserver aktif');
}


window.addEventListener('storage', checkUsers);
console.log('LocalStorage değişiklikleri dinleniyor.');

if (!localStorage.getItem('users')) {
    //console.log('LocalStorage boş, vrilrt çrkiliyor');
    fetchUsers();
} else {
    //console.log('LocalStorageda kullanıcılar var, ekrana yazdırılıyor.');
    const users = JSON.parse(localStorage.getItem('users'));
    renderUsers(users);
}

//localStorage.clear();
//sessionStorage.clear();
