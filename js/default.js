// GLOBAL
var v_version = "v1.0"
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

// SEARCH BUILD
var db_search = {}
var db_search_filter = []
var max_size;
var sta;
var elements_per_page;
var limit;

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

var build_demo = {
    "[DEMO2] Striker's Battlegear": {
      "name": "[DEMO2] Striker's Battlegear",
      "desc": "",
      "stored": "1",
      "tag": "set",
      "specialization": {},
      "slot_primary": {},
      "slot_secondary": {},
      "slot_sidearm": {},
      "slot_mask": {
        "item": "Striker's Battlegear",
        "socket1": {
          "name": "Weapon Damage",
          "socket": "core",
          "class": "offensive",
          "value": 15
        },
        "socket2": {
          "name": "",
          "socket": "attr",
          "class": "",
          "value": 0
        },
        "socket4": {
          "name": "",
          "socket": "mod",
          "class": "",
          "value": 0
        }
      },
      "slot_backpack": {
        "item": "Striker's Battlegear",
        "socket1": {
          "name": "Weapon Damage",
          "socket": "core",
          "class": "offensive",
          "value": 15
        },
        "socket2": {
          "name": "",
          "socket": "attr",
          "class": "",
          "value": 0
        },
        "socket4": {
          "name": "",
          "socket": "mod",
          "class": "",
          "value": 0
        },
        "socket5": {
          "name": "Risk Management",
          "socket": "talent",
          "class": "",
          "value": 0
        }
      },
      "slot_chest": {
        "item": "Striker's Battlegear",
        "socket1": {
          "name": "Weapon Damage",
          "socket": "core",
          "class": "offensive",
          "value": 15
        },
        "socket2": {
          "name": "",
          "socket": "attr",
          "class": "",
          "value": 0
        },
        "socket4": {
          "name": "",
          "socket": "mod",
          "class": "",
          "value": 0
        },
        "socket5": {
          "name": "Press the Advantage",
          "socket": "talent",
          "class": "",
          "value": 0
        }
      },
      "slot_gloves": {
        "item": "Striker's Battlegear",
        "socket1": {
          "name": "Weapon Damage",
          "socket": "core",
          "class": "offensive",
          "value": 15
        },
        "socket2": {
          "name": "",
          "socket": "attr",
          "class": "",
          "value": 0
        }
      },
      "slot_holster": {
        "item": "Striker's Battlegear",
        "socket1": {
          "name": "Weapon Damage",
          "socket": "core",
          "class": "offensive",
          "value": 15
        },
        "socket2": {
          "name": "",
          "socket": "attr",
          "class": "",
          "value": 0
        }
      },
      "slot_kneepads": {
        "item": "Striker's Battlegear",
        "socket1": {
          "name": "Weapon Damage",
          "socket": "core",
          "class": "offensive",
          "value": 15
        },
        "socket2": {
          "name": "",
          "socket": "attr",
          "class": "",
          "value": 0
        }
      }
    },
    "[DEMO1] Memento+Striker's": {
      "name": "[DEMO1] Memento+Striker's",
      "desc": "https://www.youtube.com/watch?v=kQyXyCuWMgg",
      "stored": "1",
      "tag": "build",
      "specialization": {},
      "slot_primary": {
        "item": "St. Elmo's Engine"
      },
      "slot_secondary": {
        "item": "ACS-12"
      },
      "slot_sidearm": {},
      "slot_mask": {
        "item": "Striker's Battlegear",
        "socket1": {
          "name": "Weapon Damage",
          "socket": "core",
          "class": "offensive",
          "value": "12.6"
        },
        "socket2": {
          "name": "Critical Hit Chance",
          "socket": "attr",
          "class": "offensive",
          "value": 6
        },
        "socket4": {
          "name": "Critical Hit Chance",
          "socket": "mod",
          "class": "offensive",
          "value": 6
        }
      },
      "slot_backpack": {
        "item": "Memento",
        "socket1": {
          "name": "Weapon Damage",
          "socket": "core",
          "class": "offensive",
          "value": 15
        },
        "socket2": {
          "name": "Armor",
          "socket": "core",
          "class": "defensive",
          "value": 170000
        },
        "socket3": {
          "name": "Skill Tier",
          "socket": "core",
          "class": "utility",
          "value": 1
        },
        "socket4": {
          "name": "",
          "socket": "mod",
          "class": "",
          "value": 0
        },
        "socket5": {
          "name": "Kill Confirmed",
          "socket": "talent",
          "class": "",
          "value": 0
        }
      },
      "slot_chest": {
        "item": "Fenris Group AB",
        "socket1": {
          "name": "Weapon Damage",
          "socket": "core",
          "class": "offensive",
          "value": 15
        },
        "socket2": {
          "name": "Critical Hit Damage",
          "socket": "attr",
          "class": "offensive",
          "value": "10"
        },
        "socket3": {
          "name": "Critical Hit Chance",
          "socket": "attr",
          "class": "offensive",
          "value": "6"
        },
        "socket4": {
          "name": "Critical Hit Chance",
          "socket": "mod",
          "class": "offensive",
          "value": 6
        },
        "socket5": {
          "name": "Obliterate",
          "socket": "talent",
          "class": null
        }
      },
      "slot_gloves": {
        "item": "Striker's Battlegear",
        "socket1": {
          "name": "Weapon Damage",
          "socket": "core",
          "class": "offensive",
          "value": 15
        },
        "socket2": {
          "name": "Critical Hit Chance",
          "socket": "attr",
          "class": "offensive",
          "value": 6
        }
      },
      "slot_holster": {
        "item": "Striker's Battlegear",
        "socket1": {
          "name": "Weapon Damage",
          "socket": "core",
          "class": "offensive",
          "value": "12.5"
        },
        "socket2": {
          "name": "Critical Hit Damage",
          "socket": "attr",
          "class": "offensive",
          "value": 12
        }
      },
      "slot_kneepads": {
        "item": "Striker's Battlegear",
        "socket1": {
          "name": "Weapon Damage",
          "socket": "core",
          "class": "offensive",
          "value": "11.9"
        },
        "socket2": {
          "name": "Critical Hit Chance",
          "socket": "attr",
          "class": "offensive",
          "value": 6
        }
      },
      "slot_specialization": {
        "item": "Gunner"
      }
    }
  }