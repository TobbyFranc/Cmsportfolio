export default {
  name: 'knowMe',
  title: 'KnowMe',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'extra', title: 'Extra Info', type: 'text' },
    { name: 'buttonText', title: 'Button Text', type: 'string' },
    {
      name: 'bgImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
};
