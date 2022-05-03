export async function getCategories() {
  try {
    const url = 'https://api.mercadolibre.com/sites/MLB/categories';
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (e) { console.log(e); }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let url = '';
  if (categoryId && query) {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  } else {
    url = categoryId ? `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`
      : `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  }
  const result = await fetch(url);
  const data = await result.json();
  return data;
}
export async function getProductDetail(id) {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}
