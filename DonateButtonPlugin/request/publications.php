    <?php

    require_once '../database/Database.inc.php';

    $response = array(
        'success' => true,
        'data' => [],
        'message' => "",
    );

    try {
        $db = new Database();
        $pdo = $db->getConnection();

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postData = file_get_contents('php://input');
            $postData = json_decode($postData, true);

            $submissionId = $postData['submissionId'];
            $agreement = $postData['agreement'];

            $type = $_GET['type'];

            if (isset($type)) {
                if ($type === 'updateAuthorAgreement') {
                    $query = "UPDATE publications SET author_agreement = :authorAgreement WHERE submission_id = :submissionId";
                    $statement = $pdo->prepare($query);
                    $statement->bindParam(':authorAgreement', $agreement);
                    $statement->bindParam(':submissionId', $submissionId);
                    $exec = $statement->execute();

                    if ($exec) {
                        $response['message'] = 'Update successful';
                    } else {
                        $response['success'] = false;
                        $response['message'] = 'Update failed';
                    }
                } else if ($type === 'updateReviewerAgreement') {
                    $query = "UPDATE publications SET reviewer_agreement = :reviewer_agreement WHERE submission_id = :submissionId";
                    $statement = $pdo->prepare($query);
                    $statement->bindParam(':reviewer_agreement', $agreement);
                    $statement->bindParam(':submissionId', $submissionId);
                    $exec = $statement->execute();

                    if ($exec) {
                        $response['message'] = 'Update successful';
                    } else {
                        $response['success'] = false;
                        $response['message'] = 'Update failed';
                    }
                } else if ($type === "saveIssueId") {
                    $issue_id = $postData['issue_id'];
                    $query = "UPDATE publications SET issue_id = :issue_id WHERE submission_id = :submission_id";
                    $statement = $pdo->prepare($query);
                    $statement->bindParam(':issue_id', $issue_id);
                    $statement->bindParam(':submission_id', $submissionId);
                    $exec = $statement->execute();

                    if ($exec) {
                        $response['message'] = 'Update issue id successful';
                    } else {
                        $response['success'] = false;
                        $response['message'] = 'Update failed';
                    }
                }
            }
        } else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $type = $_GET['type'];

            if ($type) {
                if ($type === 'getDataBySubmissionId' && isset($_GET['submissionId'])) {
                    $submissionId = $_GET['submissionId'];

                    $query = "SELECT * FROM publications WHERE submission_id = '$submissionId'";
                    $exec = $pdo->query($query);

                    $row = $exec->fetchAll(PDO::FETCH_ASSOC);

                    if ($row) {
                        $response['data'] = $row;
                    } else {
                        $response['success'] = false;
                        $response['data'] = [];
                        $response['message'] = 'No submission data found for id : ' . $submissionId;
                    }
                } else if ($type === 'getPublicationByIssueId' && isset($_GET['issueId'])) {
                    $issueId = $_GET['issueId'];

                    $query = "SELECT * FROM publications WHERE issue_id = '$issueId' AND status = 5";
                    $exec = $pdo->query($query);

                    $row = $exec->fetchAll(PDO::FETCH_ASSOC);

                    if ($row) {
                        $response['data'] = $row;
                        $response['message'] = "Success get publications data by issue id";
                    } else {
                        $response['success'] = false;
                        $response['data'] = [];
                        $response['message'] = 'No publications data found for issue id : ' . $issueId;
                    }
                }
            }
        } else {
            $response['success'] = false;
            $response['data'] = [];
            $response['message'] = "Invalid request method.";
        }
    } catch (Exception $e) {
        throw new Exception($e->getMessage());
    }

    header('Content-Type: application/json');
    echo json_encode($response);
