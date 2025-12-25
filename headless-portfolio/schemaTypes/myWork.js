export default {
  name: 'myWork',
  title: 'My Work Section',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'intro', title: 'Intro', type: 'text' },
    {
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'link', title: 'Link', type: 'url' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'videoUrl', title: 'Video URL', type: 'url' },
            { name: 'videoFile', title: 'Video File', type: 'file' },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Video', value: 'video' },
                  { title: 'Blog', value: 'pen' },
                  { title: 'Paint', value: 'paint' },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
}
