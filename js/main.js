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
	idInput.value = o.id || manager.generateId()
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

document.getElementById("settings").addEventListener("click", function () {
	chrome.runtime.openOptionsPage()
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

	var optionDefaults = {};
	for(var opt of options) {
		optionDefaults[opt.name] = opt.default
	}

	var cardWidth = parseInt(localStorage['cardWidth']) || optionDefaults['cardWidth']
	var cardMargin = parseInt(localStorage['cardMargin']) || optionDefaults['cardMargin']
	var colCount = parseInt(localStorage['colCount']) || optionDefaults['colCount']
	var fitWidth = optionDefaults['fitWidth']
	if(localStorage.getItem('fitWidth') !== null) {
		fitWidth = localStorage['fitWidth'] === 'true'
	}

	var cardTotalWidth = cardWidth + (cardMargin * 2)
	var errorMargin = 10

	if (fitWidth === true) {
		if (size * cardTotalWidth < document.body.clientWidth) {
			mainArea.style.width = (size * cardTotalWidth) + 'px'
		} else {
			mainArea.style.width = (Math.floor(document.body.clientWidth / (cardTotalWidth + errorMargin)) * cardTotalWidth) + 'px'
		}
	} else {
		mainArea.style.width = (colCount * cardTotalWidth) + 'px'
	}

	addEventHandlerToClass('editLinks', 'click', editLinkForm)
	addEventHandlerToClass('deleteLinks', 'click', deleteLinkForm)
}

function init() {
	// load theme
	var theme = themes[localStorage['theme'] || 'bluegrey']
	var isDark = true
	if(localStorage.getItem('darkColors') !== null) {
		isDark = localStorage['darkColors'] === 'true'
	}
	document.getElementById('themeStyles').innerHTML = "" +
		"* { color: " + theme[isDark ? '300' : '600'] + "; } " +
		"a:hover, .linkContainer:hover { color: " + theme[isDark ? '100' : '800'] + "; } " +
		"body { background: " + theme[isDark ? '800' : '100'] + "; } " +
		".card { background: " + theme[isDark ? '700' : '300'] + "; } " +
		"#linksArea a { margin: " + localStorage['cardMargin'] + "} " +
		"#linksArea a div.linkContainer { width: " + localStorage['cardWidth'] + " }"

	// list
	list()
}
window.onload = init