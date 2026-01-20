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
	new G.Res({
		name:"tinned meal",
		desc:"You, sitting on your computer might scoff at the idea of cold beans.\
		Your citizens, living a much less comfortable lifes, are tickled pink by this acme of gastronomic experience.\
		Or, they would be, if they could actually open this oddly shiny cylinder.",
		icon:[1,0,'spicySheet'],
		turnToByContext:{'eat':{'health':0.01,'happiness':0.1},'decay':{'tinned meal':0.5}},
		partOf:'food',
		category:'food',
	});

	
	//First we create a couple new resources :
	new G.Res({
		name:'unbladed chopper, no petrol',
		desc:"A Motorcycle without any fuel on it. If you have a leather jacket, you could snap a pic for the 'gram.\
		You can't do much else with it until you acquire fuel, I'm afraid.",
		icon:[0,0,'spicySheet'],
		partOf:'vehicles',
	});	
	new G.Res({
		name:'unbladed chopper',
		desc:"Otherwise known as a 'Motorcycle'.",
		icon:[0,0,'spicySheet'],
		partOf:'vehicles',
	});
	new G.Res({
		name:'hot sauce',
		desc:'Made from [herb]s and the [hot pepper,Spiciest peppers], this [hot sauce] stays fresh for a while and will leave anyone panting and asking for more.',
		icon:[1,0,'spicySheet'],
		turnToByContext:{'eat':{'health':0.03,'happiness':0.1},'decay':{'hot sauce':0.95,'spoiled food':0.05}},//that last part makes hot sauce effectively have a 95% chance of simply not rotting (in effect, it decays into itself)
		partOf:'food',
		category:'food',
	});
	
	//Then we augment the base data to incorporate our new resources :
		//adding hot pepper as something that can be gathered from grass
	G.getDict('grass').res['gather']['hot pepper']=3;
		//adding a new mode to artisans so they can make hot sauce from hot peppers
	G.getDict('artisan').modes['hot sauce']={name:'Make hot sauce',desc:'Turn 3 [hot pepper]s and 3 [herb]s into 1 [hot sauce].',req:{'hot sauce preparing':true},use:{'knapped tools':1}};
		//adding a new effect to artisans that handles the actual hot sauce preparing and is only active when the unit has the mode "hot sauce"
	G.getDict('artisan').effects.push({type:'convert',from:{'hot pepper':3,'herb':3},into:{'hot sauce':1},every:3,mode:'hot sauce'});
	
	new G.Unit({
		name:'chopper wanderer',
		desc:'Explores [land] much faster with the help of Harley and Davidson.',
		icon:[2,2],
		cost:{'food':20},
		use:{'worker':1},
		staff:{'chopper'},
		effects:[
			{type:'explore',explored:0.1,unexplored:0},
			{type:'function',func:unitGetsConverted({},0.01,0.05,'[X] [people].','wanderer got lost','wanderers got lost'),chance:1/100}
		],
		req:{'speech':true},
		category:'exploration',
	});

	//Then we add a new technology which is required by the artisans to gain access to the "hot sauce" mode :
	new G.Tech({
		name:'hot sauce preparing',
		desc:'@[artisan]s can now produce [hot sauce] from [hot pepper]s and [herb]s//This special recipe allows a skilled craftsman to fully express the complex aromas present in hot peppers.',
		icon:[0,1,'spicySheet'],
		cost:{'insight':10},
		req:{'cooking':true},
	});
	
	//Finally, we add a trait that amplifies the benefits of consuming hot sauce; it will take on average 20 years to appear once the conditions (knowing the "Hot sauce preparing" tech) is fulfilled.
	new G.Trait({
		name:'hot sauce madness',
		desc:'@your people appreciate [hot sauce] twice as much and will be twice as happy from consuming it.',
		icon:[1,1,'spicySheet'],
		chance:20,
		req:{'hot sauce preparing':true},
		effects:[
			{type:'function',func:function(){G.getDict('hot sauce').turnToByContext['eat']['happiness']=0.2;}},//this is a custom function executed when we gain the trait
		],
	});
	
	//There are many other ways of adding and changing content; refer to /data.js, the default dataset, if you want to see how everything is done in the base game. Good luck!

	new G.Goods({
		name:'can stash',
		desc: 'A [can stash]! Christmas came early!',
		icon:[8,1],
		res:{
			'gather':{'tinned meal':2, 'gerry can': 1}
		}
	})
	new G.Goods({
		name:"abandoned Motorcycle",
		desc: "The open road! Freedom! Before the end, it was a siren song.",
		icon:[8,1],
		res:{
			'gather':{"unbladed chopper, no petrol": 2, "unbladed chopper":1}
		}
	})
}
});
