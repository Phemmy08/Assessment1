// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeAssessment();
    setupFormValidation();
    setupFileUploadHandlers();
    setupProgressTracking();
    setupAnimations();
});

// Initialize Assessment
function initializeAssessment() {
    console.log('Velocity Flex Assessment Portal Initialized');
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Setup form submission
    const form = document.getElementById('assessmentForm');
    form.addEventListener('submit', handleFormSubmission);
    
    // Setup role selection
    const roleSelect = document.getElementById('roleSelection');
    roleSelect.addEventListener('change', showRoleTask);
}

// Form Validation Setup
function setupFormValidation() {
    const form = document.getElementById('assessmentForm');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Validate Individual Field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Basic validation
    if (field.required && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Textarea minimum length
    if (field.tagName === 'TEXTAREA' && value && value.length < 20) {
        showFieldError(field, 'Please provide a more detailed response (minimum 20 characters)');
        return false;
    }
    
    return true;
}

// Show Field Error
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Clear Field Error
function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// File Upload Handlers
function setupFileUploadHandlers() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', handleFileUpload);
    });
}

// Handle File Upload
function handleFileUpload(e) {
    const input = e.target;
    const file = input.files[0];
    const uploadArea = input.parentNode.querySelector('.file-upload-area');
    
    if (file) {
        // Update upload area appearance
        uploadArea.style.borderColor = '#667eea';
        uploadArea.style.backgroundColor = '#f0f4ff';
        
        // Update text content
        const textElement = uploadArea.querySelector('p');
        textElement.textContent = `Selected: ${file.name}`;
        textElement.style.color = '#667eea';
        textElement.style.fontWeight = '600';
        
        // Change icon
        const iconElement = uploadArea.querySelector('i');
        iconElement.className = 'fas fa-check-circle';
        iconElement.style.color = '#00b894';
        
        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (file.size > maxSize) {
            showFieldError(input, 'File size must be less than 10MB');
            resetFileUpload(input);
        }
    }
}

// Reset File Upload
function resetFileUpload(input) {
    input.value = '';
    const uploadArea = input.parentNode.querySelector('.file-upload-area');
    const textElement = uploadArea.querySelector('p');
    const iconElement = uploadArea.querySelector('i');
    
    uploadArea.style.borderColor = '#d1d5db';
    uploadArea.style.backgroundColor = '#f9fafb';
    textElement.textContent = 'Click to upload file';
    textElement.style.color = '#666';
    textElement.style.fontWeight = '500';
    iconElement.className = 'fas fa-cloud-upload-alt';
    iconElement.style.color = '#667eea';
}

// Progress Tracking
function setupProgressTracking() {
    const form = document.getElementById('assessmentForm');
    const progressFill = document.getElementById('progressFill');
    
    // Track form completion
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', updateProgress);
        input.addEventListener('change', updateProgress);
    });
    
    // Initial progress calculation
    updateProgress();
}

// Update Progress Bar
function updateProgress() {
    const form = document.getElementById('assessmentForm');
    const progressFill = document.getElementById('progressFill');
    
    const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
    let filledFields = 0;
    
    requiredFields.forEach(field => {
        if (field.type === 'file') {
            if (field.files.length > 0) {
                filledFields++;
            }
        } else if (field.value.trim() !== '') {
            filledFields++;
        }
    });
    
    // Include checkbox selections
    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length > 0) {
        filledFields += 0.5; // Partial credit for checkbox section
    }
    
    const progress = Math.min((filledFields / requiredFields.length) * 100, 100);
    progressFill.style.width = `${progress}%`;
}

