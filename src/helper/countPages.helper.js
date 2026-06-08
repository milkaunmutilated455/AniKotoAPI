const countPages = ($) => {
  const pages = [];
  $(".pagination li a").each((i, el) => {
    const text = $(el).text().trim();
    if (!isNaN(text) && text !== "") {
      pages.push(parseInt(text));
    }
  });
  return pages.length > 0 ? Math.max(...pages) : 1;
};

export { countPages };