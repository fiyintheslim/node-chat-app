class SocketSessionStorage {
    private sessionStorage
    constructor(){
        this.sessionStorage = new Map()
    }
    getSessionID(id:number){
        return this.sessionStorage.get(id)
    }

    addSession(id:number, session:string){
        this.sessionStorage.set(id, session)
    }

    allSessions(){
        const all:string[] = []
        this.sessionStorage.forEach(data=>{
            all.push(data)
        })
        return all
    }
}

export default SocketSessionStorage;