package model

import (
	"errors"
	"github.com/go-playground/validator"
	"regexp"
)

type WarningRequest struct {
	Warning   Warning    `json:"warning"`
	Evidences []Evidence `json:"evidences"`
	GuiltIds  []int64    `json:"guilt_ids"`
}

func (newWarningRequest WarningRequest) Validate() error {
	validate := validator.New()
	warningValidate := Warning{
		VictimName:         newWarningRequest.Warning.VictimName,
		VictimAccountId:    newWarningRequest.Warning.VictimAccountId,
		AssaulterName:      newWarningRequest.Warning.AssaulterName,
		AssaulterAccountId: newWarningRequest.Warning.AssaulterAccountId,
	}
	if err := validate.Struct(warningValidate); err != nil {
		return errors.New("input warning error")
	}
	if len(newWarningRequest.Evidences) < 1 {
		return errors.New("no evidence error")
	}

	for i := range newWarningRequest.Evidences {
		evidenceValidate := Evidence{
			Content:     newWarningRequest.Evidences[i].Content,
			EvidenceUrl: newWarningRequest.Evidences[i].EvidenceUrl,
		}
		// if err := validate.Struct(evidenceValidate); err != nil {
		// 	return errors.New("input evidence error")
		// }
		if len(evidenceValidate.Content) < 1 || len(evidenceValidate.Content) > 500 {
			return errors.New("input evidence error")
		}
		regexpOfUrl := regexp.MustCompile(`^(http|https)://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$`)
		if evidenceValidate.EvidenceUrl != "" && !regexpOfUrl.MatchString(evidenceValidate.EvidenceUrl) {
			return errors.New("invalid evidence url error")
		}
	}

	if len(newWarningRequest.GuiltIds) < 1 {
		return errors.New("no guilt error")
	}
	return nil
}
