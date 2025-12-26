// schemas/aboutMe.js
export default {
  name: 'aboutMe',
  title: 'About Me Page',
  type: 'document',
  fields: [
    // Intro Section
    {
      name: 'introTitle',
      title: 'Intro Title',
      type: 'string',
    },
    {
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
    },

    // Hobbies Section
    {
      name: 'hobbies',
      title: 'Hobbies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Hobby Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }],
            },
          ],
        },
      ],
    },

    // Impact Metrics Section
    {
      name: 'impactMetrics',
      title: 'Impact Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'number' },
            {
              name: 'icon',
              title: 'Icon (optional)',
              type: 'string',
              description: 'Use a keyword to map to a React Icon (e.g., "users", "globe", "pen")',
            },
          ],
        },
      ],
    },

    // Split Screen Storytelling Section
    {
      name: 'splitSections',
      title: 'Split Screen Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Section Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            {
              name: 'media',
              title: 'Image/Video',
              type: 'image', // or 'file' if you want to allow video uploads
              options: { hotspot: true },
            },
          ],
        },
      ],
    },

    // FAQ Section
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' },
          ],
        },
      ],
    },
  ],
};
 