/**
 * Absher TrustMatch - Fingerprint Verification JavaScript
 * 
 * Manages the fingerprint verification UI state and user interactions.
 * Provides state management, form handling, and demo controls.
 */

// ============================================================================
// Constants
// ============================================================================

/** Application states */
const APP_STATES = {
    IDLE: 'idle',
    SCANNING: 'scanning',
    SUCCESS: 'success',
    FAILURE: 'failure'
};

/** Timing constants (in milliseconds) */
const TIMING = {
    SCAN_DURATION: 3000,
    RESULT_DISPLAY_DURATION: 4000,
    SUCCESS_RATE: 0.7  // 70% success rate for simulation
};

/** Status messages for each state */
const STATUS_MESSAGES = {
    [APP_STATES.IDLE]: 'ضع إصبع المستفيد على جهاز البصمة',
    [APP_STATES.SCANNING]: 'جاري التحقق...',
    [APP_STATES.SUCCESS]: 'تمت مطابقة البصمة بنجاح',
    [APP_STATES.FAILURE]: 'لم يتم تطابق البصمة. يرجى التحقق من الهوية.'
};

/** Button labels for each state */
const BUTTON_LABELS = {
    [APP_STATES.IDLE]: 'بدء التحقق بالبصمة',
    [APP_STATES.SCANNING]: 'جاري التحقق...',
    [APP_STATES.SUCCESS]: 'إعادة التحقق',
    [APP_STATES.FAILURE]: 'إعادة المحاولة'
};

/** Default test data for demo purposes */
const TEST_DATA = {
    nationalId: '1234567890',
    birthDate: '1990-05-15',
    idVersion: '123456'
};

// ============================================================================
// State Management
// ============================================================================

let currentState = APP_STATES.IDLE;

// ============================================================================
// DOM Element References
// ============================================================================

const fingerprintSection = document.getElementById('fingerprint-section');
const fingerprintIcon = document.getElementById('fingerprint-icon');
const statusText = document.getElementById('status-text');
const successIcon = document.getElementById('success-icon');
const failureIcon = document.getElementById('failure-icon');
const verifyBtn = document.getElementById('verify-btn');
const rings = [
    document.getElementById('ring-1'),
    document.getElementById('ring-2'),
    document.getElementById('ring-3')
];

const nationalIdInput = document.getElementById('national-id');
const birthDateInput = document.getElementById('birth-date');
const idVersionInput = document.getElementById('id-version');

// ============================================================================
// State Management Functions
// ============================================================================

/**
 * Resets all UI elements to their default state
 */
function resetUIState() {
    fingerprintSection.className = 'fingerprint-section';
    fingerprintIcon.className = 'fingerprint-icon';
    statusText.className = 'status-text';
    successIcon.classList.remove('show');
    failureIcon.classList.remove('show');
    rings.forEach(ring => ring.classList.remove('active'));
}

/**
 * Updates ARIA attributes for accessibility
 * @param {string} state - Current application state
 */
function updateAriaAttributes(state) {
    const isScanning = state === APP_STATES.SCANNING;
    const isResult = state === APP_STATES.SUCCESS || state === APP_STATES.FAILURE;
    
    fingerprintSection.setAttribute('aria-busy', isScanning);
    successIcon.setAttribute('aria-hidden', state !== APP_STATES.SUCCESS);
    failureIcon.setAttribute('aria-hidden', state !== APP_STATES.FAILURE);
    
    if (isResult) {
        statusText.setAttribute('role', 'alert');
    } else {
        statusText.removeAttribute('role');
    }
}

/**
 * Sets the application state and updates the UI accordingly
 * @param {string} state - The state to transition to
 */
