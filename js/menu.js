db_menu = {
    "builds": {
        "title": "Builds",
        "link": "#",
        "target": "#"
    },
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
    if (v_key === "builds") {
        content = `<a id="btn_search_build" href="#" title="Search" data-toggle="modal" data-target="#modal_search"><span class="glyphicon glyphicon-search" style="font-size: 12px"></span> ${v_title}</a> | `
    } else {
        content = `<a href="${v_link}" target="${v_target}">${v_title}</a> | `
    }
    
    $("#menu").append(content)
}

$("#menu").append(v_version)