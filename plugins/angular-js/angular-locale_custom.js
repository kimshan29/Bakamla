﻿'use strict';
angular.module("ngLocale", [], ["$provide", function ($provide) {
    var PLURAL_CATEGORY = { ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other" };
    $provide.value("$locale", {
        "DATETIME_FORMATS": {
            "AMPMS": [
              "AM",
              "PM"
            ],
            "DAY": [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "ERANAMES": [
              "Before Christ",
              "Anno Domini"
            ],
            "ERAS": [
              "BC",
              "AD"
            ],
            "FIRSTDAYOFWEEK": 6,
            "MONTH": [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ],
            "SHORTDAY": [
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat"
            ],
            "SHORTMONTH": [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ],
            "STANDALONEMONTH": [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ],
            "WEEKENDRANGE": [
              5,
              6
            ],
            "fullDate": "EEEE, d 'de' MMMM 'de' y",
            "longDate": "d 'de' MMMM 'de' y",
            "medium": "d 'de' MMM 'de' y HH:mm:ss",
            "mediumDate": "d 'de' MMM 'de' y",
            "mediumTime": "HH:mm:ss",
            "short": "dd/MM/yy HH:mm",
            "shortDate": "dd/MM/yy",
            "shortTime": "HH:mm"
        },
        "NUMBER_FORMATS": {
            "CURRENCY_SYM": "R$",
            "DECIMAL_SEP": ",",
            "GROUP_SEP": ".",
            "PATTERNS": [
              {
                  "gSize": 3,
                  "lgSize": 3,
                  "maxFrac": 3,
                  "minFrac": 0,
                  "minInt": 1,
                  "negPre": "-",
                  "negSuf": "",
                  "posPre": "",
                  "posSuf": ""
              },
              {
                  "gSize": 3,
                  "lgSize": 3,
                  "maxFrac": 2,
                  "minFrac": 2,
                  "minInt": 1,
                  "negPre": "-\u00a4",
                  "negSuf": "",
                  "posPre": "\u00a4",
                  "posSuf": ""
              }
            ]
        },
        "id": "pt-br",
        "localeID": "pt_BR",
        "pluralCat": function (n, opt_precision) { if (n >= 0 && n <= 2 && n != 2) { return PLURAL_CATEGORY.ONE; } return PLURAL_CATEGORY.OTHER; }
    });
}]);
