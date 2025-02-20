import {makeAutoObservable} from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._subscription = {}
        this._userName = {}
        this._role = {}
        this._email = {}
        this._userId = {}
        this._users = []
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setSubscription(subscription) {
        this._subscription = subscription
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
    setUserId(userId) {
        this._userId = userId
    }
    setUsers(users) {
        this._users = users
    }

    get isAuth() {
        return this._isAuth
    }
    get subscription() {
        return this._subscription
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
    get userId() {
        return this._userId
    }
    get users() {
        return this._users
    }
    
}