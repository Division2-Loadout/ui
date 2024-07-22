db_gear_set = {
    "Striker's Battlegear": {
      "core_attribute": "Weapon Damage",
      "pc": {
        "2": {
          "name": "Weapon Handling",
          "value": 15,
          "type": "percentage",
          "description": "Increases weapon handling by 15%."
        },
        "3": {
          "name": "Rate of Fire",
          "value": 15,
          "type": "percentage",
          "description": "Increases rate of fire by 15%."
        },
        "4": {
          "name": "Striker's Gamble",
          "description": "Weapon hits increase total weapon damage by 0.65%, stacking up to 100 times. 1 stack lost per second between 0 to 50 stacks; 2 stacks lost per second between 51 and 100 stacks.",
          "effect": [
            {
              "name": "Weapon Damage Increase",
              "value": 0.65,
              "type": "percentage"
            },
            {
              "name": "Max Stacks",
              "value": 100,
              "type": "count"
            },
            {
              "name": "Stack Loss (0-50 stacks)",
              "value": 1,
              "type": "per second"
            },
            {
              "name": "Stack Loss (51-100 stacks)",
              "value": 2,
              "type": "per second"
            }
          ]
        }
      },
      "chest_talent": {
        "name": "Press the Advantage",
        "description": "Increases max stacks for Striker’s Gamble from 100 to 200. 3 stacks lost per second between 101 and 200 stacks.",
        "effect": [
          {
            "name": "Max Stacks",
            "value": 200,
            "type": "count"
          },
          {
            "name": "Stack Loss (101-200 stacks)",
            "value": 3,
            "type": "per second"
          }
        ]
      },
      "backpack_talent": {
        "name": "Risk Management",
        "description": "Increases total weapon damage gained per stack of Striker’s Gamble from 0.65% to 1%.",
        "effect": [
          {
            "name": "Weapon Damage Increase per Stack",
            "value": 1,
            "type": "percentage"
          }
        ]
      },
      "drop_location": "LZ and DZ"
    },
    "Aces and Eights": {
      "core_attribute": "Weapon Damage",
      "pc": {
        "2": {
          "name": "MMR Damage",
          "value": 15,
          "type": "percentage",
          "description": "Increases marksman rifle damage by 15%."
        },
        "3": {
          "name": "Headshot Damage",
          "value": 30,
          "type": "percentage",
          "description": "Increases headshot damage by 30%."
        },
        "4": {
          "name": "Dead Man's Hand",
          "description": "Flip a card when landing shots with a Marksman rifle. After 5 cards are flipped, the damage of your next shot is amplified by 30%. More shots are enhanced the better the hand revealed. Four of a Kind: 4 shots Full House: 3 shots Aces and Eights: 2 shots. Flip an additional card on headshots.",
          "effect": [
            {
              "name": "Damage Amplification",
              "value": 30,
              "type": "percentage"
            },
            {
              "name": "Four of a Kind",
              "value": 4,
              "type": "shots"
            },
            {
              "name": "Full House",
              "value": 3,
              "type": "shots"
            },
            {
              "name": "Aces and Eights",
              "value": 2,
              "type": "shots"
            }
          ]
        }
      },
      "chest_talent": {
        "name": "No Limit",
        "description": "Increases Dead Man's Hand damage bonus from 30% to 50%.",
        "effect": [
          {
            "name": "Damage Bonus",
            "value": 50,
            "type": "percentage"
          }
        ]
      },
      "backpack_talent": {
        "name": "Ace in the Sleeve",
        "description": "Amplifies 1 extra shot when revealing your hand.",
        "effect": [
          {
            "name": "Extra Shot",
            "value": 1,
            "type": "count"
          }
        ]
      },
      "drop_location": "LZ and DZ"
    },
    "Negotiator's Dilemma": {
      "core_attribute": "Weapon Damage",
      "pc": {
        "2": {
          "name": "Critical Hit Chance",
          "value": 15,
          "type": "percentage",
          "description": "Increases critical hit chance by 15%."
        },
        "3": {
          "name": "Critical Hit Damage",
          "value": 20,
          "type": "percentage",
          "description": "Increases critical hit damage by 20%."
        },
        "4": {
          "name": "Crowd Control",
          "description": "Critical hits mark enemies for 20s, up to 3 marks total. When you critically hit a marked enemy, all other marked enemies take 60% of the damage dealt. Whenever a marked enemy dies, gain +2% critical hit damage, stacking up to 20 times, or until combat ends.",
          "effect": [
            {
              "name": "Mark Duration",
              "value": 20,
              "type": "seconds"
            },
            {
              "name": "Max Marks",
              "value": 3,
              "type": "count"
            },
            {
              "name": "Damage Transfer",
              "value": 60,
              "type": "percentage"
            },
            {
              "name": "Critical Hit Damage Increase",
              "value": 2,
              "type": "percentage",
              "stackable": true,
              "max_stacks": 20
            }
          ]
        }
      },
      "chest_talent": {
        "name": "Target Rich Environment",
        "description": "Increases Crowd Control mark count from 3 to 5.",
        "effect": [
          {
            "name": "Max Marks",
            "value": 5,
            "type": "count"
          }
        ]
      },
      "backpack_talent": {
        "name": "Critical Measures",
        "description": "Increases Crowd Control damage to additional marked enemies from 60% to 100%.",
        "effect": [
          {
            "name": "Damage Transfer",
            "value": 100,
            "type": "percentage"
          }
        ]
      },
      "drop_location": "LZ and DZ"
    },
    "Hard Wired": {
      "core_attribute": "Skill Tier",
      "pc": {
        "2": {
          "name": "Skill Haste",
          "value": 20,
          "type": "percentage",
          "description": "Increases skill haste by 20%."
        },
        "3": {
          "name": "Skill Damage",
          "value": 20,
          "type": "percentage",
          "description": "Increases skill damage by 20%."
        },
        "4": {
          "name": "Feedback Loop",
          "description": "When a skill dies or is cancelled, it resets the cooldown of the other skill. This can occur once every 20 seconds. Killing enemies shortens the cooldown by 10 seconds.",
          "effect": [
            {
              "name": "Cooldown Reset",
              "value": 20,
              "type": "seconds"
            },
            {
              "name": "Cooldown Reduction on Kill",
              "value": 10,
              "type": "seconds"
            }
          ]
        }
      },
      "chest_talent": {
        "name": "Short Circuit",
        "description": "Feedback Loop now reduces all skill cooldowns by 30% when one skill dies or is cancelled.",
        "effect": [
          {
            "name": "Cooldown Reduction",
            "value": 30,
            "type": "percentage"
          }
        ]
      },
      "backpack_talent": {
        "name": "Proactive Restorer",
        "description": "Feedback Loop now applies a 10-second overcharge when a skill dies or is cancelled.",
        "effect": [
          {
            "name": "Overcharge Duration",
            "value": 10,
            "type": "seconds"
          }
        ]
      },
      "drop_location": "LZ and DZ"
    },
    "Ongoing Directive": {
      "core_attribute": "Weapon Damage",
      "pc": {
        "2": {
          "name": "Status Effects",
          "value": 15,
          "type": "percentage",
          "description": "Increases status effects by 15%."
        },
        "3": {
          "name": "Reload Speed",
          "value": 30,
          "type": "percentage",
          "description": "Increases reload speed by 30%."
        },
        "4": {
          "name": "Rules of Engagement",
          "description": "Killing a status-affected enemy drops Special Ammo. The ammo increases weapon damage by 20% and applies the same status effect. Collecting ammo automatically activates the buff. 60-second cooldown.",
          "effect": [
            {
              "name": "Weapon Damage Increase",
              "value": 20,
              "type": "percentage"
            },
            {
              "name": "Cooldown",
              "value": 60,
              "type": "seconds"
            }
          ]
        }
      },
      "chest_talent": {
        "name": "Parabellum Rounds",
        "description": "Increases Rules of Engagement weapon damage bonus from 20% to 35%.",
        "effect": [
          {
            "name": "Weapon Damage Bonus",
            "value": 35,
            "type": "percentage"
          }
        ]
      },
      "backpack_talent": {
        "name": "Symptom Aggravator",
        "description": "Amplifies total weapon damage to status-affected targets by 25%.",
        "effect": [
          {
            "name": "Damage Amplification",
            "value": 25,
            "type": "percentage"
          }
        ]
      },
      "drop_location": "LZ and DZ"
    },
    "Tip of the Spear": {
      "core_attribute": "Weapon Damage",
      "pc": {
        "2": {
          "name": "Signature Weapon Damage",
          "value": 10,
          "type": "percentage",
          "description": "Increases signature weapon damage by 10%."
        },
        "3": {
          "name": "Weapon Damage",
          "value": 10,
          "type": "percentage",
          "description": "Increases weapon damage by 10%."
        },
        "4": {
          "name": "Aggressive Recon",
          "description": "Dealing damage with a signature weapon increases total weapon damage by 20% for 60 seconds. Automatically generates signature weapon ammo every 60 seconds.",
          "effect": [
            {
              "name": "Weapon Damage Increase",
              "value": 20,
              "type": "percentage"
            },
            {
              "name": "Duration",
              "value": 60,
              "type": "seconds"
            },
            {
              "name": "Ammo Generation",
              "value": 60,
              "type": "seconds"
            }
          ]
        }
      },
      "chest_talent": {
        "name": "Specialized Destruction",
        "description": "Increases Aggressive Recon weapon damage bonus from 20% to 40%.",
        "effect": [
          {
            "name": "Weapon Damage Bonus",
            "value": 40,
            "type": "percentage"
          }
        ]
      },
      "backpack_talent": {
        "name": "Encapsulation",
        "description": "Reduces Aggressive Recon signature weapon ammo generation cooldown from 60 seconds to 30 seconds.",
        "effect": [
          {
            "name": "Ammo Generation Cooldown",
            "value": 30,
            "type": "seconds"
          }
        ]
      },
      "drop_location": "LZ and DZ"
    },
    "True Patriot": {
      "core_attribute": "Armor",
      "pc": {
        "2": {
          "name": "Ammo Capacity",
          "value": 30,
          "type": "percentage",
          "description": "Increases ammo capacity by 30%."
        },
        "3": {
          "name": "Magazine Size",
          "value": 30,
          "type": "percentage",
          "description": "Increases magazine size by 30%."
        },
        "4": {
          "name": "Red, White, and Blue",
          "description": "Every two seconds, damage an enemy with a bullet to mark them with a debuff: Red: Decreases damage dealt by the enemy by 8%. White: Enemies that shoot the marked enemy regain 2% armor. Blue: Decreases the enemy's damage resistance by 8%. Full Flag: Enemies that die while under the effect of all three debuffs create a 5-meter explosion, dealing damage to other enemies in the area. Explosive damage is equal to the victim's total health and armor.",
          "effect": [
            {
              "name": "Debuff Duration",
              "value": 2,
              "type": "seconds"
            },
            {
              "name": "Red Debuff",
              "value": 8,
              "type": "percentage",
              "description": "Decreases damage dealt by the enemy."
            },
            {
              "name": "White Debuff",
              "value": 2,
              "type": "percentage",
              "description": "Enemies that shoot the marked enemy regain armor."
            },
            {
              "name": "Blue Debuff",
              "value": 8,
              "type": "percentage",
              "description": "Decreases the enemy's damage resistance."
            },
            {
              "name": "Full Flag Explosion Radius",
              "value": 5,
              "type": "meters"
            }
          ]
        }
      },
      "chest_talent": {
        "name": "Patriots Vigilance",
        "description": "Increases the duration of all Red, White, and Blue debuffs by 5 seconds.",
        "effect": [
          {
            "name": "Debuff Duration Increase",
            "value": 5,
            "type": "seconds"
          }
        ]
      },
      "backpack_talent": {
        "name": "Flag Bearer",
        "description": "Reduces the time it takes to apply the full flag debuff from 2 seconds to 1 second.",
        "effect": [
          {
            "name": "Full Flag Application Time",
            "value": 1,
            "type": "seconds"
          }
        ]
      },
      "drop_location": "LZ and DZ"
    },
    "Foundry Bulwark": {
      "core_attribute": "Armor",
      "pc": {
        "2": {
          "name": "Armor",
          "value": 10,
          "type": "percentage",
          "description": ""
        },
        "3": {
          "name": "Armor Regen and Shield Health",
          "values": {
            "Armor Regen": {
              "value": 1,
              "type": "percentage"
            },
            "Shield Health": {
              "value": 50,
              "type": "percentage"
            }
          },
          "description": ""
        },
        "4": {
          "name": "Makeshift Repairs",
          "description": "Whenever you or your shield take damage, 20% of that amount is repaired to both over 15s."
        }
      },
      "chest_talent": {
        "name": "Process Refinery",
        "description": "Increases Makeshift Repairs from 20% over 15s to 30% over 15s."
      },
      "backpack_talent": {
        "name": "Improved Materials",
        "description": "Decreases time taken for Makeshift Repairs from 15s to 10s."
      },
      "drop_location": "LZ and DZ"
    },

    "Hunter's Fury": {
      "core_attribute": "Weapon Damage",
      "pc": {
        "2": {
          "name": "Shotgun and SMG Damage",
          "values": {
            "Shotgun Damage": {
              "value": 15,
              "type": "percentage"
            },
            "SMG Damage": {
              "value": 15,
              "type": "percentage"
            }
          },
          "description": ""
        },
        "3": {
          "name": "Armor and Health on Kill",
          "values": {
            "Armor on Kill": {
              "value": 20,
              "type": "percentage"
            },
            "Health on Kill": {
              "value": 100,
              "type": "percentage"
            }
          },
          "description": ""
        },
        "4": {
          "name": "Apex Predator",
          "description": "Enemies within 15m receive a debuff, amplifying your weapon damage against them by +20%. Killing a debuffed enemy with your weapon disorients other enemies within 5m, and amplifies weapon damage by 5% for 10s, stacking up to 5 times."
        }
      },
      "chest_talent": {
        "name": "Endless Hunger",
        "description": "Increases the duration of Apex Predator stacks from 10s to 30s."
      },
      "backpack_talent": {
        "name": "Overwhelming Force",
        "description": "Increases the radius of disorient on Apex Predator kills from 5m to 10m."
      },
      "drop_location": "LZ and DZ"
    },
    "Eclipse Protocol": {
      "core_attribute": "Skill Tier",
      "pc": {
        "2": {
          "name": "Status Effects",
          "values": {
            "Status Effects": {
              "value": 15,
              "type": "percentage"
            }
          },
          "description": ""
        },
        "3": {
          "name": "Skill Haste and Hazard Protection",
          "values": {
            "Skill Haste": {
              "value": 15,
              "type": "percentage"
            },
            "Hazard Protection": {
              "value": 30,
              "type": "percentage"
            }
          },
          "description": ""
        },
        "4": {
          "name": "Indirect Transmission",
          "description": "On kill: Spread status effects of that enemy to all enemies within 10m. Refresh 50% of status effect durations."
        }
      },
      "chest_talent": {
        "name": "Proliferation",
        "description": "Increases Indirect Transmission range from 10m to 15m. Increases refresh percentage from 50% to 75%."
      },
      "backpack_talent": {
        "name": "Symptom Aggravator",
        "description": "Amplifies all damage you deal to status affected targets by 30%."
      },
      "drop_location": "LZ and DZ"
    },
    "Future Initiative": {
      "core_attribute": "Skill Tier",
      "pc": {
        "2": {
          "name": "Repair Skills",
          "values": {
            "Repair Skills": {
              "value": 30,
              "type": "percentage"
            }
          },
          "description": ""
        },
        "3": {
          "name": "Skill Duration and Skill Haste",
          "values": {
            "Skill Duration": {
              "value": 30,
              "type": "percentage"
            },
            "Skill Haste": {
              "value": 15,
              "type": "percentage"
            }
          },
          "description": ""
        },
        "4": {
          "name": "Ground Control",
          "description": "Increases you and your allies' total weapon and skill damage by 15% when at full armor. When you repair an ally, you and all allies within 5m of you are also repaired for 60% of that amount."
        }
      },
      "chest_talent": {
        "name": "Tactical Superiority",
        "description": "Increases Ground Control damage bonus from 15% to 25%."
      },
      "backpack_talent": {
        "name": "Advanced Combat Tactics",
        "description": "Increases Ground Control proximity repair from 60% to 120%."
      },
      "drop_location": "LZ and DZ"
    },
    "Rigger": {
      "core_attribute": "Skill Tier",
      "pc": {
        "2": {
          "name": "Skill Haste",
          "values": {
            "Skill Haste": {
              "value": 15,
              "type": "percentage"
            }
          },
          "description": ""
        },
        "3": {
          "name": "Skill Duration",
          "values": {
            "Skill Duration": {
              "value": 15,
              "type": "percentage"
            }
          },
          "description": ""
        },
        "4": {
          "name": "Tend and Befriend",
          "description": "Interacting with your deployed skills grants the skill 25% skill damage for 10s. This buff cannot be refreshed.\n\nInteractions include:\nUsing / Deploying the Skill\nChanging the skills target\nHealing the skill"
        }
      },
      "chest_talent": {
        "name": "Enhanced Tend and Befriend",
        "description": "Increase the damage buff from 25% to 50%"
      },
      "backpack_talent": {
        "name": "Skill Reset",
        "description": "Cancelling your skills will reset their cooldown."
      },
      "drop_location": "LZ and DZ"
    },
    "Heartbreaker": {
      "core_attribute": "Armor",
      "pc": {
        "2": {
          "name": "Assault Rifle and LMG Damage",
          "values": {
            "Assault Rifle Damage": {
              "value": 15,
              "type": "percentage"
            },
            "LMG Damage": {
              "value": 15,
              "type": "percentage"
            }
          },
          "description": ""
        },
        "3": {
          "name": "Weapon Handling",
          "values": {
            "Weapon Handling": {
              "value": 15,
              "type": "percentage"
            }
          },
          "description": ""
        },
        "4": {
          "name": "Heartstopper",
          "description": "Headshots apply pulse 5s. Weapon hits on pulsed enemies add and refreshes a stack of +1% bonus armor and +1% damage to pulsed enemies for 5s. Max stack is 50.\n\nTwo stacks are lost per second."
        }
      },
      "chest_talent": {
        "name": "Increased Max Stack",
        "description": "Max stack is now 100."
      },
      "backpack_talent": {
        "name": "Enhanced Heartstopper",
        "description": "Stacks now supply +2% bonus armor"
      },
      "drop_location": "LZ and DZ"
    },
    "Umbra Initiative": {
      "core_attribute": "Weapon Damage",
      "pc": {
        "2": {
          "name": "Critical Chance",
          "values": {
            "Critical Chance": {
              "value": 15,
              "type": "percentage"
            }
          },
          "description": ""
        },
        "3": {
          "name": "Reload Speed",
          "values": {
            "Reload Speed": {
              "value": 30,
              "type": "percentage"
            }
          },
          "description": ""
        },
        "4": {
          "name": "From the Shadows Into the Light",
          "description": "While in cover, gain 10 Stacks per second up to 50. Each stack will give 1% Critical damage increase and 0.3% RPM. Buff does not apply while shooting from cover.\n\nWhile out of cover Agents lose 2 stacks per second at normal speed and 1 stack per second if sprinting.\n\nWhile out of cover and in combat, gain 10 Stacks per second up to 50. Each stack will give 0.8% Armor regen when it is consumed. Stacks consume, 10 stacks per second, only in cover."
        }
      },
      "chest_talent": {
        "name": "Enhanced Damage",
        "description": "Increases Max stacks For Into the Light from 50 to 100, stack gain from 10 to 20 and stack consumption from 10 to 20. (buffs the damage talent)"
      },
      "backpack_talent": {
        "name": "Enhanced Armor Regen",
        "description": "Increases Max stacks From the Shadows from 50 to 100, stack gain from 10 to 20. (buffs the armor regen talent)"
      },
      "drop_location": "LZ and DZ (Season 10 Rewards Track)"
    },
    "Hotshot": {
      "core_attribute": "Weapon Damage",
      "pc": {
        "2": {
          "name": "Marksman Rifle Damage and Weapon Handling",
          "values": {
            "Marksman Rifle Damage": {
              "value": 30,
              "type": "percentage"
            },
            "Weapon Handling": {
              "value": 30,
              "type": "percentage"
            }
          },
          "description": ""
        },
        "3": {
          "name": "Headshot Damage",
          "values": {
            "Headshot Damage": {
              "value": 30,
              "type": "percentage"
            }
          },
          "description": ""
        },
        "4": {
          "name": "Headache",
          "description": "First Headshot with a Marksman Rifle will increase next headshot by 20%, second consecutive headshot with a Marksman Rifle will give +10% armor (if at full armor it will give bonus armor max +50% of current armor value), third consecutive headshot will refill magazine.\n\nFrom the fourth headshot forward agents will get all 3 bonuses for each consecutive headshot kill. Missing a headshot will reset the cycle."
        }
      },
      "chest_talent": {
        "name": "Enhanced Headshot Armor",
        "description": "Increases bonus Armor from 50% to 100%."
      },
      "backpack_talent": {
        "name": "Headshot Tolerance",
        "description": "Agents can miss a headshot before resetting the cycle."
      },
      "drop_location": "Season 11 Reward Track"
    },
    "The Cavalier": {
      "core_attribute": "Armor",
      "pc": {
        "2": {
          "name": "Hazard Protection",
          "values": {
            "Hazard Protection": {
              "value": 30,
              "type": "percentage"
            }
          },
          "description": ""
        },
        "3": {
          "name": "Repair Skills",
          "values": {
            "Repair Skills": {
              "value": 40,
              "type": "percentage"
            }
          },
          "description": ""
        },
        "4": {
          "name": "Charging",
          "description": "For each second spent out of cover during combat, Agents will get 5% reduced incoming skill damage. Max 50%.\n\nCharged –\nWhile fully charged, gain immunity to any movement speed debuff and share this with all of the agents hazard protection and the incoming skill damage with all allies for 10 seconds.\n\nAfter Charged is consumed, Charging buff will resume if still in combat and out of cover!"
        }
      },
      "chest_talent": {
        "name": "Overcharging",
        "description": "Increases Charger max incoming damage protection to 70%."
      },
      "backpack_talent": {
        "name": "Safe Charging",
        "description": "Charging gives 10% protection per second."
      },
      "drop_location": "TU18 Y5 Season 1 track"
    }    

}
