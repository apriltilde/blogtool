function loadPosts() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
            var responseText = xhr.responseText;
                if (responseText.trim() === "") { // Check if response is empty (no posts found)
                    document.getElementById("postcontainer").textContent = "No posts found";
                } else {
                    document.getElementById("postcontainer").innerHTML = responseText;
                    extractAndDisplayTags();
                }
            } else {
                console.error("Failed to fetch posts: " + xhr.status);
            }
        }
    };
    xhr.open("GET", "get.php", true);
    xhr.send();
}

// Function to extract and display all tags
function extractAndDisplayTags() {
    var posts = document.querySelectorAll(".post");
    var tagsSet = new Set();

    // Extract all tags from posts and add to tags set
    posts.forEach(function(post) {
        var metadataElement = post.querySelector(".metadata");
        if (metadataElement) {
            var tagsElement = metadataElement.querySelector(".tags");
            if (tagsElement) {
                var postTags = tagsElement.textContent.trim().split(" ");
                postTags.forEach(function(tag) {
                    tagsSet.add(tag.trim()); // Add tag to set
                });
            }
        }
    });

    // Get the tags div
    var tagsDiv = document.getElementById("tags");

    // Clear previous tags
    tagsDiv.innerHTML = "";

    // Create and append links for each tag
    tagsSet.forEach(function(tag) {
        var tagLink = document.createElement("a");
        tagLink.href = "#"; // Set the link href if necessary
        tagLink.textContent = tag;
        tagLink.classList.add("tag-link"); // Add a class for styling if necessary
        tagLink.onclick = function() { // Add onclick event listener
            filterPostsByTag(tag); // Filter posts by clicked tag
        };
        tagsDiv.appendChild(tagLink); // Append tag link to tags div
        tagsDiv.appendChild(document.createTextNode(" ")); // Add space between tags
    });
}

// Function to filter posts by a specific tag
function filterPostsByTag(tag) {
    var posts = document.querySelectorAll(".post");

    // Loop through all posts
    posts.forEach(function(post) {
        // Find the metadata element within the post
        var metadataElement = post.querySelector(".metadata");
        // Check if metadata element exists
        if (metadataElement) {
            // Find the tags element within the metadata
            var tagsElement = metadataElement.querySelector(".tags");
            // Check if tags element exists
            if (tagsElement) {
                var tags = tagsElement.textContent.trim().toLowerCase().split(" ");
            } else {
                var tags = []; // Assume tags is empty if not found
            }
            // Check if clicked tag is present in the post's tags
            if (tags.includes(tag.toLowerCase()) || tag === "") { // Check if tag matches or tag is empty
                post.style.display = "block"; // Show the post
            } else {
                post.style.display = "none"; // Hide the post
            }
        }
    });
}

// Function to toggle post order
document.getElementById("oldestfirst").addEventListener("click", function(event) {
    event.preventDefault();
    var container = document.getElementById("postcontainer");
    if (container.style.flexDirection === "column") {
        container.style.flexDirection = "column-reverse";
    } else {
        container.style.flexDirection = "column";
    }
});

// Fetch posts when the page loads
window.onload = function() {
    loadPosts();
};
