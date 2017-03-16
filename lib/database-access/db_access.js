// Connection URL

module.exports = function (getDatabaseResults) {
    const Mongo = require('mongodb');
    const assert = require('assert');
    const fs = require('fs');
    const path = require('path');

    var jr_keystroke_analyzer = require(path.join(__dirname, '..', "keystroke-interpreter", "keystroke_interpreter.js"));

    var url = 'mongodb://jason:jason@ds119380.mlab.com:19380/keystroke'

    var pdfDataDone = false;
    var keystrokeDataDone = false;

    if (getDatabaseResults) {
        // Use connect method to connect to the server
        Mongo.MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            console.log("Connected successfully to server");

            getCollectionData(db.collection('pdf'), (documents) => {
                var pdfs = [];
                for (doc in documents) {

                    pdfs.push({
                        "_id": documents[doc]._id,
                        "pdf": documents[doc].pdf
                    });

                }
                var pdfSaver = new PDF_Saver();
                pdfSaver.savePDFs(pdfs);
                pdfDataDone = true;
            });

            getCollectionData(db.collection('gathered-data'), (documents) => {
                for (doc in documents) {
                    var analyzer = new jr_keystroke_analyzer();
                    analyzer.init(documents[doc]);
                }
                keystrokeDataDone = true;
            });

            closeDatabase(pdfDataDone, keystrokeDataDone, db);
        });


        function closeDatabase(pdf, data, db) {
            if (pdf && data) {
                console.log('database closed!!');
                db.close();
                return;
            } else {
                console.log('database still working...')
                setTimeout(closeDatabase, 1000, pdfDataDone, keystrokeDataDone, db);
                return;
            }
        }

        function getCollectionData(collection, callback) {
            collection.find({}).toArray(function (err, docs) {
                assert.equal(err, null);
                callback(docs);
            });
        }
    } else {
        fs.readFile(path.join(__dirname, '..', '..', 'raw', 'britt254-1489461477446.txt'), 'utf8', (data) => {
            console.log(data);
            var parser = new jr_keystroke_analyzer();
            parser.init(JSON.parse(data));
        });
    }

    function PDF_Saver() {
        this.savePDFs = (pdf_Array) => {
            pdf_Array.forEach((val, ind, arr) => {

                fs.writeFile(path.join(__dirname, '..', '..', 'consent_forms', val._id + ".pdf"), JSON.stringify(val.pdf), 'binary', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("The pdf-file was saved!");
                });

            });
        }
    }
}