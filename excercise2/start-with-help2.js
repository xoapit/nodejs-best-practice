const util = require("util");
const Holidays = require("date-holidays");
const weather = require("weather-js");

class travellingRecommender {
  //returns promise
  checkHolidays(place) {
    return new Promise((resolve, reject) => {
      const holidays = new Holidays(place.countryCode);
      resolve(holidays.isHoliday(new Date(place.date)));
    });
  }

  //returns callback: (err, boolean) => void
  isGoodWeather(place, callback) {
    console.log(`Check weather of the location ${util.inspect(place)}`);
    weather.find(
      {
        search: `${place.city}, ${place.country}`,
        degreeType: "C",
      },
      (err, weatherResults) => {
        // TODO: handle logic here
      }
    );
  }

  //Should return a promise: Promise<string>
  getRecommendation(place) {
    console.log(`Starting to check now the location ${util.inspect(place)}`);

    // TODO:

    //Use the methods isGoodWeather & checkHolidays to check the travelling recommendations
    //Use only promise, return a promise
  }
}

const placeToCheck = {
  countryCode: "VN",
  country: "Vietnam",
  city: "Danang",
  date: "2021-11-01",
};

//TODO: call the class and invoke the method 'getRecommendation'
// print the result here

