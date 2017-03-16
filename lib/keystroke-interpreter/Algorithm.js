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

    getDwellTime: (keystrokes) => {
        var result = {};
        var str = '{';
        for (page in keystrokes) {
            str += '"' + page + '": [],';
        }
        str = str.slice(0, -1);
        str += '}';
        result = JSON.parse(str);


        var keyTemp = [];
        var temp = [];

        for (page in keystrokes) {
            keystrokes[page].KeyEvents.forEach((val, ind, arr) => {
                var index = keyTemp.indexOf(val.code);
                if (index != -1) {
                    var dwelltime = val.timeStamp - temp[index].timeStamp;
                    if (result[page][val.code] == null)
                        result[page][val.code] = [];
                    if (result[val.code] == null)
                        result[val.code] = [];

                    result[page][val.code].push(dwelltime)
                    result[val.code].push(dwelltime);
                    temp.splice(index, 1);
                    keyTemp.splice(index, 1);
                } else {
                    keyTemp.push(val.code);
                    temp.push(val);
                }
            });
        }
        return result
    }
}