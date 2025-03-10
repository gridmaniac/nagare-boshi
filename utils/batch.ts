export const useImiwaBatch = (content: string): PreBatch | null => {
  const { backup } = JSON.parse(content);

  const { lists } = backup;
  if (!lists || !lists.length) return null;

  const { list } = lists[0];
  if (!list) return null;

  const { items } = list;
  if (!items || !items.length) return null;

  return {
    items: items.map((item: ImiwaItem) => ({
      timestamp: new Date(item.atime),
      value: item.value,
    })),
  };
};
