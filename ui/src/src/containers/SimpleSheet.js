import React from 'react';
import {getWarning} from '../api';

import {withStyles, withWidth} from '@material-ui/core';


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
        overflow: 'scroll',
        height: '100%',
    },
    buttons: {
        right: 30,
        zIndex: 10,
        position: 'absolute'
    },
    download: {
        background: '#46709a',
        border: 'none',
        padding: 10,
        color: '#fff',
        borderRadius: 5,
        cursor: 'pointer',
        marginTop: 30,
        '&:hover': {
            background: '#003366',
            opacity: 1,
        },
        [theme.breakpoints.up('sm')]: {
            width: '100%',
            fontSize: 16,
        },
        [theme.breakpoints.down('xs')]: {
            width: '45%',
            marginRight: 2,
            fontSize: 12,
        }
    },
    linkContainer: {
        zIndex: 10000,
        fontSize: 15,
        position: 'absolute',
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
    copyButton: {
        width: 100,
        background: '#90cdc3',
        borderRadius: 5,
        color: '#fff',
        border: 'none',
        fontWeight: 'bold',
        cursor: 'pointer',
        background: '#90cdc3',
        border: 'none',
        '&:hover': {
            opacity: 1,
            background: '#4689FF',
        }
    },
}))
export default class SimpleSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isReady: false};
    }

    componentDidMount() {
        getWarning(this.props.match.params.hashId).then(result => {
            const guiltArray = result.guilts.map(value => {
                return value.id
            });
            this.guilts = result.guilts;
            this.setState({
                contentArray: result.evidences,
                guiltArray,
                victimTwitterId: result.warning.victim_account_id,
                victimTwitterAccountName: result.warning.victim_name,
                assaulterTwitterId: result.warning.assaulter_account_id,
                assaulterTwitterAccountName: result.warning.assaulter_name,
                isReady: true
            });
        });
    }

    render() {
        const {classes, location, width} = this.props;
        const state = this.state;
        const guilts = this.guilts;
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const currentTime = year + '年' + month + '月' + day + '日';
        const url = document.location.origin;
        return (
            <>
                <div className={classes.container}>
                    <div>
                        <Result state={state} guilts={guilts}/>
                    </div>
                </div>
            </>
        );
    }
}

const Result = withStyles((theme) => ({
    sheet: {
        background: 'white',
        margin: '5mm auto',
        marginTop: 80,
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        pageBreakAfter: 'always',
        zIndex: 10,
        fontFamily: "'Noto Serif JP', serif",
        [theme.breakpoints.up('sm')]: {
            /* 用紙サイズ A4 */
            height: '297mm',
            width: '210mm',
            /* 余白サイズ */
            paddingTop: '32mm',
            paddingLeft: '27mm',
            paddingRight: '27mm',
            fontSize: 15,
        },
        [theme.breakpoints.down('xs')]: {
            // height: '127mm',
            width: '90mm',
            paddingLeft: '9mm',
            paddingRight: '9mm',
            fontSize: 11,
        }
    },
    date: {
        textAlign: 'right'
    },
    assaulter: {
        [theme.breakpoints.up('sm')]: {
            width: 230,
        },
        [theme.breakpoints.down('xs')]: {
            width: 80,
        },
        wordBreak: 'break-all'
    },
    victim: {
        textAlign: 'right',
        [theme.breakpoints.up('sm')]: {
            paddingLeft: 400,
        },
        wordBreak: 'break-all'
    },
    title: {
        [theme.breakpoints.up('sm')]: {
            marginBottom: 40
        },
        // [theme.breakpoints.down('xs')]: {
        //   fontSize: 11
        // },
        textAlign: 'center',
    },
    summary: {
        [theme.breakpoints.up('sm')]: {
            marginBottom: 30
        },
    },
    subtitle: {
        fontWeight: 'bold'
    },
    article: {
        borderTop: '2px solid #000',
        [theme.breakpoints.up('sm')]: {
            fontSize: 14
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 12
        },
    },
    dotted: {
        borderTop: 'dashed 1px #000'
    },
    border: {
        borderTop: 'solid 2px #000',
        height: 2
    },
    list: {
        [theme.breakpoints.up('sm')]: {
            marginTop: 35,
            marginBottom: 35
        },
    },
    end: {
        [theme.breakpoints.up('sm')]: {
            marginBottom: 50
        },
    },
    link: {
        width: '100%',
        textDecoration: 'none'
    },
}))((props) => {
    const {classes, state, guilts} = props
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const currentTime = year + '年' + month + '月' + day + '日';
    return (
        <section className={classes.sheet} id="sheet">
            {(state.isReady) ?
                <div>
                    <p className={classes.date}>{currentTime}</p>
                    <p className={classes.assaulter}>
                        {state.assaulterTwitterAccountName}: @{state.assaulterTwitterId}
                    </p>
                    <p className={classes.victim}>
                        {state.victimTwitterAccountName}: @{state.victimTwitterId}
                    </p>
                    <h1 className={classes.title}>通告書</h1>
                    <div className={classes.summary}>
                        <p className={classes.subtitle}>貴殿のSNSにおける投稿について</p>
                        <p> 貴殿は以下の投稿において、私に不利益を与えているため、直ちに当該投稿の削除を求める。</p>
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
                                    これらの投稿は、{d.code} {d.name}に抵触している可能性がある。
                                </li>
                            );
                        })}
                    </ol>
                    <p className={classes.end}>もし警告に応じない場合、本件についての告訴も含めた法的措置も辞さない。</p>
                    <p>以上</p>
                </div>
                :
                <div></div>
            }
        </section>
    )
})
