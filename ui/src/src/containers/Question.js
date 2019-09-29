import React from 'react';
import { Redirect } from 'react-router-dom';
import { allGuilts, createWarning } from '../api';
import { validateAcount, validateContentArray, validateGuiltNum } from '../validate';
import Footer from '../components/Footer';
import VictimForm from './VictimForm';
import EvidenceForm from './EvidenceForm';
import GuiltForm from './GuiltForm';
import GuiltDescription from '../components/GuiltDescription';

export default class Question extends React.Component {
  // VictimFormから作成されるstate
  // victimTwitterId
  // victimTwitterAccountName
  // assaulterTwitterId
  // assaulterTwitterAccountName
  constructor(props) {
    super(props);
    this.state = {
      stepNum: 1,
      redirect: false,
      contentArray: [{ content: '', evidence_url: '' }],
      guiltArray: [],
      victimTwitterId: '',
      victimTwitterAccountName: '',
      assaulterTwitterId: '',
      assaulterTwitterAccountName: '',
      victimValidateResult: { 0: '', 1: '', 2: '', 3: '' },
      evidenceValidateResult: {},
      guiltValidateResult: ''
    };
  }

  componentDidMount() {
    allGuilts().then(result => {
      this.guilts = result['guilts'];
    });
  }

  validate = stepNum => {
    switch (stepNum) {
      case 1:
        return this.validateVictim();
      case 2:
        return this.validateEvidence();
      case 3:
        return this.validateGuilt();
    }
  };

  validateVictim = () => {
    const victimValidateResult = { 0: '', 1: '', 2: '', 3: '' };
    const { victimTwitterId, victimTwitterAccountName, assaulterTwitterId, assaulterTwitterAccountName } = this.state;
    const result = validateAcount(victimTwitterId, victimTwitterAccountName, assaulterTwitterId, assaulterTwitterAccountName);
    if (0 === Object.keys(result).length) {
      this.setState({ victimValidateResult });
      return true;
    } else {
      for (let k of Object.keys(result)) {
        victimValidateResult[k] = result[k];
      }
      this.setState({ victimValidateResult });
      return false;
    }
  };

  validateEvidence = () => {
    const { contentArray } = this.state;
    const result = validateContentArray(contentArray);
    if (0 === Object.keys(result).length) {
      this.setState({ evidenceValidateResult: ''});
      return true;
    } else {
      this.setState({ evidenceValidateResult: result });
      return false;
    }
  };

  validateGuilt = () => {
    const guiltNum = this.state.guiltArray.length;
    const result = validateGuiltNum(guiltNum);
    this.setState({ guiltValidateResult: result });
    return result === '';
  };

  incrementStepNum = () => {
    let { stepNum } = this.state;
    if (this.validate(stepNum) === true) this.setState({ stepNum: stepNum + 1 });
  };

  decrementStepNum = () => {
    let { stepNum } = this.state;
    this.setState({ stepNum: stepNum - 1 });
  };

  redirectToResult = () => {
    const { stepNum } = this.state;
    if (this.validate(stepNum) === true) {
      this.props.history.push('/question');
      const { victimTwitterAccountName, victimTwitterId, assaulterTwitterAccountName, assaulterTwitterId, contentArray, guiltArray } = this.state;
      const body = {
        warning: {
          victim_name: victimTwitterAccountName,
          victim_account_id: victimTwitterId,
          assaulter_name: assaulterTwitterAccountName,
          assaulter_account_id: assaulterTwitterId
        },
        evidences: contentArray,
        guilt_ids: guiltArray
      };
      createWarning(body).then(res => {
        this.setState({ warningId: res['warning']['hash_id'], redirect: true });
      });
    }
  };

  onChange = (e, stateName) => {
    const text = e.target.value.trim();
    this.setState({ [stateName]: text });
  };

  onArticleChange = (e, index) => {
    let { contentArray } = this.state;
    const content = e.target.value.trim();
    contentArray[index].content = content;
    this.setState({ contentArray });
  };

  onUrlChange = (e, index) => {
    let { contentArray } = this.state;
    const url = e.target.value.trim();
    contentArray[index].evidence_url = url;
    this.setState({ contentArray, evidenceValidateResult: {}});
  };

  onAddClick = () => {
    let { contentArray } = this.state;
    contentArray.push({ content: '', evidence_url: '' });
    this.setState({ contentArray });
  };

  onDeleteClick = index => {
    let { contentArray } = this.state;
    contentArray.splice(index, 1);
    this.setState({ contentArray });
  };

  //TODO 実装未完成なので完成させて!!
  onUploadImage = () => {
    let { contentArray } = this.state;
    // contentArray.push({})
  };

  onClick = index => {
    let { guiltArray } = this.state;
    if (guiltArray === [] || !guiltArray.includes(index)) {
      guiltArray.push(index);
    } else {
      guiltArray = guiltArray.filter(number => number !== index);
    }
    this.setState({ guiltArray, guiltValidateResult: '' });
  };

  render() {
    const { classes } = this.props;
    const {
      stepNum,
      redirect,
      contentArray,
      guiltArray,
      assaulterTwitterAccountName,
      assaulterTwitterId,
      victimTwitterAccountName,
      victimTwitterId,
      victimValidateResult,
      evidenceValidateResult,
      guiltValidateResult
    } = this.state;
    return (
      <>
        {redirect === true && (
          <Redirect to={{ pathname: '/sheet', state: this.state, guilts: this.guilts.filter(guilt => guiltArray.includes(guilt.id)) }} />
        )}
        {stepNum === 1 ? (
          <>
            <VictimForm
              onChange={this.onChange}
              assaulterTwitterId={assaulterTwitterId}
              assaulterTwitterAccountName={assaulterTwitterAccountName}
              victimTwitterId={victimTwitterId}
              victimTwitterAccountName={victimTwitterAccountName}
              validateResult={victimValidateResult}
              stepNum={stepNum}
            />
            <Footer toNext={this.incrementStepNum} stepNum={stepNum} />
          </>
        ) : stepNum === 2 ? (
          <>
            <EvidenceForm
              onUrlChange={this.onUrlChange}
              onArticleChange={this.onArticleChange}
              onAddClick={this.onAddClick}
              onDeleteClick={this.onDeleteClick}
              onUploadImage={this.onUploadImage}
              contentArray={contentArray}
              validateResult={evidenceValidateResult}
              stepNum={stepNum}
            />
            <Footer toNext={this.incrementStepNum} toPrev={this.decrementStepNum} stepNum={stepNum} />
          </>
        ) : (
          <>
            <GuiltForm onClick={this.onClick} guiltArray={guiltArray} guilts={this.guilts} stepNum={stepNum} validateResult={guiltValidateResult} />
            <Footer toNext={this.redirectToResult} toPrev={this.decrementStepNum} stepNum={stepNum} />
            <GuiltDescription guilts={this.guilts} />
          </>
        )}
      </>
    );
  }
}
