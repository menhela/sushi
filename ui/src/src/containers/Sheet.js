import React from 'react';
import html2canvas from 'html2canvas';
import jsPdf from 'jspdf';
import { Redirect } from 'react-router-dom';

import { withStyles, withWidth } from '@material-ui/core';

const containUndefinedData = (state, guilts) => {
  return state === undefined || state.contentArray === undefined || guilts === undefined;
};

const savePdf = () => {
  const element = document.getElementById('sheet');
  html2canvas(element, { allowTaint: true }).then(canvas => {
    const pdf = new jsPdf('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    pdf.addImage(canvas, 'JPEG', 0, 0, width, height);
    pdf.save('通告書.pdf');
  });
};

const savePng = () => {
  const element = document.getElementById('sheet');
  html2canvas(element, { allowTaint: true, scale: 0.75 }).then(canvas => {
    const dataUrl = canvas.toDataURL();
    const element = document.createElement('a');

    const encdata = atob(dataUrl.replace(/^.*,/, ''));
    const outdata = new Uint8Array(encdata.length);
    for (let i = 0; i < encdata.length; i++) {
      outdata[i] = encdata.charCodeAt(i);
    }
    const blob = new Blob([outdata], ['image/png']);

    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveOrOpenBlob(blob, '通告書.png'); // NOTE: For IE
    } else {
      element.href = dataUrl;
      element.download = '通告書.png';
      element.click();
    }
  });
};

const execCopy = string => {
  var tmp = document.createElement('div');
  var pre = document.createElement('pre');
  pre.style.webkitUserSelect = 'auto';
  pre.style.userSelect = 'auto';
  tmp.appendChild(pre).textContent = string;
  var s = tmp.style;
  s.position = 'fixed';
  s.right = '200%';
  document.body.appendChild(tmp);
  document.getSelection().selectAllChildren(tmp);
  var result = document.execCommand('copy');
  document.body.removeChild(tmp);
  return result;
};

const copyUrl = () => {
  var input = document.getElementById('input');
  if (execCopy(input.value)) {
    alert('コピーできました');
  }
};

@withWidth()
@withStyles(theme => ({
  container: {
    background: '#616161',
    padding: 20,
    overflow: 'scroll'
  },
  sheet: {
    background: 'white',
    margin: '5mm auto',
    marginTop: 80,
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
    pageBreakAfter: 'always',
    /* 用紙サイズ A4 */
    height: '297mm',
    width: '210mm',
    /* 余白サイズ */
    paddingTop: '32mm',
    paddingLeft: '27mm',
    paddingRight: '27mm',
    fontFamily: "'Noto Serif JP', serif",
    fontSize: 15
  },
  buttons: {
    right: 30,
    zIndex: 10,
    position: 'absolute'
  },
  download: {
    background: '#46709a',
    border: 'none',
    padding: '15px 15px',
    color: '#fff',
    fontSize: 20,
    borderRadius: 5,
    cursor: 'pointer',
    width: '100%',
    marginTop: 30
  },
  linkContainer: {
    fontSize: 15,
    position: 'absolute',
    zIndex: 10,
    [theme.breakpoints.up('sm')]: {
      right: 100
    },
    [theme.breakpoints.down('xs')]: {
      right: 10
    }
  },
  linkContent: {
    display: 'flex',
    marginBottom: 20
  },
  label: {
    color: 'fff'
  },
  copy: {
    display: 'flex'
  },
  copyLink: {
    height: 40,
    marginRight: 10,
    borderRadius: 5,
    border: 'none',
    border: 'solid 1px #ccc'
  },
  link: {
    width: '100%',
    textDecoration: 'none'
  },
  copyButton: {
    width: 100,
    background: '#90cdc3',
    borderRadius: 5,
    color: '#fff',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    background: '#90cdc3',
    border: 'none'
  },
  date: {
    textAlign: 'right'
  },
  assaulter: {
    width: 230,
    wordBreak: 'break-all'
  },
  victim: {
    textAlign: 'right',
    paddingLeft: 400,
    wordBreak: 'break-all'
  },
  title: {
    textAlign: 'center',
    marginBottom: 40
  },
  summary: {
    marginBottom: 30
  },
  subtitle: {
    fontWeight: 'bold'
  },
  article: {
    borderTop: '2px solid #000',
    fontSize: 14
  },
  dotted: {
    borderTop: 'dashed 1px #000'
  },
  border: {
    borderTop: 'solid 2px #000',
    height: 2
  },
  list: {
    marginTop: 35,
    marginBottom: 35
  },
  end: {
    marginBottom: 50
  }
}))
export default class Sheet extends React.Component {
  render() {
    const { classes, location } = this.props;
    const state = location.state;
    const guilts = location.guilts;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const currentTime = year + '年' + month + '月' + day + '日';
    const url = document.location.origin;
    return (
      <>
        {containUndefinedData(state, guilts) ? (
          <Redirect to={'/'} />
        ) : (
          <div className={classes.container}>
            <div className={classes.linkContainer}>
              {state.warningId !== undefined &&
                <>
                  <p className={classes.label}>共有可能なリンク</p>
                  <div className={classes.copy}>
                    <input id="input" className={classes.copyLink} value={`${url}/warning/${state.warningId}`} onChange={() => {}} />
                    <button onClick={copyUrl} className={classes.copyButton}>
                      コピー
                    </button>
                  </div>
                </>
              }
              <button onClick={savePdf} className={classes.download}>
                PDFで保存する
              </button>
              <button onClick={savePng} className={classes.download}>
                PNGで保存する
              </button>
            </div>
            <section className={classes.sheet} id="sheet">
              <p className={classes.date}>{currentTime}</p>
              <p className={classes.assaulter}>
                {state.assaulterTwitterAccountName}@{state.assaulterTwitterId}
              </p>
              <p className={classes.victim}>
                {state.victimTwitterAccountName}@{state.victimTwitterId}
              </p>
              <h1 className={classes.title}>通告書</h1>
              <div className={classes.summary}>
                <p className={classes.subtitle}>貴殿のSNSにおける投稿について</p>
                <p>　貴殿は以下の投稿において、私に不利益を与えているため、直ちに当該投稿の削除を求める。</p>
              </div>
              <p>▼該当の投稿</p>
              <div className={classes.article}>
                {state.contentArray.map((d, index) => {
                  return (
                    <div key={index} className={index != 0 ? classes.dotted : ''}>
                      <p>{d.content}</p>
                      <p>
                        <a className={classes.link} href={d.evidence_url} target="_blank">
                          {d.evidence_url}
                        </a>
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className={classes.border}></div>
              <ol className={classes.list}>
                {guilts.map((d, index) => {
                  return (
                    <li key={index}>
                      これらの投稿は、{d.code}　{d.name}に抵触している可能性がある。
                    </li>
                  );
                })}
              </ol>
              <p className={classes.end}>もし警告に応じない場合、本件についての告訴も含めた法的措置も辞さない。</p>
              <p>以上</p>
            </section>
          </div>
        )}
      </>
    );
  }
}
