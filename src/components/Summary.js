import React, { useEffect, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { MdPublishedWithChanges } from "react-icons/md";
import { useLazyGetSummaryQuery } from "../services/article";
import loading from "../assets/loading.svg";

const Summary = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [articleList, setArticleList] = useState([]);
  const [copy, setCopy] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  /* saving history in local storage */
  useEffect(() => {
    const localStorageArticles = JSON.parse(localStorage.getItem("articles"));

    if (localStorageArticles) {
      setArticleList(localStorageArticles);
    }
  }, []);

  /* handle api request */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedArticleList = [newArticle, ...articleList];

      setArticleList(updatedArticleList);
      setArticle(newArticle);
      /* update the articles for local storage here */
      localStorage.setItem("articles", JSON.stringify(updatedArticleList));
    }
  };

  /* handling copy button */
  const handleCopy = (copyLink) => {
    setCopy(copyLink);
    navigator.clipboard.writeText(copyLink);
    setTimeout(() => setCopy(false), 2000);
  };

  return (
    <div className="w-full px-4 md:px-20 mt-4 md:mt-12">
      {/* search box */}
      <div className="border py-2 px-2 md:px-4 shadow rounded-md w-full lg:w-[65%] mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center ">
          <AiOutlineLink className="text-gray-600 mr-2" />
          <input
            type="url"
            placeholder="Enter URL here..."
            value={article.url}
            required
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            className="py-2 px-2 focus:outline-none flex-1"
          />
          {/* submit button */}
          <button type="submit">
            <MdPublishedWithChanges
              className="mx-1 px-1 text-gray-600 hover:text-white  rounded hover:bg-[#ff385c]"
              size={35}
            />
          </button>
        </form>
      </div>
      {/* articles url history */}
      <div className="mt-2 md:px-6 px-4 border py-2 rounded-md">
        {articleList.slice(0, 5).map((item, index) => (
          <div key={index} onClick={() => setArticle(item)}>
            <div className="flex items-center py-2">
              <p
                className="mr-2 flex-1 flex items-center gap-1 text-gray-600 hover:text-[#ff385c]
              overflow-hidden overflow-ellipsis cursor-pointer text-sm"
              >
                <BsDot /> {item.url}
              </p>
              {copy === item.url ? (
                <TiTick size={20} className="text-[#ff385c]" />
              ) : (
                <MdContentCopy
                  size={20}
                  className="text-gray-600 hover:text-[#ff385c]"
                  onClick={() => handleCopy(item.url)}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* results */}
      <div className="my-4">
        {isFetching ? (
          <img
            src={loading}
            alt="loading"
            className="object-contain w-20 h-20 mx-auto"
          />
        ) : error ? (
          <p>
            error <br /> <span>{error?.data.error}</span>
          </p>
        ) : (
          article.summary && (
            <div>
              <h2 className="font-semibold text-lg text-[#ff385c] px-4">
                Article Summary:
              </h2>
              <div className="flex relative">
                <p className="px-4 mt-2 text-justify border pt-12 pb-4 rounded-md">
                  {article.summary}
                </p>
                <div className="absolute right-4 top-5">
                  <button
                    onClick={() => handleCopy(article.summary)}
                    className="flex items-center px-3 py-1 rounded text-sm border border-[#ff385c] hover:bg-[#ff385c] hover:text-white"
                  >
                    {copy === article.summary ? (
                      <p className="flex">
                        Copied <TiTick size={20} className="ml-1" />
                      </p>
                    ) : (
                      <p className="flex">
                        Copy <MdContentCopy size={20} className="ml-1" />
                      </p>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Summary;
