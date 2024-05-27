export const date_to_yyyy_mm_dd = (my_date) => {
    let setDate = '';
    if(my_date) setDate = new Date(Date.parse(my_date)).toLocaleString('lt-LT', { dateStyle: 'short' }); 
    
    return setDate;
};

export const isTodayOrFiveDaysBefore = (date) => {
    
    const date_before = new Date(date);
    date_before.setDate(date_before.getDate() - 5);
    
    const subscription_expires = Date.parse(date_to_yyyy_mm_dd(date));
    const five_days_before = Date.parse(date_before.toLocaleString('lt-LT', {dateStyle: 'short'}));
    const today = Date.parse(new Date().toLocaleString('lt-LT', {dateStyle: 'short'}));

    let setColor = '';
    if(today >= five_days_before) setColor = 'colorWarning';
    if(subscription_expires <= today) setColor = 'colorDanger';
    if(!subscription_expires) setColor = ''
    return setColor;
};

export const isTodayOrLater = (date) => {
    
    const today = Date.parse(new Date().toLocaleString('lt-LT', {dateStyle: 'short'}));
    const nutrition_tracking = Date.parse(date_to_yyyy_mm_dd(date));
    return nutrition_tracking <= today ? 'colorDanger' : '';
};



/*
dateStyle	Legal values:
"full"
"long"
"medium"
"short"

timeStyle	"full"
"long"
"medium"
"short"
localeMatcher
"best-fit" (default)
"lookup"
timeZone	 
hour12	false
true
hourCycle	"h11"
"h12"
"h23"
"h24"
formatMatcher
"basic"
"best-fit" (default)
weekday	"long"
"short"
"narrow"
year	"2-digit"
"numeric"
month	"2-digit"
"long"
"narrow"
"numeric"
"short"
day	"2-digit"
"numeric"
hour	"2-digit"
"numeric"
minute	"2-digit"
"numeric"
second	"2-digit"
"numeric"
timeZoneName	"long"
"short"
*/