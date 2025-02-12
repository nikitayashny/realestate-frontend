import {makeAutoObservable} from "mobx"

export default class ChatStore {
    
    constructor() {
        this._chatActiveContact = {} 
        this._chatMessages = []
        makeAutoObservable(this)
    }

    setChatActiveContact(chatActiveContact) {
        this._chatActiveContact = chatActiveContact
    }

    setChatMessages(chatMessages) {
        this._chatMessages = chatMessages
    }

    get chatActiveContact() {
        return this._chatActiveContact
    }

    get chatMessages() {
        return this._chatMessages
    }
}