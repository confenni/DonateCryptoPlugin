const allFunction = require('../function/all_function.js');

// Mock the document object
const mockDocument = {
    addEventListener: jest.fn((event, callback) => {
        if (event === 'DOMContentLoaded') {
            callback();
        }
    }),
};

global.document = mockDocument;

describe('getABIData', () => {
    it('must retrieve smart contract data with id 4', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        status: true,
                    }),
            })
        );

        const submission_id = 4;
        const result = await allFunction.getABIData(submission_id);

        // Verify the fetch function is called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith(
            `http://localhost/ojs/plugins/generic/DonateButtonPlugin/request/processGetData.php?type=getABIDatabase&id_submission=${submission_id}`
        );

        // Verify the result is the expected percentage value
        expect(result).toBe(true);
    });
})

describe('getABIJSON', () => {
    it('retrieve ABI data from url', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        status: true,
                    }),
            })
        );

        const url = "http://139.177.187.236:3000/abi_json/ABI_FILE_JSON_SMARTCONTRACT.json";
        const result = await allFunction.getABIJSON(url);

        // Verify the fetch function is called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith(
            `http://139.177.187.236:3000/abi_json/ABI_FILE_JSON_SMARTCONTRACT.json`
        );

        // Verify the result is the expected percentage value
        expect(result).toBe(true);
    });
})

describe('getAddressWallet', () => {
    it('must retrieve address data with id 4', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        status: true,
                    }),
            })
        );

        const submission_id = 4;
        const result = await allFunction.getAddressWallet(submission_id);

        // Verify the fetch function is called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith(
            `http://localhost/ojs/plugins/generic/DonateButtonPlugin/request/processGetData.php?type=getDataDatabase&id_submission=${submission_id}`
        );

        // Verify the result is the expected percentage value
        expect(result).toBe(true);
    });
})
