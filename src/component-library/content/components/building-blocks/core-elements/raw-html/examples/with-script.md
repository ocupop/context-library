---
title: "Raw HTML with Script"
spacing: "all"
blocks:
  _component: "building-blocks/core-elements/raw-html"
  html: |
    <div id="interactive-example" style="padding: 1rem; background: #e8f4f8; border-radius: 8px;">
      <h3 style="margin-top: 0;">Interactive Example</h3>
      <p>Click the button below to see a JavaScript interaction:</p>
      <button id="demo-button" style="padding: 0.5rem 1rem; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Click me!
      </button>
      <p id="demo-output" style="margin-top: 1rem; font-weight: bold;"></p>
    </div>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const button = document.getElementById('demo-button');
        const output = document.getElementById('demo-output');
        let count = 0;
        
        if (button && output) {
          button.addEventListener('click', function() {
            count++;
            output.textContent = `Button clicked ${count} time${count !== 1 ? 's' : ''}!`;
          });
        }
      });
    </script>
---
