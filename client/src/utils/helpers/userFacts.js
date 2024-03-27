export const pickOneUserFact = (city, studyPlace, birthPlace) => {
  if (city) {
    return 'Lives in ' + city
  } else if (studyPlace) {
    return 'Studies at ' + studyPlace
  } else if (birthPlace) {
    return 'Born in ' + birthPlace
  } else {
    return ''
  }
}
