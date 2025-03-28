import {makeAutoObservable} from "mobx"

export default class RealtStore {
    constructor() {
        this._page = 1
        this._totalCount = 0
        this._roomsCount = 0
        this._maxPrice = -1
        this._sortType = 1
        this._usersRealts = []
        this._favorites = []
        this._realts = []
        this._selectedType = 0
        this._selectedDealType = 0
        this._repair = 0
        this._floor = 0
        this._city = ''
        this._street = ''
        this._minArea = 0
        makeAutoObservable(this)
    }

    setRepair(repair) {
        this._repair = repair
    }
    setFloor(floor) {
        this._floor = floor
    }
    setCity(city) {
        this._city = city
    }
    setStreet(street) {
        this._street = street
    }
    setMinArea(minArea) {
        this._minArea = minArea
    }
    setRoomsCount(roomsCount) {
        this._roomsCount = roomsCount
    }
    setMaxPrice(maxPrice) {
        this._maxPrice = maxPrice
    }
    setSortType(sortType) {
        this._sortType = sortType
    }
    setUsersRealts(usersRealts) {
        this._usersRealts = usersRealts
    }
    setRealts(realts) {
        this._realts = realts
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


    get repair() {
        return this._repair
    }
    get floor() {
        return this._floor
    }
    get city() {
        return this._city
    }
    get street() {
        return this._street
    }
    get minArea() {
        return this._minArea
    }
    get roomsCount() {
        return this._roomsCount
    }
    get maxPrice() {
        return this._maxPrice
    }
    get sortType() {
        return this._sortType
    }
    get usersRealts() {
        return this._usersRealts
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
    get favorites() {
        return this._favorites
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }

}