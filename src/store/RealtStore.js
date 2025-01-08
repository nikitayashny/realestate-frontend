import {makeAutoObservable} from "mobx"

export default class RealtStore {
    constructor() {
        this._types = []
        this._dealTypes = []
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setDealTypes(dealTypes) {
        this._dealTypes = dealTypes
    }

    get types() {
        return this._types
    }
    get dealTypes() {
        return this._dealTypes
    }
   
}