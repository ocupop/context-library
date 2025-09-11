---
_schema: default
title: Your Site
pageBlocks:
  - _bookshop_name: wrappers/container
    label: ''
    contentBlocks:
      - _bookshop_name: primitives/heading
        text: Welcome to your CloudCannon Starter Component site
        level: h1
        align: start
        iconPosition: before
      - _bookshop_name: primitives/divider
        padding: xl
      - _bookshop_name: wrappers/button-group
        buttonBlocks:
          - _bookshop_name: primitives/button
            text: View Components
            link: /component-library/
            iconPosition: before
            hideText: false
            variant: secondary
            size: lg
        direction: row
        align: start
      - _bookshop_name: primitives/counter
        number: 100
        prefix:
        suffix:
        horizontalAlignment: start
      - _bookshop_name: primitives/definition-list
        items:
          - title:
            text: asdsadsad
        horizontalAlignment: start
      - _bookshop_name: primitives/embed
        src:
        title:
        aspect_ratio: landscape
    maxContentWidth: 2xl
    paddingHorizontal: lg
    paddingVertical: lg
    colorScheme: default
    backgroundImage:
      source: ''
      alt: ''
      positionVertical: top
      positionHorizontal: center
---
