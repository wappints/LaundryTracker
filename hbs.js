'use strict';
const path = require('path');
const handlebars = require('handlebars');
const fs = require('fs');
const uuid = require('uuid');

let presetRootTemps = path.join(__dirname, 'temp');

class handlebarsRender {
    /**
     * @param {String} pathToViews the peth to views if not provided he throw an error
     * @param {String} pathToLayouts the path to layouts if not provided he throw an error
     * @param {String} defaultLayout the main layout if not provided he take a 'main.hbs' file
     * @param {String} pathToTemps the path to temp folder for a correct performance of this npm if not provided he take the path to this file
     */
    constructor(pathToViews, pathToLayouts, defaultLayout = 'main.hbs', pathToTemps = presetRootTemps) {
        if (!pathToViews) throw new Error('The path to views was not provisioned');
        if (!pathToLayouts) throw new Error('The path layouts was not provisioned');
        if (typeof pathToViews != 'string') throw new Error(`The first argument must be a string, recived ${typeof file}`);
        if (typeof pathToLayouts != 'string') throw new Error(`The second argument must be a string, recived ${typeof file}`);
        if (typeof defaultLayout != 'string') throw new Error(`The third argument must be a string, recived ${typeof file}`);
        if (typeof pathToTemps != 'string') throw new Error(`The fourth argument must be a string, recived ${typeof file}`);
        if (!path.isAbsolute(pathToViews)) throw new Error('The path to views must be absolute');
        if (!path.isAbsolute(pathToLayouts)) throw new Error('The path to layouts must be absolute');
        if (!path.isAbsolute(pathToTemps)) throw new Error('The path to temps must be absolute');
        if (!fs.existsSync(pathToTemps)) fs.mkdirSync(pathToTemps);
        this.views = pathToViews;
        this.temps = pathToTemps;
        this.layouts = pathToLayouts;
        this.defaultLayout = defaultLayout;
    };
    /**
     * Renders the file and returns the path to temp file
     * @param {String} file isn't necesary put a absolute path
     * @param {Object} objectToRender the object to render the handlebar
     * @param {String} layout if you need render an other layout you can put here
     * @returns {String} Path to temp file
     */
    render(file, objectToRender = {}, layout = this.defaultLayout) {
        if (!file) throw new Error('The file to render whas not provided');
        if (typeof file != 'string') throw new Error(`The first argument must be a string, recived ${typeof file}`);
        if (typeof objectToRender != 'object') throw new Error(`The second argument must be an object, recived ${typeof objectToRender}`);
        let pathToFile = path.join(this.views, file);
        if (!fs.existsSync(pathToFile)) throw new Error(`The file ${file} don\'t exist`)
        let fileBody = (fs.readFileSync(pathToFile)).toString();
        let fileReaded = (fs.readFileSync(path.join(this.layouts, layout))).toString();
        let precompile = (handlebars.compile(fileBody))(objectToRender);
        objectToRender.body = precompile;
        let compiled = (handlebars.compile(fileReaded))(objectToRender);
        let identifier = path.join(this.temps, `${uuid.v4()}.html`);
        fs.writeFileSync(identifier, compiled);
        return identifier;
    };
    /**
     * Clears the temp folder
     */
    clearTemps() {
        fs.rmdirSync(this.temps, { recursive: true });
    };
};

module.exports = handlebarsRender;