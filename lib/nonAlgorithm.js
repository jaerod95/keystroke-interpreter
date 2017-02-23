module.exports = {
    backspace: (data, key) => {
        switch(key) {
            case 'backspace':
            key = 8;
            break;
            case 'tab':
            key = 80
            break;
            case 'navKeys':
            key = 80||8;
            break;
            default:
            console.log('error: not valid key type');
        }

        var result = {"total": 0};

        for (obj in data) {
            result[obj] = { "total": 0 };
            var keys = data[obj].KeyEvents;
            //console.log(keys.length); //runs for each page eg.p1, p2, p3...
            keys.forEach((val, index, arr) => { //runs for each data set on page. eg. p1-a, p1-b...
                result[obj][obj + '_' + index] = 0;
                val.forEach((v, i, a) => {
                    if (v.type == 'keydown' && v.keyCode == key) {
                        result[obj].total += 1;
                        result[obj][obj + '_' + index] += 1;
                    }
                });
            });
            result.total += result[obj].total;
        }
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