// get individual element
const getIndividualItemArray = array => {
    let individualItemArray = array.filter(function(v, i, self) {
      return i === self.indexOf(v);
    });
    return individualItemArray;
  };
  
  // get individual categories
  export const getIndividualCategories = blogs => {
    let blogCategories = [];
    blogs &&
      blogs.map(blog => {
        return (
          blog.category &&
          blog.category.map(single => {
            return blogCategories.push(single);
          })
        );
      });
    const individualProductCategories = getIndividualItemArray(blogCategories);
    return individualProductCategories;
  };

  export const setActiveSort = e => {
    const filterButtons = document.querySelectorAll(
      ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
    );
    filterButtons.forEach(item => {
      item.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  };

  //get products based on category
export const getSortedBlogs = (blogs, sortType, sortValue) => {
  if (blogs && sortType && sortValue) {
    if (sortType === "category") {
      return blogs.filter(
        blog => blog.category.filter(single => single === sortValue)[0]
      );
    }
    if (sortType === "filterSort") {
      let sortBlogs = [...blogs];
      if (sortValue === "default") {
        return sortBlogs;
      }
    }
  }
  return blogs;
};