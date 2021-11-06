//Name:Vagas
//NickName:FastOne
//Tank:Scout

console.log("all systems are go.");
var counter = 0;
var south = true;
var east = true;
var flag = 1;

var decide = function(me, Armor1, Armor2) {
  var dist1, dist2;
  dist1 = Math.abs(Armor1.X - me.X) + Math.abs(Armor1.Y - me.Y);
  dist2 = Math.abs(Armor2.X - me.X) + Math.abs(Armor2.Y - me.Y);
  if (dist1 < dist2)
    return Armor1;
  else 
    return Armor2;
}	

function redirect() {
    var status=api.getStatus();
	var a = status.Surroundings.length;
	var View = status.Surroundings;
	var Wall;
	choice = peekMove();
	
	for (i = 0; i < a; i++) {
	  switch (status.Heading) {
	    case "East":
		  if ((status.Position.X < status.Dimensions.X - 2) && (status.Position.Y == View[i].Position.Y) && ((View[i].Position.X - status.Position.X) == 1) && (View[i].HitType == "Wall")) {
		    if (east) {
			  api.turnRight();
			  api.moveForward();
			  api.turnLeft();
			  api.moveForward();
			}
			else if (!east) {
			  api.turnLeft();
			  api.moveForward();
			  api.turnRight();
			  api.moveForward();
			}
			if (api.getStatus().Position.X == status.Position.X)
			  east = (!east);
			return;
		  }
	    case "South":
		  if ( (status.Position.Y < status.Dimensions.Y - 2 ) && (status.Position.X == View[i].Position.X) && ((View[i].Position.Y - status.Position.Y) == 1) && (View[i].HitType == "Wall")) {
			if (east) {
			  api.turnRight();
			  api.moveForward();
			  api.turnLeft();
			  api.moveForward();
			}
			else if (!east) {
			  api.turnLeft();
			  api.moveForward();
			  api.turnRight();
			  api.moveForward();
			}
			if (api.getStatus().Position.X == status.Position.X)
			  east = (!east);
			return;
		  }
		case "West":
          if ((status.Position.X > 1) && (status.Position.Y == View[i].Position.Y) && ((status.Position.X - View[i].Position.X) == 1) && (View[i].HitType == "Wall")) {
			if (south) {
			  api.turnLeft();
			  api.moveForward();
			  api.turnRight();
			  api.moveForward();
			}
			else if (!south) {
			  api.turnRight();
			  api.moveForward();
		      api.turnLeft();
			  api.moveForward(); 
			}
			if (api.getStatus().Position.Y == status.Position.Y)
			  south = (!south);
			return;
          }
        case "North":
          if ((status.Position.Y > 2) && (status.Position.X == View[i].Position.X) && ((status.Position.Y - View[i].Position.Y) == 1) && (View[i].HitType == "Wall")) {
            if (east) {
			  api.turnRight();
			  api.moveForward();
			  api.turnLeft();
			  api.moveForward();
			}
			else if (!east) {
			  api.turnLeft();
			  api.moveForward();
			  api.turnRight();
			  api.moveForward();
			}
			if (api.getStatus().Position.X == status.Position.X)
			  east = (!east);
			return;
          }			
	  }
	}
}

var CustomRandom = function(nseed) {

	var seed,
		constant = Math.pow(2, 13) + 1,
		prime = 1987,

		maximum = 1000;

	if (nseed) {
		seed = nseed;
	}

	if (seed == null) {
		seed = (new Date()).getTime();

	}
	return {
		next: function(min, max) {
			while (seed > constant) seed = seed / prime;
			seed *= constant;
			seed += prime;
			if (min != undefined && max != undefined) {
				return Math.floor(min + seed % maximum / maximum * (max - min))
			} else {
				return seed % maximum / maximum;
			}

		}
	};
};

var rng = CustomRandom(null);


function peekMove(){
	move=rng.next(0,4);
	return move;
}

