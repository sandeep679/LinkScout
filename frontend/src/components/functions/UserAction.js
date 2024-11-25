const handleCopyClick = async (text) => {
    try {
        // Ensure it's tied to user interaction
        if (navigator.clipboard) {
            // Modern Clipboard API
            await navigator.clipboard.writeText(text);
            alert("Copied to clipboard!");
        } else {
            // Fallback for older mobile browsers or Safari
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            alert("Copied to clipboard !!");
        }
    } catch (err) {
        console.error("Unable to copy to clipboard.", err);
        alert("Copy to clipboard failed.");
    }
};


const ImageDownload = async(imageUrl,shortid) => {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${shortid}.jpg`); // Filename for the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // Clean up the object URL
      } catch (error) {
        console.error("Error downloading the image:", error);
      }
  };

export {handleCopyClick,ImageDownload};