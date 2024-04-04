const apiKey = 'RgWKDzjzWekGGPOn1ZJ16zDmtKr3QD0Vmq8QEl0IUX0';

// функция получения данных
async function getRandomPhoto () {
try {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${apiKey}`);
    const photo = await response.json();
    return photo;
} catch (error) {
    console.log("Сбой при загрузке фотографии:", error);
    return [];
}}

// функция отрисовки 
async function renderPhoto () {
    const photo = await getRandomPhoto();
    if (photo) {
        // добавляем фото
        const imageBlock = document.querySelector('.image-block');
        const img = document.createElement("img");
        img.src = photo.urls.small;
        img.alt = photo.alt_description;
        img.classList.add('post-img');
        imageBlock.appendChild(img);
        // добавляем имя фотографа
        const authorName = document.querySelector('.author-name');
        authorName.innerHTML = photo.user.name;
        // добавим количество лайков
        const likeCounter = document.querySelector('.like-counter');
        likeCounter.innerHTML = photo.likes;
    }
}

// 
const likeBtn = document.querySelector("i");
likeBtn.addEventListener("click", () => {
    if (likeBtn.classList.contains("active")) {
        likeBtn.classList.remove("active");
        decreaseCounter();
    } else {
        likeBtn.classList.add("active");
        increaseCounter();
    }
});

  // функция увеличения счетчика лайков
function increaseCounter() {
    const likeCounter = document.querySelector('.like-counter');
    const currentCounter = parseInt(likeCounter.textContent);
    likeCounter.textContent = currentCounter + 1;
}

// функция уменьшения счетчика лайков
function decreaseCounter() {
    const likeCounter = document.querySelector('.like-counter');
    const currentCounter = parseInt(likeCounter.textContent);
    likeCounter.textContent = currentCounter - 1;
}

window.addEventListener('load', renderPhoto());