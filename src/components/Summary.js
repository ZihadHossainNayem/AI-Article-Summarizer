import React, { useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { MdPublishedWithChanges } from "react-icons/md";
import { useLazyGetSummaryQuery } from "../services/article";

const Summary = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  /* handle api request */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setArticle(newArticle);
      console.log(newArticle);
    }
  };
  return (
    <div className="w-full px-4 md:px-20 mt-4 md:mt-12">
      {/* search box */}
      <div className="border py-2 px-2 md:px-4 shadow">
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
              className="text-gray-700 border p-1 rounded border-gray-700 mx-1"
              size={35}
            />
          </button>
        </form>

        {/* url history */}
      </div>

      {/* results */}
    </div>
  );
};

export default Summary;
