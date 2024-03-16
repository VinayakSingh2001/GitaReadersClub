
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { get, getDatabase, ref } from "firebase/database";
import { app } from "../../firebase.config";
import { toast } from "react-toastify";
import { Fullscreen } from "@mui/icons-material";

function EbookDetail() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedQuestionDetails, setSelectedQuestionDetails] = useState(null);
  const [openArticles, setOpenArticles] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(true); // State variable for loading

  useEffect(() => {
    const fetchBooks = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "Ebook");
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setBooks(snapshot.val());
        } else {
          console.log("No data available");
        }
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchBooks();
  }, []);

  const handleBookSelect = (bookId) => {
    const book = books[bookId];
    setSelectedBook(book);
    setSelectedChapter(null);
    setSelectedArticle(null);
    setSelectedQuestion(null);
    setSelectedQuestionDetails(null);
    setOpenArticles({}); // Reset open articles when selecting a new book
  };

  const handleChapterSelect = (chapterId) => {
    const chapter = selectedBook.ChapterId[chapterId];
    setSelectedChapter(chapter);
    setSelectedArticle(null);
    setSelectedQuestion(null);
    setSelectedQuestionDetails(null);
    setOpenArticles({}); // Reset open articles when selecting a new chapter
  };

  const handleArticleSelect = (chapterId, articleId) => {
    setOpenArticles((prevState) => ({
      ...prevState,
      [chapterId]: articleId,
    }));
    const article = selectedBook.ChapterId[chapterId].ArticleId[articleId];
    setSelectedArticle(article);
    setSelectedQuestion(null);
    setSelectedQuestionDetails(null);
  };

  const handleQuestionSelect = () => {
    if (selectedArticle && selectedArticle.QuestionId) {
      const questions = Object.values(selectedArticle.QuestionId);
      setSelectedQuestionDetails(questions);
    }
  };

  const renderChapterTree = () => {
    if (!selectedBook || !selectedBook.ChapterId) return null;
    return (
      <TreeView
        aria-label="chapter navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {Object.keys(selectedBook.ChapterId).map((chapterId) => (
          <TreeItem
            key={chapterId}
            nodeId={chapterId}
            label={`Chapter: ${chapterId}`}
            onClick={() => handleChapterSelect(chapterId)}
          >
            {selectedBook.ChapterId[chapterId].ArticleId &&
              renderArticleTree(
                chapterId,
                selectedBook.ChapterId[chapterId].ArticleId
              )}
          </TreeItem>
        ))}
      </TreeView>
    );
  };

  const renderQuestionTree = (chapterId, articleId, questions) => {
    return (
      <TreeItem
        nodeId={`${chapterId}${articleId}-questions`}
        label="Questions"
        onClick={(e) => e.preventDefault()} // Prevent default action for this node
      >
        {Object.keys(questions).map((questionId) => (
          <TreeItem
            key={questionId}
            nodeId={`${chapterId}${articleId}${questionId}`}
            label={`Question ID: ${questionId}`}
            onClick={() => handleQuestionSelect()}
          />
        ))}
      </TreeItem>
    );
  };

  const renderArticleTree = (chapterId, articles) => {
    if (!articles) return null;
    return Object.keys(articles).map((articleId) => (
      <TreeItem
        key={articleId}
        nodeId={chapterId + articleId}
        label={`Article: ${articleId}`}
        onClick={() => handleArticleSelect(chapterId, articleId)}
        onLabelClick={(e) => {
          e.preventDefault(); // Prevents the default action of expanding/collapsing the node
          handleArticleSelect(chapterId, articleId);
        }}
        // Set the onLabelClick prop to prevent the default action of expanding/collapsing the node
        selected={openArticles[chapterId] === articleId} // Set the selected prop to control the expanded state of the node
      >
        {selectedArticle &&
          selectedArticle.QuestionId &&
          renderQuestionTree(
            chapterId,
            articleId,
            selectedArticle.QuestionId
          )}
      </TreeItem>
    ));
  };

  const handleChange = (optionId) => {
    if (selectedAnswer === optionId) {
      setSelectedAnswer(null);
    } else {
      setSelectedAnswer(optionId);
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (selectedQuestion && selectedQuestion.Answer === selectedAnswer) {
      toast.success("Right Answer");
    } else {
      toast.error("Wrong Answer");
    }
    setSelectedAnswer(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col ">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <div className="">
              <p className="text-gray-700">Loading...</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/4 h-screen mb-4 lg:mb-0">
            <Box sx={{ width: 300, flexGrow: 1 }}>
              <TreeView
                aria-label="book navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
              >
                {books &&
                  Object.keys(books).map((bookId) => (
                    <TreeItem
                      key={bookId}
                      nodeId={bookId}
                      label={books[bookId].Title}
                      onClick={() => handleBookSelect(bookId)}
                    >
                      {selectedBook && renderChapterTree()}
                    </TreeItem>
                  ))}
              </TreeView>
            </Box>
          </div>
          <div className="lg:w-3/4 pl-0 lg:pl-4">
            {selectedQuestionDetails ? (
              <div className="bg-gray-100 rounded p-4">
                <h4 className="text-2xl font-semibold py-2">Selected Questions</h4>
                {selectedQuestionDetails.map((question, index) => (
                  <div key={index} className="mt-4">
                    <p className="text-lg">{question.Question}</p>
                    <ul className="mt-2">
                      {Object.entries(question.Options).map(([optionId, optionText]) => (
                        <li key={optionId} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            id={optionId}
                            checked={selectedAnswer === optionId}
                            onChange={() => handleChange(optionId)}
                          />
                          <span>{optionText}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleAnswerSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : selectedArticle && selectedArticle.Data ? (
              <div className="bg-gray-100 rounded p-4">
                <p className="text-lg">{selectedArticle.Data}</p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default EbookDetail;
