var addLinkObj = document.getElementById("addLink");
var editLinkObj = document.getElementById("editLink");
var deleteLinkObj = document.getElementById("deleteLink");

var linksArea = document.getElementById("linksArea");
var actionArea = document.getElementById("action");
var form = document.getElementById("actionForm");

var nameInput = document.getElementById("name");
var linkInput = document.getElementById("link");
var orgNameInput = document.getElementById("orgName");

addLinkObj.addEventListener("click", function () {
										clearForm();
										actionArea.style.display = 'block';
									}, false);
									
form.addEventListener("submit", function () {
										if(nameInput.value !== orgNameInput.value)
											deleteLink(orgNameInput.value);
										setLink(nameInput.value, linkInput.value);
										linksArea.innerHTML = '';
										list();
										
										actionArea.style.display = 'none';
										clearForm();
										
										return false;
									}, false);
									
function editLinkForm(name) {
	nameInput.value = name;
	orgNameInput.value = name;
	linkInput.value = getLink(name);
	actionArea.style.display = 'block';
}

function deleteLinkForm(name) {
	if(confirm('Are you sure?')) {
		deleteLink(name);
		actionArea.style.display = 'none';
		linksArea.innerHTML = '';
		clearForm();
		list();
	}
}

function clearForm() {
	nameInput.value = '';
	orgNameInput.value = '';
	linkInput.value = 'http://';
}

function showOptions(cell) {
	cell.getElementsByClassName('actionLinks')[0].style.display = 'block';
}

function hideOptions(cell) {
	cell.getElementsByClassName('actionLinks')[0].style.display = 'none';
}

function init() {
	if(localStorage.getItem('links') === null)
		setLinks({ "links": {} });
	list();
}

function getLink(name) {
	var storage = getLinks();
	return storage.links[name];
}

function setLink(name, link) {
	var storage = getLinks();
	storage.links[name] = link;
	setLinks(storage);
}

function deleteLink(name) {
	var storage = getLinks();
	delete storage.links[name];
	setLinks(storage);
}

function list() {
	var storage = getLinks();
	var size = 0;
	for(var c in storage.links) {
		var a = document.createElement('a');
		a.href = storage.links[c];
		var html = "<div class='linkContainer' onmouseover=\"showOptions(this);\" onmouseout=\"hideOptions(this);\">" + c;
		html += "<div class='actionLinks'>";
		html += "<a href='#' title='Edit' class='editLinks' onClick=\"editLinkForm('" + c + "');\">E</a>";
		html += "<a href='#' title='Delete' class='deleteLinks' onClick=\"deleteLinkForm('" + c + "');\">D</a>";
		html += "</div>";
		html += "</div>";
		a.innerHTML = html;
		linksArea.appendChild(a);
		size++;
		//alert(c + " | " + storage.links[c]);
	}
	var colWidth = 215;
	if(localStorage['fitWidth'] === true) {
		if((size * colWidth) < document.body.clientWidth)
			document.getElementById('linksArea').style.width = (size * colWidth) + 'px';
		else
			document.getElementById('linksArea').style.width = document.body.clientWidth + 'px';
	} else {
		document.getElementById('linksArea').style.width = localStorage['colCount'] * colWidth;
	}

}

function getLinks() {
	return eval('(' + localStorage["links"] + ')');
}

function setLinks(obj) {
	localStorage["links"] = JSON.stringify(obj);
}

window.onload = init;