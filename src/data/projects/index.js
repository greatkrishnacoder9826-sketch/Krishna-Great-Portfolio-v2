// Every file in this folder (except index.js and files starting with "_") is loaded automatically.
const modules = import.meta.glob(['./*.js', '!./index.js', '!./_*.js'], { eager: true })
export const projects = Object.values(modules).map((m) => m.default)
