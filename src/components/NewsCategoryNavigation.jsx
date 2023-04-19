import React from "react";

const NewsCategoryNavigation = (props) => {
  return (
      <section>
          <div className={'container text-center'}>
             <div className={'mb-5'}>
                 {props.categories?.map((category, index) => (
                     <a href={'#' + category} className={`news-link ${index === 0 ? 'active' : ''}`} key={index}>
                         {category}
                     </a>
                 ))}
             </div>
          </div>
      </section>
  );
}
export default NewsCategoryNavigation;