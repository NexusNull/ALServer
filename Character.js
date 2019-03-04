var Character = function (name) {
    this.data = {
        "hp": 10000,
        "max_hp": 10000,
        "mp": 10000,
        "max_mp": 10000,
        "xp": 0,
        "attack": 2000000,
        "frequency": 0.9436158192090396,
        "speed": 100,
        "range": 70,
        "armor": 145,
        "resistance": 448,
        "level": 72,
        "rip": false,
        "afk": true,
        "s": {},
        "c": {},
        "age": 703,
        "id": name,
        "x": 0,
        "y": 0,
        "cid": 1,
        "stand": false,
        "skin": "konami",
        "cx": [],
        "slots": {
            "ring1": null,
            "ring2": null,
            "earring1": null,
            "earring2": null,
            "belt": null,
            "mainhand": null,
            "offhand": null,
            "helmet": null,
            "chest": null,
            "pants": null,
            "shoes": null,
            "gloves": null,
            "amulet": null,
            "orb": null,
            "elixir": null,
            "cape": null,
            "trade1": null,
            "trade2": null,
            "trade3": null,
            "trade4": null
        },
        "ctype": "ranger",
        "owner": "",
        "guild": "",
        "stats": {"dex": 55, "int": 202, "vit": 33, "str": 13},
        "mp_cost": 82,
        "max_xp": 420000000,
        "goldm": 1,
        "xpm": 1,
        "luckm": 1.15,
        "map": "main",
        "in": "main",
        "isize": 42,
        "esize": 24,
        "gold": 0,
        "cash": 23,
        "targets": 0,
        "m": 0,
        "evasion": 1.8,
        "miss": 0,
        "reflection": 0,
        "lifesteal": 0,
        "rpiercing": 0,
        "apiercing": 0,
        "crit": 0,
        "dreturn": 0,
        "tax": 0.02,
        "items": new Array(42).fill(null),
        "cc": 0,
        "ipass": "your mom gay",
        "friends": [],
        "move_num": 0,
        "info": {}
    }
};

Character.prototype.move = function (x, y, going_x, going_y) {
    this.data.x = x;
    this.data.y = y;
    this.data.going_x = going_x;
    this.data.going_y = going_y;
    this.data.moving = true;
    this.data.move_num = this.data.move_num + 1000;
    return this.data;
};


Character.prototype.getData = function () {
    return this.data;
};

module.exports = Character;

