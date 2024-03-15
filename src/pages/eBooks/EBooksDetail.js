import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { get, getDatabase, ref } from 'firebase/database';
import { app } from '../../firebase.config';

function Temp() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState(null);
  const [selectedQuestionDetails, setSelectedQuestionDetails] = useState(null);
  const [openArticles, setOpenArticles] = useState({});

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
    setSelectedQuestions(null);
    setSelectedQuestionDetails(null);
    setOpenArticles({}); // Reset open articles when selecting a new book
  };

  const handleChapterSelect = (chapterId) => {
    const chapter = selectedBook.ChapterId[chapterId];
    setSelectedChapter(chapter);
    setSelectedArticle(null);
    setSelectedQuestions(null);
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
    setSelectedQuestions(null);
    setSelectedQuestionDetails(null);
  };

  const handleQuestionSelect = (questionId) => {
    if (selectedArticle && selectedArticle.QuestionId) {
      const question = selectedArticle.QuestionId[questionId];
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
          {articles[articleId].QuestionId && renderQuestionTree(chapterId,articleId,articles[articleId].QuestionId)}
        </TreeItem>
    ));
  };

  const renderQuestionTree = (chapterId, articleId,questions) => {
    if (!questions) return null;
    console.log(questions)
    return Object.keys(questions).map(questionId => (
      <TreeItem
        key={questionId}
        nodeId={chapterId+articleId+questionId}
        label={`Question ID: ${questionId}`}
        onClick={() => {
          handleQuestionSelect(questionId)
        }}
      />
     
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-4">
        <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
          <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300 }}>
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
          
          {selectedArticle && (
            <div style={{ backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '8px' }}>
              <h4>Selected Article</h4>
              <p>{selectedArticle.Data}</p>
            </div>
          )}
          {selectedQuestionDetails && (
            <div style={{ marginTop: '16px', backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '8px' }}>
              <h4>Selected Question</h4>
              <p>{selectedQuestionDetails.Question}</p>
              <ul>
                {Object.entries(selectedQuestionDetails.Options).map(([optionId, optionText]) => (
                  <li key={optionId}>
                    <span style={{ fontWeight: 'bold' }}>{optionId}: </span>
                    {optionText}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Temp;