function setState(state) {
    if (!Object.values(APP_STATES).includes(state)) {
        console.warn(`Invalid state: ${state}`);
        return;
    }
    
    currentState = state;
    resetUIState();
    
    switch (state) {
        case APP_STATES.IDLE:
            fingerprintSection.classList.add(APP_STATES.IDLE);
            fingerprintIcon.classList.add(APP_STATES.IDLE);
            fingerprintIcon.style.display = 'flex';
            statusText.textContent = STATUS_MESSAGES[APP_STATES.IDLE];
            verifyBtn.disabled = false;
            verifyBtn.textContent = BUTTON_LABELS[APP_STATES.IDLE];
            break;
            
        case APP_STATES.SCANNING:
            fingerprintSection.classList.add(APP_STATES.SCANNING);
            statusText.classList.add(APP_STATES.SCANNING);
            fingerprintIcon.style.display = 'flex';
            statusText.textContent = STATUS_MESSAGES[APP_STATES.SCANNING];
            rings.forEach(ring => ring.classList.add('active'));
            verifyBtn.disabled = true;
            verifyBtn.textContent = BUTTON_LABELS[APP_STATES.SCANNING];
            break;
            
        case APP_STATES.SUCCESS:
            fingerprintSection.classList.add(APP_STATES.SUCCESS);
            statusText.classList.add(APP_STATES.SUCCESS);
            fingerprintIcon.style.display = 'none';
            successIcon.classList.add('show');
            statusText.textContent = STATUS_MESSAGES[APP_STATES.SUCCESS];
            verifyBtn.disabled = false;
            verifyBtn.textContent = BUTTON_LABELS[APP_STATES.SUCCESS];
            playSuccessSound();
            break;
            
        case APP_STATES.FAILURE:
            fingerprintSection.classList.add(APP_STATES.FAILURE);
            statusText.classList.add(APP_STATES.FAILURE);
            fingerprintIcon.style.display = 'none';
            failureIcon.classList.add('show');
            statusText.textContent = STATUS_MESSAGES[APP_STATES.FAILURE];
            verifyBtn.disabled = false;
            verifyBtn.textContent = BUTTON_LABELS[APP_STATES.FAILURE];
            playErrorSound();
            break;
    }
    
    updateAriaAttributes(state);
}

// ============================================================================
// Verification Process
// ============================================================================

/**
 * Starts the fingerprint verification process
 * Simulates scanning and randomly determines success/failure
 */
function startVerification() {
    setState(APP_STATES.SCANNING);
    
    // Simulate fingerprint scanning
    setTimeout(() => {
        const isSuccess = Math.random() > (1 - TIMING.SUCCESS_RATE);
        setState(isSuccess ? APP_STATES.SUCCESS : APP_STATES.FAILURE);
        
        // Auto-reset to idle after displaying result
        setTimeout(() => {
            setState(APP_STATES.IDLE);
        }, TIMING.RESULT_DISPLAY_DURATION);
    }, TIMING.SCAN_DURATION);
}

// ============================================================================
// Form Setup Functions
// ============================================================================

/**
 * Sets up the date picker for the birth date input field
 * Note: Uses a simple prompt. In production, use a proper date picker library.
 */
function setupDatePicker() {
    birthDateInput.addEventListener('click', () => {
        const defaultDate = '1990-01-01';
        const date = prompt('أدخل تاريخ الميلاد (YYYY-MM-DD):', defaultDate);
        
        if (date) {
            birthDateInput.value = date;
        }
    });
}

/**
 * Sets up input validation
 * Note: Input validation has been disabled per requirements
 */
function setupInputValidation() {
    // Input validation is intentionally disabled
    // This function is kept for potential future implementation
}

// ============================================================================
// Audio Feedback Functions
// ============================================================================

/**
 * Plays a success sound effect
 * Note: Currently logs to console. In production, play actual audio.
 */
function playSuccessSound() {
    // TODO: Implement actual audio playback in production
    console.log('✓ Success sound');
}

/**
 * Plays an error sound effect
 * Note: Currently logs to console. In production, play actual audio.
 */
function playErrorSound() {
    // TODO: Implement actual audio playback in production
    console.log('✗ Error sound');
}

// ============================================================================
// Event Handlers
// ============================================================================

/**
 * Handles keyboard input for accessibility
 * Allows Enter key to trigger verification when in idle state
 */
function handleKeyboardInput(event) {
    if (event.key === 'Enter' && currentState === APP_STATES.IDLE) {
        startVerification();
    }
}

/**
 * Auto-focuses the first input field when the page loads
 */
function handlePageLoad() {
    nationalIdInput.focus();
}

// ============================================================================
// Public API Functions (for demo/debugging)
// ============================================================================

/**
 * Fills form fields with test data for demonstration purposes
 */
window.fillTestData = function() {
    nationalIdInput.value = TEST_DATA.nationalId;
    birthDateInput.value = TEST_DATA.birthDate;
    idVersionInput.value = TEST_DATA.idVersion;
};

/**
 * Returns the current application state
 * @returns {string} Current state
 */
window.getState = function() {
    console.log('Current State:', currentState);
    return currentState;
};

// ============================================================================
// Initialization
// ============================================================================

/**
 * Initializes the application when DOM is ready
 */
function initialize() {
    setState(APP_STATES.IDLE);
    setupDatePicker();
    setupInputValidation();
    document.addEventListener('keydown', handleKeyboardInput);
    window.addEventListener('load', handlePageLoad);
}

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', initialize);
