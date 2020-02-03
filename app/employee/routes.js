import controller from "./controller"

export function setup(router){
    router
        .get('/', controller.getAll)
        .post('/create', controller.create)
        .post('/login' , controller.login)
        .patch('/edit', controller.edit)
        .delete('/:id', controller.remove)
}