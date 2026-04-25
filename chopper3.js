G.AddData({
name:'Choppers, Choppers, and Choppers',
author:'Ikyman',
desc:'Adds Three different types of Choppers.',
engineVersion:1,
manifest:0,
requires:['Default dataset*'],
sheets:{'chopperSheet':'https://raw.githubusercontent.com/ikyman/Neverending-Legacy-Chopper3/refs/heads/main/img/ChopperSheet.png'},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
{

	G.resCategories['vehicles'] = {
		name:"Vehicles",
		base:[],
		side:[],

	}
	
	new G.Res({
		name:'flesh chopper',
		desc:'[flesh chopper, Flesh choppers] take joy in hacking [adult, Fellows] into little tiny bits. Something to be avoided!',
		partOf:'population',
		icon:[0,3, 'chopperSheet'],
	});

	// Vehicle Resources
	new G.Res({
		name:'unbladed chopper, no petrol',
		desc:`A Motorcycle without any fuel on it. If you have a leather jacket, you could snap a pic for the 'gram.\
		You can't do much else with it until you acquire fuel, I'm afraid.`,
		icon:[0,1,'chopperSheet'],
		category:'vehicles',
	});	
	new G.Res({
		name:'unbladed chopper',
		desc:"Otherwise known as a 'Motorcycle'.",
		icon:[1,1,'chopperSheet'],
		displayUsed:true,
		category:'vehicles',
	});
	new G.Res({
		name:'spinning chopper, no petrol',
		desc:`Give a human enough stiff drinks, they'll become all whirly. Much in the same manner, this whirlybird needs a stiff drink before it goes all whirly.`,
		icon:[0,2,'chopperSheet'],
		category:'vehicles',
	});	

	new G.Res({
		name:'spinning chopper',
		desc:"Otherwise known as a 'Helicopter'.",
		icon:[1,2,'chopperSheet'],
		displayUsed:true,
		category:'vehicles',
	});

	new G.Res({
		name: "crude oil",
		desc: "A mean, surly, and uncouth type of oil.",
		icon: [5,5,'chopperSheet'],
		category:'vehicles',
	});

	new G.Res({
		name: "jerry-can",
		desc: "Full of flammable fluid",
		icon: [1,0,'chopperSheet'],
		category:'vehicles',
	});

	new G.Res({
		name:"tinned meal",
		desc:"You, sitting on your computer might scoff at the idea of cold beans."+
		"Your citizens, living a much less comfortable lives, are tickled pink by this acme of gastronomic experience."+
		"Or, they would be, if they could actually open this oddly shiny cylinder.",
		icon:[0,0,'chopperSheet'],
		turnToByContext:{'eat':{'health':0.01,'happiness':0.1},'decay':{'tinned meal':0.5}},
		partOf:'food',
		category:'food',
	});


	new G.Res({
		name:'FWOOOOSH',
		desc:'A great big fireball, great for scaring away choppers you might come across.',
		icon:[13,7],
		category:'misc',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.01;
			var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
		},
	});

	new G.Unit({
		name:'recon pilot',
		desc:'@Discovering [land] from the Air is vastly superior to discovering [land] from the [land]. @The Chopper being fast doesn’t hurt, either.',
		icon:[5,5],
		cost:{'food':20, 'jerry-can' : 2},
		use:{'worker':1, 'spinning chopper':1},
		effects:[
			{type:'explore',explored:0.5,unexplored:0.1},
		],
		req:{'scouting':true},
		category:'exploration',
	});

	G.getDict('firekeeper').modes['fwooosh'] = {name:'Wicked Rad, Yo!', desc: "Chuck petrol onto the fire. FWOOOSH! Frightens away choppers. (OSHA noncomplient)"}

	G.getDict('firekeeper').effects.push({type:'convert',from:{'stick':30, 'jerry-can': 1},into:{'fire pit':2, 'FWOOOOSH': 1},every:10,mode:'fwooosh'})
	
	G.getDict('wanderer').gizmos=true

	G.getDict('wanderer').modes["wandering"] = {
		name: "Wandering",
		desc: "Wanders known [land] and reports anything interesting."
	}
	G.getDict('wanderer').effects.push({type:'explore',explored:0.1,unexplored:0, mode: "wandering"},);


	G.getDict('wanderer').modes["unbladed chopper wandering"] = {
		name:'Unbladed Chopper Wandering',
		desc:'Explores [land] much faster with the help of Harley and Davidson.',
		use:{'unbladed chopper':1}
	}
	G.getDict('wanderer').effects.push({type:'explore',explored:0.3,unexplored:0,mode:"unbladed chopper wanderer"});
	
	G.getDict('scout').gizmos=true
	G.getDict('scout').modes["scouting"] = {
		name: "Scouting",
		desc: "Explores, seeking new [land]."
	}
	G.getDict('scout').effects.push({type:'explore',explored:0,unexplored:0.01,mode:"scouting"});

	G.getDict('scout').modes["unbladed chopper scouting"]= {
		name:'Unbladed Chopper Scouting',
		desc:'Explores [land] much faster with the help of Harley and Davidson.',
		use:{'unbladed chopper':1}
	}
	G.getDict('scout').effects.push({type:'explore',explored:0.01,unexplored:0.02,mode:"unbladed chopper scouting"});

	G.getDict('hunter').modes["drive-by shooting"] = {
		name: 'drive-by shooting',
		desc: 'Hunting? Nay, this is a hit on Mr. Foxy-Woxy over there.',
		use: {'bow':1, 'unbladed chopper':1},
		req:{'hot sauce preparing':true}
	}
	G.getDict('hunter').effects.push({type:'gather',context:'hunt',amount:6,max:10,mode:"drive-by shooting"});

	//Then we add a new technology which is required by the artisans to gain access to the "hot sauce" mode :
	new G.Tech({
		name: 'chopper flying',
		desc: 'Enough training and instruction so that you only crash your helicopter some of the time, as opposed to most of the time.',
		icon:[0,1,'spicySheet'],
		cost:{'insight':25},
		req:{"boat building":true, 'chieftains':true}

	})
	new G.Tech({
		name:'hot sauce preparing',
		desc:'@[artisan]s can now produce [hot sauce] from [hot pepper]s and [herb]s//This special recipe allows a skilled craftsman to fully express the complex aromas present in hot peppers.',
		icon:[0,1,'spicySheet'],
		cost:{'insight':10},
		req:{'cooking':true},
	});

	new G.Unit({
		name:'chopper-based shelter',
		desc:'Oh, Hey! An pre-built shelter, with funny metal prongs on the top of the roof!<>@provides 4 [housing].',
		icon:[11,2],
		cost:{'spinning chopper, no petrol':1},
		use:{'land':1},
		effects:[
			{type:'provide',what:{'housing':4}},
		],
		req:{'sedentism':true},
		category:'housing',
	});
	
	//There are many other ways of adding and changing content; refer to /data.js, the default dataset, if you want to see how everything is done in the base game. Good luck!

	G.getDict("rocky substrate").res["dig"]["crude oil"] = 0.05
	G.getDict("rocky substrate").res["mine"]["crude oil"] = 0.05

	new G.Goods({
		name:'can stash',
		desc: 'A [can stash]! Christmas came early!',
		icon:[0,0,"chopperSheet"],
		res:{
			'gather':{'tinned meal':1, 'jerry-can': 0.2}
		}
	})
	new G.Goods({
		name:"abandoned motorcycle",
		desc: "The open road! Freedom! Before the end, it was a siren song.",
		icon:[0,1,'chopperSheet'],
		res:{
			'gather':{"unbladed chopper, no petrol": 2, "unbladed chopper":1}
		}
	})
	new G.Goods({
		name:"abandoned helicopter",
		desc: "Finally, we figure out why all the children are spinning around while T-posing.",
		icon:[0,2,'chopperSheet'],
		res:{
			'gather':{"spinning chopper, no petrol": 2, "spinning chopper":0.5}
		}
	})
	new G.Land({
		name: "abandoned city",
		names: ["abandoned city", "ruins from the time before", "ghost town"],
		goods:[
			{type: 'can stash', amount:5},
			{type: 'abandoned motorcycle', amount: 0.3},
			{type: 'abandoned helicopter', amount: 0.1},
			{type:['fir tree','oak','birch'],amount:0.2},
			{type:'grass'},
			{type:['wolves','bears'],chance:0.5,amount:1},
			{type:['boars'],amount:1},
			{type:'freshwater',amount:0.5},
			{type:'rocky substrate'},
		],
		image:9,
		score:10
	})

	G.getDict("desert").goods.push({type: 'abandoned motorcycle', amount: 0.1});
	G.getDict("jungle").goods.push({type: 'abandoned helicopter', amount: 0.1});
}
});
