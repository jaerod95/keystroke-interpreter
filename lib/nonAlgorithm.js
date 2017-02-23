module.exports = {
    sort: (arr) => {
        arr.sort((a, b) => {
            return a.timeStamp - b.timeStamp;
        });
        return arr;
    },

    key_count_of_type: (data, key) => {

        var result = { "total": 0 };

        for (obj in data) {                         //runs for each page eg.p1, p2, p3...

            result[obj] = { "total": 0 };
            var keys = data[obj].KeyEvents;

            keys.forEach((val, index, arr) => {     //runs for each data set on page. eg. p1-a, p1-b...

                result[obj][obj + '_' + index] = 0;

                val.forEach((v, i, a) => {

                    if (v.type == 'keydown' && v.which == key) {

                        result[obj].total += 1;
                        result[obj][obj + '_' + index] += 1;
                    }
                });
            });
            result.total += result[obj].total;
        }
        return result;
    },


    speed: (data) => {
        var result = { 'words_per_minute': 0 };

        for (obj in data) {

            result['obj'] = { 'words_per_minute': 0 }
            var keys = data[obj].KeyEvents;

            keys.forEach((val, index, arr) => {

                result[obj][obj + '_' + index + 'words'] = 0;

                val.forEach((v, i, a) => {

                    if (v.type == 'keydown' && v.which == 32) {
                        result[obj][obj + '_' + index + 'words'] += 1;
                    }
                });
            });
        }
        return result;
    },


    overLap: (data) => {

    }
}