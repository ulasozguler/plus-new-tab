function init() {
    var themeSelector = document.getElementById('theme')
    var previewFrame = document.getElementById('preview')

    for (var themeName in themes) {
        if (!themes.hasOwnProperty(themeName))
            continue

        var option = document.createElement('option')
        option.setAttribute('value', themeName)
        option.innerText = themeName
        themeSelector.appendChild(option)
    }

    for (var o of options) {
        var input = document.getElementById(o.name);
        if (typeof o.default === 'boolean') {
            var val = o.default
            if (localStorage.getItem(o.name) !== null) {
                val = localStorage[o.name] === 'true'
            }
            input.checked = val
        } else {
            input.value = localStorage[o.name] || o.default
        }

        input.addEventListener('change', function (e) {
            var value = e.target.value;
            if (e.target.type == 'checkbox') {
                value = e.target.checked;
            }
            localStorage[e.target.id] = value;
            previewFrame.contentWindow.location.reload()
        })
    }
}

window.onload = init