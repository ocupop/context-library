---
title: "Raw HTML with Styles"
spacing: "all"
blocks:
  _component: "building-blocks/core-elements/raw-html"
  html: |
    <style>
      .custom-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .custom-card h3 {
        margin-top: 0;
        font-size: 1.5rem;
      }
    </style>
    <div class="custom-card">
      <h3>Styled HTML Content</h3>
      <p>This example shows how to include custom CSS styles within the raw HTML block.</p>
    </div>
---

