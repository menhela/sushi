import React from 'react';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import StatusBar from '../components/StatusBar';

const EvidenceForm = withStyles(theme => ({
  container: {
    padding: '25px 20px',
    background: '#fff',
    margin: '0 auto',
    marginTop: 100,
    marginBottom: 40,
    border: 'solid 1px #ccc',
    [theme.breakpoints.up('sm')]: {
      width: 600
    },
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 42px)'
    }
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    width: 'calc(100% + 41px)',
    marginLeft: -21,
    paddingBottom: 30,
    borderBottom: 'solid 1px #eee'
  }
}))(props => {
  //TODO onUploadImageの実装
  const { classes, stepNum, onUrlChange, onArticleChange, onAddClick, onDeleteClick, onUploadImage, contentArray, validateResult } = props;
  return (
    <>
      <StatusBar stepNum={stepNum} />
      <div className={classes.container}>
        <h1 className={classes.title}>証拠を入力してください</h1>
        {contentArray.map((content, index) => (
          <Content
            key={index}
            index={index}
            article={contentArray[index]}
            onUrlChange={onUrlChange}
            onArticleChange={onArticleChange}
            onDeleteClick={onDeleteClick}
            validateResult={validateResult[index] !== undefined ? validateResult[index] : {}}
          />
        ))}
      </div>
      <AddButton onClick={onAddClick} contentNum={contentArray.length} />
    </>
  );
});

const Content = withStyles(theme => ({
  container: {},
  right: {
    textAlign: 'right'
  },
  delete: {
    fontSize: 20,
    border: 'none',
    cursor: 'pointer',
    color: 'red',
    background: 'transparent'
  },
  label: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  article: {
    display: 'block'
  },
  reset: {
    display: 'block'
  },
  border: {
    borderTop: 'solid 1px #ccc',
    margin: '30px 0px',
    width: 'calc(100% + 40px)',
    marginLeft: '-20px'
  },
  question: {
    marginBottom: 10
  }
}))(props => {
  const { classes, article, index, onArticleChange, onUrlChange, onDeleteClick, validateResult } = props;
  return (
    <div className={classes.container}>
      {index !== 0 ? <p className={classes.border}></p> : ''}
      <div className={classes.question}>
        <div className={classes.label}>
          <label>投稿内容</label>
          {index !== 0 ? (
            <div className={classes.right}>
              <button className={classes.delete} onClick={() => onDeleteClick(index)}>
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
        <TextField
          error={validateResult.content !== undefined}
          helperText={validateResult.content !== undefined ? validateResult.content : ''}
          rows="4"
          defaultValue={article.content}
          className={classes.textField + ' ' + classes.reset}
          margin="normal"
          variant="outlined"
          onChange={e => onArticleChange(e, index)}
          fullWidth
          autoFocus
          multiline
          placeholder="投稿内容をそのまま貼り付けてください"
        />
      </div>
      <div className={classes.question}>
        <label>URL</label>
        <TextField
          error={validateResult.url !== undefined}
          helperText={validateResult.url !== undefined ? validateResult.url : ''}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          fullWidth
          onChange={e => onUrlChange(e, index)}
          defaultValue={article.evidence_url}
          placeholder="投稿のURLを貼り付けてください"
        />
      </div>
    </div>
  );
});

const AddButton = withStyles(theme => ({
  container: {
    color: 'white',
    borderRadius: 10,
    width: 640,
    margin: '0 auto',
    marginBottom: 40,
    fontSize: 30,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: 600
    },
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 40px)'
    }
  },
  content: {
    background: '#46709a',
    width: 50,
    height: 50,
    borderRadius: '50%',
    margin: '0 auto',
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    border: 'none',
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 5,
  }
}))(props => {
  const { classes, onClick, contentNum } = props;
  return (
    <div className={classes.container}>
      <button className={classes.content} disabled={contentNum >= 3} onClick={onClick}>
        +
      </button>
    </div>
  );
});

export default EvidenceForm;
