//returns the previous month
const hbs = require(`hbs`);

hbs.registerHelper('getPrevMonth', function(date) {
	let current;
	if (date.getMonth() == 0) {
	    current = new Date(date.getFullYear() - 1, 11, 1);
	} 
    else {
	    current = new Date(date.getFullYear(), date.getMonth() - 1, 1);
	}
    return `${(current.getMonth()+1).toString().padStart(2, 0)}-${current.getFullYear()}`;
});

//returns the next month
hbs.registerHelper('getNextMonth', function(date) {
	let current;
	if (date.getMonth() == 11) {
	    current = new Date(date.getFullYear() + 1, 0, 1);
	} 
    else {
	    current = new Date(date.getFullYear(), date.getMonth() + 1, 1);
	}

    return `${(current.getMonth()+1).toString().padStart(2, 0)}-${current.getFullYear()}`;
});