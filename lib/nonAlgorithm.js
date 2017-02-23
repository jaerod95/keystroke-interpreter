module.exports = {
    backspace: (data) => {
        var result = {};
        for (obj in data) {
            result[obj] = {"total": 0};
            var keys = data[obj].KeyEvents;
            //console.log(keys.length); //runs for each page eg.p1, p2, p3...
            keys.forEach( (val, index, arr) => { //runs for each data set on page. eg. p1-a, p1-b...
                val.forEach( (v, i, a) => {
                    if (v.keyCode)
                });
                result.p1['p1_' + index] = 'data per page';
            });
        }
        console.log(data);
        return result;
    },
    tabs: (data) => {

    },
    navKeys: (data) => {

    },
    speed: (data) => {

    },
    overLap: (data) => {

    }
}