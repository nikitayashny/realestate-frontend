import {makeAutoObservable} from "mobx"

export default class RealtStore {
    constructor() {
        this._types = []
        this._dealTypes = []
        this._roomsCount = 0
        this._maxPrice = -1
        this._realts = []
        this._favorites = []
        this._usersRealts = []
        this._selectedType = 0
        this._selectedDealType = 0
        this._page = 1
        this._totalCount = 0
        this._limit = 4
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setDealTypes(dealTypes) {
        this._dealTypes = dealTypes
    }
    setRoomsCount(roomsCount) {
        this._roomsCount = roomsCount
    }
    setMaxPrice(maxPrice) {
        this._maxPrice = maxPrice
    }
    setRealts(realts) {
        this._realts = realts
    }
    setUsersRealts(usersRealts) {
        this._usersRealts = usersRealts
    }
    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type;
    }
    setSelectedDealType(dealType) {
        this.setPage(1)
        this._selectedDealType = dealType;
    }
    setFavorites(favorites) {
        this._favorites = favorites
    }
    setPage(page) {
        this._page = page;
    }
    setTotalCount(count) {
        this._totalCount = count;
    }
    setLimit(limit) {
        this._limit = limit;
    }


    get types() {
        return this._types
    }
    get dealTypes() {
        return this._dealTypes
    }
    get roomsCount() {
        return this._roomsCount
    }
    get maxPrice() {
        return this._maxPrice
    }
    get realts() {
        return this._realts
    }
    get usersRealts() {
        return this._usersRealts
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedDealType() {
        return this._selectedDealType
    }
    get favorites() {
        return this._favorites
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}