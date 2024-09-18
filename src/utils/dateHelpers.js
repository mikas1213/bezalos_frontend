export const date_to_yyyy_mm_dd = (my_date) => {
    let setDate = '';
    if(my_date) setDate = new Date(Date.parse(my_date)).toLocaleString('lt-LT', { 
        dateStyle: 'short', 
        // day: '2-digit' 
    }); 
    return setDate;
};

// For subscription date
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

// For plano paruošimui / mitybą seka
export const isTodayOrLater = (date) => {
    
    const today = Date.parse(new Date().toLocaleString('lt-LT', {dateStyle: 'short'}));
    const plan_prepare = Date.parse(date_to_yyyy_mm_dd(date));
    return plan_prepare <= today ? 'colorDanger' : 'colorLight';
};

// Planas priskirtas
export const isTwoOrFourWeeks = (date) => {
    const two_weeks = new Date(date);
    const four_weeks = new Date(date);

    two_weeks.setDate(two_weeks.getDate() + 14);
    four_weeks.setDate(four_weeks.getDate() + 28);

    const two_week_later = Date.parse(two_weeks.toLocaleString('lt-LT', {dateStyle: 'short'}));
    const four_week_later = Date.parse(four_weeks.toLocaleString('lt-LT', {dateStyle: 'short'}));

    const today = Date.parse(new Date().toLocaleString('lt-LT', {dateStyle: 'short'}));

    let setColor = 'colorLight';
    if(today >= two_week_later) setColor = 'colorWarning';
    if(today >= four_week_later) setColor = 'colorDanger';
    if(date === null) setColor = 'colorLight';
    
    return setColor;
};

export const isMaintenance = (date, status) => {
    
    const week_1 = new Date(date);
    const week_2 = new Date(date);
    const week_3 = new Date(date);
    const week_4 = new Date(date);

    week_1.setDate(week_1.getDate() + 7);
    week_2.setDate(week_2.getDate() + 14);
    week_3.setDate(week_3.getDate() + 21);
    week_4.setDate(week_4.getDate() + 28);

    const today = Date.parse(new Date().toLocaleString('lt-LT', {dateStyle: 'short'}));
    const after_week_1 = Date.parse(week_1.toLocaleString('lt-LT', {dateStyle: 'short'}));
    const after_week_2 = Date.parse(week_2.toLocaleString('lt-LT', {dateStyle: 'short'}));
    const after_week_3 = Date.parse(week_3.toLocaleString('lt-LT', {dateStyle: 'short'}));
    const after_week_4 = Date.parse(week_4.toLocaleString('lt-LT', {dateStyle: 'short'}));
    
    let sav = '';
    let setClass = 'colorLight';

    // Conditions for color change
    if(after_week_1 <= today && after_week_2 > today) {
        sav = '1_sav';
        if(status !== '1 sav') setClass = 'colorDanger';
        
    } else if(after_week_2 <= today && after_week_3 > today) {
        sav = '2_sav'
        if(status !== '2 sav') setClass = 'colorDanger';

    } else if(after_week_3 <= today && after_week_4 > today) {
        sav = '3_sav';
        if(status !== '3 sav') setClass = 'colorDanger';

    } else if(after_week_4 <= today) {
        sav = '4_sav';
        if(status !== '4 sav') setClass = 'colorDanger';
    }

    if(date === null) {
        sav = '';
        setClass = 'colorLight';
    }
    
    return { setClass, sav };
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



/*
day:
The representation of the day.
Possible values are "numeric", "2-digit".

weekday:
The representation of the weekday.
Possible values are "narrow", "short", "long".

year:
The representation of the year.
Possible values are "numeric", "2-digit".

month:
The representation of the month.
Possible values are "numeric", "2-digit", "narrow", "short", "long".

hour:
The representation of the hour.
Possible values are "numeric", "2-digit".

minute: The representation of the minute.
Possible values are "numeric", "2-digit".

second:
The representation of the second.
Possible values are "numeric", 2-digit".

hour12:
The representation of time format.
Accepts boolean true or false

*/