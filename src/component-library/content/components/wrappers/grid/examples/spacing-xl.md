---
title: Extra Large Spacing
spacing:
blocks:
  _component: "wrappers/grid"
  layout: center-aligned
  gap: xl
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
              text: "Extra large spacing creates significant separation."
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
              text: "Perfect for highlighting important content."
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
              text: "Creates a premium, spacious layout feel."
---
