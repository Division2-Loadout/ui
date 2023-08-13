// Create Base64 Object
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

function load_build_list() {
    $("#field_build_select").empty()
    content = `<option>[build]</option>`
    $("#field_build_select").append(content)

    v_keys = Object.keys(db_build);
    v_keys.sort()
    for (let v_key of v_keys) {
        //if (v_key !== "") {
            content = `<option>${sanitizeString(v_key)}</option>`
            $("#field_build_select").append(content)
        //}
        
    }
}

function init() {
    //load_weapon_list()
    //weapon_title()
    //load_private_db_weapon()
    //show_weapon(".CLASS_ALL")
    build_db_gear_key()

    db_build = get_private_db("private_db_build")

    if (Object.keys(db_build).length === 0) {
        db_build = build_demo
    }

    db_build_temp = {}
    for (v_key in db_build) {
        if (v_key !== "") {
            v_key = sanitizeString(v_key)
            db_build_temp[v_key] = db_build[v_key]
        }
    }
    db_build = db_build_temp

    load_build_list()

    set_slot("slot_mask")
    set_slot("slot_backpack")
    set_slot("slot_chest")
    set_slot("slot_gloves")
    set_slot("slot_holster")
    set_slot("slot_kneepads")

    set_slot_weapon("slot_primary")
    set_slot_weapon("slot_secondary")
    set_slot_weapon("slot_sidearm", "sidearm")

    reset_build()

    load_shared_build()
    
}

function load_private_db_NO(private_db) {
    
    try {
        private_db = JSON.parse(localStorage.getItem(private_db)) || [];
    } catch {
        private_db = {}
    }

    for (let v_record of db_weapon) {

        v_key = v_record["key"]
        v_key = String(v_key)

        if (private_db_weapon.hasOwnProperty(v_key)) {
            //
        } else {
            private_db_weapon[v_key] = {
                "keep": null,
                "tag": null, // 1:favourite 2:keep 3:junk 0:none
                "rank": null
            }
        }

        v_json = private_db_weapon[v_key]
        //console.log(v_json)

        
        if (typeof v_json === "object" && v_json !== null && isJsonable(v_json)) {
            
        } else {
            private_db_weapon[v_key] = {
                "keep": null,
                "tag": null, // 1:favourite 2:keep 3:junk 0:none
                "rank": null
            }
            //console.log(private_db_weapon[v_key])
        }
        

    }

    set_private_db_weapon(private_db_weapon)

    $("#debug_private_db").val(JSON.stringify(private_db_weapon))
    $("#debug_private_db").html(JSON.stringify(private_db_weapon))

    return private_db
    
}

function isJsonable(v) {
    try{
        return JSON.stringify(v) === JSON.stringify(JSON.parse(JSON.stringify(v)));
    } catch(e){
        return false;
    }
}

function set_private_db(private_db_name, private_db) {
    window.localStorage.setItem(private_db_name, JSON.stringify(private_db));
}

function get_private_db(private_db_name) {
    private_db = JSON.parse(localStorage.getItem(private_db_name));
    if (private_db === null) {
        private_db = {}
    }
    console.log(private_db)
    return private_db
}

function get_class_type(v_item) {
    //console.log(`[>] ${v_item}`)
    for (let v_key in db_gear_core) {
        //console.log(v_key)
        if (db_gear_core[v_key].hasOwnProperty(v_item)) {
            return v_key
        }
    }

    for (let v_key in db_gear_attribute) {
        //console.log(v_key)
        if (db_gear_attribute[v_key].hasOwnProperty(v_item)) {
            return v_key
        }
    }

    for (let v_key in db_gear_mod) {
        if (db_gear_mod[v_key].hasOwnProperty(v_item)) {
            return v_key
        }
    }

    for (let v_key in db_gear_extra) {
        if (db_gear_extra[v_key].hasOwnProperty(v_item)) {
            return v_key
        }
    }

    return null
    
}

function get_class(v_class_type) {
    if (v_class_type === "defensive") {
        v_class = "bg_blue"
    } else if (v_class_type === "offensive") {
        v_class = "bg_red"
    } else if (v_class_type === "utility") {
        v_class = "bg_yellow"
    } else {
        v_class = ""
    }

    return v_class
}

function load_build(v_json) {

    build_template = v_json

    var v_json_str = JSON.stringify(build_template, null, 2); // spacing level = 2
    $("#debug_build").html(v_json_str)
    $("#debug_build").val(v_json_str)

    $("#field_build_name").val(build_template["name"])
    $("#field_build_desc").val(build_template["desc"])

    for (let v_slot_id in build_template) {
        if(["slot_mask", "slot_backpack", "slot_chest", "slot_gloves", "slot_holster", "slot_kneepads"].includes(v_slot_id)) {
            v_item = build_template[v_slot_id]["item"]
            console.log(v_item)
            
            make_build_body (v_slot_id, v_slot_id.replace("slot_", ""), v_item)
            //make_build_body("slot_mask", "Mask", "Coyote's Mask")

            for (v_socket_key in build_template[v_slot_id]) {
                if (v_socket_key.startsWith("socket")) {
                    v_type = build_template[v_slot_id][v_socket_key]["type"]
                    console.log(`## ${v_type}`)
                    try { v_value = build_template[v_slot_id][v_socket_key]["value"] }
                    catch { v_value = "x"}
                    
                    v_id = `${v_slot_id}_${v_socket_key}`
                    console.log(`v_id: ${v_id}`)
                    v_obj = $(`#${v_id}`)
                    console.log(v_obj)
                    v_obj.val(v_type)

                }
            }
            
        }
    }

    return 

    //console.log(build_template)
    for (let v_item in build_template) {
        //console.log(v_item)
        if(["slot_mask", "slot_backpack", "slot_chest", "slot_gloves", "slot_holster", "slot_kneepads"].includes(v_item)) {
        //if(v_item === "slot_mask" || v_item === "slot_backpack") {
            console.log(v_item)
            v_item = String(v_item)
            console.log(build_template[v_item])
            console.log(build_template[v_item]["item"])

            v_value = build_template[v_item]["item"]
            if (v_value !== "") { 
                $(`#${v_item}_item`).val(v_value)
                //v_class = $(`#${v_item}_item`).find(':selected').data('id')
                v_class = $(`#${v_item}_item`).find(':selected').attr('class')
                $(`#${v_item}_item`).removeClass()
                $(`#${v_item}_item`).addClass(v_class)

                set_slot_class(v_item, v_class)

            } else {
                set_slot_class(v_item, "default")
            }

            
            v_value = build_template[v_item]["core"]["type"]
            if (v_value !== "") {
                //v_class_type = get_class_type(v_value)
                //v_class = get_class(v_class_type)

                v_obj = $(`#${v_item}_core`)
                v_obj.val(v_value)
                v_class = v_obj.find(':selected').attr('class')
                v_obj.removeClass()
                v_obj.addClass(v_class)

                v_obj_icon = $(`#${v_item}_core_icon`)
                if (v_class === "bg_blue") {
                    v_obj_icon.html(`<img width="15px" src="icons/defense1.png">`)
                } else if (v_class === "bg_red") {
                    v_obj_icon.html(`<img width="15px" src="icons/offense1.png">`)
                } else if (v_class === "bg_yellow") {
                    v_obj_icon.html(`<img width="15px" src="icons/tech1.png">`)
                } else {
                    v_obj_icon.html(`<img width="15px" src="icons/blank_attribute.png">`)
                }

                /*
                $(`#${v_item}_core`).val(v_value)
                v_class = $(`#${v_item}_core`).find(':selected').attr('class')
                $(`#${v_item}_core`).removeClass()
                $(`#${v_item}_core`).addClass(v_class)
                */

                v_value = build_template[v_item]["core"]["value"]
                if (v_value !== "") $(`#${v_item}_core_value`).val(v_value)
                
                //$(`#${v_item}_core`).addClass(v_class)
                //console.log(`v_class_type: ${v_class_type}`)
                //console.log(`v_class: ${v_class}`)
            }
            
            v_value = build_template[v_item]["attr1"]["type"]
            if (v_value !== "") {
                //v_class_type = get_class_type(v_value)
                //v_class = get_class(v_class_type)

                v_obj = $(`#${v_item}_attr1`)
                v_obj.val(v_value)
                v_class = v_obj.find(':selected').attr('class')
                v_obj.removeClass()
                v_obj.addClass(v_class)

                v_obj_icon = $(`#${v_item}_attr1_icon`)
                if (v_class === "bg_blue") {
                    v_obj_icon.html(`<img width="15px" src="icons/defense2.png">`)
                } else if (v_class === "bg_red") {
                    v_obj_icon.html(`<img width="15px" src="icons/offense2.png">`)
                } else if (v_class === "bg_yellow") {
                    v_obj_icon.html(`<img width="15px" src="icons/tech2.png">`)
                } else {
                    v_obj_icon.html(`<img width="15px" src="icons/blank_attribute.png">`)
                }

                /*
                $(`#${v_item}_attr1`).val(v_value)
                v_class = $(`#${v_item}_attr1`).find(':selected').attr('class')
                $(`#${v_item}_attr1`).removeClass()
                $(`#${v_item}_attr1`).addClass(v_class)
                */

                v_value = build_template[v_item]["attr1"]["value"]
                if (v_value !== "") $(`#${v_item}_attr1_value`).val(v_value)

                //$(`#${v_item}_attr1`).addClass(v_class)
            }
            
            
            v_value = build_template[v_item]["attr2"]["type"]
            if (v_value !== "") {
                //v_class_type = get_class_type(v_value)
                //v_class = get_class(v_class_type)
                
                v_obj = $(`#${v_item}_attr2`)
                v_obj.val(v_value)
                v_class = v_obj.find(':selected').attr('class')
                v_obj.removeClass()
                v_obj.addClass(v_class)

                v_obj_icon = $(`#${v_item}_attr2_icon`)
                if (v_class === "bg_blue") {
                    v_obj_icon.html(`<img width="15px" src="icons/defense2.png">`)
                } else if (v_class === "bg_red") {
                    v_obj_icon.html(`<img width="15px" src="icons/offense2.png">`)
                } else if (v_class === "bg_yellow") {
                    v_obj_icon.html(`<img width="15px" src="icons/tech2.png">`)
                } else {
                    v_obj_icon.html(`<img width="15px" src="icons/blank_attribute.png">`)
                }
                
                //$(`#${v_item}_attr2`).val(v_value)
                
                v_value = build_template[v_item]["attr2"]["value"]
                if (v_value !== "") $(`#${v_item}_attr2_value`).val(v_value)

                //$(`#${v_item}_attr2`).addClass(v_class)
            }
            
            

            if(["slot_mask", "slot_backpack", "slot_chest"].includes(v_item)) {
                v_value = build_template[v_item]["mod"]["type"]
                if (v_value !== "") {
                    //v_class_type = get_class_type(v_value)
                    //v_class = get_class(v_class_type)

                    v_obj = $(`#${v_item}_mod`)
                    v_obj.val(v_value)
                    v_class = v_obj.find(':selected').attr('class')
                    v_obj.removeClass()
                    v_obj.addClass(v_class)

                    v_obj_icon = $(`#${v_item}_mod_icon`)
                    if (v_class === "bg_blue") {
                        v_obj_icon.html(`<img width="15px" src="icons/defense3_2.png">`)
                    } else if (v_class === "bg_red") {
                        v_obj_icon.html(`<img width="15px" src="icons/offense3_2.png">`)
                    } else if (v_class === "bg_yellow") {
                        v_obj_icon.html(`<img width="15px" src="icons/tech3_2.png">`)
                    } else {
                        v_obj_icon.html(`<img width="15px" src="icons/blank_mod.png">`)
                    }

                    //$(`#${v_item}_mod`).val(v_value)
                    v_value = build_template[v_item]["mod"]["value"]
                    if (v_value !== "") $(`#${v_item}_mod_value`).val(v_value)

                    //$(`#${v_item}_mod`).addClass(v_class)
                }
            }


            if(["slot_backpack", "slot_chest"].includes(v_item)) {
                v_value = build_template[v_item]["talent"]["type"]
                if (v_value !== "") $(`#${v_item}_talent`).val(v_value)
            }

            /*
            v_value = build_template[v_item]["item"]
            if (v_value !== "" && v_value !== undefined) {
                $(`#${v_item}_item`).val(build_template[v_item]["item"]).change();
            }
            */
            try {
                //$(`#${v_item}_item`).val(build_template[v_item]["item"])//.change();
            } catch {

            }
            
        }
        
    }

}

