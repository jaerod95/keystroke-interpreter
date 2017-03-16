const fs = require('fs');
const path = require('path');
const json2csv = require('json2csv');
const Mongo = require('mongodb');
const assert = require('assert');

/******************************************************************
 * Main variable to contail all funcitons out of the global scope *
 * @type {Object}                                                 *
 ******************************************************************/
module.exports = function jr_keystroke_analyzer() {
    this.nonAlgorithm = require(path.join(__dirname, 'nonAlgorithm.js'));
    this.Algorithm = require(path.join(__dirname, 'Algorithm.js'))
    self = this;
    this.data = [];
    this.results = {};
    this.resultsDir = null;


    /************************************************************************
     * Organizer for All parsing and link to csv conver and master analysis *
     * @param  {Array} data  An array of JSON KeyStroke Data Files          *
     * @return {void}       void;                                           *
     ************************************************************************/
    this.init = function (data) {
        console.log('new interpreter object created');
        self.data = data;
        self.resultsDir = path.join(__dirname, '..', '..', 'results', data._id.split('-')[0]);
        self.dev_writeDBData(data);
        self.make_result_directory();
        self.single_key_counts(self.data.keystrokes);
        //self.results['keyData'] = self.Algorithm.keyStats(self.data.keystrokes);
        //self.results['WPM'] = self.nonAlgorithm.speed(self.data.keystrokes);
        self.saveJSONResults();
    }

    this.make_result_directory = () => {
        
        if (!fs.existsSync(self.resultsDir)) {
            fs.mkdirSync(self.resultsDir);
        }
    }

    /************************************************************************
     * Organizer for All parsing and link to csv conver and master analysis *
     * @param  {Array} data  An array of JSON KeyStroke Data Files          *
     * @return {void}       void;                                           *
     ************************************************************************/

    this.single_key_counts = (data) => {
        self.results['key_counts'] = {};
        for (var i = 0; i < 256; i++) {
            self.results.key_counts[i] = this.nonAlgorithm.key_count_of_type(data.keystrokes, i);
        }
    }

    /************************************************************************
     * Organizer for All parsing and link to csv conver and master analysis *
     * @param  {Array} data  An array of JSON KeyStroke Data Files          *
     * @return {void}       void;                                           *
     ************************************************************************/
    this.saveJSONResults = () => {
        console.log('this ran');
        for (obj in self.results) {

            fs.writeFile(
                path.join(
                    __dirname,
                    '..', 
                    '..', 
                    'results', 
                    self.data._id.split('-')[0], 
                    `${obj}-${self.data._id.split('-')[0]}.js`), JSON.stringify(self.results[obj], null, 2), (err) => {
                if (err)
                    return console.log(err);
                console.log('The results were saved!');
            });
        }
    }

    /************************************************************************
     * Organizer for All parsing and link to csv conver and master analysis *
     * @param  {Array} data  An array of JSON KeyStroke Data Files          *
     * @return {void}       void;                                           *
     ************************************************************************/
    this.dev_writeDBData = (data) => {

        fs.writeFile(path.join(__dirname, '..', '..', 'raw', data._id + ".txt"), JSON.stringify(data), function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
    }
}