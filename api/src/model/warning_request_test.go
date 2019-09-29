package model

import (
	"encoding/json"
	"errors"
	"fmt"
	"testing"
)

var normalPost string = `{
  "warning": {
    "victim_name": "被害者名",
    "victim_account_id": "@higyaisyaID",
    "assaulter_name": "加害者名",
    "assaulter_account_id": "@kagaisyaID"
  },
  "evidences": [
    {
      "content": "「◯◯転がす」",
      "evidence_url": "https://twitter.com"
    },
    {
      "content": "「◯◯はひどい」",
      "evidence_url": "https://youtube.com"
    }
  ],
  "guilt_ids": [1, 2]
}`

var warnFailurePost string = `{
  "warning": {
    "victim_name": "",
    "victim_account_id": "@higyaisyaID",
    "assaulter_name": "加害者名",
    "assaulter_account_id": "@kagaisyaID"
  },
  "evidences": [
    {
      "content": "「◯◯転がす」",
      "evidence_url": "https://twitter.com"
    },
    {
      "content": "「◯◯はひどい」",
      "evidence_url": "https://youtube.com"
    }
  ],
  "guilt_ids": [1, 2]
}`

var evidenceFailurePost string = `{
  "warning": {
    "victim_name": "被害者名",
    "victim_account_id": "@higyaisyaID",
    "assaulter_name": "加害者名",
    "assaulter_account_id": "@kagaisyaID"
  },
  "evidences": [
    {
      "content": "",
      "evidence_url": "https://twitter.com"
    },
    {
      "content": "",
      "evidence_url": "https://youtube.com"
    }
  ],
  "guilt_ids": [1, 2]
}`

var evidenceEmptyFailurePost string = `{
  "warning": {
    "victim_name": "被害者名",
    "victim_account_id": "@higyaisyaID",
    "assaulter_name": "加害者名",
    "assaulter_account_id": "@kagaisyaID"
  },
  "evidences": [
  ],
  "guilt_ids": [1, 2]
}`

var evidenceInvalidUrlFailurePost string = `{
  "warning": {
    "victim_name": "被害者名",
    "victim_account_id": "@higyaisyaID",
    "assaulter_name": "加害者名",
    "assaulter_account_id": "@kagaisyaID"
  },
  "evidences": [
    {
      "content": "「◯◯転がす」",
      "evidence_url": "twitter.com"
    }
  ],
  "guilt_ids": [1, 2]
}`

var evidenceEmptyUrlSuccessPost string = `{
  "warning": {
    "victim_name": "被害者名",
    "victim_account_id": "@higyaisyaID",
    "assaulter_name": "加害者名",
    "assaulter_account_id": "@kagaisyaID"
  },
  "evidences": [
    {
      "content": "「◯◯転がす」",
      "evidence_url": ""
    },
    {
      "content": "「◯◯はひどい」",
      "evidence_url": "https://youtube.com"
    }
  ],
  "guilt_ids": [1, 2]
}`

var evidenceEmptyContentFailurePost string = `{
  "warning": {
    "victim_name": "被害者名",
    "victim_account_id": "@higyaisyaID",
    "assaulter_name": "加害者名",
    "assaulter_account_id": "@kagaisyaID"
  },
  "evidences": [
    {
      "content": "",
      "evidence_url": "https://youtube.com"
    },
    {
      "content": "「◯◯はひどい」",
      "evidence_url": "https://youtube.com"
    }
  ],
  "guilt_ids": [1, 2]
}`

var guiltEmptyFailurePost string = `{
  "warning": {
    "victim_name": "被害者名",
    "victim_account_id": "@higyaisyaID",
    "assaulter_name": "加害者名",
    "assaulter_account_id": "@kagaisyaID"
  },
  "evidences": [
    {
      "content": "「◯◯転がす」",
      "evidence_url": "https://twitter.com"
    },
    {
      "content": "「◯◯はひどい」",
      "evidence_url": "https://youtube.com"
    }
  ],
  "guilt_ids": []
}`

func initialize(jsonString string) *WarningRequest {
	jsonBytes := ([]byte)(jsonString)
	data := new(WarningRequest)
	if err := json.Unmarshal(jsonBytes, data); err != nil {
		fmt.Println("JSON Unmarshal error:", err)
		return nil
	}
	return data
}

var validate_funcTest = []struct {
	test_name string
	actual    *WarningRequest
	expected  error
}{
	{"normal", initialize(normalPost), nil},
	{"warn_failure", initialize(warnFailurePost), errors.New("input warning error")},
	{"evidence_failure", initialize(evidenceFailurePost), errors.New("input evidence error")},
	{"evidence_empty_failure", initialize(evidenceEmptyFailurePost), errors.New("no evidence error")},
	{"evidence_invalid_url_failure", initialize(evidenceInvalidUrlFailurePost), errors.New("invalid evidence url error")},
	{"evidence_empty_content_failure", initialize(evidenceEmptyContentFailurePost), errors.New("input evidence error")},
	{"evidence_empty_url_success", initialize(evidenceEmptyUrlSuccessPost), nil},
	{"guilt_empty_failure", initialize(guiltEmptyFailurePost), errors.New("no guilt error")},
}

func TestValidate(test *testing.T) {

	for _, validate_test := range validate_funcTest {
		test.Run(validate_test.test_name, func(test *testing.T) {
			s := validate_test.actual.Validate()
			if validate_test.actual.Validate() != validate_test.expected {
				if validate_test.actual.Validate().Error() != validate_test.expected.Error() {
					test.Errorf("got %q, want %q", s, validate_test.expected)
				}
			}
		})
	}
}
