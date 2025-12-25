import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Headless-portfolio',

  projectId: '5u95fyl0',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Navigation').child(S.document().schemaType('nav').documentId('nav')),
            S.listItem().title('Footer').child(S.document().schemaType('footer').documentId('footer')),
            S.listItem().title('Hero').child(S.document().schemaType('hero').documentId('hero')),
            S.listItem().title('About').child(S.document().schemaType('about').documentId('about')),
            S.listItem().title('Contact').child(S.document().schemaType('contact').documentId('contact')),

            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('service').title('Services'),
            S.documentTypeListItem('blog').title('Blog'),

            S.listItem().title('Know Me Section').child(S.document().schemaType('knowMe').documentId('knowMeSingleton')),
            S.listItem().title('My Work Section').child(S.document().schemaType('myWork').documentId('myWorkSingleton')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
