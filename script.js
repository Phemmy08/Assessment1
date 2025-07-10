
    document.addEventListener('DOMContentLoaded', function () {
        const progress = document.getElementById('progressFill');
        
        // Simulate progress (e.g., based on quiz or form completion)
        setTimeout(() => {
            progress.style.width = '70%'; // Adjust this value as needed
        }, 500);
    });



    const fileInput = document.getElementById('typingScreenshot');
    const fileInfo = document.querySelector('.file-info');

    fileInfo.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
        const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'Click to upload or drag and drop';
        fileInfo.querySelector('span').textContent = fileName;
    });



  document.addEventListener('DOMContentLoaded', function () {
    const uploadBox = document.getElementById('speedTestUploadBox');
    const fileInput = document.getElementById('speedTestScreenshot');
    const fileLabel = document.getElementById('speedTestFileLabel');

    // Open file picker on click
    uploadBox.addEventListener('click', () => fileInput.click());

    // Show selected file name
    fileInput.addEventListener('change', () => {
      const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'Click to upload or drag and drop';
      fileLabel.textContent = fileName;
    });
  });




   
document.getElementById('roleChoice').addEventListener('change', function () {
    const container = document.getElementById('roleTask');
    const role = this.value;
    let taskHTML = '';

    switch (role) {
        case 'data-entry':
            taskHTML = `
                <label for="dataEntryTask">Describe how you would verify data accuracy before submission *</label>
                <textarea id="dataEntryTask" name="dataEntryTask" rows="4" required></textarea>
            `;
            break;
        case 'customer-support':
            taskHTML = `
                <label for="supportTask">Write a sample response to a customer asking for a refund on a late delivery *</label>
                <textarea id="supportTask" name="supportTask" rows="4" required></textarea>
            `;
            break;
        case 'virtual-assistant':
            taskHTML = `
                <label for="vaTask">List your top 3 tools for time/task management and how you use them *</label>
                <textarea id="vaTask" name="vaTask" rows="4" required></textarea>
            `;
            break;
        case 'payroll-clerk':
            taskHTML = `
                <label for="payrollTask">Explain how you would handle a payroll discrepancy reported by an employee *</label>
                <textarea id="payrollTask" name="payrollTask" rows="4" required></textarea>
            `;
            break;
        case 'accounting-manager':
            taskHTML = `
                <label for="accountingTask">Describe your process for reconciling monthly financial statements *</label>
                <textarea id="accountingTask" name="accountingTask" rows="4" required></textarea>
            `;
            break;
        case 'social-media-manager':
            taskHTML = `
                <label for="smmTask">Give an example of a high-performing campaign you've run and what made it successful *</label>
                <textarea id="smmTask" name="smmTask" rows="4" required></textarea>
            `;
            break;
        default:
            taskHTML = '';
    }

    container.innerHTML = taskHTML;
});



    const fileInputs = [
        { input: 'typingScreenshot', info: '.file-upload:nth-of-type(1) .file-info' },
        { input: 'speedTestScreenshot', info: '.file-upload:nth-of-type(2) .file-info' },
        { input: 'excelResult', info: '#excelResult ~ .file-info' }
    ];

    fileInputs.forEach(({ input, info }) => {
        const fileInput = document.getElementById(input);
        const fileInfo = document.querySelector(info);

        fileInfo?.addEventListener('click', () => fileInput.click());

        fileInput?.addEventListener('change', () => {
            const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'Upload Excel file or screenshot';
            fileInfo.querySelector('span').textContent = fileName;
        });
    });



   
  // Example logic — replace with your own scoring system
  function updateScore(score = 0) {
    const totalPoints = 65;
    const fill = document.getElementById('scoreFill');
    const total = document.getElementById('totalScore');
    const status = document.getElementById('scoreStatus');

    const percent = Math.min((score / totalPoints) * 100, 100);
    fill.style.width = percent + '%';
    total.textContent = score;

    if (score >= 70) {
      status.textContent = 'Excellent! You’re eligible for next steps.';
      status.style.color = '#27ae60';
    } else if (score > 0) {
      status.textContent = 'Thanks for submitting. We’ll review your responses.';
      status.style.color = '#f39c12';
    } else {
      status.textContent = 'Complete all sections to see your score';
      status.style.color = '#888';
    }
  }

  // Optional: simulate score for preview
  document.addEventListener('DOMContentLoaded', () => {
    updateScore(53); // ← change this to dynamically calculate
  });




/* document.getElementById('assessmentForm').addEventListener('submit', function (e) {
    e.preventDefault(); // prevent default submit

    const form = this;
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Hide form
            form.style.display = 'none';

            // Show success message
            document.getElementById('successMessage').classList.add('show');
        } else {
            alert('Something went wrong. Please try again.');
        }
    })
    .catch(() => {
        alert('There was a network error. Please try again later.');
    });
}); */


/* document.getElementById('assessmentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = this;
    const formData = new FormData(form);
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            form.style.display = 'none';
            document.getElementById('successMessage').classList.add('show');
        } else {
            return response.json().then(data => {
                throw new Error(data.message || "Formspree error");
            });
        }
    })
    .catch(error => {
        alert("Something went wrong: " + error.message);
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Assessment';
    });
}); */

