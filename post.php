<?php

// Password hash stored in the server
$storedHash = '$2y$10$6mqDKUbUvFjzakwRHKKEKeq5TblDAMp0ezOkVtK6asJYzwrkCNglW';

// Check if JSON data is received
$input_data = file_get_contents('php://input');
if ($input_data !== false) {
    // Decode the JSON data
    $jsonData = json_decode($input_data, true);
    
    // Check if password and other data are present
    if(isset($jsonData['password']) && isset($jsonData['html_content'])) {
        $password = $jsonData['password'];
        
        // Hash the received password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Verify password hash
        if(password_verify($password, $storedHash)) {
            // Password is correct, continue with processing the HTML content
            $htmlContent = $jsonData['html_content'];
            $tags = isset($jsonData['tags']) ? $jsonData['tags'] : ''; // Check if tags are present

            $folderPath = 'posts/';

            // Generate a unique filename based on the current timestamp
            $filename = $folderPath . 'post_' . time() . '.html';

            // Add metadata to the HTML content
            $metadata = "<!-- Original Post Date: " . date("Y-m-d H:i:s") . " -->\n";
            $metadata .= "<!-- Tags: " . $tags . " -->\n";
            $htmlContentWithMetadata = $metadata . $htmlContent;

            // Save the HTML content to the file
            file_put_contents($filename, $htmlContentWithMetadata);

            // Output success message
            echo 'File saved successfully.';
        } else {
            http_response_code(403);
            echo 'Incorrect password.';
        }
    } else {
        // Output error message if password or HTML content is missing
        echo 'Password or HTML content missing.';
    }
} else {
    // Output error message if no data is received
    echo 'No data received.';
}
?>
