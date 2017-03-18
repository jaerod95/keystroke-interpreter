module.exports = {

    /**
     * Each key gets a unique key. how to handle ctrl and shift keys?
     * All keys are different, all keys are different
     */
    keyStats: (keyData) => {
        /*
        var j = {
            id: 0,
            keyName: "space",
            keyCode: 124,
            keyDownT1imestamp: 0001,
            keyUpTimestamp: 2000,
            dwellTime: 1999,
            shift: 1,
            ctrl: 0,
            alt: 0,
        }*/

        //for (var i = 0; i < )
        var results = {}
        return results
    },

    /********************************************************
     * Calculates the DwellTime by Key                      *
     * @param  {JSON} data KeyEvents of data                *
     * @return {JSON}      JSON object of DwellTime per Key *
     ********************************************************/
    pairEvents: (keystrokes) => {
        var result = {};
        var str = '{';
        for (page in keystrokes) {
            str += '"' + page + '": null,';
        }
        str = str.slice(0, -1);
        str += '}';
        result = JSON.parse(str);

        var keyTemp = [];
        var temp = [];

        for (page in keystrokes) {
            result[page] = [];
            keystrokes[page].KeyEvents.forEach((val, ind, arr) => {
                var index = keyTemp.indexOf(val.code);
                if (index != -1) {
                    if (val.type == "keydown")
                        val["wrongKeyPair"] = true;
                    else
                        val["wrongKeyPair"] = false;

                    if (result[page][val.code] == null)
                        result[page][val.code] = [];

                    var keyEvent = {
                        "code": val.code,
                        "Press": temp[index].timeStamp,
                        "Release": val.timeStamp,
                        "allData": {
                            "Press": temp[index],
                            "Release": val
                        }
                    }
                    result[page].push(keyEvent);
                    temp.splice(index, 1);
                    keyTemp.splice(index, 1);
                } else {
                    if (val.type == "keyup")
                        val["wrongKeyPair"] = true;
                    else
                        val["wrongKeyPair"] = false;
                    keyTemp.push(val.code);
                    temp.push(val);
                }
            });
        }
        return result
    },

    /******************************************************************** */
    getWrongPairedEvents: (pairedKeystrokes) => {
        var results = {};
        for (page in pairedKeystrokes) {
            results[page] = [];
            pairedKeystrokes[page].forEach( (val, ind, arr) => {
                if (val.allData.Press.wrongKeyPair || val.allData.Release.wrongKeyPair)
                    results[page].push(val);
            });
        }
        return results;
    },

    /**************************************************************
     * Calculates the flight time between all key combinations, *
     * uses the formula: FTtype1,n=Pn+1−Rn.                     *
     * @param  {array} obj An ordered array of keystrokes       *
     * @return {JSON}     A JSON object of the Flight Times     *
     ************************************************************/

    calculateFlightTimeOne: function (obj) {
        var result = {};

        for (var i = 0; i < obj.length - 1; i++) {

            var flight_time = obj[i + 1].Press - obj[i].Release;
            var from_key = obj[i].allData[0].Key;
            var to_key = obj[i + 1].allData[0].Key;
            var both_keys = from_key + to_key;

            if (result.hasOwnProperty(both_keys)) {

                result[both_keys].FlightTime.push(flight_time);

            } else {

                var temp = {
                    "From": from_key,
                    "To": to_key,
                    "FlightTime": [flight_time]
                };
                result[both_keys] = temp;

            }
        }
        return result;
    },

    /************************************************************
     * Calculates the flight time between all key combinations, *
     * uses the formula: FTtype2,n=Rn+1−Rn.                     *
     * @param  {array} obj An ordered array of keystrokes       *
     * @return {JSON}     A JSON object of the Flight Times     *
     ************************************************************/
    calculateFlightTimeTwo: function (obj) {
        var result = {};

        for (var i = 0; i < obj.length - 1; i++) {

            var flight_time = obj[i + 1].Release - obj[i].Release;
            var from_key = obj[i].allData[0].Key;
            var to_key = obj[i + 1].allData[0].Key;
            var both_keys = from_key + to_key;

            if (result.hasOwnProperty(both_keys)) {

                result[both_keys].FlightTime.push(flight_time);

            } else {

                var temp = {
                    "From": from_key,
                    "To": to_key,
                    "FlightTime": [flight_time]
                };
                result[both_keys] = temp;

            }
        }
        return result;
    },

    /************************************************************
     * Calculates the flight time between all key combinations, *
     * uses the formula: FTtype3,n=Pn+1−Pn.                     *
     * @param  {array} obj An ordered array of keystrokes       *
     * @return {JSON}     A JSON object of the Flight Times     *
     ************************************************************/
    calculateFlightTimeThree: function (obj) {
        var result = {};

        for (var i = 0; i < obj.length - 1; i++) {

            var flight_time = obj[i + 1].Press - obj[i].Press;
            var from_key = obj[i].allData[0].Key;
            var to_key = obj[i + 1].allData[0].Key;
            var both_keys = from_key + to_key;

            if (result.hasOwnProperty(both_keys)) {

                result[both_keys].FlightTime.push(flight_time);

            } else {

                var temp = {
                    "From": from_key,
                    "To": to_key,
                    "FlightTime": [flight_time]
                };
                result[both_keys] = temp;

            }
        }
        return result;
    },

    /************************************************************
     * Calculates the flight time between all key combinations, *
     * uses the formula: FTtype4,n=Rn+1−Pn.                     *
     * @param  {array} obj An ordered array of keystrokes       *
     * @return {JSON}     A JSON object of the Flight Times     *
     ************************************************************/
    calculateFlightTimeFour: function (obj) {
        var result = {};

        for (var i = 0; i < obj.length - 1; i++) {

            var flight_time = obj[i + 1].Release - obj[i].Press;
            var from_key = obj[i].allData[0].Key;
            var to_key = obj[i + 1].allData[0].Key;
            var both_keys = from_key + to_key;

            if (result.hasOwnProperty(both_keys)) {

                result[both_keys].FlightTime.push(flight_time);
            } else {

                var temp = {
                    "From": from_key,
                    "To": to_key,
                    "FlightTime": [flight_time]
                };
                result[both_keys] = temp;

            }
        }
        return result;
    }

}