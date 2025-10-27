---
title: Small Spacing
spacing:
blocks:
  _component: "wrappers/grid"
  layout: center-aligned
  gap: sm
  minItemWidth: 200
  maxItemWidth: 300
  items:
    - contentBlocks:
        - _component: "wrappers/card"
          paddingHorizontal: md
          paddingVertical: md
          rounded: true
          border: true
          contentBlocks:
            - _component: "typography/heading"
              text: "Item 1"
              level: h3
            - _component: "typography/simple-text"
              text: "Small spacing provides subtle separation."
    - contentBlocks:
        - _component: "wrappers/card"
          paddingHorizontal: md
          paddingVertical: md
          rounded: true
          border: true
          contentBlocks:
            - _component: "typography/heading"
              text: "Item 2"
              level: h3
            - _component: "typography/simple-text"
              text: "Good for related content groups."
    - contentBlocks:
        - _component: "wrappers/card"
          paddingHorizontal: md
          paddingVertical: md
          rounded: true
          border: true
          contentBlocks:
            - _component: "typography/heading"
              text: "Item 3"
              level: h3
            - _component: "typography/simple-text"
              text: "Maintains visual connection between items."
---
