document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = 'signin.html';
        return;
    }

    try {
        const response = await fetch("/api/user", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            window.location.href = 'signin.html';
            return;
        }

        const user = await response.json();
        const titleElement = document.getElementById('title');
        titleElement.textContent = `Welcome ${user.username}`;
    } catch (error) {
        console.error(error);
        window.location.href = 'signin.html';
    }

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "signin.html";
    })

    const video = document.getElementById("video");
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.error("Error while accessing camera: ", err);
        })
    
    const canvas = document.getElementById("canvas");
    const captureButton = document.getElementById("capture");
    captureButton.addEventListener("click", () => {
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    })

    const canvasForm = document.getElementById("canvas-form");
    canvasForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (isCanvasEmpty(canvas)) {
            alert("Take a picture before submitting");
            return;
        }

        const imageDataUrl = canvas.toDataURL("image/png");

            try {
                const response = await fetch("/api/pictures", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ image: imageDataUrl })
                });
        
                if (response.ok) {
                    alert("Picture uploaded");
                } else {
                    const data = response.json();
                    alert(data.message);
                }
        
            } catch (error) {
                alert(error.message);
            }
    });
});

function isCanvasEmpty(canvas) {
    const context = canvas.getContext('2d');
    const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;

    // Vérifier si tous les pixels sont vides (transparent, donc RGBA = [0, 0, 0, 0])
    for (let i = 0; i < pixelData.length; i += 4) {
      if (pixelData[i + 3] !== 0) { // Si le canal alpha n'est pas 0, le canvas n'est pas vide
        return false;
      }
    }
    return true;
  }