db_menu = {
    "weapon": {
        "title": "weapon",
        "link": "weapon.html"
    },
    "gear": {
        "title": "gear",
        "link": "gear.html"
    }
}

for (let v_key in db_menu) {
    v_link = db_menu[v_key]["link"]
    v_title = db_menu[v_key]["title"]
    content = `<a href="${v_link}">${v_title}</a> | `
    $("#menu").append(content)
}