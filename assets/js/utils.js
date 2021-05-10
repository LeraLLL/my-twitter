export const getInitialsName = (name) => {
  return Array.prototype.map.call(name.split(' '), x => x.substring(0, 1).toUpperCase()).join('') || ''
}

export const textGenerator = () => {
  const words1 = ['Товарищи,', 'С другой стороны', 'Равным образом', 'Не следует, однако, забывать, что',
    'Таким образом', 'Повседневная практика показывает, что',
    'Уважаемые коллеги!', 'Позвольте Вам напомнить, что', 'Также как', 'В целом, конечно,']
  const words2 = ['реализация намеченных плановых заданий', 'рамки и место обучения кадров', 'постоянный количественный рост и сфера нашей активности',
    'сложившаяся структура организации', 'новая модель организационной деятельности', 'дальнейшее развитие различных форм деятельности',
    'перспективное планирование', 'оптимизация основных целей', 'экономическая повестка сегоднящнего дня', 'внедрение современных подходов']
  const words3 = ['играет важную роль в формировании', 'требуют от нас анализа', 'требуют определения и уточнения',
    'требуют определения и уточнения', 'обеспечивает широкому кругу (специалистов) участие в формировании',
    'позволяет выполнить важные задания по разработке', 'не дает нам иного выбора, кроме определения', 'вынуждает нас объективно потребовать',
    'играет определяющее значение для', 'выявляет срочную потребность']
  const words4 = ['существенных финансовых и административных условий', 'дальнейших направлений развития',
    'системы массового участия', 'позиций, занимаемых участниками в отношении поставленных задач',
    'новых предложений', 'направлений прогрессивного развития', 'стандартных подходов',
    'нестандартных решений', 'экономических и неэкономических факторов и перспектив', 'инновационных методов управления процессами']

  const rand1 = Math.floor(Math.random() * words1.length)
  const rand2 = Math.floor(Math.random() * words2.length)
  const rand3 = Math.floor(Math.random() * words3.length)
  const rand4 = Math.floor(Math.random() * words4.length)
  return words1[rand1] + ' ' + words2[rand2] +
    ' ' + words3[rand3] + ' ' + words4[rand4] + '!'
}

export const idGenerator = () => {
  const max = 999999999999
  const min = 1
  return Math.floor(Math.random() * (max - min + 1)) + min
}
