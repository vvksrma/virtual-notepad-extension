// Function to apply text formatting
function formatText(command) {
  if (document.queryCommandSupported(command)) {
      document.execCommand(command);
  }
}

// Function to change font family
function changeFont() {
  const font = document.getElementById('font-family').value;
  if (document.queryCommandSupported('fontName')) {
      document.execCommand('fontName', false, font);
  }
}

// Function to change font size
function changeFontSize() {
  const size = document.getElementById('font-size').value;
  const notepad = document.getElementById('notepad');

  // Map font size options to specific pixel values
  const sizeMap = {
    'small': '10px',
    'medium': '15px',
    'large': '20px'
  };

  // Apply the selected font size to the notepad
  notepad.style.fontSize = sizeMap[size];
}

// Function to clear the notepad content
function clearNotepad() {
  const notepad = document.getElementById('notepad');
  notepad.innerHTML = ''; // Clear the content
  chrome.storage.local.set({ notepadContent: '' }); // Clear content in storage
}

// Load the notepad content from storage
function loadContent() {
  chrome.storage.local.get(['notepadContent'], (result) => {
    document.getElementById('notepad').innerHTML = result.notepadContent || '';
  });
}

// Save the notepad content to storage
function saveContent() {
  const content = document.getElementById('notepad').innerHTML;
  chrome.storage.local.set({ notepadContent: content });
}

// Set up event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadContent();

  document.getElementById('bold').addEventListener('click', () => formatText('bold'));
  document.getElementById('italic').addEventListener('click', () => formatText('italic'));
  document.getElementById('underline').addEventListener('click', () => formatText('underline'));
  document.getElementById('font-family').addEventListener('change', changeFont);
  document.getElementById('font-size').addEventListener('change', changeFontSize);
  document.getElementById('clear').addEventListener('click', clearNotepad);
  document.getElementById('notepad').addEventListener('input', saveContent);
});
