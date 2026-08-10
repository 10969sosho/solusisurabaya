// Image Cropper & WebP Converter Script
class ImageCropper {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.image = null;
        this.cropStartX = 0;
        this.cropStartY = 0;
        this.cropEndX = 0;
        this.cropEndY = 0;
        this.isCropping = false;
        this.aspectRatio = null;
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        this.uploadArea = document.getElementById('uploadArea');
        this.imageInput = document.getElementById('imageInput');
        this.localImageSelect = document.getElementById('localImageSelect');
        this.previewContainer = document.getElementById('previewContainer');
        this.cropControls = document.getElementById('cropControls');
        this.aspectRatioSelect = document.getElementById('aspectRatio');
        this.outputWidth = document.getElementById('outputWidth');
        this.outputHeight = document.getElementById('outputHeight');
        this.webpQuality = document.getElementById('webpQuality');
        this.qualityValue = document.getElementById('qualityValue');
        this.cropBtn = document.getElementById('cropBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.resultSection = document.getElementById('resultSection');
        this.resultImage = document.getElementById('resultImage');
        this.fileSize = document.getElementById('fileSize');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.processAnotherBtn = document.getElementById('processAnotherBtn');
        this.imageInfo = document.getElementById('imageInfo');
        this.imageDetails = document.getElementById('imageDetails');
        this.batchInput = document.getElementById('batchInput');
        this.batchWidth = document.getElementById('batchWidth');
        this.batchHeight = document.getElementById('batchHeight');
        this.batchQuality = document.getElementById('batchQuality');
        this.batchQualityValue = document.getElementById('batchQualityValue');
        this.batchProcessBtn = document.getElementById('batchProcessBtn');
        this.batchProgress = document.getElementById('batchProgress');
        this.batchStatus = document.getElementById('batchStatus');
        this.batchResults = document.getElementById('batchResults');
    }

