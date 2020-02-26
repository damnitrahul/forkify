import { elements } from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
  elements.searchInput.value = '';
};
export const clearResult = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
  const resultsArr = Array.from(document.querySelectorAll('.results__link'));

  resultsArr.forEach(item => {
    item.classList.remove('results__link--active');
  });

  document
    .querySelector(`a[href="#${id}"]`)
    .classList.add('results__link--active');
};

export const limitResipeTitle = (title, limit = 18) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    // Return New Title
    return `${newTitle.join(' ')}...`;
  }
  return title;
};

const renderRecipe = recipe => {
  const markup = `
  <li>
  <a class="results__link" href="#${recipe.recipe_id}">
      <figure class="results__fig">
          <img src=${recipe.image_url} alt="Test">
      </figure>
      <div class="results__data">
          <h4 class="results__name">${limitResipeTitle(recipe.title)}</h4>
          <p class="results__author">${recipe.publisher}</p>
      </div>
  </a>
</li>
`;
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => `
                    <button class="btn-inline results__btn--${type}" data-goto="${
  type === 'prev' ? page - 1 : page + 1
}">
<span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${
                          type === 'prev' ? 'left' : 'right'
                        }"></use>
                    </svg>
                </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;
  if (page === 1 && pages > 1) {
    button = createButton(page, 'next');
  } else if (page < pages) {
    button = `${createButton(page, 'prev')}${createButton(page, 'next')}`;
  } else if (page === pages) {
    button = createButton(page, 'prev');
  }
  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  // Render Results of current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);
  // Render Button
  renderButtons(page, recipes.length, resPerPage);
};
