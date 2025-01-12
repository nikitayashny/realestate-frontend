import {makeAutoObservable} from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._userName = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUserName(userName) {
        this._userName = userName
    }
    

    get isAuth() {
        return this._isAuth
    }
    get userName() {
        return this._userName
    }
    
}