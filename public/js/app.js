import axios from 'axios'
import Swal from 'sweetalert2'

// Esperamos hasta que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const skills = document.querySelector('.list-skills')

  // clean alerts
  let alerts = document.querySelector('.alerts')

  if (alerts) {
    cleanAlerts()
  }

  if (skills) {
    skills.addEventListener('click', addSkills)

    //if is edit
    selectedSkills()
  }

  const vacancyList = document.querySelector('.administration-panel')

  if (vacancyList) {
    vacancyList.addEventListener('click', actionsList)
  }
})

const skills = new Set()

const addSkills = e => {
  if (e.target.tagName === 'LI') {
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active')
      skills.delete(e.target.textContent)
    } else {
      e.target.classList.add('active')
      skills.add(e.target.textContent)
    }
  }

  const skillsArray = [...skills]
  document.querySelector('#skills').value = skillsArray
}

const selectedSkills = () => {
  const selected = Array.from(document.querySelectorAll('.list-skills .active'))

  selected.forEach(skill => {
    skills.add(skill.textContent)
  })

  // Inject in hidden
  const skillsArray = [...skills]
  document.querySelector('#skills').value = skillsArray
}

const cleanAlerts = () => {
  const alerts = document.querySelector('.alerts')

  const interval = setInterval(() => {
    if (alerts.children.length > 0) {
      alerts.removeChild(alerts.children[0])
    } else if (alerts.children.length === 0) {
      alerts.parentElement.removeChild(alerts)

      // delete interval
      clearInterval(interval)
    }
  }, 2000)
}

// Delete vacancies
const actionsList = e => {
  e.preventDefault()

  if (e.target.dataset.delete) {
    // delete
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      const url = `${location.origin}/vacancies/delete/${e.target.dataset.delete}`

      axios
        .delete(url, { params: { url } })
        .then(function (response) {
          if (response.status === 200) {
            Swal.fire('Deleted!', response.data, 'success')
          }
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        })
    })
  }
  // check if the click comes from a link
  else if (e.target.tagName === 'A') {
    location.href = e.target.href
  }
}
