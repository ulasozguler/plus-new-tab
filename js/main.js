function addEventHandlerToClass(className, eventName, listener) {
	function wrapper(event) {
		listener(event.currentTarget);
	}
	for (var o of document.getElementsByClassName(className)) {
	    o.addEventListener(eventName, wrapper, false);
	}
}

var manager = new DataManager("user_links");

var mainArea = document.getElementById("linksArea");

var addLinkObj = document.getElementById("addLink");
var editLinkObj = document.getElementById("editLink");
var deleteLinkObj = document.getElementById("deleteLink");


var actionArea = document.getElementById("action");
var form = document.getElementById("actionForm");

var nameInput = document.getElementById("name");
var linkInput = document.getElementById("link");
var idInput = document.getElementById("id");

function getForm() {
	return {
		id: idInput.value,
		name: nameInput.value,
		link: linkInput.value
	}
}

function setForm(o={}) {
	idInput.value = o.id || manager.generateId();
	nameInput.value = o.name || '';
	linkInput.value = o.link || 'http://';
}


addLinkObj.addEventListener("click", function () {
										setForm();
										actionArea.style.display = 'block';
									}, false);
									
form.addEventListener("submit", function () {
										manager.upsert(getForm())
										list();
										
										actionArea.style.display = 'none';
										setForm();
										
										return false;
									}, false);





function editLinkForm(obj) {
	var id = obj.getAttribute('id');
	setForm(manager.find(id))
	actionArea.style.display = 'block';
}

function deleteLinkForm(obj) {
	var id = obj.getAttribute('id');
	if(confirm('Are you sure?')) {
		manager.delete(id)
		actionArea.style.display = 'none';
		setForm();
		list();
	}
}


function showOptions(cell) {
	cell.getElementsByClassName('actionLinks')[0].style.display = 'block';
}

function hideOptions(cell) {
	cell.getElementsByClassName('actionLinks')[0].style.display = 'none';
}


function list() {
	var size = 0;
	mainArea.innerHTML = '';
	for(var o of manager.list()) {
		var a = document.createElement('a');
		a.href = o.link;
		var html = `
			<div class="card">
			<div class='linkContainer'>` + o.name + `</div>
			<div class='actionLinks'>
				<a href='#' title='Edit' class='editLinks' id='`+ o.id + `'></a>
				<a href='#' title='Delete' class='deleteLinks' id='` + o.id + `'></a>
			</div>
			</div>
		`;

		a.innerHTML = html;
		mainArea.appendChild(a);
		size++;
	}


	var colWidth = 215;
	if(localStorage['fitWidth'] === true) {
		if((size * colWidth) < document.body.clientWidth)
			mainArea.style.width = (size * colWidth) + 'px';
		else
			mainArea.style.width = document.body.clientWidth + 'px';
	} else {
		mainArea.style.width = localStorage['colCount'] * colWidth;
	}

	addEventHandlerToClass('card', 'mouseover', showOptions);
	addEventHandlerToClass('card', 'mouseout', hideOptions);
	addEventHandlerToClass('editLinks', 'click', editLinkForm);
	addEventHandlerToClass('deleteLinks', 'click', deleteLinkForm);
}


window.onload = list;