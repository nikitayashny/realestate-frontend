import {makeAutoObservable} from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._userName = {}
        this._role = {}
        this._email = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUserName(userName) {
        this._userName = userName
    }
    setRole(role) {
        this._role = role
    }
    setEmail(email) {
        this._email = email
    }

    get isAuth() {
        return this._isAuth
    }
    get userName() {
        return this._userName
    }
    get role() {
        return this._role
    }
    get email() {
        return this._email
    }
    
    
}