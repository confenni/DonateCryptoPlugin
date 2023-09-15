const allFunction = require('./../function/all_function.js');

// Mock the document object
const mockDocument = {
    addEventListener: jest.fn((event, callback) => {
        if (event === 'DOMContentLoaded') {
            callback();
        }
    }),
};

global.document = mockDocument;


describe("getServerFromUrl", () => {
    it("should return the server from the url", () => {
        const url = "http://localhost/ojs/index.php"

        const result = allFunction.getServerFromUrl(url);

        expect(result).toEqual("http://localhost")
    })
})

describe("getUrlBeforeIndexPhp", () => {
    it("should return the path between http://localhost and index.php", () => {
        const url = "http://localhost/ojs/index.php"

        const result = allFunction.getUrlBeforeIndexPhp(url);

        expect(result).toEqual("/ojs")
    })
})
