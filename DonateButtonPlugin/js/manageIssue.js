document.addEventListener('DOMContentLoaded', function () {
    $(document).ready(function () {
        //-------------------------------------------VARIABLES  --------------------------------
        let url = window.location.href,
            server = getServerFromUrl(url),
            path = getUrlBeforeIndexPhp(url),
            journalName = getDynamicJournalPart(url),
            pathWithIndex = getUrlBeforeAndTheIndex(url),
            issueId = 0,
            publications = [],
            publisher_id,
            currentActiveTab,
            publisher_wallet,
            percentage_settings = {
                percentage_authors: null,
                percentage_reviewers: null,
                percentage_publisher: null,
            };


        //-------------------------------------------FUNCTIONS --------------------------------
        function getServerFromUrl(url) {
            var parser = document.createElement('a');
            parser.href = url;
            var protocol = parser.protocol;
            var server = parser.hostname;
            var port = parser.port;
            if (port) {
                var result = protocol + '//' + server + ":" + port;
            } else {
                var result = protocol + '//' + server;
            }
            return result;
        }

        function getUrlBeforeIndexPhp(url) {
            if (url.includes("/index.php")) {
                var regex = /^(?:https?:\/\/[^/]+)?(.*?)(?=\/?index\.php)/;
                var matches = url.match(regex);
                if (matches && matches.length > 1) {
                    return matches[1];
                }
            } else {
                // For other cases, return the whole URL
                return "";
            }
        }

        function getUrlBeforeAndTheIndex(url) {
            // console.log(url)
            if (url.includes("/index.php")) {
                var regex = /^(?:https?:\/\/[^/]+)?(.*?\/index\.php)/;
                var matches = url.match(regex);
                if (matches && matches.length > 1) {
                    // console.log(matches[1])
                    return matches[1];
                }
            } else {
                // For other cases, return the whole URL
                return "";
            }
        }

        function getDynamicJournalPart(url) {
            var regexWithIndexPhp = /\/(?:[^/]+\/)?index.php\/([^/$]+)\//;
            var regexWithoutIndexPhp = /\/(?:[^/]+\/)?([^/$]+)\//;

            if (url.includes("/index.php")) {
                var matches = url.match(regexWithIndexPhp);
                if (matches && matches.length > 1) {
                    return matches[1];
                }
            } else {
                var matches = url.match(regexWithoutIndexPhp);
                if (matches && matches.length > 1) {
                    return matches[1];
                }
            }
        }

        // Function to create a toast notification
        const createToast = (type, title, message, color) => {
            const toastOptions = {
                title: title,
                message: message,
                position: "topRight",
                timeout: 3000,
                progressBarColor: color,
            };

            switch (type) {
                case "info":
                    return iziToast.info(toastOptions);
                case "success":
                    return iziToast.success(toastOptions);
                case "error":
                    return iziToast.error(toastOptions);
                case "loading":
                    return iziToast.info({
                        id: "loading-toast",
                        title: "Creating Smart Contract...",
                        message: "Don't close this window!",
                        position: "topRight",
                        timeout: false,
                        close: false,
                        progressBar: false,
                        overlay: true,
                        zindex: 9999,
                    });
                default:
                    return;
            }
        };

        async function getPublicationByIssueId() {
            try {
                await fetch(server + path + '/plugins/generic/DonateButtonPlugin/request/publications.php?type=getPublicationByIssueId&issueId=' + issueId)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success) {
                            publications = data.data;
                        } else {
                            publications = [];
                        }
                        // console.log(publications);
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } catch (error) {
                console.log(error)
            }
        }

        async function getPublisherId(username) {
            try {
                await fetch(server + path + "/plugins/generic/DonateButtonPlugin/request/users.php?type=getUserAddress&username=" + username)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.data.length > 0) {
                            publisher_id = data.data[0].user_id;
                            publisher_wallet = data.data[0].wallet_address
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                createToast("error", "Error", error.message, "#ff5f6d");
            }
        }

        /**
        * Function to create a smart contract when publish button clicked
        */
        async function createSmartContract(submission_id) {
            try {
                await fetch(server + path + '/plugins/generic/DonateButtonPlugin/request/processGetData.php?type=createSmartContract&id_submission=' + submission_id + "&publisher_id=" + publisher_id)
                    .then((response) => response.json())
                    .then((data) => {
                        // console.log(data);
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } catch (error) {
                console.log(error)
            }
        }

        // Get percentage setting by publisher id
        async function getPercentageSettings() {
            try {
                await fetch(server + path + '/plugins/generic/DonateButtonPlugin/request/percentage_settings.php?publisher_id=' + publisher_id)
                    .then(response => response.json())
                    .then(data => {
                        percentage_settings.percentage_authors = data.data[0].percentage_authors
                        percentage_settings.percentage_reviewers = data.data[0].percentage_reviewers
                        percentage_settings.percentage_publisher = data.data[0].percentage_publisher
                        // percentage_settings.percentage_editors = data.data[0].percentage_editors
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        }

        function checkForNullAndZero(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var value = obj[key];
                    if (value === null || value === 0 || value === "0") {
                        return false; // Found a null or 0 value, return false
                    }
                }
            }
            return true; // No null or 0 values found, return true
        }

        /**
        * Function to get a fragment from the URL
        * Example : #setup
        */
        function getFragment() {
            var urlFragment = window.location.hash;
            var setupFragment = urlFragment.split('/')[0];
            // console.log(setupFragment)
            currentActiveTab = setupFragment;
        }

        /**
    * Function to watch current active tab
    * @param {*} callback 
    */
        function watchCurrentFragment(callback) {
            let currentValue = currentActiveTab;

            setInterval(() => {
                if (currentActiveTab !== currentValue) {
                    currentValue = currentActiveTab;
                    callback(currentValue);
                }
            }, 0);
        }

        function getUsername() {
            setTimeout(async () => {
                var span = $(".-screenReader").eq(1);
                var text = span.text();
                username = text;
                if (username != "") {
                    await getPublisherId(username);
                }
                await getPercentageSettings();
            }, 500)
        }

        getUsername();
        checkPublishIssue();

        watchCurrentFragment(async value => {
            if (value == "#future") {
                getUsername();
                checkPublishIssue();
            }
        })



        function checkPublishIssue() {
            let publishIssue = $("a.pkp_controllers_linkAction.pkp_linkaction_publish.pkp_linkaction_icon_advance");

            if (publishIssue.length) {
                publishIssue.each((index, item) => {
                    $(item).on('click', () => {
                        let getId = $(item).attr("id");
                        const regexPattern = /-row-(\d+)-/;
                        const match = getId.match(regexPattern);

                        if (match && match.length >= 2) {
                            const number = match[1];
                            issueId = number;
                            getPublicationByIssueId();
                            checkOKButton();
                        }
                    });
                });
            } else {
                setTimeout(checkPublishIssue, 100);
            }
        }

        async function createAllSmartContracts(publications) {
            for (const publication of publications) {
                try {
                    if (publication.author_agreement == 1 && publication.publisher_agreement == 1 && publication.reviewer_agreement == 1) {
                        await createSmartContract(publication.submission_id);
                    }
                    // console.log(publication);
                } catch (error) {
                    // Handle individual promise rejection if needed
                    console.error('Error creating smart contract:', error);
                }
            }
        }

        function checkOKButton() {
            let okButton = $("button.pkp_button.submitFormButton:contains('OK')");

            if (okButton.length > 0) {
                let isValid = checkForNullAndZero(percentage_settings);
                let fieldset = $(".pkp_modal_panel").find("div.section.formButtons.form_buttons")
                let error = `
                <div class="error_field" 
                    style="
                        font-size: .875rem;
                        line-height: 1.5rem;
                        font-weight: 400;
                        color: #d00a6c;
                        font-weight: 600;
                        margin-top: 5px;
                        ">
                    <p>
                        Error : 
                        <ul class="error_list">

                        </ul>
                        <br />
                        <a href='${server}${pathWithIndex}/${journalName}/management/settings/website#setup/smartContract' style="text-decoration: none; font-weight: 500;">
                            Click here to go to setting and go to Smart Contract tab
                        </a>
                    </p>
                </div>
                `

                if (!isValid || publisher_wallet == "" || publisher_wallet == null) {
                    $("ul.error_list").empty();

                    if ($(".error_field").length == 0) {
                        fieldset.before(error);
                    }

                    if (!isValid) {
                        $("ul.error_list").append("<li>The percentage setting is not set properly!</li>");
                    }

                    if (publisher_wallet == "" || publisher_wallet == null) {
                        $("ul.error_list").append("<li>Publisher wallet is not set properly!</li>");
                    }
                    okButton.prop('disabled', true);
                } else {
                    okButton.prop('disabled', false);
                    okButton.off('click'); // Remove any previous click event handler
                    okButton.on('click', async function () {
                        if (publications.length > 0) {
                            try {
                                createToast('loading');
                                await createAllSmartContracts(publications);
                                iziToast.destroy();
                                createToast('success', 'Success', 'Smart Contract created', '#00b09b');
                            } catch (error) {
                                // Handle any errors that might occur during smart contract 
                                console.error('Error creating smart contracts:', error);
                            }
                        }
                    });
                }
            } else {
                setTimeout(checkOKButton, 100);
            }
        }

        setInterval(() => {
            getFragment();
        }, 100)
    })
})