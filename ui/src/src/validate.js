export const validateAcount = (victimTwitterId, victimTwitterAccountName, assaulterTwitterId, assaulterTwitterAccountName) => {
  const validateResult = [
    validateTwtterName(victimTwitterAccountName),
    validateTwtterId(victimTwitterId),
    validateTwtterName(assaulterTwitterAccountName),
    validateTwtterId(assaulterTwitterId)
  ];
  const result = {};
  for (let i = 0; i < validateResult.length; i++) {
    if (validateResult[i] !== '') result[i] = validateResult[i];
  }
  return result;
};

const validateTwtterId = id => {
  const result = 0 < id.length && id.length <= 15 ? '' : 'idは1文字以上15文字以内で入力してください';
  return result;
};

const validateTwtterName = name => {
  const result = 0 < name.length && name.length <= 50 ? '' : 'アカウント名は1文字以上50文字以内で入力してください';
  return result;
};

export const validateContentArray = contentArray => {
  const result = {};
  for (let i = 0; i < contentArray.length; i++) {
    let contentValiidateResult = validateContent(contentArray[i].content);
    let urlValidateResult = validateUrl(contentArray[i].evidence_url);

    if (contentValiidateResult !== '') {
      result[i] = {};
      result[i].content = contentValiidateResult;
    }
    if (urlValidateResult !== '') {
      if (result[i] === undefined) result[i] = {};
      result[i].url = urlValidateResult;
    }
  }
  return result;
};

const validateContent = content => {
  const result = 0 < content.length && content.length <= 500 ? '' : '投稿内容は1文字以上500文字以内で入力してください';
  return result;
};

const validateUrl = url => {
  if (url.length === 0) return '';
  let result = url.length <= 2083 ? '' : 'URLは0文字以上2083文字以内で入力してください';
  result = url.match(/^(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/) ? '' : '正しいURLを入力してください';
  return result;
};

export const validateGuiltNum = guiltNum => {
  if (guiltNum >= 1) return '';
  return '該当する罪は1つ以上選択してください';
};