$(document).on("change", "#field_view_mode", function() {
    view_mode = $("#field_view_mode").val()
    set_view_mode(view_mode)
    load_build_template(build_template)
});

$(document).on("change", "#field_build_select", function() {
    
    //console.log($(this).attr("id"))

    v_key = String($("#field_build_select").val())
    v_field_build_name = db_build[v_key]["name"]

    reset_build()
    $("#field_build_select").val(v_key)

    build_template = JSON.parse(JSON.stringify(db_build[v_key]));

    //var v_json_str = JSON.stringify(build_template, null, 2); // spacing level = 2
    //$("#debug_build").html(v_json_str)
    //$("#debug_build").val(v_json_str)

    debug_build_template()

    load_build_template(build_template) // JSON

    //var v_json_str = JSON.stringify(build_template, null, 2); // spacing level = 2
    //$("#debug_build").html(v_json_str)
    //$("#debug_build").val(v_json_str)

    debug_build_template()

    return

    //console.log(db_build[v_key])
    for (let v_item in db_build[v_key]) {
        //console.log(v_item)
        if(["slot_mask", "slot_backpack", "slot_chest", "slot_gloves", "slot_holster", "slot_kneepads"].includes(v_item)) {
        //if(v_item === "slot_mask" || v_item === "slot_backpack") {
            console.log(v_item)
            v_item = String(v_item)
            console.log(db_build[v_key][v_item])
            console.log(db_build[v_key][v_item]["item"])

            v_value = db_build[v_key][v_item]["item"]
            if (v_value !== "") { 
                $(`#${v_item}_item`).val(v_value)
                //v_class = $(`#${v_item}_item`).find(':selected').data('id')
                v_class = $(`#${v_item}_item`).find(':selected').attr('class')
                $(`#${v_item}_item`).removeClass()
                $(`#${v_item}_item`).addClass(v_class)

                set_slot_class(v_item, v_class)

            } else {
                set_slot_class(v_item, "default")
            }

            
            v_value = db_build[v_key][v_item]["core"]["type"]
            if (v_value !== "") {
                //v_class_type = get_class_type(v_value)
                //v_class = get_class(v_class_type)

                v_obj = $(`#${v_item}_core`)
                v_obj.val(v_value)
                v_class = v_obj.find(':selected').attr('class')
                v_obj.removeClass()
                v_obj.addClass(v_class)

                v_obj_icon = $(`#${v_item}_core_icon`)
                if (v_class === "bg_blue") {
                    v_obj_icon.html(`<img width="15px" src="icons/defense1.png">`)
                } else if (v_class === "bg_red") {
                    v_obj_icon.html(`<img width="15px" src="icons/offense1.png">`)
                } else if (v_class === "bg_yellow") {
                    v_obj_icon.html(`<img width="15px" src="icons/tech1.png">`)
                } else {
                    v_obj_icon.html(`<img width="15px" src="icons/blank_attribute.png">`)
                }

                /*
                $(`#${v_item}_core`).val(v_value)
                v_class = $(`#${v_item}_core`).find(':selected').attr('class')
                $(`#${v_item}_core`).removeClass()
                $(`#${v_item}_core`).addClass(v_class)
                */

                v_value = db_build[v_key][v_item]["core"]["value"]
                if (v_value !== "") $(`#${v_item}_core_value`).val(v_value)
                
                //$(`#${v_item}_core`).addClass(v_class)
                //console.log(`v_class_type: ${v_class_type}`)
                //console.log(`v_class: ${v_class}`)
            }
            


            v_value = db_build[v_key][v_item]["attr1"]["type"]
            if (v_value !== "") {
                //v_class_type = get_class_type(v_value)
                //v_class = get_class(v_class_type)

                v_obj = $(`#${v_item}_attr1`)
                v_obj.val(v_value)
                v_class = v_obj.find(':selected').attr('class')
                v_obj.removeClass()
                v_obj.addClass(v_class)

                v_obj_icon = $(`#${v_item}_attr1_icon`)
                if (v_class === "bg_blue") {
                    v_obj_icon.html(`<img width="15px" src="icons/defense2.png">`)
                } else if (v_class === "bg_red") {
                    v_obj_icon.html(`<img width="15px" src="icons/offense2.png">`)
                } else if (v_class === "bg_yellow") {
                    v_obj_icon.html(`<img width="15px" src="icons/tech2.png">`)
                } else {
                    v_obj_icon.html(`<img width="15px" src="icons/blank_attribute.png">`)
                }

                /*
                $(`#${v_item}_attr1`).val(v_value)
                v_class = $(`#${v_item}_attr1`).find(':selected').attr('class')
                $(`#${v_item}_attr1`).removeClass()
                $(`#${v_item}_attr1`).addClass(v_class)
                */

                v_value = db_build[v_key][v_item]["attr1"]["value"]
                if (v_value !== "") $(`#${v_item}_attr1_value`).val(v_value)

                //$(`#${v_item}_attr1`).addClass(v_class)
            }
            
            
            v_value = db_build[v_key][v_item]["attr2"]["type"]
            if (v_value !== "") {
                //v_class_type = get_class_type(v_value)
                //v_class = get_class(v_class_type)
                
                v_obj = $(`#${v_item}_attr2`)
                v_obj.val(v_value)
                v_class = v_obj.find(':selected').attr('class')
                v_obj.removeClass()
                v_obj.addClass(v_class)

                v_obj_icon = $(`#${v_item}_attr2_icon`)
                if (v_class === "bg_blue") {
                    v_obj_icon.html(`<img width="15px" src="icons/defense2.png">`)
                } else if (v_class === "bg_red") {
                    v_obj_icon.html(`<img width="15px" src="icons/offense2.png">`)
                } else if (v_class === "bg_yellow") {
                    v_obj_icon.html(`<img width="15px" src="icons/tech2.png">`)
                } else {
                    v_obj_icon.html(`<img width="15px" src="icons/blank_attribute.png">`)
                }
                
                //$(`#${v_item}_attr2`).val(v_value)
                
                v_value = db_build[v_key][v_item]["attr2"]["value"]
                if (v_value !== "") $(`#${v_item}_attr2_value`).val(v_value)

                //$(`#${v_item}_attr2`).addClass(v_class)
            }
            
            

            if(["slot_mask", "slot_backpack", "slot_chest"].includes(v_item)) {
                v_value = db_build[v_key][v_item]["mod"]["type"]
                if (v_value !== "") {
                    //v_class_type = get_class_type(v_value)
                    //v_class = get_class(v_class_type)

                    v_obj = $(`#${v_item}_mod`)
                    v_obj.val(v_value)
                    v_class = v_obj.find(':selected').attr('class')
                    v_obj.removeClass()
                    v_obj.addClass(v_class)

                    v_obj_icon = $(`#${v_item}_mod_icon`)
                    if (v_class === "bg_blue") {
                        v_obj_icon.html(`<img width="15px" src="icons/defense3_2.png">`)
                    } else if (v_class === "bg_red") {
                        v_obj_icon.html(`<img width="15px" src="icons/offense3_2.png">`)
                    } else if (v_class === "bg_yellow") {
                        v_obj_icon.html(`<img width="15px" src="icons/tech3_2.png">`)
                    } else {
                        v_obj_icon.html(`<img width="15px" src="icons/blank_mod.png">`)
                    }

                    //$(`#${v_item}_mod`).val(v_value)
                    v_value = db_build[v_key][v_item]["mod"]["value"]
                    if (v_value !== "") $(`#${v_item}_mod_value`).val(v_value)

                    //$(`#${v_item}_mod`).addClass(v_class)
                }
            }


            if(["slot_backpack", "slot_chest"].includes(v_item)) {
                v_value = db_build[v_key][v_item]["talent"]["type"]
                if (v_value !== "") $(`#${v_item}_talent`).val(v_value)
            }

            /*
            v_value = db_build[v_key][v_item]["item"]
            if (v_value !== "" && v_value !== undefined) {
                $(`#${v_item}_item`).val(db_build[v_key][v_item]["item"]).change();
            }
            */
            try {
                //$(`#${v_item}_item`).val(db_build[v_key][v_item]["item"])//.change();
            } catch {

            }
            
        }
        
    }

});

function load_debug() {
    v_qstring = window.location.search;
    urlParams = new URLSearchParams(v_qstring);

    v_debug = urlParams.get('debug')
    console.log(v_build_shared)
    
    //$("#show_debug_db_build").css({"display":"none"})

    if (v_debug !== null) {
        //$("#show_debug_build").css({"display":"none"})
        //$("#show_debug_db_build").css({"display":"none"})
    } else {
        $("#debug_share").css({"display":"none"})
        $("#show_debug_build").css({"display":"none"})
        $("#show_debug_db_build").css({"display":"none"})
    }
}

function url_shortener(v_url) {
    v_url = `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(v_url)}`
    $.ajaxSetup({async: false})
    $.getJSON( v_url, function( data ) {
        /*
        $.each( data, function( key, val ) {
          console.log(key, val)
        });
        */
        shortened = data.result["full_short_link"]
        console.log(data)
      });
    $.ajaxSetup({async: true})
    
    console.log(shortened)

    return shortened
}

function load_shared_build() {
    build_db_weapon_key()
    
    v_qstring = window.location.search;
    urlParams = new URLSearchParams(v_qstring);
    
    v_build_shared = urlParams.get('build')
    console.log(v_build_shared)
    
    if (v_build_shared !== "" && v_build_shared !== null) {
        try {
            v_build_shared = Base64.decode(v_build_shared)
            v_json = JSON.parse(v_build_shared)
            build_template = JSON.parse(v_build_shared)

            if (typeof v_json === "object" && v_json !== null && isJsonable(v_json)) {
                $("#debug_share").val(JSON.stringify(v_json))
            } else {
                $("#debug_share").val("ERROR")
            }

            console.log(v_json)

            debug_build_template()
            load_build_template(v_json)
            //load_build(v_json)

            $("#field_build_name").val(`[SHARED] ${build_template["name"]}`)
            console.log(v_json)

        } catch(err) {
            $("#debug_share").val("ERROR JSON")
            console.log(err)
        }
    } else {
        get_build_github_param()
    }
}

function export_db() {
    const blob = new Blob([JSON.stringify(db_build, null, 2)]);
    const link = document.createElement("a");
    link.download = "division2-loadout.json";
    link.href = window.URL.createObjectURL(blob);
    link.click()
}

