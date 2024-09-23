document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = 'signin.html';
        return;
    }

    // get user infos
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

    // logout
    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "signin.html";
    })

    // launch video
    const video = document.getElementById("video");
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.error("Error while accessing camera: ", err);
        })

    // select frame
    const webcamContainer = document.getElementById("webcam-container");
    const squareFrameButton = document.getElementById("square-frame-button");
    const circleFrameButton = document.getElementById("circle-frame-button");
    const frames = ["https://res.cloudinary.com/dx8krot13/image/upload/v1726842282/ab088edf1303b946bb01e6bd670eb81c_fgcxnl.png", "https://res.cloudinary.com/dx8krot13/image/upload/v1726840089/cchqkqelrzkdwlya4zx5.png"];
    const frame = document.createElement("img");
    squareFrameButton.addEventListener("click", () => {
        appendFrame(frame, frames[0]);
        webcamContainer.appendChild(frame);
    })
    circleFrameButton.addEventListener("click", () => {
        appendFrame(frame, frames[1]);
        webcamContainer.appendChild(frame);
    })
    
    // print picture
    const canvas = document.getElementById("canvas");
    const captureButton = document.getElementById("capture");
    captureButton.addEventListener("click", () => {
        if (!frame.src) {
            alert("Please select a frame before taking a picture");
            return;
        }
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    })

    // post picture
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

    // append frames
    const appendFrame = (img, frameUrl) => {
        img.src = frameUrl;
        img.alt = "Frame";
        img.width = "360";
        img.height = "240";
        img.style.position = "absolute";
        img.style.top = 0;
        img.style.left = 0;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.zIndex = "2";
        img.style.pointerEvents = "none";
    }

    // document.getElementById('imageInput').addEventListener('change', async (event) => {
    //     const file = event.target.files[0];
    //     const maxSizeInBytes = 5 * 1024 * 1024; // 5 Mo
    
    //     if (file.size > maxSizeInBytes) {
    //         alert('File is too big, limit is 5 Mo');
    //         event.target.value = ''; // Réinitialiser l'input
    //         return;
    //     }
    //     try {
    //         const response = await fetch("/api/pictures", {
    //             method: "POST",
    //             headers: {
    //                 "Authorization": `Bearer ${token}`,
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({ image: imageDataUrl })
    //         });
    
    //         if (response.ok) {
    //             alert("Picture uploaded");
    //         } else {
    //             const data = response.json();
    //             alert(data.message);
    //         }
    
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // });
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