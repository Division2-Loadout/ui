db_menu = {
    "help": {
        "title": "Help",
        "link": "https://github.com/Division2-Loadout/ui",
        "target": "_blank"
    },
    "credits": {
        "title": "Credits",
        "link": "https://github.com/Division2-Loadout/ui#credits-and-references",
        "target": "_blank"
    },
    "disclaimer": {
        "title": "Disclaimer",
        "link": "https://github.com/Division2-Loadout/ui#disclaimer",
        "target": "_blank"
    }
}

$("#menu").html(".> ")

for (let v_key in db_menu) {
    v_link = db_menu[v_key]["link"]
    v_title = db_menu[v_key]["title"]
    v_target = db_menu[v_key]["target"]
    content = `<a href="${v_link}" target="${v_target}">${v_title}</a> | `
    $("#menu").append(content)
}

$("#menu").append(v_version)