// Docs at http://simpleweather.monkeecreate.com

var todaysForecast = "";

$(document).ready(function() {


  $.simpleWeather({
    zipcode: '',
    woeid: '23519519',
    location: '',
    unit: 'f',
    success: function(weather) {
    html = '<h2>'+weather.city+', '+weather.region+'</h2>';
    html += '<img style="float:left;" width="125px" src="'+weather.image+'">';
    html += '<p>'+weather.temp+'&deg; '+weather.units.temp+'<br /><span>'+weather.currently+'</span></p>';
    html += '<a href="'+weather.link+'">View Forecast &raquo;</a>';

    $("#calendricalInfoHolder").html(("Today in " + weather.city + ", " + " it is going to be " + weather.temp+ ' degrees '+weather.units.temp+"." + " " + clothingSuggestion(weather.temp)).valueOf())

    console.log(todaysForecast);
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }


  });

});

function clothingSuggestion(num){
    var i = Math.random();
    if(num < 30){
        if(i < .5){
            return "It is going to be quite cold, I suggest you wear a jacket!";
        } else {
            return "Brrrr, it's freezing! Wear a jacket please!";
        }
    } else if (num < 60){
        if(i < .33){
            return "It will get warmer as the day progresses. I suggest wearing some layers.";
        } else if (i < .66) {
            return "Perhaps take your jacket, it will help if you feel the breeze."
        } else {
            return "I understand you have a strong resistance to the cold but wear a jacket!"
        }
    } else if (num < 80){
        if(i < .3){
            return "It is going to be pretty warm today. A pant and shirt will suffice."
        } else if(i < .6){
            return "Today is a reasonably nice day. Don't wear too much!";
        }else {
            return "It's a pleasant day! Enjoy yourself."
        }

    } else {
        return "Go out in your T-Shirt and shorts! It is a hot day."
    }
}


/*
 * simpleWeather - http://simpleweather.monkeecreate.com
 * Version 2.1 - Last updated: November 17 2012
 */
(function($){"use strict";$.extend({simpleWeather:function(m){m=$.extend({zipcode:'',woeid:'2357536',location:'',unit:'f',success:function(a){},error:function(a){}},m);var n=new Date();var o='http://query.yahooapis.com/v1/public/yql?format=json&rnd='+n.getFullYear()+n.getMonth()+n.getDay()+n.getHours()+'&diagnostics=true&callback=?&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=';if(m.location!==''){o+='select * from weather.forecast where location in (select id from weather.search where query="'+m.location+'") and u="'+m.unit+'"'}else if(m.zipcode!==''){o+='select * from weather.forecast where location in ("'+m.zipcode+'") and u="'+m.unit+'"'}else if(m.woeid!==''){o+='select * from weather.forecast where woeid='+m.woeid+' and u="'+m.unit+'"'}else{m.error("No location given. Please provide either a US zip code, WOEID or location.");return false}$.getJSON(o,function(l){if(l!==null&&l.query.results!==null){$.each(l.query.results,function(i,a){if(a.constructor.toString().indexOf("Array")!==-1){a=a[0]}var b=new Date();var c=new Date(b.toDateString()+' '+a.astronomy.sunrise);var d=new Date(b.toDateString()+' '+a.astronomy.sunset);if(b>c&&b<d){var e='d'}else{var e='n'}var f=['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW','N'];var g=f[Math.round(a.wind.direction/22.5)];if(a.item.condition.temp<80&&a.atmosphere.humidity<40){var h=-42.379+2.04901523*a.item.condition.temp+10.14333127*a.atmosphere.humidity-0.22475541*a.item.condition.temp*a.atmosphere.humidity-6.83783*(Math.pow(10,-3))*(Math.pow(a.item.condition.temp,2))-5.481717*(Math.pow(10,-2))*(Math.pow(a.atmosphere.humidity,2))+1.22874*(Math.pow(10,-3))*(Math.pow(a.item.condition.temp,2))*a.atmosphere.humidity+8.5282*(Math.pow(10,-4))*a.item.condition.temp*(Math.pow(a.atmosphere.humidity,2))-1.99*(Math.pow(10,-6))*(Math.pow(a.item.condition.temp,2))*(Math.pow(a.atmosphere.humidity,2))}else{var h=a.item.condition.temp}if(m.unit==="f"){var j=Math.round((5.0/9.0)*(a.item.condition.temp-32.0))}else{var j=Math.round((9.0/5.0)*a.item.condition.temp+32.0)}var k={title:a.item.title,temp:a.item.condition.temp,tempAlt:j,code:a.item.condition.code,todayCode:a.item.forecast[0].code,units:{temp:a.units.temperature,distance:a.units.distance,pressure:a.units.pressure,speed:a.units.speed},currently:a.item.condition.text,high:a.item.forecast[0].high,low:a.item.forecast[0].low,forecast:a.item.forecast[0].text,wind:{chill:a.wind.chill,direction:g,speed:a.wind.speed},humidity:a.atmosphere.humidity,heatindex:h,pressure:a.atmosphere.pressure,rising:a.atmosphere.rising,visibility:a.atmosphere.visibility,sunrise:a.astronomy.sunrise,sunset:a.astronomy.sunset,description:a.item.description,thumbnail:"http://l.yimg.com/a/i/us/nws/weather/gr/"+a.item.condition.code+e+"s.png",image:"http://l.yimg.com/a/i/us/nws/weather/gr/"+a.item.condition.code+e+".png",tomorrow:{high:a.item.forecast[1].high,low:a.item.forecast[1].low,forecast:a.item.forecast[1].text,code:a.item.forecast[1].code,date:a.item.forecast[1].date,day:a.item.forecast[1].day,image:"http://l.yimg.com/a/i/us/nws/weather/gr/"+a.item.forecast[1].code+"d.png"},city:a.location.city,country:a.location.country,region:a.location.region,updated:a.item.pubDate,link:a.item.link};m.success(k)})}else{if(l.query.results===null){m.error("Invalid location given.")}else{m.error("Weather could not be displayed. Try again.")}}});return this}})})(jQuery);
