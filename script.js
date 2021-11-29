let randonId = Math.floor(Math.random() * (9999 - 1000))
const inputTeacher = document.querySelector('#inputTeacher')
const inputTitle = document.querySelector('#inputTitle')
const inputDescription = document.querySelector('#inputDescription')
const inputTitleClasses = document.querySelector('#inputTitleClasses')

let db = [
  {
    id: randonId + 1,
    title: 'Desmistificando os juros',
    descricao:
      'Quando acontece um empréstimo de dinheiro, eles estão lá. Entenda como os juros simples e os juros compostos podem multiplicar o seu capital – ou acelerar seu endividamento.',
    img: '2',
    teacher: 'Roberto Fooper',
    classes_list: [
      {
        id: 1,
        title: 'Abertura',
        link: 'www.google.com.br'
      },
      {
        id: 2,
        title: 'Aula 1',
        link: 'www.google.com.br'
      },
      {
        id: 1,
        title: 'Aula 2',
        link: 'www.google.com.br'
      }
    ]
  },
  {
    id: randonId + 2,
    title: 'Primeiros passos em investimentos',
    descricao:
      'Entenda conceitos financeiros básicos e essenciais para começar a investir. Sinta-se seguro para começar a investir no mercado financeiro.',
    img: '3',
    teacher: 'Luiz Apolinario',
    classes_list: [
      {
        id: 1,
        title: 'Abertura',
        link: 'www.google.com.br'
      },
      {
        id: 2,
        title: 'Aula 1',
        link: 'www.google.com.br'
      },
      {
        id: 1,
        title: 'Aula 2',
        link: 'www.google.com.br'
      }
    ]
  }
]
let dbFull = JSON.parse(localStorage.getItem('db'))
console.log(dbFull)

function randonIds(number) {
  return number * 10
}

const form = document.getElementById('criarCurso')
form.addEventListener('submit', e => {
  dataInput = {
    id: randonId,
    title: inputTitle.value,
    descricao: inputDescription.value,
    img: Math.floor(Math.random() * (4 - 1)),
    teacher: inputTeacher.value,
    classes_list: [
      {
        id: 1,
        title: inputTitleClasses.value,
        link: 'www.google.com.br'
      }
    ]
  }

  const db = JSON.parse(localStorage.getItem('db'))
  db.push(dataInput)
  localStorage.setItem('db', JSON.stringify(db))
})

function start() {
  if (localStorage.getItem('db') === null) {
    localStorage.setItem('db', JSON.stringify(db))
    start()
  } else {
    loadInfo()
  }
}

function loadInfo() {
  dbFull = JSON.parse(localStorage.getItem('db'))
  console.log(dbFull)
  const containerCards = document.querySelector('#container-cards')
  containerCards.innerHTML = ''
  const div = document.createElement('div')
  div.classList.add('col-md-4')
  dbFull.forEach(item => {
    const div = document.createElement('div')
    div.classList.add('col-md-4')
    container = containerCards.appendChild(div)
    container.innerHTML = `
      <div class="card">
        <img src="./img/${item.img}.jpg" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">
            ${item.descricao}
          </p>
          <small class="text-muted">#${item.id}</small>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Professor: ${item.teacher}</li>
        </ul>
        <div class="card-body">
          <div class="dropdown" style="position: relative">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              AULAS
            </button> 
            <button type="button" class="btn btn-primary float-end" data-toggle="modal" data-target="#modalAddCourse" 
            onclick="atualizarCurso(${item.id})">
              <i class="fa fa-edit"></i>
            </button>
            <button type="button" class="btn btn-danger float-end" onclick="deletarCurso(${
              item.id
            })">
              <i class="fa fa-trash"></i>
            </button>
            <div
              class="dropdown-menu"
              aria-labelledby="dropdownMenuButton"
            >
            ${item.classes_list.map(item => {
              return `<a class="dropdown-item" href="#">${item.title}</a>`
            })}
            </div>
          </div>
        </div>
      </div>
    `
  })
}

function deletarCurso(id) {
  let deleteConfir = confirm('Deseja excluir o curso?')
  if (deleteConfir) {
    const db = JSON.parse(localStorage.getItem('db'))
    for (let i = 0; i < db.length; i++) {
      if (db[i].id == id) {
        db.splice(i, 1)
        localStorage.setItem('db', JSON.stringify(db))
      }
    }
    loadInfo()
  }
}

function atualizarCurso(id) {
  const form = {
    teacher: document.querySelector('#inputTeacher'),
    title: document.querySelector('#inputTitle'),
    descripton: document.querySelector('#inputDescription')
  }
  const db = JSON.parse(localStorage.getItem('db'))
  for (let i = 0; i < db.length; i++) {
    if (db[i].id == id) {
      form.teacher.value = `${db[i].teacher}`
      form.title.value = `${db[i].title}`
      form.descripton.innerHTML = `${db[i].descricao}`
    }
  }

  localStorage.setItem('db', JSON.stringify(db))
}

document.onload(start())
