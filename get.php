<?php
// Function to get all posts from the "posts" folder
function getPosts() {
    $postsDir = "posts/";
    $files = glob($postsDir . "*.html");
    $postsContent = "";

    // Loop through each HTML file
    foreach ($files as $file) {
        // Read the content of the file
        $postContent = file_get_contents($file);

        // Extract metadata (original post date and tags) from HTML comments
        preg_match('/<!-- Original Post Date: (.+?) -->/', $postContent, $postDateMatches);
        preg_match('/<!-- Tags: (.+?) -->/', $postContent, $tagsMatches);

        // Get the captured groups from the matches
        $postDate = isset($postDateMatches[1]) ? $postDateMatches[1] : "Unknown";
        $tags = isset($tagsMatches[1]) ? $tagsMatches[1] : "";

        // Construct HTML content with metadata
        $postHtml = "<div class='post'>";
        $postHtml .= $postContent;
        $postHtml .= "<div class='metadata'>";
        $postHtml .= "<p>$postDate</p>";
        if ($tags !== "") {
            $postHtml .= "<p class = 'tags'>$tags</p>";
        }
        $postHtml .= "</div>";
        $postHtml .= "</div>";

        // Append to the overall posts content
        $postsContent .= $postHtml;
    }

    return $postsContent;
}

// Call the function and return posts content
echo getPosts();
?>
