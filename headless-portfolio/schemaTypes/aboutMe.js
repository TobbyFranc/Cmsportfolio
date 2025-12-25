export default {
  name: 'aboutMe',
  title: 'About Me Page',
  type: 'document',
  fields: [
    { name: 'headline', title: 'Headline', type: 'string' },
    { name: 'intro', title: 'Intro Text', type: 'text' },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Section Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'icon', title: 'Icon Type', type: 'string', options: { list: ['video', 'pen', 'paint'] } },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'videoUrl', title: 'Video URL', type: 'url' },
          ],
        },
      ],
    },
  ],
}
