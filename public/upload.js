document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('game-file');
    const formData = new FormData();
    formData.append('gameFile', fileInput.files[0]);

    const xhr = new XMLHttpRequest();
    const uploadStatus = document.getElementById('upload-status');
    const progressBar = document.getElementById('progress-bar');

    // Reset progress bar
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';
    progressBar.classList.remove('upload-complete'); // Remove any previous success class

    // Track the upload progress
    xhr.upload.addEventListener('progress', function(e) {
        if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100;
            progressBar.style.width = percentComplete + '%';
            progressBar.textContent = Math.floor(percentComplete) + '%';
        }
    });

    // Set up the request
    xhr.open('POST', '/upload', true);

    // Success handling
    xhr.onload = function() {
        if (xhr.status === 200) {
            uploadStatus.textContent = 'Upload successful!';
            progressBar.style.width = '100%';
            progressBar.textContent = '100%';

            // Add success animation
            progressBar.classList.add('upload-complete');
        } else {
            uploadStatus.textContent = 'Upload failed!';
        }
    };

    // Error handling
    xhr.onerror = function() {
        uploadStatus.textContent = 'Error occurred during upload';
    };

    // Send the request
    xhr.send(formData);
});
