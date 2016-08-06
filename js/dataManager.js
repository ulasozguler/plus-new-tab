class DataManager {
	constructor(app_id) {
		this.app_id = app_id
		this.data = []
		this.loadDb()
	}

	loadDb() {
		if(!localStorage[this.app_id]) {
			this.saveDb()
		}
		this.data = eval('(' + localStorage[this.app_id] + ')')
	}

	saveDb() {
		localStorage[this.app_id] = JSON.stringify(this.data)
	}

	generateId() {
		return Date.now()
	}

	find(id) {
		return this.data.find(o => o.id == id)
	}

	findIndex(id) {
		for(var i = 0; i < this.data.length; i++) {
			if(this.data[i].id == id) {
				return i
			}
		}
		return null
	}

	upsert(o) {
		if(o.id) {
			var id = this.findIndex(o.id)
			if(id === null) {
				o.id = this.generateId()
				this.data.push(o)
			} else {
				this.data[id] = o
			}
		} else {
			o.id = this.generateId()
			this.data.push(o)
		}
		this.saveDb()
	}

	remove(id) {
		this.data = this.data.filter(o => o.id != id)
		this.saveDb()
	}

	list() {
		return this.data
	}
	
}