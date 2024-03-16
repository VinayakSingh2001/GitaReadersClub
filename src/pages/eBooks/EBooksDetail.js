import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { get, getDatabase, ref, set } from "firebase/database";
import { app, auth } from "../../firebase.config";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { toast } from "react-toastify";
import { Fullscreen } from "@mui/icons-material";

function EbookDetail() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState(null);
  // const [selectedQuestionDetails, setSelectedQuestionDetails] = useState(null);
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
    // setSelectedQuestion(null);
    // setSelectedQuestionDetails(null);
    setOpenArticles({}); // Reset open articles when selecting a new book
  };

  const handleChapterSelect = (chapterId) => {
    const chapter = selectedBook.ChapterId[chapterId];
    setSelectedChapterId(chapterId);
    setSelectedChapter(chapter);
    setSelectedArticle(null);
    // setSelectedQuestion(null);
    // setSelectedQuestionDetails(null);
    setOpenArticles({}); // Reset open articles when selecting a new chapter
  };

  const handleArticleSelect = (chapterId, articleId) => {
    setOpenArticles((prevState) => ({
      ...prevState,
      [chapterId]: articleId,
    }));
    const article = selectedBook.ChapterId[chapterId].ArticleId[articleId];
    setSelectedArticleId(articleId)
    setSelectedArticle(article);
    // setSelectedQuestion(null);
    // setSelectedQuestionDetails(null);
  };

  // const handleQuestionSelect = (questionId) => {
  //   if (selectedArticle && selectedArticle.QuestionId) {
  //     const question = selectedArticle.QuestionId[questionId];
  //     setSelectedQuestion(question);
  //     // setSelectedQuestionDetails(question);
  //   }
  // };

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
          console.log(questions)
          setSelectedQuestions(questions)
        }} // Prevent default action for this node
      >
        {/* <select onChange={(e) => handleQuestionSelect(e.target.value)}>
          <option value="">Select a question</option>
          {Object.keys(questions).map((questionId) => (
            <option key={questionId} value={questionId}>
              {`Question ID: ${questionId}`}
            </option>
          ))}
        </select> */}
      </TreeItem>
    );
  };
  const handleChange = (optionId) => {
    console.log(optionId)
    if (selectedAnswer === optionId) {
      setSelectedAnswer(null);
    } else {
      setSelectedAnswer(optionId);
    }
  };

  const handleAnswerSubmit =  async(questionId,answerId) => {
    // e.preventDefault();
    console.log(answerId)
    console.log(selectedChapterId);
    if(selectedAnswer[0] === answerId){
      toast.success("Correct Answer");
      const db = getDatabase(app);
      const user = auth.currentUser;
      if(user){
        const userId = user.uid;
       const dbRef = ref(db,`progress/${userId}/${selectedChapterId}/${selectedArticleId}/${questionId}`);
       await set(dbRef,1);
      }
      
    }
    else{
      toast.error("Wrong Answer");
      const db = getDatabase(app);
      const user = auth.currentUser;
      if(user){
        const userId = user.uid;
       const dbRef = ref(db,`progress/${userId}/${selectedChapterId}/${selectedArticleId}/${questionId}`);
       await set(dbRef,0);
      }
    }
    // if (selectedQuestion.Answer === selectedAnswer) {
    //   toast.success("Right Answer");
    // } else {
    //   toast.error("wrong Answer");
    // }
    // setSelectedAnswer(null);
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
         {selectedQuestions && Object.keys(selectedQuestions).map((selectedQuestionId,index)=>{
          const selectedQuestionDetails = selectedQuestions[selectedQuestionId];
             return (<div
              style={{
                width: Fullscreen,
                backgroundColor: "#f9f9f9",
                padding: "16px",
              }}
            >
              <h4 className="text-2xl font-semibold py-2">Selected Question</h4>
              <p className="text-xl">{selectedQuestionDetails.Question}</p>

              <ul>
                {Object.entries(selectedQuestionDetails.Options).map(
                  ([optionId, optionText]) => (
                    <li key={optionId} className="pl-2 pt-2 text-xl">
                      <label htmlFor={optionId}>
                        <input
                          type="radio"
                          id={index+optionId}
                          checked={selectedAnswer === optionId+index}
                          onClick={() => handleChange(optionId+index)}
                        />
                        {optionText}
                      </label>
                    </li>
                  )
                )}
              </ul>

              <div className="flex pt-4 pb-4">
                <button
                  className="bg-blue-200 hover:scale-105 transition-transform  p-2 rounded-lg ml-6"
                  onClick={()=>handleAnswerSubmit(selectedQuestionId,selectedQuestionDetails.Answer)}
                >
                  submit
                </button>
              </div>
            </div>)
         })}
          {/* {selectedQuestionDetails ? (
            <div
              style={{
                width: Fullscreen,
                backgroundColor: "#f9f9f9",
                padding: "16px",
              }}
            >
              <h4 className="text-2xl font-semibold py-2">Selected Question</h4>
              <p className="text-xl">{selectedQuestionDetails.Question}</p>

              <ul>
                {Object.entries(selectedQuestionDetails.Options).map(
                  ([optionId, optionText]) => (
                    <li key={optionId} className="pl-2 pt-2 text-xl">
                      <label htmlFor={optionId}>
                        <input
                          type="radio"
                          id={optionId}
                          checked={selectedAnswer === optionId}
                          onClick={() => handleChange(optionId)}
                        />
                        {optionText}
                      </label>
                    </li>
                  )
                )}
              </ul>

              <div className="flex pt-4 pb-4">
                <button
                  className="bg-blue-200 hover:scale-105 transition-transform  p-2 rounded-lg ml-6"
                  onClick={handleAnswerSubmit}
                >
                  submit
                </button>
              </div>
            </div>
          ) : selectedArticle && selectedArticle.Data ? (
            <div className=" bg-slate-100">
              {/* <h4>Article Data</h4> */}
              {/* <p className="px-10 py-5 text-xl">{selectedArticle.Data}</p>
            </div>
          ) : null} */}
        </div>
      </div>
    </div>
  );
}

export default EbookDetail;
