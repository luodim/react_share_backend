import C from './C.js'

export default class B {
  constructor() {
  }

  static buildC(name) {
  	if (!this.array) {
  	  this.array = []
  	  console.log('build this array')
  	}
    const c = new C(name)
    this.array.push(c)
  }

  static getArray() {
    return this.array
  }
}