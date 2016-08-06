function template(template, obj) {
	return template.replace(/{([a-zA-Z0-9_-]+)}/g, function (_, match) {
		return obj[match]
	})
}

function addEventHandlerToClass(className, eventName, listener) {
	function wrapper(event) {
		listener(event.currentTarget)
	}

	for (var o of document.getElementsByClassName(className)) {
		o.addEventListener(eventName, wrapper, false)
	}
}

var manager = new DataManager("user_links")

var mainArea = document.getElementById("linksArea")

var actionArea = document.getElementById("action")

var nameInput = document.getElementById("name")
var linkInput = document.getElementById("link")
var idInput = document.getElementById("id")

var cardTemplate = document.getElementById('cardTemplate').innerHTML

function getForm() {
	return {
		id: idInput.value,
		name: nameInput.value,
		link: linkInput.value
	}
}

function setForm(o = {}) {
	idInput.value = o.id || DataManager.generateId()
	nameInput.value = o.name || ''
	linkInput.value = o.link || 'http://'
}


document.getElementById("addLink").addEventListener("click", function () {
	setForm()
	actionArea.style.display = 'block'
}, false)

document.getElementById("actionForm").addEventListener("submit", function (e) {
	e.preventDefault()
	manager.upsert(getForm())
	list()

	actionArea.style.display = 'none'
	setForm()

	return false
}, false)


function editLinkForm(obj) {
	var id = obj.getAttribute('data-id')
	setForm(manager.find(id))
	actionArea.style.display = 'block'
}

function deleteLinkForm(obj) {
	var id = obj.getAttribute('data-id')
	if (confirm('Are you sure?')) {
		manager.remove(id)
		actionArea.style.display = 'none'
		setForm()
		list()
	}
}

function list() {
	var size = 0
	mainArea.innerHTML = ''
	for (var o of manager.list()) {
		var a = document.createElement('a')
		a.href = o.link
		a.innerHTML = template(cardTemplate, o)
		mainArea.appendChild(a)
		size++
	}

	var cardWidth = localStorage['cardWidth'] || 215
	var cardPadding = localStorage['cardPadding'] || 7
	var colCount = localStorage['colCount'] || 4
	var fitWidth = localStorage['fitWidth'] || false

	if (fitWidth === true) {
		if ((size * cardWidth) < document.body.clientWidth)
			mainArea.style.width = (size * cardWidth) + 'px'
		else
			mainArea.style.width = document.body.clientWidth + 'px'
	} else {
		mainArea.style.width = colCount * cardWidth
	}

	addEventHandlerToClass('editLinks', 'click', editLinkForm)
	addEventHandlerToClass('deleteLinks', 'click', deleteLinkForm)
}


window.onload = list