function copyToClipboard() {
    var text = $("#debug_share").val();

    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
        show_msg("Copied")
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function show_msg(v_msg) {

    $("#msg").fadeOut(function() {
        $(this).text(v_msg).fadeIn();
        //$("#msg").css("display", "none");
    });

    setTimeout(function () {
        $("#msg").fadeOut(function() {
            $(this).text("")//.fadeIn();
            //$("#msg").css("display", "none");
        });
    }, 3000);
    
}

function set_build_stored(v_build_stored) {
    if (build_template["name"] !== "" ) {
        build_template["stored"] = v_build_stored
        debug_build_template()
    }

    $("[id^=btn_char_]").removeClass("box_tag_selected")
    $(`#btn_char_${v_build_stored}`).addClass("box_tag_selected")
}

function request_get(v_url, v_type="json") {
    $.getJSON( v_url, function( data ) {
        /*
        $.each( data, function( key, val ) {
            console.log(key, val)
        });
        */
        console.log(data)
    });
}

function isNumeric(n) {
return !isNaN(parseFloat(n)) && isFinite(n);
}

function get_build_github_param() {
    v_qstring = window.location.search;
    urlParams = new URLSearchParams(v_qstring);

    v_id = urlParams.get('id')
    console.log(v_id)

    if (v_id !== "" && v_id !== null && isNumeric(v_id)) {
        load_build_github(v_id)
    }
}

function load_build_github(v_id) {
    v_url = `https://raw.githubusercontent.com/Division2-Loadout/ui/main/builds/${v_id}.json`
    
    $.getJSON( v_url, function( data ) {
        console.log(data)

        build_template = data
        load_build_template(build_template)
    });
}

$(document).on("click", "[id^=btn_search_set_]", function() {
    v_id = $(this).attr("id").replace("btn_search_set_", "")
    load_build_github(v_id)
});

$(document).on("click", "#btn_search_build", function() {
    if (Object.keys(db_search).length === 0) {
        search_run()
    }
	
    //v_url = "https://raw.githubusercontent.com/Division2-Loadout/ui/main/builds/index.json"
    //request_get(v_url)
});

$(document).on("click", "#viewstats", function() {
    v_value = $("#viewstats").val()
    show_db_stats(v_value)
});

$(document).on("click", "#btn_build_export", function() {
    export_db()
});

$(document).on("click", "#btn_modal_export", function() {
    v_data = JSON.stringify(build_template, null, 2);
    $("#field_export").val(v_data)
    $("#btn_export_current").addClass("box_tag_selected")
    $("#btn_export_all").removeClass("box_tag_selected")
});

$(document).on("click", "#btn_export_current", function() {
    v_data = JSON.stringify(build_template, null, 2);
    $("#field_export").val(v_data)
    $("#btn_export_current").addClass("box_tag_selected")
    $("#btn_export_all").removeClass("box_tag_selected")
});

$(document).on("click", "#btn_export_all", function() {
    v_data = JSON.stringify(db_build, null, 2);
    $("#field_export").val(v_data)
    $("#btn_export_all").addClass("box_tag_selected")
    $("#btn_export_current").removeClass("box_tag_selected")
});

$(document).on("click", "#btn_import", function() {
    v_obj = $(this)
    v_id = v_obj.attr("id")
    console.log(v_id)

    v_data = $("#field_import").val()
    //v_json = JSON.parse(JSON.stringify(v_json));

    try {
        v_json = JSON.parse(v_data);
    } catch {
        v_json = null
    }

    console.log(v_json)

    if (typeof v_json === "object" && v_json !== null && isJsonable(v_data)) {

        db_build_update = JSON.parse(JSON.stringify(db_build));
        if ("name" in v_json) {
            console.log("add new [single]")
            v_key = sanitizeString(v_json["name"])
            console.log(`[>] NEW: ${v_key}`)
            db_build_update[v_key] = v_json
        } else {
            console.log("add new [multiple]")
            for (v_key in v_json) {
                v_key = sanitizeString(v_key)
                console.log(`[>] NEW: ${v_key}`)
                db_build_update[v_key] = v_json[v_key]
            }
        }

        console.log(db_build_update)

        //db_build = v_json
        db_build = JSON.parse(JSON.stringify(db_build_update))
        set_private_db("private_db_build", db_build)
        load_build_list()
        $("#modal_import .close").click()
        $("#field_import").val("")

    } else {
        alert("Nothing to import or error on data")
    }

});

$(document).on("click", "[id^=btn_char_]", function() {
    v_obj = $(this)
    v_id = v_obj.attr("id")
    console.log(v_id)

    v_build_stored = v_id.replace("btn_char_", "")

    set_build_stored(v_build_stored)
    
});

function set_build_tag(v_build_tag) {
    if (build_template["name"] !== "" ) {
        build_template["tag"] = v_build_tag
        debug_build_template()
    }

    $("[id^=btn_tag_]").removeClass("box_tag_selected")
    $(`#btn_tag_${v_build_tag}`).addClass("box_tag_selected")
}

$(document).on("click", "[id^=btn_tag_]", function() {
    v_obj = $(this)
    v_id = v_obj.attr("id")
    //console.log(v_id)
    v_build_tag = v_id.replace("btn_tag_", "")

    set_build_tag(v_build_tag)
    
});

$(document).on("click", "#btn_view_mode", function() {
    //view_mode = $("#field_view_mode").val()
    if (view_mode === "edit") {
        view_mode = "bars"
    } else {
        view_mode = "edit"
    }
    set_view_mode(view_mode)
    load_build_template(build_template)
});

$(document).on("click", "#btn_build_share", function() {
    v_url = window.location.href
    v_url = window.location.href.split('?')[0];
    v_url = v_url.replace("#", "")
    v_data = Base64.encode(JSON.stringify(build_template))

    v_url = `${v_url}?build=${v_data}`
    v_url = url_shortener(v_url)

    console.log(v_url)

    $("#debug_share").val(v_url)
    copyToClipboard()
    
});

$(document).on("click", "#btn_build_new", function() {

    show_msg("New")

    reset_build()

    //$("#slot_mask_item").val("Coyote's Mask").change()
    //$("#slot_mask_core").val("Armor").change()
});

$(document).on("click", "#btn_build_delete", function() {
    v_obj = $("#field_build_select")
    v_build_name = v_obj.val()
    console.log(`DELETE: ${v_build_name}`)

    var result = confirm("Want to delete?");
    if (result) {
        delete db_build[v_build_name]
        set_private_db("private_db_build", db_build)

        load_build_list()

        reset_build()

        v_obj.prop("selectedIndex",0)
    }
    
});

$(document).on("click", "#btn_build_clone", function() {
    v_build_name = $("#field_build_name").val()
    v_build_name = sanitizeString(v_build_name)
    
    if (v_build_name === "") {
        alert("please select a build first")
        return
    }

    show_msg("Cloned")

    v_build_name = `${v_build_name} [COPY]`
    $("#field_build_name").val(v_build_name)
    
    build_template["name"] = v_build_name
    db_build[v_build_name] = JSON.parse(JSON.stringify(build_template));

    load_build_list()
    $("#field_build_select").val(v_build_name)

    set_private_db("private_db_build", db_build)
    
});

$(document).on("click", "#btn_build_save", function() {

    v_build_name = $("#field_build_name").val()
    v_build_name = sanitizeString(v_build_name)
    v_build_selected = $("#field_build_select").val()
    v_build_selected = sanitizeString(v_build_selected)

    if (v_build_name === "") {
        alert("please set build name")
        return
    }

    show_msg("Saved")

    db_build[v_build_name] = JSON.parse(JSON.stringify(build_template));

    if (v_build_name !== v_build_selected) {
        delete db_build[v_build_selected]
    }

    load_build_list()
    $("#field_build_select").val(v_build_name)
    
    set_private_db("private_db_build", db_build)

    v_build_selected = $('#field_build_select').val();
    exists = false
    $('#field_build_select option').each(function() {
        if (this.value === v_build_name) {
            $('#field_build_select').val(v_build_name);
            exists = true;
            return false;
        }
    });

    if (exists === false) {
        content = `<option>${v_build_name}</option>`
        $("#field_build_select").append(content)
        $("#field_build_select").val(v_build_name);
    }

    //$(`#field_build_select option[value=${v_build_name}]`)
    
    var v_json_str = JSON.stringify(build_template, null, 2); // spacing level = 2
    $("#debug_build").html(v_json_str)
    $("#debug_build").val(v_json_str)

    var v_json_str = JSON.stringify(db_build, null, 2); // spacing level = 2
    $("#debug_db_build").html(v_json_str)
    $("#debug_db_build").val(v_json_str)

    console.log(db_build)

});

$(document).on("click", "#btn_build_del", function() {
    
});

function reset_build() {
    //$("#field_build_select").val("[build]")

    set_db_stats()
    $("#slot_viewstats").empty()

    $("#stats_dmg").html("0")
    $("#stats_armor").html("0")
    $("#stats_health").html("0")

    $("#total_core_offensive").html("0")
    $("#total_core_defensive").html("0")
    $("#total_core_utility").html("0")

    $("#total_attr_offensive").html("0")
    $("#total_attr_defensive").html("0")
    $("#total_attr_utility").html("0")

    

    build_template = JSON.parse(JSON.stringify(build_scheme));

    $("#debug_build").html("")
    $("#debug_build").val("")
    $(`#slot_specialization`).empty()

    $("#field_build_name").val("")
    $("#field_build_desc").val("")
    //$("#field_build_desc").html("")

    $("select").prop("selectedIndex",0);
    $("select").prop("selectedIndex",0).removeClass();
    $("select").prop("selectedIndex",0).addClass("bg_default");
    $("input").prop("value", "");
    $("input").prop("placeholder", "");

    $("#field_build_name").prop("placeholder", "[name]");

    //return 
    $('[id*=_icon]').html(`<img width="15px" src="icons/blank_attribute.png">`)
    $('[id*=_mod_icon]').html(`<img width="15px" src="icons/blank_mod.png">`)

    for (let v_key of ["slot_mask", "slot_backpack", "slot_chest", "slot_gloves", "slot_holster", "slot_kneepads"]) {
        console.log(v_key)
        $(`#${v_key}`).removeClass()
        $(`#${v_key}_header`).removeClass()

        $(`#${v_key}`).addClass("build_armor_body")
        $(`#${v_key}_header`).addClass("build_armor_title")
        $(`#${v_key}`).addClass("bg_slot_default_body")
        $(`#${v_key}_header`).addClass("bg_slot_default_header")

        $(`#${v_key}`).empty()
    }

    for (let v_key of ["slot_primary", "slot_secondary", "slot_sidearm"]) {
        console.log(v_key)
        $(`#${v_key}`).removeClass()
        $(`#${v_key}_header`).removeClass()

        if (["slot_primary", "slot_secondary"].includes(v_key)) {
            v_category = "weapon"
        } else {
            v_category = "sidearm"
        }
        

        $(`#${v_key}`).addClass(`build_${v_category}_body`)
        $(`#${v_key}_header`).addClass(`build_${v_category}_title`)
        $(`#${v_key}`).addClass("bg_slot_default_body")
        $(`#${v_key}_header`).addClass("bg_slot_default_header")

        $(`#${v_key}`).empty()
    }
    
}

$(document).on("change", "#field_build_name", function() {
    v_build_name = $("#field_build_name").val()
    v_build_name = sanitizeString(v_build_name)
    $("#field_build_name").val(v_build_name)
    build_template["name"] = v_build_name

    var v_json_str = JSON.stringify(build_template, null, 2); // spacing level = 2
    $("#debug_build").html(v_json_str)
    $("#debug_build").val(v_json_str)
});

$(document).on("change", "#field_build_desc", function() {
    v_build_desc = $("#field_build_desc").val()
    v_build_desc = sanitizeString(v_build_desc)
    $("#field_build_desc").val(v_build_desc)
    build_template["desc"] = v_build_desc

    var v_json_str = JSON.stringify(build_template, null, 2); // spacing level = 2
    $("#debug_build").html(v_json_str)
    $("#debug_build").val(v_json_str)
});

$(document).on("change", "[id^=slot_X]", function() {
    v_id = $(this).attr("id")
    console.log(v_id)

    v_temp = v_id.split("_")
    v_id_root = `${v_temp[0]}_${v_temp[1]}`

    if (["slot_mask_item", "slot_backpack_item", "slot_chest_item", "slot_gloves_item", "slot_holster_item", "slot_kneepads_item"].includes(v_id)) {
        v_temp = v_id.split("_")
        v_id_root = `${v_temp[0]}_${v_temp[1]}`
        v_item = $(`#${v_id_root}_item`).val()

        v_slot = v_id.replace("slot_", "").replace("_item", "")
        make_build_body(v_id_root, v_slot, v_item)
    }

    if (v_id.endsWith("_item")) {
        v_obj = $(`#${v_id}`)
        console.log(v_obj)
        v_type = v_obj.find(':selected').data('type')
        set_slot_class(v_id_root, v_type)
    }
    

    return

    // SET BUILD VALUES ./
    //let pattern = /^\w+\_\w+/g;
    //v_id_root = v_id.match(pattern)
    //console.log(`root: ${v_id_root}`)

    if ($(`#${v_id_root}_item`).val().startsWith("[") || $(`#${v_id_root}_item`).val() === "") {
        v_build_item = ""
    } else {
        v_build_item = $(`#${v_id_root}_item`).val()
    }
    
    build_template[v_id_root]["item"] = v_build_item

    v_key = v_id.replace(v_id_root, "").replace("_value", "").replace("_", "")
    if (v_key !== "" && v_key !== "header") {
        //console.log(`${v_id_root} : ${v_key}`)
        if ($(`#${v_id}`).val().startsWith("[") || $(`#${v_id}`).val() === "") {
            build_template[v_id_root][v_key]["type"] = ""
            build_template[v_id_root][v_key]["value"] = 0
        } else {
            try {
                console.log(`------------`)
                console.log(`v_id: ${v_id}`)
                console.log(`v_id_root: ${v_id_root}`)
                console.log(`v_key: ${v_key}`)
                v_main = v_id.replace("_value", "")
                build_template[v_id_root][v_key]["type"] = $(`#${v_main}`).val()
                v_value = $(`#${v_main}_value`).val()
                if (v_value === "") {
                    v_value = $(`#${v_id}`).find(':selected').data('max')
                }
                build_template[v_id_root][v_key]["value"] = v_value
            } catch(err) {
                console.log(`ERROR v_id: ${v_id}`)
                console.log(`ERROR v_id_root: ${v_id_root}`)
                console.log(`ERROR v_key: ${v_key}`)
                console.log(err)
            }
            
        }
        
    }
    
    var v_json_str = JSON.stringify(build_template, null, 2); // spacing level = 2
    $("#debug_build").html(v_json_str)
    $("#debug_build").val(v_json_str)
    
    // SET BUILD VALUES /.

    
    
    if (v_id.endsWith("_core")) {
        v_value = $(`#${v_id}`).val()
        v_value_max = $(`#${v_id}`).find(':selected').data('max')
        if (v_value === "Armor") $(`#${v_id}_icon`).html(`<img width="15px"  src="icons/defense1.png">`)
        else if (v_value === "Weapon Damage") $(`#${v_id}_icon`).html(`<img width="15px"  src="icons/offense1.png">`)
        else if (v_value === "Skill Tier") $(`#${v_id}_icon`).html(`<img width="15px" src="icons/tech1.png">`)
        else $(`#${v_id}_icon`).html(`<img width="15px" src="icons/blank_attribute.png">`)

        $(`#${v_id}_value`).attr("placeholder", v_value_max)
        console.log(`#${v_id}_value :: ${v_value_max}`)
    }

    if (v_id.endsWith("_attr1") || v_id.endsWith("_attr2")) {
        v_value = $(`#${v_id}`).find(':selected').data('icon')
        v_value_max = $(`#${v_id}`).find(':selected').data('max')
        if (v_value === "defensive") $(`#${v_id}_icon`).html(`<img width="15px"  src="icons/defense2.png">`)
        else if (v_value === "offensive") $(`#${v_id}_icon`).html(`<img width="15px"  src="icons/offense2.png">`)
        else if (v_value === "utility") $(`#${v_id}_icon`).html(`<img width="15px" src="icons/tech2.png">`)
        else $(`#${v_id}_icon`).html(`<img width="15px" src="icons/blank_attribute.png">`)

        $(`#${v_id}_value`).attr("placeholder", v_value_max)
        console.log(`#${v_id}_value :: ${v_value_max}`)
    }

    if (v_id.endsWith("_mod")) {
        v_value = $(`#${v_id}`).find(':selected').data('icon')
        v_value_max = $(`#${v_id}`).find(':selected').data('max')
        if (v_value === "defensive") $(`#${v_id}_icon`).html(`<img width="16px"  src="icons/defense3_2.png">`)
        else if (v_value === "offensive") $(`#${v_id}_icon`).html(`<img width="16px"  src="icons/offense3_2.png">`)
        else if (v_value === "utility") $(`#${v_id}_icon`).html(`<img width="16px" src="icons/tech3_2.png">`)
        else $(`#${v_id}_icon`).html(`<img width="15px" src="icons/blank_mod.png">`)

        $(`#${v_id}_value`).attr("placeholder", v_value_max)
        console.log(`#${v_id}_value :: ${v_value_max}`)
    }
});

$(document).on("click", "[id^=keep_id_]", function() {
    v_id = $(this).attr("id").replace("keep_id_", "")
    console.log(v_id)

    private_db_weapon = get_private_db_weapon()

    if (v_id in private_db_weapon && private_db_weapon[v_id]["keep"]) {
        private_db_weapon[v_id]["keep"] = false
        $(`#keep_id_${v_id}`).html("")
    } else {
        private_db_weapon[v_id]["keep"] = true
        $(`#keep_id_${v_id}`).html("&check;")
        
    }
    
    set_private_db_weapon(private_db_weapon)

    console.log(get_private_db_weapon()[v_id])
});

function load_weapon_list() {
    // https://stackoverflow.com/questions/12722891/jquery-autocomplete-on-select-event

    availableData = [
        ".CLASS_ALL",
        ".CLASS_ASSAULT RIFLES",
        ".CLASS_LIGHT MACHINE GUNS",
        ".CLASS_SUBMACHINE GUNS",
        ".CLASS_SHOTGUNS",
        ".CLASS_RIFLES",
        ".CLASS_MARKSMAN RIFLES",
        ".CLASS_PISTOLS",
        ".TYPE_NAMED",
        ".TYPE_EXOTIC"
    ]
    for (let v_key in db_weapon) {
        //console.log(v_key)
        availableData.push(db_weapon[v_key]["weapon_base_stats"])
    }
    availableData.sort()
    $("#field_weapon_list").autocomplete({
        source: availableData,
        select: function (event, ui) {
            var v_weapon_label = ui.item.label;
            var v_weapon_value = ui.item.value;
            console.log(`${v_weapon_label}: ${v_weapon_value}`)
            show_weapon(v_weapon_value)
            $(this).val("");
            return false;    
            //store in session
            //document.valueSelectedForAutocomplete = value 
        }
    });
}

function show_weapon(v_name) {
    
    v_bg = "bg_a"
    $("#tbody_weapon").empty()
    for (let v_key in db_weapon) {

        v_id = db_weapon[v_key]["id"]
        v_class = db_weapon[v_key]["class"]
        v_variant = db_weapon[v_key]["variant"]
        v_x = db_weapon[v_key]["x"]
        v_weapon_base_stats = db_weapon[v_key]["weapon_base_stats"]
        v_type = db_weapon[v_key]["type"]
        v_rpm = db_weapon[v_key]["rpm"]
        v_base_mag_size = db_weapon[v_key]["base_mag_size"]
        v_modded_mag_size = db_weapon[v_key]["modded_mag_size"]
        v_empty_reload = db_weapon[v_key]["empty_reload"]
        v_level_40_damage = db_weapon[v_key]["level_40_damage"].toLocaleString("en-US")
        v_dps = db_weapon[v_key]["dps"].toLocaleString("en-US")
        v_sustain_dps = db_weapon[v_key]["sustain_dps"].toLocaleString("en-US")
        v_total_mag = db_weapon[v_key]["total_mag"].toLocaleString("en-US")
        v_modded_sustain_dps = db_weapon[v_key]["modded_sustain_dps"]
        v_optimal_range = db_weapon[v_key]["optimal_range"]
        v_mod_slots = db_weapon[v_key]["mod_slots"]
        v_hsd = db_weapon[v_key]["hsd"]

        if (private_db_weapon[v_key]["keep"]) {
            v_private_keep = true
            v_private_keep_str = "&check;"
        } else {
            v_private_keep = false
            v_private_keep_str = ""
        }

        v_private_tag = private_db_weapon[v_key]["tag"]
        if (v_private_tag === 0) {
            v_private_tag_str = ""
        } else if (v_private_tag === 1) {
            v_private_tag_str = `<span class="glyphicon glyphicon-heart"></span>`
        } else if (v_private_tag === 2) {
            v_private_tag_str = `<span class="glyphicon glyphicon-tag"></span>`
        } else if (v_private_tag === 3) {
            v_private_tag_str = `<span class="glyphicon glyphicon-trash"></span>`
        } else {
            v_private_tag_str = ""
        }

        v_json = {
            "id": v_id,
            "class": v_class.toUpperCase(),
            "variant": v_variant,
            "tag": v_private_tag,
            "keep": v_private_keep,
            "x": v_x,
            "weapon_base_stats": v_weapon_base_stats,
            "type": v_type,
            "rpm": v_rpm,
            "base_mag_size": v_base_mag_size,
            "modded_mag_size": v_modded_mag_size,
            "empty_reload": v_empty_reload,
            "level_40_damage": v_level_40_damage,
            "dps": v_dps,
            "sustain_dps": v_sustain_dps,
            "total_mag": v_total_mag,
            "modded_sustain_dps": v_modded_sustain_dps,
            "optimal_range": v_optimal_range,
            "mod_slots": v_mod_slots,
            "hsd": v_hsd
        }

        if (v_weapon_base_stats.toLowerCase().startsWith(v_name.toLowerCase()) 
            || v_name === ".CLASS_ALL" 
            || v_name === ".CLASS_" + v_class.toUpperCase()
            || v_name === ".TYPE_" + v_type.toUpperCase()
            ) {
            
            v_content  = `<tr class="${v_bg}">`
            
            for (let i in v_json) {
                v_value = v_json[i]

                if (i === "weapon_base_stats" && v_x === "x") {
                    v_class = "bg_rank_1"
                } else if (i === "weapon_base_stats" && v_x.toLowerCase() === "m") {
                    v_class = "bg_rank_2"
                } else {
                    v_class = ""
                }

                if (i === "type" && v_type === "exotic") {
                    v_class = v_class + " type_exotic"
                    v_value = "Exotic"
                } else if (i === "type" && v_type.toLowerCase() === "named") {
                    v_class = v_class + " type_named"
                    v_value = "Named"
                } else if (i === "type") {
                    v_value = ""
                }

                if (v_value === undefined || v_value === null) {
                    v_value = ""
                }

                if (i === "keep") {
                    //v_content += `<td class="${v_class}" style="text-align: center"><input type="checkbox"></td>`
                    v_content += `<td id="keep_id_${v_id}" class="${v_class} pointer" style="text-align:center; font-size: 14px">${v_private_keep_str}</td>`
                    //v_content += `<label class="container" style="text-align: center"><input type="checkbox"><span class="checkmark"></span></label>`
                    //v_content += `</td>`

                } else if (i === "tag") {
                    v_content += `<td id="tag_id_${v_id}" class="${v_class} pointer context-menu-left" style="text-align:center; font-size: 14px">${v_private_tag_str}</td>`
                
                } else {
                    v_content += `<td class="${v_class}" nowrap>${v_value}</td>`
                }
                
                /*
                if (i === "tag") {
                    v_content += `<td id="tag_id_${v_id}" class="${v_class}" style="text-align:center; font-size: 14px">${v_private_keep_str}</td>`
                    
                } else {
                    v_content += `<td class="${v_class}" nowrap>${v_value}</td>`
                }
                */
            }
            v_content += `</tr>`
            $("#tbody_weapon").append(v_content)
            
            // BACKGROUND
            if (v_bg === "bg_a") {
                v_bg = "bg_b"
            } else {
                v_bg = "bg_a"
            }
        }
    }
}

function weapon_title() {
        v_content  = `<tr>`
        for (let v_key in db_weapon_title) {
            v_content += `<td class="table_title">${db_weapon_title[v_key]["short"]}</td>`
        }
        v_content += `</tr>`
        //console.log(v_content)
        $("#thead_weapon").append(v_content)
}

/*
(function($) {
    $.fn.contextMenu = function(items) {
        var target, menu = $("<div>")
        .css({"background-color":"#eee",border:"1px solid black",padding:"5px"})
        .appendTo("body").hide()
        .hover(jQuery.noop(), function() { $(this).hide() }) ;
        for(var i = 0; i < items.length; i++) (function() {
        var item = items[i] ;
        menu.append($("<div>").html(item.title).css({"padding":"0 5 0 5"})
            .click(function() { item.action(target) ; menu.hide() } ) 
            .hover(
            function() { $(this).css({"background-color":"#aaf","color":"white"}) },
            function() { $(this).css({"background-color":"","color":""}) } )
        ) ;    
        })() ;
        this.each(function() { 
        $(this).bind('contextmenu', function(e) {
            target = $(this) ;
            menu.css({position:"absolute",left:e.pageX - 2,top:e.pageY - 2}).show() ;
            return (false) ; // don't propagate up
        }) ;
        } ) ;
    } ;
    })(jQuery) ;
*/

// REF: https://mentaljetsam.wordpress.com/2010/10/13/simple-jquery-popup-context-menu/
(function($) {
    $.fn.setTag = function(items) {
        var target, menu = $("<div>")
        .css({"background-color":"#333",border:"1px solid black", padding:"4px", width: "120px"})
        .appendTo("body").hide()
        .hover(jQuery.noop(), function() { $(this).hide() }) ;
        for(var i = 0; i < items.length; i++) (function() {
        var item = items[i] ;
        menu.append($("<div>").html(item.title).css({"padding":"0 5 0 5"})
            .click(function() { item.action(target) ; menu.hide() } ) 
            .hover(
            function() { $(this).css({"background-color":"#222","color":"white"}) },
            function() { $(this).css({"background-color":"","color":""}) } )
        ) ;    
        })() ;
        this.each(function() { 
        $(this).bind('contextmenu', function(e) {
            target = $(this) ;
            menu.css({position:"absolute",left:e.pageX - 2,top:e.pageY - 2}).show() ;
            return (false) ; // don't propagate up
        }) ;
        } ) ;
    } ;
    })(jQuery) ;

    /*
    $(document).ready(function() {
    var items = [
        {title:"<img src='public.png'>Small", action:function(e) { e.animate({"font-size":"16px"}, 200) ; } },
        {title:"<img src='private.png'>Mediam", action:function(e) { e.animate({"font-size":"26px"}, 200) ; } },
        {title:"<img src='group.png'>Large", action:function(e) { e.animate({"font-size":"36px"}, 200) ; } },
        {title:"<img src='cancel.png'>Huge", action:function(e) { e.animate({"font-size":"46px"}, 200) ; } }
    ] ;
    $(".popup").contextMenu(items) ;
    }) ;
    */

    $(document).on("click", "[id^=tag_id_X]", function() {
        console.log($(this).attr("id"))
        v_id = $(this).attr("id")
        v_weapon_id = v_id.replace("tag_id_", "")

        var items = [
            {title:`<span class="glyphicon glyphicon-erase"></span> Clear`, action:function(e) { set_weapon_tag(v_weapon_id, 0) ; } },
            {title:`<span class="glyphicon glyphicon-heart"></span> Favourite`, action:function(e) { set_weapon_tag(v_weapon_id, 1) ; } },
            {title:`<span class="glyphicon glyphicon-tag"></span> Keep`, action:function(e) { set_weapon_tag(v_weapon_id, 2) ; } },
            {title:`<span class="glyphicon glyphicon-trash"></span> Trash`, action:function(e) { set_weapon_tag(v_weapon_id, 3) ; } }
        ] ;
        $(`#${v_id}`).setTag(items) ;
    }) ;

    $(document).on("click", "[id^=set_tag_]", function() {
        v_weapon_id = $("#contextMenu").data("id")
        v_weapon_tag = $(this).attr("id").replace("set_tag_", "")
        v_weapon_tag = parseInt(v_weapon_tag)
        console.log(v_weapon_id, v_weapon_tag)
        set_weapon_tag(v_weapon_id, v_weapon_tag)
    }) ;

    function set_weapon_tag(v_weapon_id, v_weapon_tag) {
        private_db_weapon = get_private_db_weapon()
        private_db_weapon[v_weapon_id]["tag"] = v_weapon_tag
        set_private_db_weapon(private_db_weapon)

        console.log(private_db_weapon[v_weapon_id])

        v_private_tag = v_weapon_tag
        if (v_private_tag === 0) {
            v_private_tag_str = ""
        } else if (v_private_tag === 1) {
            v_private_tag_str = `<span class="glyphicon glyphicon-heart"></span>`
        } else if (v_private_tag === 2) {
            v_private_tag_str = `<span class="glyphicon glyphicon-tag"></span>`
        } else if (v_private_tag === 3) {
            v_private_tag_str = `<span class="glyphicon glyphicon-trash"></span>`
        } else {
            v_private_tag_str = ""
        }

        $(`#tag_id_${v_weapon_id}`).html(v_private_tag_str)
    }



    $(function() {

        var $contextMenu = $("#contextMenu");
        $contextMenu.css({"background-color":"#111", border:"1px solid black", padding: "5px", width: "100px"})           
        
        $("body").on("click", "[id^=tag_id_]", function(e) {

            console.log($(this).attr("id"))
            v_id = $(this).attr("id")
            v_weapon_id = v_id.replace("tag_id_", "")
            $contextMenu.data("id", v_weapon_id)

            $contextMenu.css({
            display: "block",
            left: e.pageX,
            top: e.pageY
            });
            
            return false;
        });
        
        $contextMenu.on("click", "a", function() {
            $contextMenu.hide();
        });

    });

    $(document).on("mouseleave", "#contextMenu", function() {
        $("#contextMenu").hide();
    });

    const cyrb53 = function(str, seed = 0) {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
        h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
        return 4294967296 * (2097151 & h2) + (h1>>>0);
    };

    function sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key];
            var y = b[key];

            if (typeof x == "string")
            {
                x = (""+x).toLowerCase(); 
            }
            if (typeof y == "string")
            {
                y = (""+y).toLowerCase();
            }

            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    function set_slot_class(v_slot, v_type, v_category="armor") {
        //console.log(v_slot, v_type)
        if(v_type === "" || v_type === null || v_type === undefined) {
            $(`#${v_slot}_item`).each(function()
            {
                $(this)[0].selectedIndex=0;
            });
        } else {
            v_type = v_type.toLowerCase().replace("item_", "")
            console.log(v_slot, v_type)
            v_obj_header = $(`#${v_slot}_header`)
            v_obj = $(`#${v_slot}`)

            v_obj_header.removeClass()
            v_obj_header.addClass(`build_${v_category}_title`)
            v_obj.removeClass()
            v_obj.addClass(`build_${v_category}_body`)

            if (v_type === "exotic") {
                v_obj_header.addClass("bg_slot_exotic_header")
                v_obj.addClass("bg_slot_exotic_body")
            } else if (["set", "gearset"].includes(v_type)) {
                v_obj_header.addClass("bg_slot_set_header")
                v_obj.addClass("bg_slot_set_body")
            } else if (["named"].includes(v_type)) {
                v_obj_header.addClass("bg_slot_named_header")
                v_obj.addClass("bg_slot_named_body")
            } else if (["normal", "highend", "high end"].includes(v_type)) {
                v_obj_header.addClass("bg_slot_highend_header")
                v_obj.addClass("bg_slot_highend_body")
            } else {
                v_obj_header.addClass("bg_slot_default_header")
                v_obj.addClass("bg_slot_default_body")
            }
        }
        
    }

    function set_slot_weapon(v_slot_id, v_type="weapon") {
        // SET HEADER ./
        if (v_type === "sidearm") {
            v_size = 248
        } else {
            v_size = css_socket_select_width
        }
        v_title = v_slot_id.replace("slot_", "")
        content  = `<select id="${v_slot_id}_item" style="width: ${v_size}px;" onchange="this.className=this.options[this.selectedIndex].className">`
        content += `    <option class="bg_default">[${v_title}]</option>`
        
        db = sortByKey(db_weapon, "item")
        db = sortByKey(db, "type")
        db = sortByKey(db, "class")
        for (let v_key in db) {
            
            v_item = db[v_key]["item"]
            v_item_class = db[v_key]["class"]
            v_item_quality = db[v_key]["type"]
            if (["exotic"].includes(v_item_quality.toLowerCase())) v_class = "item_exotic"
            else if (["set", "gearset"].includes(v_item_quality.toLowerCase())) v_class = "item_set"
            else if (["named"].includes(v_item_quality.toLowerCase())) v_class = "item_named"
            else if (["normal", "high end"].includes(v_item_quality.toLowerCase())) v_class = "item_normal"
            else v_class = "item_normal"

            v_item_alias = db_weapon_alias[v_item_class]

            if (db[v_key]["class"] !== "pistols" && v_type !== "sidearm") {
                content += `<option class="${v_class}" data-type="${v_class}" value="${v_item}" value="${v_item}">${v_item_alias.toUpperCase()}: ${v_item}</option>`
                set_slot_class(v_slot_id, "default", v_type)
            } else if (db[v_key]["class"] === "pistols" && v_type === "sidearm") {
                content += `<option class="${v_class}" data-type="${v_class}" value="${v_item}" value="${v_item}">${v_item}</option>`
                set_slot_class(v_slot_id, "default", v_type)
            }
        }

        content += `</select>`
        $(`#${v_slot_id}_header`).html(content)

        // SET HEADER /.
    }

    function set_slot(v_slot_id) {

        // SET HEADER ./
        v_title = v_slot_id.replace("slot_", "")
        content  = `<select id="${v_slot_id}_item" style="width: ${css_socket_select_width}px;" onchange="this.className=this.options[this.selectedIndex].className">`
        content += `    <option class="bg_default">[${v_title}]</option>`
        
        db_gear = sortByKey(db_gear, "item")
        db_gear = sortByKey(db_gear, "quality")
        for (let v_key in db_gear) {
            if (db_gear[v_key]["slot"].toLowerCase() === v_slot_id.replace("slot_", "")) {
                v_item = db_gear[v_key]["item"]
                v_item_quality = db_gear[v_key]["quality"]
                if (["exotic"].includes(v_item_quality.toLowerCase())) v_class = "item_exotic"
                else if (["set", "gearset"].includes(v_item_quality.toLowerCase())) v_class = "item_set"
                else if (["named"].includes(v_item_quality.toLowerCase())) v_class = "item_named"
                else if (["normal", "high end"].includes(v_item_quality.toLowerCase())) v_class = "item_normal"
                else v_class = "item_normal"

                content += `<option class="${v_class}" data-type="${v_class}" value="${v_item}" value="${v_item}">${v_item}</option>`

                set_slot_class(v_slot_id, "default")
            }
            
        }

        content += `</select>`
        $(`#${v_slot_id}_header`).html(content)

        // SET HEADER /.

    }

    function sanitizeString(str){
        str = str.replace(/[^a-z0-9 ?&=/\:\'\+\[\]\(\)\.,_-]/gim,"");
        return str.trim();
    }

    function make_option_list(v_socket_type) {

        chk = false
        if (v_socket_type === "core") {
            db = db_gear_core
            chk = true
        } else if (v_socket_type === "attr") {
            db = db_gear_attribute
            chk = true
        } else if (v_socket_type === "mod") {
            db = db_gear_mod
            chk = true
        } else if (v_socket_type === "talent") {
            db = db_gear_talent
            chk = true
        }

        content = ""
        if (chk && v_socket_type !== "talent") {
            for (let v_key in db) {
                if (v_key === "defensive") v_class = "bg_blue"
                else if (v_key === "offensive") v_class = "bg_red"
                else if (v_key === "utility") v_class = "bg_yellow"
                for (let v_key_attr in db[v_key]) {
                    v_max = db[v_key][v_key_attr]["max"]
                    content += `<option data-icon="${v_key}" data-max="${v_max}" class="${v_class}" value="${v_key_attr}">${v_key_attr}</option>`
                }
            }
        } else if (chk) {
            for (let v_key in db) {
                //v_max = db[v_key][v_key_attr]["max"]
                content += `<option class="${v_class}" value="${v_key}">${v_key}</option>`
            }
        }

        return content
        
    }

    function get_socket_default(v_socket_value) {
        //console.log(`[>] ${v_item}`)
        v_data = {
            "name": v_socket_value,
            "type": "",
            "class": "",
            "max": 0
        }
        for (let v_key in db_gear_core) {
            //console.log(v_key)
            if (db_gear_core[v_key].hasOwnProperty(v_socket_value)) {
                v_data["type"] = v_key
                v_data["class"] = v_key
                v_data["max"] = db_gear_core[v_key][v_socket_value]["max"]
                return v_data
            }
        }

        for (let v_key in db_gear_attribute) {
            //console.log(v_key)
            if (db_gear_attribute[v_key].hasOwnProperty(v_socket_value)) {
                v_data["type"] = v_key
                v_data["class"] = v_key
                v_data["max"] = db_gear_attribute[v_key][v_socket_value]["max"]
                return v_data
            }
        }

        for (let v_key in db_gear_mod) {
            if (db_gear_mod[v_key].hasOwnProperty(v_socket_value)) {
                v_data["type"] = v_key
                v_data["class"] = v_key
                v_data["max"] = db_gear_mod[v_key][v_socket_value]["max"]
                return v_data
            }
        }

        for (let v_key in db_gear_extra) {
            if (db_gear_extra[v_key].hasOwnProperty(v_socket_value)) {
                v_data["type"] = v_key
                v_data["class"] = v_key
                v_data["max"] = db_gear_extra[v_key][v_socket_value]["max"]
                return v_data
            }
        }

        return v_data
        
    }

    function set_db_stats() {
        db_stats = {
            "offensive": {},
            "defensive": {},
            "utility": {}
        }
        
        db = db_gear_core
        for (let v_socket_class in db) {
            for (let v_key in db[v_socket_class]) {
                db_stats[v_socket_class][v_key] = 0
            }
        }

        db = db_gear_attribute
        for (let v_socket_class in db) {
            for (let v_key in db[v_socket_class]) {
                db_stats[v_socket_class][v_key] = 0
            }
        }

        db = db_gear_mod
        for (let v_socket_class in db) {
            for (let v_key in db[v_socket_class]) {
                db_stats[v_socket_class][v_key] = 0
            }
        }

        db = db_gear_extra
        for (let v_socket_class in db) {
            for (let v_key in db[v_socket_class]) {
                db_stats[v_socket_class][v_key] = 0
            }
        }

        // LOAD BASELINE
        v_stats_dmg = db_baseline["stats_dmg"]
        v_stats_armor = db_baseline["stats_armor"]
        v_stats_health = db_baseline["stats_health"]

        db_stats["defensive"]["Armor"] = v_stats_armor
        db_stats["defensive"]["Health"] = v_stats_health

        return db_stats

    }

    function show_db_stats(v_socket_class) {
        $("#slot_viewstats").empty()
        content = "<table>"
        for (let v_key in db_stats[v_socket_class]) {
            v_value = db_stats[v_socket_class][v_key]

            if (v_value === 0) {
                v_value = "-"
            } else {
                if (v_key === "Skill Tier") {
                    //
                } else if (v_value <= 500) {
                    v_value = `+${v_value.toFixed(1)}%`
                } else {
                    v_value = nFormatter(v_value)
                }
            }
            

            content += "<tr>"
            content += `    <td class="stats_list_value">${v_value}</td>`
            content += `    <td class="stats_list">${v_key}</td>`
            content += "</tr>"

            //content = `<div><span class="stats_list_value">${v_value}</span><span class="stats_list">${v_key}</span></div>`
            
        }
        content += "</table>"
        $("#slot_viewstats").append(content)
    }

    function load_build_template(build_template) {
        $("#field_build_name").val(build_template["name"])
        $("#field_build_desc").val(build_template["desc"])
        $(`#slot_specialization`).empty()

        if(build_template["stored"] !== "" && build_template["stored"] !== undefined) {
            v_build_stored = build_template["stored"]
        } else {
            v_build_stored = "1"
        }
        set_build_stored(v_build_stored)

        if(build_template["tag"] !== "" && build_template["tag"] !== undefined) {
            v_build_tag = build_template["tag"]
        } else {
            v_build_tag = "loadout"
        }
        set_build_tag(v_build_tag)

        v_total_core_attr = {
            "total_core_offensive": 0,
            "total_core_defensive": 0,
            "total_core_utility": 0,
            "total_attr_offensive": 0,
            "total_attr_defensive": 0,
            "total_attr_utility": 0
        }

        // LOAD BASELINE
        v_stats_dmg = db_baseline["stats_dmg"]
        v_stats_armor = db_baseline["stats_armor"]
        v_stats_health = db_baseline["stats_health"]

        set_db_stats()

        for (let v_slot_id in build_template) {
            
            if(["slot_mask", "slot_backpack", "slot_chest", "slot_gloves", "slot_holster", "slot_kneepads"].includes(v_slot_id)) {

                for (let v_key2fix in build_template[v_slot_id]) {
                    if (v_key2fix === "core") {
                        build_template[v_slot_id]["socket1"] = build_template[v_slot_id][v_key2fix]
                        delete build_template[v_slot_id][v_key2fix]
                    } else if (v_key2fix === "attr1") {
                        build_template[v_slot_id]["socket2"] = build_template[v_slot_id][v_key2fix]
                        delete build_template[v_slot_id][v_key2fix]
                    } else if (v_key2fix === "attr2") {
                        build_template[v_slot_id]["socket3"] = build_template[v_slot_id][v_key2fix]
                        delete build_template[v_slot_id][v_key2fix]
                    } else if (v_key2fix === "mod") {
                        build_template[v_slot_id]["socket4"] = build_template[v_slot_id][v_key2fix]
                        delete build_template[v_slot_id][v_key2fix]
                    } else if (v_key2fix === "talent") {
                        build_template[v_slot_id]["socket5"] = build_template[v_slot_id][v_key2fix]
                        delete build_template[v_slot_id][v_key2fix]
                    }
                }

                console.log(build_template[v_slot_id])
                v_item = build_template[v_slot_id]["item"]
                
                v_item_type = v_slot_id.replace("slot_", "")
                console.log(v_slot_id)
                
                make_build_body(v_slot_id, v_item_type, v_item) //make_build_body("slot_mask", "Mask", "Coyote's Mask")
                ////set_slot_class()

                //view_mode = "bars"
                if (view_mode === "bars") {
                    $(`#${v_slot_id}`).empty()
                    //make_build_body_mode_bars (v_socket_name, v_socket_icon, v_socket_value, v_socket_max)
                } else {
                    //make_build_body(v_slot_id, v_item_type, v_item) //make_build_body("slot_mask", "Mask", "Coyote's Mask")
                }

                // LOAD SAVED VALUES
                for (let v_slot_sub_key in build_template[v_slot_id]) {
                    if (v_slot_sub_key.startsWith("socket")) {
                        v_json = build_template[v_slot_id][v_slot_sub_key]
                        v_socket_name = v_json["name"]
                        v_socket_value = v_json["value"]
                        v_socket_class = v_json["class"]
                        v_socket_type = v_json["socket"]
                        v_socket_icon = make_icon(v_socket_type, v_socket_class)
                        v_socket_default = get_socket_default(v_socket_name)
                        v_socket_max = v_socket_default["max"]
                        if (v_socket_value > v_socket_max) v_socket_value = v_socket_max

                        console.log(`[>>] ${v_socket_name} :: ${v_socket_value} :: ${v_socket_class} :: ${v_socket_icon}`)

                        v_id_socket = `${v_slot_id}_${v_slot_sub_key}_${v_socket_type}`

                        if (v_socket_name !== "") {
                            $(`#${v_id_socket}`).val(v_socket_name)
                            if (v_socket_value !== v_socket_max) {
                                $(`#${v_id_socket}_value`).val(v_socket_value)
                            }
                            $(`#${v_id_socket}_value`).attr("max", v_socket_max)
                            $(`#${v_id_socket}_value`).attr("placeholder", v_socket_max)
                            $(`#${v_id_socket}_icon`).attr("src", `icons/${v_socket_icon}`)
                            
                            $(`#${v_id_socket}`).removeClass()
                            $(`#${v_id_socket}`).addClass(`text_${v_socket_class}`)

                            v_tca_key = `total_${v_socket_type}_${v_socket_class}`
                            v_total_core_attr[v_tca_key] += 1

                            try {
                                db_stats[v_socket_class][v_socket_name] += Number(v_socket_value)
                            } catch {
                                console.log(`[!] db_stats > NO KEY: ${v_socket_name}`)
                            }
                        }
                        
                        // BASELINE
                        if (v_socket_name.toLowerCase() === "weapon damage") v_stats_dmg += Number(v_socket_value)
                        if (v_socket_name.toLowerCase() === "armor") v_stats_armor += Number(v_socket_value)
                        if (v_socket_name.toLowerCase() === "health") v_stats_health += Number(v_socket_value)

                        // VIEW MODE
                        if (view_mode === "bars") {
                            make_build_body_mode_bars (v_slot_id, v_socket_type, v_socket_name, v_socket_class, v_socket_value, v_socket_max)
                            console.log("----------------->")
                        }
                    }
                    
                }

            }

            for (v_tca_key in v_total_core_attr) {
                $(`#${v_tca_key}`).html(v_total_core_attr[v_tca_key])
            }

            if (["slot_primary", "slot_secondary", "slot_sidearm"].includes(v_slot_id)) {
                v_item_name = build_template[v_slot_id]["item"]
                if (v_item_name !== "" && v_item_name !== undefined) {
                    $(`#${v_slot_id}_item`).val(v_item_name)
                }

                make_build_body_weapon(v_slot_id, v_item_name)
                
            }

            // SPECIALIZATION
            if (["slot_specialization"].includes(v_slot_id)) {
                v_item_name = build_template[v_slot_id]["item"]
                if (v_item_name !== "" && v_item_name !== undefined) {
                    $(`#${v_slot_id}_item`).val(v_item_name)
                    $(`#slot_specialization`).empty()
                    content = ""
                    for (v_index in db_specialization[v_item_name]) {
                        $(`#slot_specialization`).append(db_specialization[v_item_name][v_index] + "<br>")
                    }
                }
            }

            // STATS
            //v_stats_dmg = db_baseline["stats_dmg"]
            //v_stats_armor = db_baseline["stats_armor"]
            //v_stats_health = db_baseline["stats_health"]
            $("#stats_dmg").html(`+${v_stats_dmg.toFixed(1)}%`)
            $("#stats_armor").html(nFormatter(v_stats_armor))
            $("#stats_health").html(nFormatter(v_stats_health))
        }

        console.log(db_stats)
        v_show_db_stats = $("#viewstats").val()
        show_db_stats(v_show_db_stats)

    }

    function nFormatter(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
    }

    function make_build_body_mode_bars (v_slot_id, v_socket_type, v_socket_name, v_socket_class, v_socket_value, v_socket_max) {
        //v_slot_id
        //v_socket
        //v_socket_name
        //v_socket_class
        //v_socket_value
        //v_socket_default = get_socket_default(v_socket_name)
        //v_socket_max = v_socket_default["max"]
        v_socket_icon = make_icon(v_socket_type, v_socket_name)
        
        if (v_socket_type.includes("talent")) {
            v_block = `
            <div class="bar_container_talent">
                ${v_socket_name}
            </div>
            `
        } else {
            if (v_socket_value > 100) {
                v_socket_value_show = `+${Number(v_socket_value).toLocaleString("en-US")}`
            } else {
                v_socket_value = Number(v_socket_value).toFixed(1)
                v_socket_value_show = `+${v_socket_value}%`
                if (v_socket_value_show.includes("NaN")) v_socket_value_show = "+0.0%"
            }
            v_percent = (v_socket_value / v_socket_max) * 100
            console.log(`[%] ${v_percent}`)
            if (v_percent <= 0) v_percent = 5
            
            v_block = `
            <div class="build_view_container">
                <span style="display: inline-block; margin-left: 10px;"><img src="icons/${v_socket_icon}" style="width: 16px;"></span>
                <span class="bar_text_value" style="display: inline-block;">${v_socket_value_show}</span>
                <span style="display: inline-block; margin-left: 10px;">${v_socket_name}</span>
                <div class="bar_container">
                    <div class="bar_bg bar_bg_${v_socket_class}" style="width: ${v_percent}%"></div>
                </div>
            </div>
            `
        }

        $(`#${v_slot_id}`).append(v_block)
    }

    function set_build_template_slot_default(v_slot_id, v_type, v_item) {
        console.log("--------------->")
        console.log(v_slot_id, v_type, v_item)
        v_gear_key = `${v_type}^${v_item}`.toLowerCase()

        v_gear_json = db_gear_key[v_gear_key]
        console.log(v_gear_json)

        build_template[v_slot_id] = {}
        build_template[v_slot_id]["item"] = v_item

        for (let v_key in v_gear_json) {
            if (v_key.startsWith("_socket") ) {

                v_socket_type = v_gear_json[v_key]
                
                if (["core", "attr", "mod", "talent", "core_fixed", "attr_fixed", "mod_fixed", "talent_fixed"].includes(v_socket_type)) {
                    //v_socket_id = v_key.replace("_", "")

                    v_socket_type_root = v_socket_type.replace("_fixed", "")
                    v_socket = v_key.replace("_", "")
                    v_socket_name = v_gear_json[v_socket]
                    console.log(`[>]${v_key} :: ${v_socket}`)
                    console.log(v_socket_name)
                    v_socket_default = get_socket_default(v_socket_name)
                    console.log(v_socket_default)

                    build_template[v_slot_id][v_socket] = {}
                    if (v_socket_name !== "X" && !v_socket_name.startsWith("[")) {
                        build_template[v_slot_id][v_socket]["name"] = v_socket_name
                        build_template[v_slot_id][v_socket]["socket"] = v_socket_type_root
                        build_template[v_slot_id][v_socket]["class"] = v_socket_default["type"]
                        build_template[v_slot_id][v_socket]["value"] = v_socket_default["max"]
                    } else {
                        delete build_template[v_slot_id][v_socket]
                    }
                    
                }
            }
        }

        /*
        for (let v_key in db_gear_key[v_gear_key]) {
            console.log(v_key)
            if (v_key.startsWith("_socket")) {
                build_template[v_slot_id][v_key.replace("_", "")] = {}

                v_default = get_socket_default()
            }
            
        }
        */

        debug_build_template()

    }

    $(document).on("change", "[id$=_item]", function() {
        v_obj = $(this)
        v_id = v_obj.attr("id")

        console.log(v_id)

        v_temp = v_id.split("_")
        v_id_root = `${v_temp[0]}_${v_temp[1]}`
        v_slot = v_id.replace("slot_", "").replace("_item", "")

        if (["slot_specialization_item"].includes(v_id)) {
            v_temp = v_id.split("_")
            v_id_root = `${v_temp[0]}_${v_temp[1]}`
            v_item = $(`#${v_id_root}_item`).val()
            v_item = sanitizeString(v_item)

            build_template[v_id_root] = {
                "item": v_item
            }

            if (v_item.startsWith("[")) {
                set_slot(v_id_root)
                $(`${v_id_root}_${v_slot}`).empty()
                
                set_slot_class(v_id_root, "default")
                build_template[v_id_root] = {}
            }

            debug_build_template()
        }

        if (["slot_mask_item", "slot_backpack_item", "slot_chest_item", "slot_gloves_item", "slot_holster_item", "slot_kneepads_item"].includes(v_id)) {
            v_temp = v_id.split("_")
            v_id_root = `${v_temp[0]}_${v_temp[1]}`
            v_item = $(`#${v_id_root}_item`).val()
            v_item = sanitizeString(v_item)
            v_category = "armor"

            //v_slot = v_id.replace("slot_", "").replace("_item", "")
            make_build_body(v_id_root, v_slot, v_item)

            set_build_template_slot_default(v_id_root, v_slot, v_item) // (slot_mask, mask, Hotshot)

            if (v_item.startsWith("[")) {
                set_slot(v_id_root)
                $(`${v_id_root}_${v_slot}`).empty()
                
                set_slot_class(v_id_root, "default")
                build_template[v_id_root] = {}

                //return
            }
        }

        if (["slot_primary_item", "slot_secondary_item", "slot_sidearm_item"].includes(v_id)) {
            v_temp = v_id.split("_")
            v_id_root = `${v_temp[0]}_${v_temp[1]}`
            v_item = $(`#${v_id_root}_item`).val()
            v_item = sanitizeString(v_item)

            /*
            if (["slot_primary_item", "slot_secondary_item"].includes(v_id)) {
                v_category = "weapon"
                //set_slot_class(v_id_root, v_type, v_category)
            } else {
                v_category = "sidearm"
                //set_slot_class(v_id_root, v_type, v_category)
            }
            */

            make_build_body_weapon(v_id_root, v_item)

            if (v_item.startsWith("[")) {
                set_slot(v_id_root)
                $(`${v_id_root}_${v_slot}`).empty()
                
                set_slot_class(v_id_root, "default", v_category)
                build_template[v_id_root] = {}

                set_slot_weapon(v_id_root, v_category)

                //return
            } else {
                build_template[v_id_root] = {
                    "item": v_item
                }
            }

            debug_build_template()
        }

        if (v_id.endsWith("_item")) {
            v_obj = $(`#${v_id}`)
            console.log(v_obj)
            v_type = v_obj.find(':selected').data('type')
            v_value = v_obj.val()
            console.log(v_value)
            
            set_slot_class(v_id_root, v_type, v_category)

            set_view_mode(mode="edit")

            //return
            
            /*
            if (["weapon", "primary", "secondary"].includes(v_slot)) {
                if (v_value.startsWith("[")) set_slot_class(v_id_root, "default", "weapon")
                else set_slot_class(v_id_root, v_type, "weapon")

            } else if (["sidearm"].includes(v_slot)) {
                if (v_value.startsWith("[")) set_slot_class(v_id_root, "default", "sidearm")
                else set_slot_class(v_id_root, v_type, "sidearm")

            } else {
                set_slot_class(v_id_root, v_type, v_category)
            }
            */
            
        }

        

    });

    function debug_build_template() {
        var v_json_str = JSON.stringify(build_template, null, 2); // spacing level = 2
        $("#debug_build").html(v_json_str)
        $("#debug_build").val(v_json_str)
    }

    function set_view_mode(mode="edit") {
        view_mode = mode
        $("#field_view_mode").val(mode)

        if (view_mode === "edit") {
            $("#btn_view_mode").removeClass("box_tag_selected")
        } else {
            $("#btn_view_mode").addClass("box_tag_selected")
        }

        load_build_template(build_template)
    }

    $(document).on("change", "[id*=_socket]", function() {
        v_obj = $(this)
        v_id = v_obj.attr("id")
        
        //v_socket_type = v_id.split("_").slice(-1)[0]
        v_value = v_obj.val() // example: Incoming Repairs
        v_value = sanitizeString(v_value)

        v_sub = v_id.split("_") // example: slot_mask_socket4_mod
        v_slot_id = `${v_sub[0]}_${v_sub[1]}`
        v_socket_id = `${v_sub[2]}`
        v_socket_type = `${v_sub[3]}`
        v_socket_name_id = `${v_slot_id}_${v_socket_id}_${v_socket_type}`
        //console.log(`v_socket_name_id: ${v_socket_name_id}`)
        v_socket_name = $(`#${v_socket_name_id}`).val()
        v_socket_name = sanitizeString(v_socket_name)
        //console.log(`v_socket_name: ${v_socket_name}`)
        v_class_type = get_class_type(v_socket_name) // example: defensive|offensive|utility
        //console.log(`v_class_type: ${v_class_type}`)
        v_socket_default = get_socket_default(v_socket_name)
        v_socket_max = v_socket_default["max"]

        console.log(v_id)
        console.log(v_socket_type, v_class_type)

        v_icon = make_icon(v_socket_type, v_class_type)
        //v_img = `<img src="icons/${v_icon}" style="width: 16px;" title="">`
        console.log(`icon: ${v_icon}`)
        $(`#${v_id}_icon`).attr("src", `icons/${v_icon}`)

        //v_class_type = get_class_type(v_value)
        if (!v_id.endsWith("_value")) {
            $(`#${v_id}`).removeClass()
            $(`#${v_id}`).addClass(`text_${v_class_type}`)

            v_socket_value = ""
        } else {
            v_socket_value = $(`#${v_socket_name_id}_value`).val()
        }
        
        //v_id = v_id.replace("_value", "")
        //v_socket_name = $(`#${v_id}`).val()
        //v_socket_name = sanitizeString(v_socket_name)

        if (v_socket_type !== "talent") {
            v_socket_value = sanitizeString(v_socket_value)
            if (v_socket_value === "" || v_socket_value === undefined) {
                v_socket_value = $(`#${v_socket_name_id}`).find(':selected').data('max')
                $(`#${v_socket_name_id}_value`).attr("placeholder", v_socket_max)
            }

            // FIX placeholder and max
            //v_socket_max = v_socket_default["max"]
            $(`#${v_socket_name_id}_value`).attr("max", v_socket_max)
            $(`#${v_socket_name_id}_value`).attr("placeholder", v_socket_max)

        }
        
        /*
        v_value = $(`#${v_id}`).val()
        v_value_max = $(`#${v_id}`).find(':selected').data('max')
        $(`#${v_id}_value`).attr("placeholder", v_value_max)
        console.log(`#${v_id}_value :: ${v_value_max}`)
        */
        
        build_template[v_slot_id][v_socket_id]["name"] = v_socket_name
        build_template[v_slot_id][v_socket_id]["socket"] = v_socket_type
        build_template[v_slot_id][v_socket_id]["value"] = v_socket_value
        build_template[v_slot_id][v_socket_id]["class"] = v_class_type
        
        var v_json_str = JSON.stringify(build_template, null, 2); // spacing level = 2
        $("#debug_build").html(v_json_str)
        $("#debug_build").val(v_json_str)

        set_view_mode(mode="edit")

    });


    function make_icon(v_socket_type, v_value) {
        console.log(v_socket_type, v_value)
        if (["defensive", "offensive", "utility"].includes(v_value)) {
            v_class_type = v_value
        } else {
            v_class_type = get_class_type(v_value)
        }
        
        console.log(`v_class_type: ${v_class_type}`)

        v_icon = `blank_mod.png`
        v_icon_title = ``

        if (["core"].includes(v_socket_type)) {
            if (v_class_type !== "" && v_class_type !== null) {
                v_icon = `${v_class_type}1.png`
            } else {
                v_icon = `blank_attribute.png`
            }
        } else if (["attr"].includes(v_socket_type)) {
            if (v_class_type !== "" && v_class_type !== null) {
                v_icon = `${v_class_type}2.png`
            } else {
                v_icon = `blank_attribute.png`
            }
        } else if (["mod"].includes(v_socket_type)) {
            if (v_class_type !== "" && v_class_type !== null) {
                v_icon = `${v_class_type}3_2.png`
            } else {
                v_icon = `blank_mod.png`
            }
        }

        return v_icon
    }

    function make_build_body_weapon(v_slot_id, v_item) {
        console.log("----- [make_build_body] ------")
        console.log(`v_slot_id: ${v_slot_id}`)  // slot_primary
        console.log(`v_item: ${v_item}`)        // Backfire
        console.log("----- [+] ------")

        $(`#${v_slot_id}`).empty()

        if (v_item !== "" && v_item !== undefined) {
            v_key = v_item.toLowerCase().trim()

            //build_db_weapon_key()

            console.log(`_${v_key}_`)
            v_record_json = db_weapon_key[v_key]
            console.log(db_weapon_key)
            console.log("2" + v_record_json)

            v_obj = $(`#${v_slot_id}_item`)
            v_obj.val(v_item)
            v_class = v_obj.find(':selected').attr('class')
            v_obj.removeClass()
            v_obj.addClass(v_class)

            v_type = v_obj.find(':selected').data('type')

            if (["slot_primary", "slot_secondary"].includes(v_slot_id)) {
                v_category = "weapon"
            } else {
                v_category = "sidearm"
            }
            set_slot_class(v_slot_id, v_type, v_category) // set_slot_class(v_slot_id, "exotic")
            
            if(v_item.startsWith("[")) {

            } else {
                v_item_class = v_record_json["class"]
                v_item_variant = v_record_json["variant"]
                v_item_type = v_record_json["type"]
                if (v_item_type === "normal") { v_item_type = "high-end" }
                v_block = `${v_item_class} <br> ${v_item_variant} <br> ${v_item_type}`

                $(`#${v_slot_id}`).append(v_block)
            }
        }

    }

    function make_build_body(v_slot_id, v_type, v_item) {
        console.log("----- [make_build_body] ------")
        console.log(`v_slot_id: ${v_slot_id}`)  // slot_mask
        console.log(`v_type: ${v_type}`)        // mask
        console.log(`v_item: ${v_item}`)        // Catharsis
        console.log("----- [+] ------")

        $(`#${v_slot_id}`).empty()

        v_gear_key = `${v_type}^${v_item}`.toLowerCase()
        
        console.log(v_gear_key)
        v_gear_json = db_gear_key[v_gear_key]
        console.log(v_gear_json)

        v_obj = $(`#${v_slot_id}_item`)
        v_obj.val(v_item)
        v_class = v_obj.find(':selected').attr('class')
        v_obj.removeClass()
        v_obj.addClass(v_class)

        v_type = v_obj.find(':selected').data('type')
        set_slot_class(v_slot_id, v_type) // set_slot_class(v_slot_id, "exotic")

        for (let v_key in v_gear_json) {
            if (v_key.startsWith("_socket") ) {

                v_socket_type = v_gear_json[v_key]
                
                if (["core", "attr", "mod", "talent", "core_fixed", "attr_fixed", "mod_fixed", "talent_fixed"].includes(v_socket_type)) {

                    v_socket_type_root = v_socket_type.replace("_fixed", "")
                    v_socket = v_key.replace("_", "")

                    v_id_socket = `${v_slot_id}_${v_socket}_${v_socket_type_root}`
                    //v_id_socket_value = `${v_slot_id}_${v_socket}_${v_socket_type_root}_value`

                    //console.log(v_id_socket)

                    if (v_socket_type.includes("talent")) {
                        if (v_socket_type.includes("fixed")) {
                            v_value = v_gear_json[v_key.replace("_", "")]
                            /*
                            v_socket_name = `<select id="${v_id_entry}" style="width: 170px;">
                                            <option>${v_value}</option>
                                        </select>`
                            */
                            v_socket_name = `<input id="${v_id_socket}" style="width: ${css_socket_name_width}px;" readonly value="${v_value}">`
                        } else {
                            v_option_list  = `<option>[${v_socket_type}]</option>`

                            if (v_slot_id.replace("slot_", "") === "backpack") v_key_top = "Backpack"
                            else if (v_slot_id.replace("slot_", "") === "chest") v_key_top = "Chest"
                            for (let v_key_talent in db_gear_talent[v_key_top]) {
                                if (!v_key_talent.startsWith("Perfect")) {
                                    v_option_list += `<option class="${v_class}">${v_key_talent}</option>`
                                }
                            }

                            v_socket_name = `<select id="${v_id_socket}" style="width: ${css_socket_name_width}px;">${v_option_list}</select>`
                            console.log(v_option_list)
                        }

                        v_img = ``
                        v_socket_value = ``

                    } else {

                        v_value = v_gear_json[v_key.replace("_", "")]
                        v_icon = make_icon(v_socket_type_root, v_value)
                        v_img = `<img id="${v_id_socket}_icon" src="icons/${v_icon}" style="width: 16px;" title="${v_id_socket}_icon">`
                        v_socket_default = get_socket_default(v_value)
                        v_max = v_socket_default["max"]
                        v_socket_value = `<input id="${v_id_socket}_value" type="number" min="1" max="${v_max}" style="width: ${css_socket_value_width}px; height: 21px;">`

                        if (v_socket_type.includes("fixed")) {
                            v_value = v_gear_json[v_key.replace("_", "")]

                            v_socket_name = `<input id="${v_id_socket}" style="width: ${css_socket_name_width}px;" readonly value="${v_value}">`
                        } else {
                            v_option_list  = `<option>[${v_socket_type}]</option>`
                            v_option_list += make_option_list(v_socket_type)

                            v_socket_name = `<select id="${v_id_socket}" style="width: ${css_socket_name_width}px;">${v_option_list}</select>`
                        }
                    }

                    v_block = `
                    <div style="padding-left: 2px;">
                        <div class="inline" style="width: 16px;">${v_img}</div>
                        <div class="inline" style="padding-left: 2px; padding-top: 4px">${v_socket_name}</div>
                        <div class="inline" style="padding-left: 2px; padding-top: 4px">${v_socket_value}</div>
                    </div>
                    `

                    $(`#${v_slot_id}`).append(v_block)
                    
                    //$(`#${v_slot_id}`).append(v_block)
                    
                    //v_socket_item_name = ""
                    v_socket_item_icon = ""
                    v_socket_item_value = ""
                    v_socket_item_max = ""

                    if (v_value !== "" && v_value !== "-") {
                        $(`#${v_id_socket}`).val(v_value)
                        console.log(`v_value: ${v_value}`)

                        //v_class_type = get_class_type(v_value)
                        v_socket_default = get_socket_default(v_value)
                        console.log(v_socket_default)
                        
                        $(`#${v_id_socket}`).removeClass()
                        $(`#${v_id_socket}`).addClass(`text_${v_socket_default["type"]}`)

                        $(`#${v_id_socket}_value`).attr("placeholder", v_socket_default["max"])
                        
                    }

                }
                
            } 
        }

        
    }

    //db_gear_key = {}
    function build_db_gear_key() {
        for (let v_record of db_gear) {
            v_key = `${v_record["class"].toLowerCase()}^${v_record["item"].toLowerCase()}`
            db_gear_key[v_key] = v_record
        }
        console.log(db_gear_key)
    }

    //db_weapon_key = {}
    function build_db_weapon_key() {
        for (let v_record of db_weapon) {
            //v_key = `${v_record["class"].toLowerCase()}^${v_record["item"].toLowerCase()}`
            v_key = `${v_record["item"].toLowerCase()}`
            db_weapon_key[v_key] = v_record
        }
        console.log(db_weapon_key)
    }

    
    function debug_build_dynamic() {
        build_db_weapon_key()
        build_db_gear_key()

        v_type = "Backpack"
        v_item = "Acosta's Go-Bag"

        v_type = "Backpack"
        v_item = "Future Initiative"

        v_type = "Holster"
        v_item = "Ammo Dump"

        //v_type = "Chest"
        //v_item = "Gila Guard"

        v_type = "Backpack"
        v_item = "Memento"

        v_slot_id = "debug_dynamic"
        v_slot_id = "slot_chest"
        
        /*
        make_build_body(v_slot_id, v_type, v_item)
        
        make_build_body("slot_mask", "Mask", "Coyote's Mask")
        make_build_body("slot_backpack", "Backpack", "Future Initiative")
        make_build_body("slot_chest", "Chest", "Future Initiative")
        make_build_body("slot_gloves", "Gloves", "Future Initiative")
        make_build_body("slot_holster", "Holster", "Future Initiative")
        make_build_body("slot_kneepads", "Kneepads", "Future Initiative")
        */
    }


    function search_run() {
        var table =  $('#myTable');

        v_url = "https://raw.githubusercontent.com/Division2-Loadout/ui/main/builds/index.json"
        
        $.ajaxSetup({async: false})
        $.getJSON( v_url, function( data ) {
            db_search = data
        });
        $.ajaxSetup({async: true})

        console.log(db_search)

        v_filter_name = $("#search_name").val().toLowerCase()
        for (let v_key in db_search) {
            if (v_filter_name === "") {
                db_search[v_key]["id"] = Number(v_key)
                db_search_filter.push(db_search[v_key])
            } else {
                if (db_search[v_key]["desc"].toLowerCase().includes(v_filter_name)) {
                    db_search[v_key]["id"] = Number(v_key)
                    db_search_filter.push(db_search[v_key])
                }
            }
        }

        db_search_filter = sortByKey(db_search_filter, "id")
        db_search_filter = sortByKey(db_search_filter, "date")
        db_search_filter.reverse()

        console.log(db_search_filter)

        max_size=db_search_filter.length;
        sta = 0;
        elements_per_page = 5;
        limit = elements_per_page;

        search_list(sta,limit);
    } 
    
    function search_list(sta,limit) {
        var table =  $('#search_table');
        for (var i =sta ; i < limit; i++) {            
            //var $nr = $('<tr><td>A-' + b[i]['play_id'] + '</td><td>B-' + b[i]['question1']  + '</td></tr>');
            try {
                console.log(db_search_filter[i])
                v_source = db_search_filter[i]["source"]
                if (v_source.includes("youtube.com")) {
                    //v_source_icon = "film"
                    v_source_icon = "link"
                } else {
                    v_source_icon = "link"
                }
                content  = `<tr>`
                content += `    <td nowrap c-lass="search_td" style="padding-left: 0px; padding-right: 0px; padding-top: 2px;">`
                content += `        <a id="btn_search_set_${db_search_filter[i]["id"]}" c-lass="menu_icon" style="color: #ccc" title="Download"><span class="glyphicon glyphicon-download-alt"></span></a>`
                content += `    </td>`
                //content += `    <td nowrap class="search_td" style="margin-left: 0px;">${db_search_filter[i]["id"]}</td>`
                content += `    <td nowrap class="search_td">${db_search_filter[i]["date"]}</td>`
                content += `    <td nowrap class="search_td">${db_search_filter[i]["credit"]}</td>`
                content += `    <td class="search_td" style="width: 300px">${db_search_filter[i]["desc"].toLowerCase()}</td>`
                content += `    <td nowrap c-lass="search_td" style="padding-left: 6px; padding-right: 0px; padding-top: 2px;">`
                content += `        <a href="${v_source}" target="_blank" c-lass="menu_icon" style="color: #ccc" title="Download"><span class="glyphicon glyphicon-${v_source_icon}"></span></a>`
                content += `    </td>`
                content += `</tr>`
                table.append(content);
            } catch {
                console.log(i)
            }
            
        }
    }

    //$('#search_run').click(function(){
    $(document).on("click", "#search_run", function() {
        console.log('#search_run')
        $('#search_table').empty()
        db_search = {}
        db_search_filter = []
        search_run()
    });

    //$('#nextValue').click(function(){
    $(document).on("click", "#nextValue", function() {
        var table =  $('#search_table');
        var next = limit;
        console.log(`#nextValue ${next}`)
        if(max_size>=next) {
            limit = limit+elements_per_page;
            table.empty();
            search_list(next,limit);
        }
    });

    //$('#PreeValue').click(function(){
    $(document).on("click", "#PreeValue", function() {
        var table =  $('#search_table');
        var pre = limit-(2*elements_per_page);
        console.log(`#PreeValue ${pre}`)
        if(pre>=0) {
            limit = limit-elements_per_page;
            table.empty();
            search_list(pre,limit); 
        }
    });