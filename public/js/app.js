// Esperamos hasta que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const skills = document.querySelector('.list-skills')

  if (skills) {
    skills.addEventListener('click', addSkills)
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