// Setup Animations
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add hover effects
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Role Task Display
function showRoleTask() {
    const roleSelect = document.getElementById('roleSelection');
    const taskContent = document.getElementById('roleTaskContent');
    const selectedRole = roleSelect.value;
    
    const roleTasks = {
        'data-entry': `
            <div class="role-task">
                <h4><i class="fas fa-database"></i> Data Entry Clerk Task</h4>
                <div class="task-description">
                    <p><strong>Task:</strong> Create a sample Google Sheet with the following:</p>
                    <ul>
                        <li>10 fake customer names + emails</li>
                        <li>Add column filters, sort alphabetically</li>
                        <li>Paste shareable link in the form</li>
                    </ul>
                </div>
                <div class="form-group">
                    <label>Google Sheet Shareable Link</label>
                    <input type="url" id="dataEntryLink" placeholder="Paste your Google Sheet link here" required>
                </div>
            </div>
        `,
        'customer-support': `
            <div class="role-task">
                <h4><i class="fas fa-headset"></i> Customer Support Rep Task</h4>
                <div class="task-description">
                    <p><strong>Task:</strong> Write a 200-word professional response to a customer who didn't receive their order. Include empathy, clarity, and next steps.</p>
                </div>
                <div class="form-group">
                    <label>Customer Response (200 words)</label>
                    <textarea id="customerSupportResponse" rows="6" placeholder="Write your professional customer response here..." required></textarea>
                    <div class="word-count">
                        <span id="wordCount">0</span> words
                    </div>
                </div>
            </div>
        `,
        'virtual-assistant': `
            <div class="role-task">
                <h4><i class="fas fa-tasks"></i> Virtual Assistant Task</h4>
                <div class="task-description">
                    <p><strong>Task:</strong> List 5 daily tasks you'd manage for a busy executive. How would you prioritize and organize them using scheduling tools?</p>
                </div>
                <div class="form-group">
                    <label>Daily Tasks and Organization Strategy</label>
                    <textarea id="virtualAssistantTasks" rows="6" placeholder="List 5 tasks and explain your prioritization strategy..." required></textarea>
                </div>
            </div>
        `,
        'payroll-clerk': `
            <div class="role-task">
                <h4><i class="fas fa-calculator"></i> Payroll Clerk Task</h4>
                <div class="task-description">
                    <p><strong>Task:</strong> Describe your weekly payroll process. Include timesheet review, error detection, tax/deduction handling, and system used.</p>
                </div>
                <div class="form-group">
                    <label>Weekly Payroll Process</label>
                    <textarea id="payrollProcess" rows="6" placeholder="Describe your comprehensive payroll process..." required></textarea>
                </div>
            </div>
        `,
        'accounting-manager': `
            <div class="role-task">
                <h4><i class="fas fa-chart-line"></i> Accounting Manager Task</h4>
                <div class="task-description">
                    <p><strong>Task:</strong> Create a step-by-step process for month-end reconciliation, including software (e.g., QuickBooks), tracking expenses, and creating reports.</p>
                </div>
                <div class="form-group">
                    <label>Month-End Reconciliation Process</label>
                    <textarea id="reconciliationProcess" rows="6" placeholder="Detail your month-end reconciliation process..." required></textarea>
                </div>
            </div>
        `,
        'social-media': `
            <div class="role-task">
                <h4><i class="fas fa-share-alt"></i> Social Media Manager Task</h4>
                <div class="task-description">
                    <p><strong>Task:</strong> Suggest 2 campaign ideas for a remote brand. List platforms, target audience, content ideas, and tools (e.g., Canva, Hootsuite).</p>
                </div>
                <div class="form-group">
                    <label>Campaign Ideas and Strategy</label>
                    <textarea id="socialMediaCampaigns" rows="6" placeholder="Describe your 2 campaign ideas with detailed strategy..." required></textarea>
                </div>
            </div>
        `
    };
    
    if (selectedRole && roleTasks[selectedRole]) {
        taskContent.innerHTML = roleTasks[selectedRole];
        taskContent.style.display = 'block';
        
        // Add word counter for customer support
        if (selectedRole === 'customer-support') {
            const textarea = document.getElementById('customerSupportResponse');
            const wordCountSpan = document.getElementById('wordCount');
            
            textarea.addEventListener('input', function() {
                const words = this.value.trim().split(/\s+/).length;
                wordCountSpan.textContent = this.value.trim() === '' ? 0 : words;
                
                // Color coding for word count
                if (words < 150) {
                    wordCountSpan.style.color = '#e74c3c';
                } else if (words <= 250) {
                    wordCountSpan.style.color = '#27ae60';
                } else {
                    wordCountSpan.style.color = '#f39c12';
                }
            });
        }
        
        // Animate task content
        taskContent.style.opacity = '0';
        taskContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            taskContent.style.transition = 'all 0.3s ease';
            taskContent.style.opacity = '1';
            taskContent.style.transform = 'translateY(0)';
        }, 100);
        
        // Update progress
        updateProgress();
    } else {
        taskContent.style.display = 'none';
    }
}

// Form Submission Handler
function handleFormSubmission(e) {
    e.preventDefault();
    
    // Validate all fields
    const form = e.target;
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    // Check for required role selection
    const roleSelect = document.getElementById('roleSelection');
    if (!roleSelect.value) {
        showFieldError(roleSelect, 'Please select a role');
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        // Simulate submission delay
        setTimeout(() => {
            // Collect form data
            const formData = collectFormData(form);
            
            // Show success modal
            showConfirmationModal();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Log submission (in real app, this would be sent to server)
            console.log('Assessment submitted:', formData);
        }, 2000);
    } else {
        // Scroll to first error
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Collect Form Data
function collectFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    // Basic form fields
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Checkbox selections
    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
    data.tools = Array.from(checkboxes).map(cb => cb.value);
    
    // File information
    const fileInputs = form.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        if (input.files.length > 0) {
            data[input.id] = {
                name: input.files[0].name,
                size: input.files[0].size,
                type: input.files[0].type
            };
        }
    });
    
    return data;
}

// Show Confirmation Modal
function showConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'block';
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'none';
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for error styling
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
    }
    
    .error-message {
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 0.25rem;
        font-weight: 500;
    }
    
    .word-count {
        text-align: right;
        margin-top: 0.5rem;
        font-size: 0.85rem;
        font-weight: 500;
    }
    
    .role-task {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 10px;
        border: 1px solid #e9ecef;
    }
    
    .role-task h4 {
        color: #667eea;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .task-description {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid #e9ecef;
        margin-bottom: 1rem;
    }
    
    .task-description ul {
        margin-left: 1.5rem;
        margin-top: 0.5rem;
    }
    
    .task-description li {
        margin-bottom: 0.25rem;
    }
`;
document.head.appendChild(style);