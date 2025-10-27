---
title: Medium Spacing
spacing:
blocks:
  _component: "wrappers/grid"
  layout: center-aligned
  gap: md
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
              text: "Medium spacing is the default option."
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
              text: "Provides balanced visual breathing room."
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
              text: "Works well for most content layouts."
---
