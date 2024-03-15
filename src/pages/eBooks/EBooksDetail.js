import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { get, getDatabase, ref,set } from 'firebase/database';
import { app } from '../../firebase.config';
import { FormControlLabel,Radio,RadioGroup } from '@mui/material';
import { toast } from 'react-toastify';
// import {  } from '@headlessui/react';


function EbookDetail() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedQuestionDetails, setSelectedQuestionDetails] = useState(null);
  const [openArticles, setOpenArticles] = useState({});
  const [selectedAnswer,setSelectedAnswer] = useState(null);
  useEffect(() => {
    const fetchBooks = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, 'Ebook');
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
    setOpenArticles(prevState => ({
      ...prevState,
      [chapterId]: articleId,
    }));
    const article = selectedBook.ChapterId[chapterId].ArticleId[articleId];
    setSelectedArticle(article);
    setSelectedQuestion(null);
    setSelectedQuestionDetails(null);
  };

  const handleQuestionSelect = (questionId) => {
    if (selectedArticle && selectedArticle.QuestionId) {
      const question = selectedArticle.QuestionId[questionId];
      setSelectedQuestion(question);
      setSelectedQuestionDetails(question);
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
        {Object.keys(selectedBook.ChapterId).map(chapterId => (
          <TreeItem
            key={chapterId}
            nodeId={chapterId}
            label={`Chapter: ${chapterId}`}
            onClick={() => handleChapterSelect(chapterId)}
          >
            {selectedBook.ChapterId[chapterId].ArticleId && renderArticleTree(chapterId, selectedBook.ChapterId[chapterId].ArticleId)}
          </TreeItem>
        ))}
      </TreeView>
    );
  };

  const renderArticleTree = (chapterId, articles) => {
    if (!articles) return null;
    return Object.keys(articles).map(articleId => (
      <TreeItem
        key={articleId}
        nodeId={chapterId+articleId}
        label={`Article: ${articleId}`}
        onClick={() => handleArticleSelect(chapterId, articleId)}
        onLabelClick={(e) => {
          e.preventDefault(); // Prevents the default action of expanding/collapsing the node
          handleArticleSelect(chapterId, articleId);
        }}
        // Set the onLabelClick prop to prevent the default action of expanding/collapsing the node
        selected={openArticles[chapterId] === articleId} // Set the selected prop to control the expanded state of the node
      >
        {selectedArticle && selectedArticle.QuestionId && renderQuestionDropdown(chapterId, articleId, selectedArticle.QuestionId)}
      </TreeItem>
    ));
  };

  const renderQuestionDropdown = (chapterId, articleId, questions) => {
    return (
      <TreeItem
        nodeId={`${chapterId}${articleId}-questions`}
        label="Questions"
        onClick={(e) => e.preventDefault()} // Prevent default action for this node
      >
        <select onChange={(e) => handleQuestionSelect(e.target.value)}>
          <option value="">Select a question</option>
          {Object.keys(questions).map(questionId => (
            <option key={questionId} value={questionId}>
              {`Question ID: ${questionId}`}
            </option>
          ))}
        </select>
      </TreeItem>
    );
  };
  const handleChange = (optionId) => {
    
    if(selectedAnswer === optionId){
      setSelectedAnswer(null);
    }
    else{
      setSelectedAnswer(optionId)
    }
  };
  
const handleAnswerSubmit = async(e)=>{
  e.preventDefault();
  if(selectedQuestion.Answer === selectedAnswer){
    toast.success("Right Answer")
  }
  else{
    toast.error("wrong Answer")
  }
  setSelectedAnswer(null);
}
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-4">
        <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', maxWidth: '300px' }}>
          <Box sx={{ minHeight: 180, flexGrow: 1 }}>
            <TreeView
              aria-label="book navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              {books && Object.keys(books).map(bookId => (
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
        <div style={{ padding: '16px' }}>
          {selectedQuestionDetails ? (
            <div style={{ marginTop: '16px', backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '8px' }}>
              <h4>Selected Question</h4>
              <p>{selectedQuestionDetails.Question}</p>
              
              <ul >
                {Object.entries(selectedQuestionDetails.Options).map(([optionId, optionText]) => (
                  <li key={optionId} className="pl-2 pt-2">
                  <label htmlFor={optionId}>
                    <input
                      type="radio"
                      id={optionId}
                      checked={selectedAnswer === optionId}
                      onClick={()=>handleChange(optionId)}
                    />
                    {optionText}
                  </label>
                </li>
                ))}
              </ul>
             
              <div className='flex  pt-4 pb-4'>
              <button className='bg-blue-500  p-2 rounded-lg ml-6' onClick={handleAnswerSubmit}>submit</button>
              </div>
            </div>
          ) : selectedArticle && selectedArticle.Data ? (
            <div style={{ marginTop: '16px', backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '8px' }}>
              {/* <h4>Article Data</h4> */}
              <p>{selectedArticle.Data}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default EbookDetail;