// TextType Animation Effect
class TextType {
  constructor(elementId, texts, typingSpeed = 75, pauseDuration = 1500, showCursor = true, cursorCharacter = '|') {
    this.element = document.getElementById(elementId);
    this.texts = texts;
    this.typingSpeed = typingSpeed;
    this.pauseDuration = pauseDuration;
    this.showCursor = showCursor;
    this.cursorCharacter = cursorCharacter;
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    
    if (this.showCursor) {
      this.cursor = document.createElement('span');
      this.cursor.textContent = this.cursorCharacter;
      this.cursor.style.animation = 'blink 1s infinite';
      this.element.appendChild(this.cursor);
    }
    
    this.type();
  }
  
  type() {
    const currentText = this.texts[this.currentTextIndex];
    
    if (!this.isDeleting && this.currentCharIndex < currentText.length) {
      // Typing
      const textNode = document.createTextNode(currentText[this.currentCharIndex]);
      if (this.showCursor) {
        this.element.insertBefore(textNode, this.cursor);
      } else {
        this.element.appendChild(textNode);
      }
      this.currentCharIndex++;
      setTimeout(() => this.type(), this.typingSpeed);
    } else if (this.isDeleting && this.currentCharIndex > 0) {
      // Deleting
      if (this.showCursor) {
        this.element.removeChild(this.element.childNodes[this.currentCharIndex - 1]);
      } else {
        this.element.removeChild(this.element.lastChild);
      }
      this.currentCharIndex--;
      setTimeout(() => this.type(), this.typingSpeed / 2);
    } else if (!this.isDeleting && this.currentCharIndex === currentText.length) {
      // Pause before deleting
      this.isDeleting = true;
      setTimeout(() => this.type(), this.pauseDuration);
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      // Move to next text
      this.isDeleting = false;
      this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
      setTimeout(() => this.type(), this.typingSpeed);
    }
  }
}

// Add blinking cursor animation
const style = document.createElement('style');
style.textContent = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;
document.head.appendChild(style);

// Initialize TextType animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Animated title
  new TextType(
    'animated-title',
    ["Usman's Self-Evaluation Form", "Teacher Feedback", "Your Voice Matters"],
    75,
    2000,
    true,
    '|'
  );

  // Anonymous toggle functionality
  const anonymousToggle = document.getElementById('anonymous-toggle');
  const nameField = document.getElementById('name-field');
  
  // Show name field by default (toggle is off/unchecked)
  nameField.style.display = 'block';
  
  anonymousToggle.addEventListener('change', function() {
    if (this.checked) {
      // ON = Anonymous (hide name field)
      nameField.style.display = 'none';
      nameField.classList.remove('fade-in');
    } else {
      // OFF = Not anonymous (show name field)
      nameField.style.display = 'block';
      nameField.classList.add('fade-in');
    }
  });

  // Q1: Respect - Conditional followup
  const q1Radios = document.querySelectorAll('input[name="q1"]');
  const q1Followup = document.getElementById('q1-followup');
  
  q1Radios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.value === 'yes' || this.value === 'maybe') {
        q1Followup.style.display = 'block';
        q1Followup.classList.add('fade-in');
      } else {
        q1Followup.style.display = 'none';
        q1Followup.classList.remove('fade-in');
      }
    });
  });

  // Q2: Limits - Conditional followup
  const q2Radios = document.querySelectorAll('input[name="q2"]');
  const q2Followup = document.getElementById('q2-followup');
  
  q2Radios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.value === 'yes' || this.value === 'maybe') {
        q2Followup.style.display = 'block';
        q2Followup.classList.add('fade-in');
      } else {
        q2Followup.style.display = 'none';
        q2Followup.classList.remove('fade-in');
      }
    });
  });

  // Q3: CR Role - Conditional followup
  const q3Radios = document.querySelectorAll('input[name="q3"]');
  const q3Followup = document.getElementById('q3-followup');
  
  q3Radios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.value === 'needs-improvement') {
        q3Followup.style.display = 'block';
        q3Followup.classList.add('fade-in');
      } else {
        q3Followup.style.display = 'none';
        q3Followup.classList.remove('fade-in');
      }
    });
  });

  // Q4: Communication - Conditional followup
  const q4Radios = document.querySelectorAll('input[name="q4"]');
  const q4Followup = document.getElementById('q4-followup');
  
  q4Radios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.value === 'needs-improvement') {
        q4Followup.style.display = 'block';
        q4Followup.classList.add('fade-in');
      } else {
        q4Followup.style.display = 'none';
        q4Followup.classList.remove('fade-in');
      }
    });
  });

  // Form submission
  const form = document.getElementById('evaluation-form');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
      anonymous: anonymousToggle.checked,
      name: anonymousToggle.checked ? 'Anonymous' : document.getElementById('student-name').value || 'Anonymous',
      timestamp: new Date().toISOString(),
      responses: {
        q1_respect: getRadioValue('q1'),
        q1_detail: document.getElementById('q1-detail').value,
        q2_limits: getRadioValue('q2'),
        q2_detail: document.getElementById('q2-detail').value,
        q3_cr_role: getRadioValue('q3'),
        q3_detail: document.getElementById('q3-detail').value,
        q4_communication: getRadioValue('q4'),
        q4_detail: document.getElementById('q4-detail').value,
        q5_strength: document.getElementById('q5-strength').value,
        q6_improvement: document.getElementById('q6-improvement').value,
        q7_advice: document.getElementById('q7-advice').value
      }
    };
    
    // Log the data (in production, you would send this to a server)
    console.log('Form Data:', formData);
    
    // Save to localStorage for demo purposes
    const submissions = JSON.parse(localStorage.getItem('feedbackSubmissions') || '[]');
    submissions.push(formData);
    localStorage.setItem('feedbackSubmissions', JSON.stringify(submissions));
    
    // Show success message
    showSuccessMessage();
  });
  
  function getRadioValue(name) {
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    return radio ? radio.value : null;
  }
  
  function showSuccessMessage() {
    const formWrapper = document.querySelector('.form-wrapper');
    formWrapper.innerHTML = `
      <div class="success-message fade-in">
        <h2>✓ Thank You!</h2>
        <p>Your feedback has been submitted successfully.</p>
        <p style="margin-top: 20px; font-size: 14px; color: var(--font-color-sub);">
          Your honest response will help me grow and improve.
        </p>
        <button onclick="location.reload()" class="flip-card__btn" style="margin-top: 30px;">
          Submit Another Response
        </button>
      </div>
    `;
  }
});

// Optional: View all submissions (for testing/admin purposes)
function viewSubmissions() {
  const submissions = JSON.parse(localStorage.getItem('feedbackSubmissions') || '[]');
  console.log('All Submissions:', submissions);
  return submissions;
}

// Optional: Clear all submissions
function clearSubmissions() {
  localStorage.removeItem('feedbackSubmissions');
  console.log('All submissions cleared');
}

// Make functions available globally for testing
window.viewSubmissions = viewSubmissions;
window.clearSubmissions = clearSubmissions;
