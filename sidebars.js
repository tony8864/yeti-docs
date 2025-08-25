// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'core_concepts/scenario',
        'core_concepts/step',
        'core_concepts/variable_context',
        'core_concepts/extractor',
        'core_concepts/endpoint_registry',
        'core_concepts/data_registry'
      ],
    },
  ],
   
};

export default sidebars;