    attachEventListeners() {
        // Upload area click
        this.uploadArea.addEventListener('click', () => this.imageInput.click());

        // Drag and drop
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        });

        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('dragover');
        });

        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.loadImage(files[0]);
            }
        });

        // File input change
        this.imageInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.loadImage(e.target.files[0]);
            }
        });

        // Local image select
        this.localImageSelect.addEventListener('change', (e) => {
            if (e.target.value) {
                this.loadLocalImage(e.target.value);
            }
        });

        // Aspect ratio change
        this.aspectRatioSelect.addEventListener('change', (e) => {
            this.setAspectRatio(e.target.value);
        });

        // Quality slider
        this.webpQuality.addEventListener('input', (e) => {
            this.qualityValue.textContent = e.target.value;
        });

        this.batchQuality.addEventListener('input', (e) => {
            this.batchQualityValue.textContent = e.target.value;
        });

        // Crop button
        this.cropBtn.addEventListener('click', () => this.cropAndConvert());

        // Reset button
        this.resetBtn.addEventListener('click', () => this.reset());

        // Download button
        this.downloadBtn.addEventListener('click', () => this.downloadImage());

        // Process another button
        this.processAnotherBtn.addEventListener('click', () => this.reset());

        // Batch process button
        this.batchProcessBtn.addEventListener('click', () => this.processBatch());
    }

    loadImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.image = new Image();
            this.image.onload = () => {
                this.displayImage();
                this.showImageInfo(file);
            };
            this.image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    loadLocalImage(path) {
        this.image = new Image();
        this.image.crossOrigin = 'anonymous';
        this.image.onload = () => {
            this.displayImage();
            this.showImageInfo({ name: path, size: 'N/A' });
        };
        this.image.onerror = () => {
            alert('Gagal memuat gambar. Pastikan path benar dan gambar dapat diakses.');
        };
        this.image.src = path;
    }

    displayImage() {
        // Clear previous content
        this.previewContainer.innerHTML = '';

        // Create canvas
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        // Set canvas size to image size
        this.canvas.width = this.image.width;
        this.canvas.height = this.image.height;

        // Draw image on canvas
        this.ctx.drawImage(this.image, 0, 0);

        // Add canvas to container
        const wrapper = document.createElement('div');
        wrapper.className = 'cropper-container';
        wrapper.appendChild(this.canvas);
        this.previewContainer.appendChild(wrapper);

        // Add mouse event listeners for cropping
        this.setupCropListeners();

        // Show crop controls
        this.cropControls.style.display = 'block';
        this.resultSection.style.display = 'none';
    }

    setupCropListeners() {
        let isDrawing = false;
        let startX, startY;

        this.canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const rect = this.canvas.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
            this.cropStartX = (startX / rect.width) * this.canvas.width;
            this.cropStartY = (startY / rect.height) * this.canvas.height;
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;

            const rect = this.canvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;
            this.cropEndX = (currentX / rect.width) * this.canvas.width;
            this.cropEndY = (currentY / rect.height) * this.canvas.height;

            this.drawCropPreview();
        });

        this.canvas.addEventListener('mouseup', () => {
            isDrawing = false;
        });

        this.canvas.addEventListener('mouseleave', () => {
            isDrawing = false;
        });
    }

    drawCropPreview() {
        // Redraw image
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.image, 0, 0);

        // Draw crop area
        const width = this.cropEndX - this.cropStartX;
        const height = this.cropEndY - this.cropStartY;

        // Apply aspect ratio if selected
        let finalWidth = width;
        let finalHeight = height;

        if (this.aspectRatio) {
            const [ratioW, ratioH] = this.aspectRatio.split(':').map(Number);
            const ratio = ratioW / ratioH;

            if (Math.abs(width) > Math.abs(height)) {
                finalHeight = Math.abs(width) / ratio;
                if (height < 0) finalHeight = -finalHeight;
            } else {
                finalWidth = Math.abs(height) * ratio;
                if (width < 0) finalWidth = -finalWidth;
            }
        }

        // Draw semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Clear crop area
        this.ctx.clearRect(
            this.cropStartX,
            this.cropStartY,
            finalWidth,
            finalHeight
        );

        // Draw crop border
        this.ctx.strokeStyle = '#0d6efd';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        this.ctx.strokeRect(
            this.cropStartX,
            this.cropStartY,
            finalWidth,
            finalHeight
        );
    }

    setAspectRatio(ratio) {
        if (ratio === 'free') {
            this.aspectRatio = null;
        } else {
            this.aspectRatio = ratio;
        }
    }

    cropAndConvert() {
        if (!this.canvas || !this.image) {
            alert('Silakan upload gambar terlebih dahulu');
            return;
        }

        // Get crop coordinates
        const x = Math.min(this.cropStartX, this.cropEndX);
        const y = Math.min(this.cropStartY, this.cropEndY);
        let width = Math.abs(this.cropEndX - this.cropStartX);
        let height = Math.abs(this.cropEndY - this.cropStartY);

        // If no crop area selected, use full image
        if (width === 0 || height === 0) {
            width = this.canvas.width;
            height = this.canvas.height;
        }

        // Apply aspect ratio if selected
        if (this.aspectRatio) {
            const [ratioW, ratioH] = this.aspectRatio.split(':').map(Number);
            const ratio = ratioW / ratioH;

            if (width / height > ratio) {
                width = height * ratio;
            } else {
                height = width / ratio;
            }
        }

        // Get output dimensions
        const outputWidth = parseInt(this.outputWidth.value) || width;
        const outputHeight = parseInt(this.outputHeight.value) || height;

        // Create new canvas for cropped image
        const croppedCanvas = document.createElement('canvas');
        croppedCanvas.width = outputWidth;
        croppedCanvas.height = outputHeight;
        const croppedCtx = croppedCanvas.getContext('2d');

        // Draw cropped image
        croppedCtx.drawImage(
            this.image,
            x, y, width, height,
            0, 0, outputWidth, outputHeight
        );

        // Convert to WebP
        const quality = parseFloat(this.webpQuality.value) / 100;
        const webpDataUrl = croppedCanvas.toDataURL('image/webp', quality);

        // Display result
        this.resultImage.src = webpDataUrl;
        this.resultSection.style.display = 'block';

        // Calculate file size
        const sizeInBytes = this.getBase64Size(webpDataUrl);
        const sizeInKB = (sizeInBytes / 1024).toFixed(2);
        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
        this.fileSize.textContent = sizeInMB > 1 
            ? `${sizeInMB} MB` 
            : `${sizeInKB} KB`;

        // Store WebP data for download
        this.webpDataUrl = webpDataUrl;
        this.webpFileName = `cropped-image-${Date.now()}.webp`;
    }

    getBase64Size(base64String) {
        const padding = base64String.includes(',') ? base64String.split(',')[0].match(/=/g)?.length || 0 : 0;
        return (base64String.length * 3) / 4 - padding;
    }

    downloadImage() {
        if (!this.webpDataUrl) {
            alert('Tidak ada gambar untuk didownload');
            return;
        }

        const link = document.createElement('a');
        link.download = this.webpFileName;
        link.href = this.webpDataUrl;
        link.click();
    }

    reset() {
        this.previewContainer.innerHTML = '<p class="text-muted">Gambar akan muncul di sini setelah diupload</p>';
        this.cropControls.style.display = 'none';
        this.resultSection.style.display = 'none';
        this.imageInfo.style.display = 'none';
        this.imageInput.value = '';
        this.localImageSelect.value = '';
        this.cropStartX = 0;
        this.cropStartY = 0;
        this.cropEndX = 0;
        this.cropEndY = 0;
        this.image = null;
        this.canvas = null;
        this.webpDataUrl = null;
    }

    showImageInfo(file) {
        const name = file.name || 'Local Image';
        const size = file.size ? this.formatFileSize(file.size) : 'N/A';
        const dimensions = `${this.image.width} x ${this.image.height} px`;

        this.imageDetails.innerHTML = `
            <div><strong>Nama:</strong> ${name}</div>
            <div><strong>Ukuran File:</strong> ${size}</div>
            <div><strong>Dimensi:</strong> ${dimensions}</div>
        `;
        this.imageInfo.style.display = 'block';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    async processBatch() {
        const files = this.batchInput.files;
        if (files.length === 0) {
            alert('Silakan pilih gambar untuk diproses');
            return;
        }

        const outputWidth = parseInt(this.batchWidth.value) || 800;
        const outputHeight = parseInt(this.batchHeight.value) || 600;
        const quality = parseFloat(this.batchQuality.value) / 100;

        this.batchProgress.style.display = 'block';
        this.batchResults.innerHTML = '';
        const progressBar = this.batchProgress.querySelector('.progress-bar');

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            this.batchStatus.textContent = `Memproses ${i + 1} dari ${files.length}: ${file.name}`;
            progressBar.style.width = `${((i + 1) / files.length) * 100}%`;

            try {
                const webpDataUrl = await this.processImageFile(file, outputWidth, outputHeight, quality);
                this.addBatchResult(file.name, webpDataUrl);
            } catch (error) {
                console.error(`Error processing ${file.name}:`, error);
                alert(`Error memproses ${file.name}`);
            }
        }

        this.batchStatus.textContent = `Selesai! ${files.length} gambar telah diproses.`;
        progressBar.style.width = '100%';
    }

    processImageFile(file, width, height, quality) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    const webpDataUrl = canvas.toDataURL('image/webp', quality);
                    resolve(webpDataUrl);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    addBatchResult(fileName, webpDataUrl) {
        const item = document.createElement('div');
        item.className = 'batch-result-item';
        
        const img = document.createElement('img');
        img.src = webpDataUrl;
        img.alt = fileName;
        
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'btn btn-success btn-sm';
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
        downloadBtn.onclick = () => {
            const link = document.createElement('a');
            link.download = fileName.replace(/\.[^/.]+$/, '.webp');
            link.href = webpDataUrl;
            link.click();
        };

        item.appendChild(img);
        item.appendChild(downloadBtn);
        this.batchResults.appendChild(item);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ImageCropper();
});
