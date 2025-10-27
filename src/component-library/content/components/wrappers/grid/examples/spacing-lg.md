---
title: Large Spacing
spacing:
blocks:
  _component: "wrappers/grid"
  layout: center-aligned
  gap: lg
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
              text: "Large spacing creates more visual separation."
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
              text: "Good for emphasizing individual items."
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
              text: "Helps create a more spacious, airy feel."
---
