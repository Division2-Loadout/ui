// GLOBAL
var v_weapon_label;
var v_weapon_value;
var private_db_weapon
var db_build = {}
var db_gear_key = {}
var db_weapon_key = {}
var db_stats = {}
var css_socket_select_width = 288
var css_socket_name_width = 180
var css_socket_value_width = 65
var view_mode = "bars"
var v_build_stored = "1"
var v_build_tag = "loadout"

var build_template = {
    "name": "",
    "desc": "",
    "stored": "",
    "tag": "",
    "specialization": {},
    "slot_primary": {},
    "slot_secondary": {},
    "slot_sidearm": {},
    "slot_mask": {},
    "slot_backpack": {},
    "slot_chest": {},
    "slot_gloves": {},
    "slot_holster": {},
    "slot_kneepads": {}
}
const build_scheme = JSON.parse(JSON.stringify(build_template));
