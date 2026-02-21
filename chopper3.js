G.AddData({
name:'Choppers, Choppers, and Choppers',
author:'Ikyman',
desc:'Adds Three different types of Choppers.',
engineVersion:1,
manifest:0,
requires:['Default dataset*'],
sheets:{'spicySheet':'https://raw.githubusercontent.com/ikyman/Neverending-Legacy-Chopper3/refs/heads/main/img/spicyModIconSheet.png'},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
{

	G.resCategories['vehicles'] = {
		name:"Vehicles",
		base:[],
		side:[],

	}
	// Vehicle Resources
	new G.Res({
		name:'unbladed chopper, no petrol',
		desc:`A Motorcycle without any fuel on it. If you have a leather jacket, you could snap a pic for the 'gram.\
		You can't do much else with it until you acquire fuel, I'm afraid.`,
		icon:[0,0,'spicySheet'],
		category:'vehicles',
	});	
	new G.Res({
		name:'unbladed chopper',
		desc:"Otherwise known as a 'Motorcycle'.",
		icon:[0,0,'spicySheet'],
		displayUsed:true,
		category:'vehicles',
	});
	new G.Res({
		name:'spinning chopper, no petrol',
		desc:`Give a human enough stiff drinks, they'll become all whirly. Much in the same manner, this whirlybird needs a stiff drink before it goes all whirly.`,
		icon:[0,0,'spicySheet'],
		category:'vehicles',
	});	

	new G.Res({
		name:'spinning chopper',
		desc:"Otherwise known as a 'Helicopter'.",
		icon:[0,0,'spicySheet'],
		displayUsed:true,
		category:'vehicles',
	});

	new G.Res({
		name: "jerry-can",
		desc: "Full of flammable fluid",
		icon: [1,1,'spicySheet'],
		partOf:'vehicles',
	});

	new G.Res({
		name:"tinned meal",
		desc:"You, sitting on your computer might scoff at the idea of cold beans."+
		"Your citizens, living a much less comfortable lives, are tickled pink by this acme of gastronomic experience."+
		"Or, they would be, if they could actually open this oddly shiny cylinder.",
		icon:[1,0,'spicySheet'],
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

	G.getDict('firekeeper').modes['fwooosh'] = {names:'wicked rad, yo!', desc: "Chuck petrol onto the fire. Frightens away choppers. (OSHA noncomplient)"}

	G.getDict('firekeeper').effects.push({type:'convert',from:{'stick':40},into:{'fire pit':2, 'FWOOOOSH': 1},every:10,mode:'fwooosh'})
	
	G.getDict('wanderer').modes["unbladed chopper wanderer"] = {
		name:'unbladed chopper wanderer',
		desc:'Explores [land] much faster with the help of Harley and Davidson.',
		use:{'unbladed chopper':1}
	}
	G.getDict('wanderer').effects.push({type:'explore',explored:0.3,unexplored:0,mode:"unbladed chopper wanderer"});

	G.getDict('scout').modes["unbladed chopper scout"]= {
		name:'unbladed chopper scout',
		desc:'Explores [land] much faster with the help of Harley and Davidson.',
		use:{'unbladed chopper':1}
	}
	G.getDict('scout').effects.push({type:'explore',explored:0.01,unexplored:0.02,mode:"unbladed chopper scout"});

	G.getDict('hunter').modes["drive-by shooting"] = {
		name: 'drive-by shooting',
		desc: 'Hunting? Nay, this is a hit on Mr. Foxy-Woxy over there.',
		use: {'bow':1, 'unbladed chopper':1},
		req:{'hot sauce preparing':true}
	}
	G.getDict('scout').effects.push({type:'gather',context:'hunt',amount:6,max:10,mode:"drive-by shooting"});

	//Then we add a new technology which is required by the artisans to gain access to the "hot sauce" mode :
	new G.Tech({
		name:'hot sauce preparing',
		desc:'@[artisan]s can now produce [hot sauce] from [hot pepper]s and [herb]s//This special recipe allows a skilled craftsman to fully express the complex aromas present in hot peppers.',
		icon:[0,1,'spicySheet'],
		cost:{'insight':10},
		req:{'cooking':true},
	});
	
	//There are many other ways of adding and changing content; refer to /data.js, the default dataset, if you want to see how everything is done in the base game. Good luck!

	new G.Goods({
		name:'can stash',
		desc: 'A [can stash]! Christmas came early!',
		icon:[8,1],
		res:{
			'gather':{'tinned meal':1, 'jerry-can': 0.2}
		}
	})
	new G.Goods({
		name:"abandoned motorcycle",
		desc: "The open road! Freedom! Before the end, it was a siren song.",
		icon:[8,1],
		res:{
			'gather':{"unbladed chopper, no petrol": 2, "unbladed chopper":1}
		}
	})
	new G.Goods({
		name:"abandoned helicopter",
		desc: "Finally, we figure out why all the children are spinning around while T-posing.",
		icon:[8,1],
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
