export const QUERY_KEYS = {
  todo: {
    all: ['todo'],
    list: ['todo', 'list'],
    detail: (id: string) => ['todo', 'detail', id],
  },
};
