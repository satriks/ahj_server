import FormImage from './Images/Image'

export default class ImageControl {
  constructor () {
    this.form = document.querySelector('.image-form')
    this.inputName = document.querySelector('.image-form__name input')
    this.inputUrl = document.querySelector('.image-form__url input')
    this.imagePlace = document.querySelector('.images')
    this.fileArea = document.querySelector('.image-form')
    this.inputFile = document.querySelector('.input-file')
    this.addButton = document.querySelector('.addImage')

    this.form.addEventListener('submit', this.onSubmit)
    this.imagePlace.addEventListener('click', this.onClose)
    this.fileArea.addEventListener('click', this.onClick)
    this.inputFile.addEventListener('change', this.onFile)
    this.fileArea.addEventListener('dragover', (event) => { event.preventDefault() })
    this.fileArea.addEventListener('drop', this.onDrop)
  }

  onSubmit = (event) => {
    event.preventDefault()

    const image = new FormImage(this.inputUrl.value)
    image.img.addEventListener('error', this.errorImage)

    this.imagePlace.insertAdjacentElement('beforeend', image.url)
    this.form.reset()
  }

  errorImage = (event) => {
    document.querySelector('.error-url').classList.remove('hidden')
    setTimeout(() => {
      document.querySelector('.error-url').classList.add('hidden')
    }, 2000)
    event.target.closest('.image-wrapper').remove()
  }

  onClose = (event) => {
    if (event.target.classList.contains('close')) {
      event.target.closest('.image-wrapper').remove()
    }
  }

  onClick = (event) => {
    this.inputFile.dispatchEvent(new MouseEvent('click'))
  }

  onFile = (event) => {
    const file = this.inputFile.files && this.inputFile.files[0]
    const url = URL.createObjectURL(file)
    this.inputUrl.value = url
    this.addButton.dispatchEvent(new MouseEvent('click'))
    setTimeout(() => { URL.revokeObjectURL(url) }, 1000)
  }

  onDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files && event.dataTransfer.files[0]
    const url = URL.createObjectURL(file)
    this.inputUrl.value = url
    this.addButton.dispatchEvent(new MouseEvent('click'))
    setTimeout(() => { URL.revokeObjectURL(url) }, 1000)
  }
}
