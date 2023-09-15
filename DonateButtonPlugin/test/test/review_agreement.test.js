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

describe('getUserAddress', () => {
    it('should fetch and return user wallet address with id 2', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: jest.fn().mockResolvedValueOnce({
                    data: [
                        {
                            wallet_address: "0x7e37355904356EfE4172cBd4df6cf0BF1f92C24E",
                        },
                    ],
                }),
            })
        );

        const username = "justin";
        const result = await allFunction.getUserAddress(username);

        // Verify the fetch function is called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith(
            `http://localhost/ojs/plugins/generic/DonateButtonPlugin/request/users.php?type=getUserId&username=${username}`
        );

        // Verify the result is the expected percentage value
        expect(result).toEqual("0x7e37355904356EfE4172cBd4df6cf0BF1f92C24E");
    });
})
