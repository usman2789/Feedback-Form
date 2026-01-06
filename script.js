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

  // Form submission with Web3Forms
  const form = document.getElementById('evaluation-form');
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Collect form data for Web3Forms
    const formData = new FormData();
    formData.append('access_key', '247f9322-447e-493b-a0cd-af706f9cc9c6');
    
    // Add name field
    const name = anonymousToggle.checked ? 'Anonymous' : (document.getElementById('student-name').value || 'Anonymous');
    formData.append('Name', name);
    
    // Q1: Respect
    const q1Value = getRadioValue('q1');
    if (q1Value) {
      formData.append('Q1: Did you feel I was disrespectful towards you?', q1Value);
      const q1Detail = document.getElementById('q1-detail').value;
      if (q1Detail) {
        formData.append('Q1 Detail', q1Detail);
      }
    }
    
    // Q2: Limits & Boundaries
    const q2Value = getRadioValue('q2');
    if (q2Value) {
      formData.append('Q2: Did I cross professional or personal limits?', q2Value);
      const q2Detail = document.getElementById('q2-detail').value;
      if (q2Detail) {
        formData.append('Q2 Detail', q2Detail);
      }
    }
    
    // Q3: CR Role
    const q3Value = getRadioValue('q3');
    if (q3Value) {
      formData.append('Q3: How well did I handle CR responsibilities?', q3Value);
      const q3Detail = document.getElementById('q3-detail').value;
      if (q3Detail) {
        formData.append('Q3 Detail', q3Detail);
      }
    }
    
    // Q4: Communication
    const q4Value = getRadioValue('q4');
    if (q4Value) {
      formData.append('Q4: How would you describe my communication?', q4Value);
      const q4Detail = document.getElementById('q4-detail').value;
      if (q4Detail) {
        formData.append('Q4 Detail', q4Detail);
      }
    }
    
    // Q5: Strength
    const q5Value = document.getElementById('q5-strength').value;
    if (q5Value) {
      formData.append('Q5: One thing I do well', q5Value);
    }
    
    // Q6: Improvement
    const q6Value = document.getElementById('q6-improvement').value;
    if (q6Value) {
      formData.append('Q6: One thing I should avoid or change', q6Value);
    }
    
    // Q7: Final Reflection (allow empty)
    const q7Value = document.getElementById('q7-advice').value;
    if (q7Value) {
      formData.append('Q7: Any advice for personal improvement', q7Value);
    }
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        showSuccessMessage();
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Feedback';
      alert('There was an error submitting your feedback. Please try again.');
    }
  });
  
  function getRadioValue(name) {
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    return radio ? radio.value : null;
  }
  
  function showSuccessMessage() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(102, 126, 234, 0.95);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      animation: fadeIn 0.3s ease-in;
      backdrop-filter: blur(5px);
    `;
    
    // Create modal content
    modal.innerHTML = `
      <div style="
        background: lightgrey;
        padding: 40px 30px;
        border-radius: 8px;
        border: 2px solid #323232;
        box-shadow: 6px 6px #323232;
        max-width: 450px;
        width: 90%;
        text-align: center;
        animation: slideIn 0.3s ease-out;
      ">
        <div style="
          width: 70px;
          height: 70px;
          margin: 0 auto 25px;
          border-radius: 50%;
          border: 3px solid #323232;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          font-weight: bold;
          color: #323232;
          background: #fff;
        ">✓</div>
        <h2 style="
          color: #323232; 
          margin-bottom: 15px; 
          font-size: 26px;
          font-weight: 900;
        ">Thank You!</h2>
        <p style="
          color: #323232; 
          font-size: 16px; 
          line-height: 1.6; 
          margin-bottom: 30px;
          font-weight: 500;
        ">
          Thanks for submitting, it definitely means a lot for my personal development.
        </p>
        <button onclick="location.reload()" style="
          padding: 12px 32px;
          font-size: 16px;
          font-weight: 600;
          color: #323232;
          background: #fff;
          border: 2px solid #323232;
          border-radius: 6px;
          box-shadow: 4px 4px #323232;
          cursor: pointer;
          transition: all 0.2s ease;
        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='6px 6px #323232'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='4px 4px #323232'">
          Submit Another Response
        </button>
      </div>
    `;
    
    // Add keyframe animations
    if (!document.getElementById('modal-animations')) {
      const style = document.createElement('style');
      style.id = 'modal-animations';
      style.textContent = `
        @keyframes slideIn {
          from {
            transform: translateY(-50px) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
  }
});
