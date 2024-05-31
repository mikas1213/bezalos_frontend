export const date_to_yyyy_mm_dd = (my_date) => {
    let setDate = '';
    if(my_date) setDate = new Date(Date.parse(my_date)).toLocaleString('lt-LT', { 
        dateStyle: 'short', 
        // day: '2-digit' 
    }); 
    return setDate;
};

export const isTodayOrLater = (date) => {
    
    const today = Date.parse(new Date().toLocaleString('lt-LT', {dateStyle: 'short'}));
    const nutrition_tracking = Date.parse(date_to_yyyy_mm_dd(date));
    return nutrition_tracking <= today ? 'colorDanger' : 'colorLight';
};

export const isTodayOrFiveDaysBefore = (date) => {

    const date_before = new Date(date);
    date_before.setDate(date_before.getDate() - 5);
    const five_days_before = Date.parse(date_before.toLocaleString('lt-LT', {dateStyle: 'short'}));
    
    const subscription_expires = Date.parse(date_to_yyyy_mm_dd(date));
    const today = Date.parse(new Date().toLocaleString('lt-LT', {dateStyle: 'short'}));

    let setColor = 'colorLight';
    if(today >= five_days_before) setColor = 'colorWarning';
    if(subscription_expires <= today) setColor = 'colorDanger';
    if(!subscription_expires) setColor = 'colorLight'
    return setColor;
};

export const isTwoOrFourWeeks = (date) => {
    
    let setColor = 'colorLight';
    const two_weeks = new Date(date);
    const four_weeks = new Date(date);

    two_weeks.setDate(two_weeks.getDate() + 14);
    four_weeks.setDate(four_weeks.getDate() + 28);

    const two_week_later = Date.parse(two_weeks.toLocaleString('lt-LT', {dateStyle: 'short'}));
    const four_week_later = Date.parse(four_weeks.toLocaleString('lt-LT', {dateStyle: 'short'}));

    const today = Date.parse(new Date().toLocaleString('lt-LT', {dateStyle: 'short'}));

    if(today >= two_week_later) setColor = 'colorWarning';
    if(today >= four_week_later) setColor = 'colorDanger';
    if(date === null) setColor = 'colorLight';
    
    return setColor;
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