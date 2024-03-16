import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { get, getDatabase, ref, set } from "firebase/database";
import { app, auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { Button, Checkbox ,FormControlLabel} from "@mui/material";

function EbookDetail() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [openArticles, setOpenArticles] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);

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
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  const handleBookSelect = (bookId) => {
    const book = books[bookId];
    setSelectedBook(book);
    setSelectedChapter(null);
    setSelectedArticle(null);
    setOpenArticles({}); // Reset open articles when selecting a new book
  };

  const handleChapterSelect = (chapterId) => {
    const chapter = selectedBook.ChapterId[chapterId];
    setSelectedChapterId(chapterId);
    setSelectedChapter(chapter);
    setSelectedArticle(null);
    setSelectedQuestions(null);
    setOpenArticles({}); // Reset open articles when selecting a new chapter
  };

  const handleArticleSelect = (chapterId, articleId) => {
    setOpenArticles((prevState) => ({
      ...prevState,
      [chapterId]: articleId,
    }));
    const article = selectedBook.ChapterId[chapterId].ArticleId[articleId];
    setSelectedArticleId(articleId);
    setSelectedArticle(article);
    setSelectedQuestions(null);
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
            label={
              <div className="tree-node">
                <span className="node-icon">📚</span>
                <span className="node-label">Chapter: {chapterId}</span>
              </div>
            }
            onClick={() => handleChapterSelect(chapterId)}
            selected={selectedChapterId === chapterId}
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

  const renderArticleTree = (chapterId, articles) => {
    if (!articles) return null;
    return Object.keys(articles).map((articleId) => (
      <TreeItem
        key={articleId}
        nodeId={chapterId + articleId}
        label={
          <div className="tree-node">
            <span className="node-icon">📄</span>
            <span className="node-label">Article: {articleId}</span>
          </div>
        }
        onClick={() => handleArticleSelect(chapterId, articleId)}
        onLabelClick={(e) => {
          e.preventDefault();
          handleArticleSelect(chapterId, articleId);
        }}
        selected={openArticles[chapterId] === articleId}
      >
        {selectedArticle &&
          selectedArticle.QuestionId &&
          renderQuestionDropdown(
            chapterId,
            articleId,
            selectedArticle.QuestionId
          )}
      </TreeItem>
    ));
  };

  const renderQuestionDropdown = (chapterId, articleId, questions) => {
    return (
      <TreeItem
        nodeId={`${chapterId}${articleId}-questions`}
        label="Questions"
        onClick={(e) => {
          e.preventDefault();
          setSelectedQuestions(questions);
        }}
      ></TreeItem>
    );
  };

  const handleChange = (optionId) => {
    console.log(optionId);
    if (selectedAnswer === optionId) {
      setSelectedAnswer(null);
    } else {
      setSelectedAnswer(optionId);
    }
  };

  const handleAnswerSubmit = async (questionId, answerId) => {
    if(!selectedAnswer){
      toast.error('Select Answer');
      return;
    }
    console.log(answerId);
    console.log(selectedChapterId);
    if (selectedAnswer && selectedAnswer[0] === answerId) {
      toast.success("Correct Answer");
      const db = getDatabase(app);
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const dbRef = ref(
          db,
          `progress/${userId}/${selectedChapterId}/${selectedArticleId}/${questionId}`
        );
        await set(dbRef, 1);
      }
    } else {
      toast.error("Wrong Answer");
      const db = getDatabase(app);
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const dbRef = ref(
          db,
          `progress/${userId}/${selectedChapterId}/${selectedArticleId}/${questionId}`
        );
        await set(dbRef, 0);
      }
    }
    setSelectedAnswer(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
                    label={
                      <div className="tree-node">
                        <span className="node-icon">📖</span>
                        <span className="node-label">{books[bookId].Title}</span>
                      </div>
                    }
                    onClick={() => handleBookSelect(bookId)}
                    selected={selectedBook && selectedBook.id === bookId}
                  >
                    {selectedBook && renderChapterTree()}
                  </TreeItem>
                ))}
            </TreeView>
          </Box>
        </div>
        <div className="lg:w-3/4 pl-0 lg:pl-4">
          {selectedArticle && selectedArticle.Data && !selectedQuestions && (
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-4">
              <p className="text-lg">{selectedArticle.Data}</p>
            </div>
          )}
          {selectedQuestions &&
            Object.keys(selectedQuestions).map((selectedQuestionId, index) => {
              const selectedQuestionDetails =
                selectedQuestions[selectedQuestionId];
              return (
                <div
                  key={index}
                  className="bg-gray-100 p-6 rounded-lg shadow-md mb-4"
                >
                  <p className="text-lg">{selectedQuestionDetails.Question}</p>
                  <ul className="list-disc pl-6">
                    {Object.entries(selectedQuestionDetails.Options).map(
                      ([optionId, optionText]) => (
                        <ol key={optionId} className="mb-2">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedAnswer === optionId +selectedArticleId+ selectedChapterId+index}
                                onChange={() => handleChange(optionId +selectedArticleId+selectedChapterId+index )}
                              />
                            }
                            label={optionText}
                          />
                        </ol>
                      )
                    )}
                  </ul>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleAnswerSubmit(
                        selectedQuestionId,
                        selectedQuestionDetails.Answer
                      )
                    }
                  >
                    Submit
                  </Button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default EbookDetail;
