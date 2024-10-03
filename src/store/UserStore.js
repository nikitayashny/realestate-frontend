import {makeAutoObservable} from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._isAdmin = false
        this._userId = null
        this._userName = null
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setIsAdmin(bool) {
        this._isAdmin = bool
    }
    setUserId(id) {
        this._userId = id
    }
    setUserName(name) {
        this._userName = name
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get isAdmin() {
        return this._isAdmin
    }
    get userId() {
        return this._userId
    }
    get userName() {
        return this._userName
    }
}