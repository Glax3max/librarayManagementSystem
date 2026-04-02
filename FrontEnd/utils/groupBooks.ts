export const groupBooks = (books: any[]) => {
  const map: any = {};

  books.forEach((b) => {
    const key = `${b.title}_${b.author}_${b.libraryId}`;

    if (!map[key]) {
      map[key] = {
        title: b.title,
        author: b.author,
        libraryId: b.libraryId,
        total: 0,
        available: 0
      };
    }

    map[key].total += 1;

    if (b.status === "AVAILABLE") {
      map[key].available += 1;
    }
  });

  return Object.values(map);
};