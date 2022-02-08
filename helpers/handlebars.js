module.exports = {
  selectSkills: (selected = [], options) => {
    const skills = [
      'HTML5',
      'CSS3',
      'CSSGrid',
      'Flexbox',
      'JavaScript',
      'jQuery',
      'Node',
      'Angular',
      'VueJS',
      'ReactJS',
      'React Hooks',
      'Redux',
      'Apollo',
      'GraphQL',
      'TypeScript',
      'PHP',
      'Laravel',
      'Symfony',
      'Python',
      'Django',
      'ORM',
      'Sequelize',
      'Mongoose',
      'SQL',
      'MVC',
      'SASS',
      'WordPress'
    ]

    let html = ''
    skills.forEach(skill => {
      html += `
        <li ${selected.includes(skill) && 'class="active"'}>${skill}</li>
      `
    })

    return (options.fn().html = html)
  },

  typeContract: (selected = [], options) => {
    return options
      .fn(this)
      .replace(new RegExp(`value="${selected}"`), '$& selected="selected"')
  },

  showAlert: (errors = {}, alerts) => {
    const categories = Object.keys(errors)

    let html = ''
    if (categories.length) {
      errors[categories].forEach(error => {
        html += `
          <div class="${categories} alert">
            ${error}
          </div>
        `
      })
    }

    return (alerts.fn().html = html)
  }
}
