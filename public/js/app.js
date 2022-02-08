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
