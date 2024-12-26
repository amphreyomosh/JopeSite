// schemas/contact.js
export default {
    name: 'contact',
    title: 'Contact',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
    ],
  };
  