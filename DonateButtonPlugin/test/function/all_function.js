let server = "http://localhost",
    path = "/ojs"

const allFunction = {
    getServerFromUrl: function (url) {
        var parser = new URL(url);
        parser.href = url;
        var protocol = parser.protocol;
        var server = parser.hostname;
        var result = protocol + '//' + server;
        return result;
    },
    getUrlBeforeIndexPhp: function (url) {
        var regex = /^(?:https?:\/\/[^/]+)?(.*?)(?=\/?index\.php)/;
        var matches = url.match(regex);
        if (matches && matches.length > 1) {
            return matches[1];
        }
        return url;
    },
    //function from website_settings.js
    getPercentageSettings: async function (publisher_id) {
        try {
            const response = await fetch(server + path + `/plugins/generic/DonateButtonPlugin/request/percentage_settings.php?publisher_id=${publisher_id}`);
            const data = await response.json();
            return data.data[0];
        } catch (error) {
            return error
        }
    },
    updatePercentageSettings: async function (percentage_settings) {
        try {
            const response = await fetch(server + path + '/plugins/generic/DonateButtonPlugin/request/percentage_settings.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(percentage_settings)
            })
            const data = await response.json();
            return data.success;
        } catch (error) {
            return error;
        }
    },
    updateAddress: async function (address) {
        try {
            const response = await fetch(server + path + "/plugins/generic/DonateButtonPlugin/request/users.php?type=updateUserWallet", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(address)
            })
            const data = await response.json()
            return data.success;
        } catch (error) {
            return error
        }
    },
    getAllReviewerRole: async function () {
        try {
            const response = await fetch(server + path + '/plugins/generic/DonateButtonPlugin/request/reviewers.php?type=getReviewerRole')
            const data = await response.json();
            return data.data;
        } catch (error) {
            return error
        }
    },
    //function from author_agreement
    getPublications: async function (submissionId) {
        try {
            const response = await fetch(server + path + `/plugins/generic/DonateButtonPlugin/request/publications.php?submissionId=${submissionId}`)
            const data = await response.json();
            return data.data[0];
        } catch (error) {
            return error;
        }
    },
    getAuthorWallet: async function (author_id) {
        try {
            const response = await fetch(server + path + `/plugins/generic/DonateButtonPlugin/request/authors.php?author_id=${author_id}&type=getById`)
            const data = await response.json()
            return data.data[0];
        } catch (error) {
            return error;
        }
    },
    editAuthorWallet: async function (type, author_data) {
        try {
            author_data.type = type;
            const response = await fetch(server + path + '/plugins/generic/DonateButtonPlugin/request/authors.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(author_data)
            })
            const data = await response.json();
            return data.success;
        } catch (error) {
            return error;
        }
    },
    getAllAuthorData: async function (author_id, submissionId) {
        try {
            const response = await fetch(server + path + '/plugins/generic/DonateButtonPlugin/request/authors.php?author_id=' + author_id + '&submission_id=' + submissionId + '&type=getAllAuthorData')
            const data = await response.json();
            return data.data;
        } catch (error) {
            return error;
        }
    },
    updateAgreement: async function (agreement_data) {
        try {
            const response = await fetch(server + path + '/plugins/generic/DonateButtonPlugin/request/publications.php?type=updateAuthorAgreement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    submissionId: agreement_data.submissionId,
                    agreement: agreement_data.agreement,
                })
            })
            const data = await response.json();
            return data.success;
        } catch (error) {
            return error;
        }
    },

    //------------------------------REVIEW_AGREEEMENT.JS------------------------------
    getUserAddress: async function (username) {
        try {
            const response = await fetch(server + path + "/plugins/generic/DonateButtonPlugin/request/users.php?type=getUserId&username=" + username)
            const data = await response.json();
            return data.data[0].wallet_address;
        } catch (error) {
            return error;
        }
    },
    //----------------------------PUBLISH_ARTICLE.JS----------------------------
    createSmartContract: async function (submission_id, publisher_id) {
        try {
            const response = await fetch(server + path + '/plugins/generic/DonateButtonPlugin/request/processGetData.php?type=createSmartContract&id_submission=' + submission_id + "&publisher_id=" + publisher_id)
            const data = await response.json();
            return data.status;
        } catch (error) {
            return error;
        }
    },
    //----------------------------DONATE_BUTTON.JS----------------------------
    getABIData: async function (submission_id) {
        try {
            const response = await fetch(server + path + '/plugins/generic/DonateButtonPlugin/request/processGetData.php?type=getABIDatabase&id_submission=' + submission_id)
            const data = await response.json();
            return data.status;
        } catch (error) {
            return error;
        }
    },
    getABIJSON: async function (url) {
        try {
            const response = await fetch(url)
            const data = await response.json();
            return data.status;
        } catch (error) {
            return error;
        }
    },
    getAddressWallet: async function (submission_id) {
        try {
            const response = await fetch(server + path + '/plugins/generic/DonateButtonPlugin/request/processGetData.php?type=getDataDatabase&id_submission=' + submission_id)
            const data = await response.json();
            return data.status;
        } catch (error) {
            return error;
        }
    },
};

module.exports = allFunction