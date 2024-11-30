// التعامل مع تحميل الصور والفيديو وتحويل الصيغ

const imageUpload = document.getElementById('imageUpload');
const videoUpload = document.getElementById('videoUpload');
const imagePreview = document.getElementById('imagePreview');
const videoPreview = document.getElementById('videoPreview');
const output = document.getElementById('output');

// معاينة الصورة
imageUpload.addEventListener('change', function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
});

// معاينة الفيديو
videoUpload.addEventListener('change', function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        videoPreview.innerHTML = `<video controls><source src="${e.target.result}" type="video/mp4"></video>`;
    };
    reader.readAsDataURL(file);
});

// تحويل الصورة بناءً على الصيغة المختارة
document.getElementById('convertImage').addEventListener('click', () => {
    if (imageUpload.files.length === 0) {
        alert("يرجى تحميل صورة أولاً.");
        return;
    }
    const file = imageUpload.files[0];
    const format = document.getElementById('imageFormat').value;
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL(`image/${format}`);
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `converted_image.${format}`;
            link.click();
        };
    };
    reader.readAsDataURL(file);
});

// تحويل الفيديو بناءً على الصيغة المختارة
document.getElementById('convertVideo').addEventListener('click', () => {
    if (videoUpload.files.length === 0) {
        alert("يرجى تحميل فيديو أولاً.");
        return;
    }
    const file = videoUpload.files[0];
    const format = document.getElementById('videoFormat').value;
    const reader = new FileReader();
    reader.onload = function (e) {
        const video = document.createElement('video');
        video.src = e.target.result;
        video.onloadstart = function () {
            // مثال بسيط للتحويل بدون برامج معقدة، يمكن إضافة مكتبات لتحويل الفيديو
            const link = document.createElement('a');
            link.href = e.target.result;
            link.download = `converted_video.${format}`;
            link.click();
        };
    };
    reader.readAsDataURL(file);
});
