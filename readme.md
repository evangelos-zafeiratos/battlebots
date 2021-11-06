# Battlebots v0.5

Players write bots in javascript that compete in an arena. Bots take turns until a maximum number of rounds is reached (Tie) or one of them wins.

Both bots begin the match with no ammo. Moreover, each bot has available in each round 8 points to spend on actions as desired. The available actions and their costs are:

**All actions return -1 if unable to process unless stated otherwise**

- getStatus (0 points)

``` 
    Returns:
    Dimensions   {X,Y}   //World dimensions
    Position     {X,Y}   //Player position
    Heading      string  //"North","South","West","East",
    TankStatus   {Ammo:int,Health:int}
    Surroundings [] {    //360 view scan with range up to 3 tiles
        Position {X,Y}   //Coordinates of object
        HitType  string  //"Wall","Bot","Armory" 
    }
    Armories []{
        {X,Y}   //Coordinates of armory
    }
```

- getRemainingPoints (0 points)
- moveForward/moveBackward (Based on Speed. See below.)
- turnLeft/turnRight (1 point)
- fire (7 points) - Has range up to 8 tiles
- scan (1 point) - Fires a scan ray of 3 tiles width in front of the bot with a range of 16 tiles

``` 
    Returns:
    [] {
        Position {X,Y}   //Coordinates of object
        HitType  string  //"Wall","Bot","Armory" 
    }
```

Each bot must select among 4 types of Tanks. Every type has different benefits.

|   | Soldier  | Berserker   | Behemoth  | Scout   |
|---|---|---|---|---|
| Life  | 20  | 10  | 30  | 15  |
| Damage  | 2  | 5  | 1  | 3  |
| Speed | 4  | 5  | 4 | 2  |

**Scripting:**

Any valid javascript file is accepted, the only requirements are that there should be one function named "update" that is called on each round by the simulator and that the first three lines of the javascript file should be commented with the following format:

```
//Name:KillerBot
//NickName:The Bomb
//Tank:Soldier
```

Inside the update function a global variable named "api" is exposed through which the bot can issue any of the above mentioned commands.

**Sample:**

```
console.log("i am ready")

function update(){
    var res,p,status;

    status=api.getStatus();
    console.log('I am a dummy bot2');
    res=api.moveForward();
    p=status.Position;
    console.log(JSON.stringify(p));
}
```
**Note:**
Programs that cannot be parsed by the simulator or take longer than 2 seconds to respond, are disqualified.

**Simulator:**
The simulator is run from the commandline and takes at least the names of two javascript files to begin the competition. Running "battlebots --help" will show all available options.

For the simulator UI you will need a modern browser supporting HTML5 (IE9+, Chrome, Safari, Firefox)

```
Usage:
  battlebots [options] player1.js player2.js

Options:
  -mute=0      mute player [1] or [2]
  -no-gui      show no ui
  -port=22501  simulator backend port

```


