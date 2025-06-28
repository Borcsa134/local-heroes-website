export const statusIsPublished = {
  or: [
    {
      _status: {
        equals: 'published',
      },
    },
    {
      _status: {
        exists: false,
      },
    },
  ],
};
