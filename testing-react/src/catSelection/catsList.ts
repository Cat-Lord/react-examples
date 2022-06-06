import { Cat } from "./CatSelector"

const cats: Cat[] = [
  {
    name: 'Eddie',
    dateOfBirth: new Date("2018-12-17T03:24:00"),
    dateOfDeath: new Date("2019-12-17T03:24:00"),
    selected: false
  },
  {
    name: 'Engel',
    dateOfBirth: new Date("2018-12-17T03:24:00"),
    selected: false
  },
  {
    name: 'Berry',
    dateOfBirth: new Date("2017-12-17T03:24:00"),
    dateOfDeath: new Date("2019-12-17T03:24:00"),
    selected: true
  },
  {
    name: 'Zoro',
    dateOfBirth: new Date("2010-12-17T03:24:00"),
    dateOfDeath: new Date("2015-12-17T03:24:00"),
    selected: false
  },
  {
    name: 'Unknown',
    dateOfBirth: new Date("2009-12-17T03:24:00"),
    selected: false
  },
]

export default cats