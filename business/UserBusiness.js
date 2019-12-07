class Userbusiness {
    constructor(repository) {
        this.repository =  repository
    }

    insert(login, email) {
        return new Promise((resolve, reject) => {
            this.repository.findByLogin(login).then((res) => {
                reject(res)       
        }).catch((res) => {
            this.repository.insert({
                login: login,
                email: email
            }).then((res) => {
                resolve(res)
            }).catch((res) =>{
                reject(res)
            })
        })
    })

    }
    findAll(){
        return new Promise((resolve, reject) =>{
            this.repository.findAll().then((res) => {
                resolve(res)
            }).catch((res) => {
                reject(res)
            })
        })
    }

    findByLogin(login){
        return new Promise((resolve, reject) =>{
            this.repository.findByLogin(login).then((res) => {
                resolve(res)
            }).catch((res) => {
                reject(res)
            })
        })
        
    }
    
}


module.exports = Userbusiness