import React, { Fragment } from "react";
import { Link } from "react-router-dom";



const BlogPosts = ({blogs}) => {
  return (
    <Fragment>
      {blogs.map(blog => {
            return (
          
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
              <img
                src={process.env.PUBLIC_URL + blog.image}
                alt=""
              />
            </Link>
          </div>
          <div className="blog-content-2">
            <div className="blog-meta-2">
              <ul>
                <li>22 April, 2020</li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                    4 <i className="fa fa-comments-o" />
                  </Link>
                </li>
              </ul>
            </div>
            <h4>
              <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                {blog.title}
              </Link>
            </h4>
            <p>
              {blog.description}
            </p>
            <div className="blog-share-comment">
              <div className="blog-btn-2">
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  Đọc tiếp
                </Link>
              </div>
              <div className="blog-share">
                <span>Chia sẽ :</span>
                <div className="share-social">
                  <ul>
                    <li>
                      <a className="facebook" href="//facebook.com">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a className="twitter" href="//twitter.com">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a className="instagram" href="//instagram.com">
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
         );
        })}
    </Fragment>
  );
};

export default BlogPosts;