function moveTo(Pos, Target) {
  dx = Math.abs(Pos.X - Target.X);
  dy = Math.abs(Pos.Y - Target.Y);
  //console.log(dx,dy);
  Direction = api.getStatus().Heading;
  if (Pos.X < Target.X)
    switch(Direction) {
	  case "East":
		    while ((api.getStatus().Position.X < Target.X) && (api.getRemainingPoints() >=2)) 
			  api.moveForward(); 
			break;
	      case "West": 
		    while ((api.getStatus().Position.X < Target.X) && (api.getRemainingPoints() >=2))
			  api.moveBackward();
			break;
	      case "North":
		    api.turnRight();
			while ((api.getStatus().Position.X < Target.X) && (api.getRemainingPoints >=2))
			  api.moveForward();
			break;
		  case "South":
		    api.turnLeft();
			while ((api.getStatus().Position.X < Target.X) && (api.getRemainingPoints >=2))
			  api.moveForward();
			break;
	}
  else if (Pos.X > Target.X)
	switch(Direction) {
	  case "East":
		    while ((api.getStatus().Position.X > Target.X) && (api.getRemainingPoints >=2))
			  api.moveBackward();
			break;
	      case "West":
		    while ((api.getStatus().Position.X > Target.X) && (api.getRemainingPoints >=2)) 
			  api.moveForward();
			break;
		  case "North":
		    api.turnLeft();
			while ((api.getStatus().Position.X > Target.X) && (api.getRemainingPoints >=2))
			  api.moveForward();
			break;
		  case "South":
		    api.turnRight();
			while ((api.getStatus().Position.X > Target.X) && (api.getRemainingPoints >=2))
			  api.moveForward();
			break;
	}
   if (Pos.Y > Target.Y)
    switch(Direction) {
	  case "East": 
			  api.turnLeft()
			  while ((api.getStatus().Position.Y > Target.Y) && (api.getRemainingPoints >=2))
			    api.moveForward(); 
		      break;
			case "West":
			  api.turnRight()
			  while ((api.getStatus().Position.Y > Target.Y) && (api.getRemainingPoints >=2))
			    api.moveForward(); 
		      break;
            case "North":
              while ((api.getStatus().Position.Y > Target.Y) && (api.getRemainingPoints >=2))
			    api.moveForward(); 
		      break;
            case "South":
              while ((api.getStatus().Position.Y > Target.Y) && (api.getRemainingPoints >=2))
			    api.moveBackward();		
		      break;
	}
  else if (Pos.Y < Target.Y)
	switch(Direction) {
	  case "East": 
			  api.turnRight()
			  while ((api.getStatus().Position.Y < Target.Y) && (api.getRemainingPoints >=2))
			    api.moveForward(); 
		      break;
			case "West":
			  api.turnLeft()
			  while ((api.getStatus().Position.Y < Target.Y) && (api.getRemainingPoints >=2))
			    api.moveForward(); 
		      break;
            case "North":
              while ((api.getStatus().Position.Y < Target.Y) && (api.getRemainingPoints >=2))
			    api.moveBackward(); 
		      break;
            case "South":
              while ((api.getStatus().Position.Y < Target.Y) && (api.getRemainingPoints >=2))
			    api.moveForward();		
		      break;
    }
	
}
	    
  
function searchAmmo() {
  NewStatus = api.getStatus();
  if ((NewStatus.Armories[0].X > 0) && (NewStatus.Armories[1].X > 0))
	  Armora = decide(NewStatus.Position, NewStatus.Armories[0], NewStatus.Armories[1]);
  else  if (NewStatus.Armories[0].X > 0)
	  Armora = NewStatus.Armories[0];
  else  if (NewStatus.Armories[1].X > 0)
      Armora = NewStatus.Armories[1];
  else return;
  dx = Math.abs(NewStatus.Position.X - Armora.X);
  dy = Math.abs(NewStatus.Position.Y - Armora.Y);
  console.log("HET");
  redirect();
  moveTo(NewStatus.Position, Armora);    
	
}
 function hunt() { 
    var nextMove;
	var Scanning;
	var LastStatus;
	LastStatus = api.getStatus();
	Environment = LastStatus.Surroundings;
	Scanning = api.scan();
	  LastStatus = api.getStatus();
	  for (h = 0; h < Scanning.length; h++) {
	    switch (LastStatus.Heading) {
		  case "East":
	        if (Scanning[h].HitType == "Bot") {
			  if ((Scanning[h].Position.Y == LastStatus.Position.Y) && (Math.abs(Scanning[h].Position.X - LastStatus.Position.X) <= 8 ))
			    api.fire();
		      else if (Scanning[h].Position.Y - LastStatus.Position.Y > 0) {
			    api.turnLeft();
				api.moveForward();
				api.turnRight();
				api.moveForward();
			  }
			  else if (Scanning[h].Position.Y - LastStatus.Position.Y < 0) {
			    api.turnRight();
				api.moveForward();
				api.turLeft();
				api.moveForward();
		      }
			  else if (Math.abs(Scanning[h].Position.X - LastStatus.Position.X) > 8 ) {
			    api.moveForward();
				api.moveForward();
				api.moveForward();
			  }
			return;
			}
		  case "West":
		    if (Scanning[h].HitType == "Bot") {
			  if  ((Scanning[h].Position.Y == LastStatus.Position.Y) && (Math.abs(Scanning[h].Position.X - LastStatus.Position.X) <= 8 ) )
			    api.fire();
			  else if (Scanning[h].Position.Y - LastStatus.Position.Y > 0) {
			    api.turnRight();
				api.moveForward();
				api.turLeft();
				api.moveForward();
			  }
			  else if (Scanning[h].Position.Y - LastStatus.Position.Y < 0) {
			    api.turnLeft();
				api.moveForward();
				api.turnRight();
				api.moveForward();
			  }
			  else if (Math.abs(Scanning[h].Position.X - LastStatus.Position.X) > 8 ) {
			    api.moveForward();
				api.moveForward();
				api.moveForward();
			  }
			return;
			}
		  case "North":
		    if (Scanning[h].HitType == "Bot") {
			  if ((Scanning[h].Position.X == LastStatus.Position.X) && (Math.abs(Scanning[h].Position.Y - LastStatus.Position.Y) <= 8 ) )
			    api.fire();
			  else if (Scanning[h].Position.X - LastStatus.Position.X > 0) {
			    api.turnRight();
				api.moveForward();
				api.turnLeft();
				api.moveForward();
			  }
			  else if (Scanning[h].Position.X - LastStatus.Position.X < 0) {
			    api.turnLeft();
				api.moveForward();
				api.turnRight();
				api.moveForward();
			  }
			  else if (Math.abs(Scanning[h].Position.Y - LastStatus.Position.Y) > 8 ) {
			    api.moveForward();
				api.moveForward();
				api.moveForward();
			  }
			return;
		    }
		  case "South":
		    if (Scanning[h].HitType == "Bot") {
			  if ((Scanning[h].Position.X == LastStatus.Position.X) && (Math.abs(Scanning[h].Position.Y - LastStatus.Position.Y) <= 8 ))
			    api.fire();
			  else if (Scanning[h].Position.X - LastStatus.Position.X > 0) {
			    api.turnLeft();
				api.moveForward();
				api.turnRight();
				api.moveForward();
			  }
			  else if (Scanning[h].Position.X - LastStatus.Position.X < 0) {
			    api.turnLeft();
				api.moveForward();
				api.turnRight();
				api.moveForward();
			  }
			  else if (Math.abs(Scanning[h].Position.Y - LastStatus.Position.Y) > 8 ) {
			    api.moveForward();
				api.moveForward();
				api.moveForward();
			  }
			return;
		    }
		}
	  }
	  
	  for (h =0; h<Environment.length; h++) {
	    switch(LastStatus.Heading) {
		  case "East":
		    if (Environment[h].HitType == "Bot" && !(Environment[h].Position.X == LastStatus.Position.X && Environment[h].Position.Y == LastStatus.Position.Y)) {
			
			   if (Environment[h].Position.X == LastStatus.Position.X) {
		           if (Environment[h].Position.Y < LastStatus.Position.Y) {
				      api.turnLeft();
					  return; }
				   else  {
				      api.turnRight();
					  return; 
					}
				}
				else if (Environment[h].Position.X < LastStatus.Position.X) {
				   if (Environment[h].Position.Y < LastStatus.Position.Y) {
				      api.moveBackward();
					  api.turnLeft(); 
					  return;  }
				   else if (Environment[h].Position.Y == LastStatus.Position.Y) {
				      api.turnRight();
					  api.turnRight();
					  return;  }
				   else   {
				      api.moveBackward();
					  api.turnRight();
					  return;  }
				}
			    else if (Environment[h].Position.X > LastStatus.Position.X)  {
				   if (Environment[h].Position.Y < LastStatus.Position.Y) {
				      api.moveForward();
					  api.turnLeft();
					  return; }
				   else if (Environment[h].Position.Y > LastStatus.Position.Y) {
				      api.moveForward();
					  api.turnRight();
					  return; } 
		        }
			}
			else if (Environment[h].HitType == "Armory"	) 
			   moveTo(LastStatus.Position,Environment[h].Position);
			
			else if (Environment[h].HitType =="Wall" && Environment[h].Position.Y == LastStatus.Position.Y && Environment[h].Position.X > LastStatus.Position.X) {
			  
			   for (k = 0; k < Environment.length; k++) {
			     if (Environment[k].HitType == "Wall" && k != h && Environment[k].Position.Y > LastStatus.Position.Y) {
				    api.turnLeft();
					api.moveForward();
					api.moveForward();
					api.turnRight();
					break;
				 }
				 else if (Environment[k].HitType == "Wall" && k != h && Environment[k].Position.Y < LastStatus.Position.Y) {
				    api.turnRight();
					api.moveForward();
					api.moveForward();
					api.turnLeft();
					break;
				 }
				 
				}
			
			}
		  case "West":
		    if (Environment[h].HitType == "Bot" && !(Environment[h].Position.X == LastStatus.Position.X && Environment[h].Position.Y == LastStatus.Position.Y)) {
			    if (Environment[h].Position.X == LastStatus.Position.X) {
		           if (Environment[h].Position.Y < LastStatus.Position.Y) {
				      api.turnRight();
					  return; }
				   else  {
				      api.turnLeft();
					  return; 
					}
				}
				else if (Environment[h].Position.X < LastStatus.Position.X) {
				   if (Environment[h].Position.Y < LastStatus.Position.Y) {
				      api.moveForward();
					  api.turnRight(); 
					  return;  }
				   else if (Environment[h].Position.Y > LastStatus.Position.Y) {
				      api.moveForward();
					  api.turnLeft();
					  return;  }
				}
				else if (Environment[h].Position.X > LastStatus.Position.X) {
				   if (Environment[h].Position.Y < LastStatus.Position.Y) {
				      api.moveBackward();
					  api.turnRight();
					  return;  }
				   else if (Environment[h].Position.Y > LastStatus.Position.Y) {
				      api.moveBackward();
					  api.turnLeft();
					  return;  }
				   else if (Environment[h].Position.Y == LastStatus.Position.Y) {
				      api.turnLeft();
					  api.turnLeft();
					  return;  }
			    }
			}
			else if (Environment[h].HitType == "Armory"	) 
			   moveTo(LastStatus.Position,Environment[h].Position);
			else if (Environment[h].HitType =="Wall" && Environment[h].Position.Y == LastStatus.Position.Y && Environment[h].Position.X < LastStatus.Position.X) {
			  
			   for (k = 0; k < Environment.length; k++) {
			     if (Environment[k].HitType == "Wall" && k != h && Environment[k].Position.Y > LastStatus.Position.Y) {
				    api.turnRight();
					api.moveForward();
					api.moveForwad();
					api.turnLeft();
					break;
				 }
				 else if (Environment[k].HitType == "Wall" && k != h && Environment[k].Position.Y < LastStatus.Position.Y) {
				    api.turnLeft();
					api.moveForward();
					api.moveForward();
					api.turnRight();
					break;
				 }
				 
				}
			
			}
		  case "North":
		    if (Environment[h].HitType == "Bot" && !(Environment[h].Position.X == LastStatus.Position.X && Environment[h].Position.Y == LastStatus.Position.Y)) {
			    if (Environment[h].Position.Y == LastStatus.Position.Y) {
		           if (Environment[h].Position.X < LastStatus.Position.X) {
				      api.turnLeft();
					  return; }
				   else  {
				      api.turnRight();
					  return; 
					}
				}
				else if (Environment[h].Position.Y < LastStatus.Position.Y) {
				   if (Environment[h].Position.X < LastStatus.Position.X) {
				      api.moveForward();
					  api.turnLeft(); 
					  return;  }
				   else if (Environment[h].Position.X > LastStatus.Position.X) {
				      api.moveForward();
					  api.turnRight();
					  return;  }
				   else if (Environment[h].Position.X == LastStatus.Position.X) {
				      api.fire();
					  return;  }
				}
				else if (Environment[h].Position.Y > LastStatus.Position.Y) {
				   if (Environment[h].Position.X < LastStatus.Position.X) {
				      api.moveBackward();
					  api.turnLeft();
					  return;  }
				   else if (Environment[h].Position.X > LastStatus.Position.X) {
				      api.moveBackward();
					  api.turnRight();
					  return;  }
				   else if (Environment[h].Position.X == LastStatus.Position.X) {
				      api.turnLeft();
					  api.turnLeft();
					  return;  }
			    }
			}
			else if (Environment[h].HitType == "Armory"	) 
			   moveTo(LastStatus.Position,Environment[h].Position);
			else if (Environment[h].HitType =="Wall" && Environment[h].Position.X == LastStatus.Position.X && Environment[h].Position.Y < LastStatus.Position.Y) {
			  
			   for (k = 0; k < Environment.length; k++) {
			     if (Environment[k].HitType == "Wall" && k != h && Environment[k].Position.X < LastStatus.Position.X) {
				    api.turnRight();
					api.moveForward();
					api.moveForward();
					api.turnLeft();
					break;
				 }
				 else if (Environment[k].HitType == "Wall" && k != h && Environment[k].Position.X > LastStatus.Position.X) {
				    api.turnLeft();
					api.moveForward();
					api.moveForward();
					api.turnRight();
					break;
				 }
				 
				}
			
			} 
			case "South":
		    if (Environment[h].HitType == "Bot" && !(Environment[h].Position.X == LastStatus.Position.X && Environment[h].Position.Y == LastStatus.Position.Y)) {
			    if (Environment[h].Position.Y == LastStatus.Position.Y) {
		           if (Environment[h].Position.X < LastStatus.Position.X) {
				      api.turnRight();
					  return; }
				   else  {
				      api.turnLeft();
					  return; 
					}
				}
				else if (Environment[h].Position.Y < LastStatus.Position.Y) {
				   if (Environment[h].Position.X < LastStatus.Position.X) {
				      api.moveBackward();
					  api.turnRight(); 
					  return;  }
				   else if (Environment[h].Position.X > LastStatus.Position.X) {
				      api.moveBackward();
					  api.turnLeft();
					  return;  }
				   else if (Environment[h].Position.X == LastStatus.Position.X) {
				      api.fire();
					  return;  }
				}
				else if (Environment[h].Position.Y > LastStatus.Position.Y) {
				   if (Environment[h].Position.X < LastStatus.Position.X) {
				      api.moveForward();
					  api.turnRight();
					  return;  }
				   else if (Environment[h].Position.X > LastStatus.Position.X) {
				      api.moveForward();
					  api.turnLeft();
					  return;  }
				   else if (Environment[h].Position.X == LastStatus.Position.X) {
				      api.turnLeft();
					  api.turnLeft();
					  return;  }
			    }
			}
			else if (Environment[h].HitType == "Armory"	) 
			   moveTo(LastStatus.Position,Environment[h].Position);
			else if (Environment[h].HitType =="Wall" && Environment[h].Position.X == LastStatus.Position.X && Environment[h].Position.Y > LastStatus.Position.Y) {
			  
			   for (k = 0; k < Environment.length; k++) {
			     if (Environment[k].HitType == "Wall" && k != h && Environment[k].Position.X < LastStatus.Position.X) {
				    api.turnLeft();
					api.moveForward();
					api.moveForward();
					api.turnRight();
					break;
				 }
				 else if (Environment[k].HitType == "Wall" && k != h && Environment[k].Position.X > LastStatus.Position.X) {
				    api.turnRight();
					api.moveForward();
					api.moveForward();
					api.turnLeft();
					break;
				 }
				 
				}
			
			} 
			
			
			
		}
	  }
	  
	  if (api.getStatus().Position.X < 3 && api.getStatus().Heading == "West") {
          api.turnRight();
 		  api.turnRight();
	  }
	  if (api.getStatus().Position.X > (api.getStatus().Dimensions.X -3)  && api.getStatus().Heading == "East") {
	      api.turnRight();
		  api.turnRight();
	  }
	  if (api.getStatus().Position.Y < 3 && api.getStatus().Heading == "North") {
	      api.turnRight();
		  api.turnRight();
	  }
	  if (api.getStatus().Position.Y > (api.getStatus().Dimensions.Y - 3) && api.getStatus().Heading == "South") {
	      api.turnRight();
		  api.turnRight();
	  }
	
	}

function update(){
    var b,res,p,status;
	ThisStatus = api.getStatus();
    

	if (ThisStatus.TankStatus.Ammo == 0)
	  searchAmmo();
	else 
	  hunt();
	nextMove = peekMove();
	  
	api.moveForward();
	api.moveForward();
	api.moveForward();
	  
	  switch(nextMove) {
	    case 0:
		  api.turnRight();
		break;
		case 1:
		  api.turnLeft();
		break;
		case 2:
		  return;
		break;
		case 3:
		  return;
	  }
	  
	
}