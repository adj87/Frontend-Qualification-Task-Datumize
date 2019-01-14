export const url = 'http://localhost:3000'

export function counterInputsFilled (object) {
    let counter = 0
    for (var user in object) {
      for (var project in object[user]) {
        const value = object[user][project]
        if(value!=="---")
            counter++
      } 
    }
    return counter
}