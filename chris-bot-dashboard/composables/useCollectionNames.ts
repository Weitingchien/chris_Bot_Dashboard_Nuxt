export default async ():Promise<string[]> => {
  const { data: collectionsNames } = await $fetch(
    '/api/v1/yt/collectionsnames'
  );

  return collectionsNames
};
