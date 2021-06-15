import pictures from './gallery-data'

const galleryBox = document.querySelector('.js-gallery')
const modalBox = document.querySelector('.js-lightbox')
const modalImage = document.querySelector('.lightbox__image')

// Создаем разметку

const createImg = pictures.map(({preview, original,description}, index) => {
  return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${preview}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      data-index="${index}"
    />
  </a>
</li>`

}).join("")

galleryBox.innerHTML = createImg


// Открытие модалки по клику

galleryBox.addEventListener('click', onImageClik)

function onImageClik(evt) {
  evt.preventDefault()

const galleryImg = evt.target.classList.contains('gallery__image')
  if (!galleryImg) {
 return
  }
  
  modalBox.classList.add("is-open")
  

  // Получаем и устанавливаем атрибуты для полной каринки 
  const imgURL = evt.target.dataset.source
  const imgAlt = evt.target.getAttribute('alt')
  const imgIndex = evt.target.dataset.index
 
  setAtributes (imgURL, imgAlt, imgIndex)
 

  // Закрытие модалки по нажатию эскейп
    window.addEventListener("keydown", (evt) => {
    if (evt.code === 'Escape') {
     modalBox.classList.remove("is-open")
   }
  })

// Смена картинки по нажатию стрелок на клавиатуре
  window.addEventListener("keydown", imageChange) 
     
  
    }


// Закрытие модалки
modalBox.addEventListener('click', closeModal)

function closeModal(evt) {

  const modalImg = evt.target.classList.contains('lightbox__image')
  if (modalImg) {
    return
  }

  // Снятие слушателей событий по кнопкам
   window.removeEventListener("keydown", (evt) => {
    if (evt.code === 'Escape') {
     modalBox.classList.remove("is-open")
   }
  })

    window.removeEventListener("keydown", imageChange) 

  modalBox.classList.remove("is-open")


modalImage.setAttribute("src", " " )
modalImage.setAttribute("alt", " ")



}

// Смена картинок
function imageChange (evt) {
       
  const currentImg = document.querySelector('.lightbox__image')
  const currentImgIndex = currentImg.dataset.index

  if (evt.code === 'ArrowRight') {
      
    if (currentImgIndex < pictures.length - 1) {
      const nextImgIndex = Number(currentImgIndex) + 1
      const nextImg = document.querySelector(`.gallery__image[data-index="${nextImgIndex}"]`)
      const nextImgUrl = nextImg.dataset.source
      const nextImgAlt = nextImg.getAttribute("alt")

     setAtributes (nextImgUrl, nextImgAlt, nextImgIndex)
    }
  }
    
  if (evt.code === 'ArrowLeft') {

    if (currentImgIndex > 0) {
      const prevImgIndex = Number(currentImgIndex) - 1

      const prevImg = document.querySelector(`.gallery__image[data-index="${prevImgIndex}"]`)
      const prevImgUrl = prevImg.dataset.source
      const prevImgAlt = prevImg.getAttribute("alt")

    setAtributes(prevImgUrl, prevImgAlt, prevImgIndex)
    }
  }
}


function setAtributes(imgURL, imgAlt, imgIndex) {
      
   modalImage.setAttribute("src", `${imgURL}` )
  modalImage.setAttribute("alt", `${imgAlt}`)
  modalImage.setAttribute("data-index", `${imgIndex}`)
    }