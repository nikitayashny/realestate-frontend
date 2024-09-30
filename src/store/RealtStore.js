import {makeAutoObservable} from "mobx"

export default class RealtStore {
    constructor() {
        this._types = []
        this._dealTypes = []
        this._realts = []
        this._selectedType = {}
        this._selectedDealType = {}
        // this._page = 1
        // this._totalCount = 0
        // this._limit = 8
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setDealTypes(dealTypes) {
        this._dealTypes = dealTypes
    }
    setRealts(realts) {
        this._realts = realts
    }
    setSelectedType(type) {
        //this.setPage(1)
        this._selectedType = type;
    }
    setSelectedDealType(dealType) {
        //this.setPage(1)
        this._selectedDealType = dealType;
    }
    // setPage(page) {
    //     this._page = page;
    // }
    // setTotalCount(count) {
    //     this._totalCount = count;
    // }
    // setLimit(limit) {
    //     this._limit = limit;
    // }


    get types() {
        return this._types
    }
    get dealTypes() {
        return this._dealTypes
    }
    get realts() {
        return this._realts
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedDealType() {
        return this._selectedDealType
    }
    // get totalCount() {
    //     return this._totalCount
    // }
    // get page() {
    //     return this._page
    // }
    // get limit() {
    //     return this._limit
    // }
}