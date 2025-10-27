---
title: Extra Small Spacing
spacing:
blocks:
  _component: "wrappers/grid"
  layout: center-aligned
  gap: xs
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
              text: "Extra small spacing creates tight, compact layouts."
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
              text: "Perfect for dense information displays."
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
              text: "Minimal gaps between grid items."
---
