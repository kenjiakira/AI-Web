<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$apiKeys = [];
$systemInfo = [];
try {
    $apiData = file_get_contents('ApiKey/api.json');
    $apiKeys = json_decode($apiData, true)['API_KEYS'];
    $systemData = file_get_contents('json/system_instruction.json');
    $systemInfo = json_decode($systemData, true);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
    exit(1);
}

$systemInstruction = str_replace(
    ["{aiName}", "{aiAge}", "{gentle}"],
    [$systemInfo['aiName'], $systemInfo['aiAge'], $systemInfo['gentle']],
    $systemInfo['instruction']
);

$postData = file_get_contents('php://input');
$request = json_decode($postData, true);
$prompt = $request['prompt'];
$userStyle = $request['userStyle'];
$conversationHistory = implode("\n", $request['conversationHistory']);

$fullPrompt = "$systemInstruction\nPhong cách của người dùng: $userStyle\n$conversationHistory\n$prompt\nTrả lời bằng tiếng Việt (ngôn ngữ Gen Z):";

$responseText = '';
foreach ($apiKeys as $apiKey) {
    $responseText = generateContentWithAPI($apiKey, $fullPrompt);
    if ($responseText) {
        break;
    }
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "chat_history";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$chatId = saveChatHistory($prompt, $responseText, $userStyle, $conn);
if ($chatId) {
    echo json_encode(["text" => $responseText]);
} else {
    echo json_encode(["error" => "Failed to save chat history."]);
}
?>
