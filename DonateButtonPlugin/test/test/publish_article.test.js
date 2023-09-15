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

describe('createSmartContract', () => {
    it('should create a smart contract for submission with id 54', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        status: true,
                    }),
            })
        );

        const publisher_id = 1;
        const submission_id = 54;
        const result = await allFunction.createSmartContract(submission_id, publisher_id);

        // Verify the fetch function is called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith(
            `http://localhost/ojs/plugins/generic/DonateButtonPlugin/request/processGetData.php?type=createSmartContract&id_submission=${submission_id}&publisher_id=${publisher_id}`
        );

        // Verify the result is the expected percentage value
        expect(result).toBe(true);
    });
})
