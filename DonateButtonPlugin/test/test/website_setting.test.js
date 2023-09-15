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

//-----------------------------------WEBSITE_SETTING.JS--------------------------------------

describe('getPercentageSettings', () => {
    it('should fetch and return percentage settings', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        data: [
                            {
                                "publisher_id": 1,
                                "percentage_publisher": 40,
                                "percentage_reviewers": 20,
                                "percentage_authors": 20,
                                "percentage_editors": 20
                            }
                        ],
                    }),
            })
        );

     
        const publisher_id = 1;
        const result = await allFunction.getPercentageSettings(publisher_id);

        // Verify the fetch function is called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost/ojs/plugins/generic/DonateButtonPlugin/request/percentage_settings.php?publisher_id=' + publisher_id
        );

        // Verify the result is the expected percentage value
        expect(result).toEqual({
            "publisher_id": 1,
            "percentage_publisher": 40,
            "percentage_reviewers": 20,
            "percentage_authors": 20,
            "percentage_editors": 20
        });
    });
})

describe('updatePercentageSettings', () => {
    it('should update percentage settings and return success', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        success: true,
                    }),
            })
        );

        // Define the sample percentage_settings object
        const percentage_settings = {
            publisher_id: 1,
            percentage_authors: 70,
            percentage_reviewers: 10,
            percentage_publisher: 10,
            percentage_editors: 10,
        }

        // Call the function
        const result = await allFunction.updatePercentageSettings(percentage_settings);

        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost/ojs/plugins/generic/DonateButtonPlugin/request/percentage_settings.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(percentage_settings),
            }
        );

        // Verify the result is true (success)
        expect(result).toBe(true);
    });
})

describe('updateAddress', () => {
    it('should update user wallet address and return success', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        success: true,
                    }),
            })
        );

        // Define the sample percentage_settings object
        const address = {
            username: "justin",
            wallet_address: "0x102B1d7D03bC57527c49A61DBFc5721F51c7dB59"
        }

        // Call the function
        const result = await allFunction.updateAddress(address);

        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost/ojs/plugins/generic/DonateButtonPlugin/request/users.php?type=updateUserWallet',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(address),
            }
        );

        // Verify the result is true (success)
        expect(result).toBe(true);
    });
})

describe('getAllReviewerRole', () => {
    it('should get all user with role reviewer', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        "data": [
                            {
                                user_id: "1",
                                username: "justin",
                                email: "justin.laurenso166@gmail.com",
                                user_group_id: "33",
                                wallet_address: "0x7e37355904356EfE4172cBd4df6cf0BF1f92C24E",
                            },
                        ],
                    }),
            })
        );


        // Call the function
        const result = await allFunction.getAllReviewerRole();

        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost/ojs/plugins/generic/DonateButtonPlugin/request/reviewers.php?type=getReviewerRole');

        expect(result).toEqual([{
            "user_id": "1",
            "username": "justin",
            "email": "justin.laurenso166@gmail.com",
            "user_group_id": "33",
            "wallet_address": "0x7e37355904356EfE4172cBd4df6cf0BF1f92C24E"
        }]
        );
    });
})