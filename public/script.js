document.getElementById('nextSecretButton').addEventListener('click', function() {
    fetch("/next-secret")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("secret").innerText = data.secret; // Update secret
            document.getElementById("user").innerText = data.user; // Update user
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
});