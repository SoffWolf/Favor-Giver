  
import React, {useState} from 'react';
import validatejs from "validate.js";
import { validationDictionary } from "./dictionary";

export const validationService = {
  onInputChange,
  getInputValidationState,
  validateInput,
  getFormValidation
};

interface Props {
  id?: string;
  input: Object;
  type: String;
  value?: String;
  cb ?: () => void;
}

const onInputChange = ({ id, value, cb } : Props ) => {
  const { inputs } = this.state;
  this.setState(
    {
      inputs: {
        ...inputs,
        [id]: getInputValidationState({
          input: inputs[id],
          value
        })
      }
    },
    cb
  );
};

const getInputValidationState = ({ input, value }: Props) => {
  return {
    ...input,
    value,
    errorLabel: input.optional
      ? null
      : validateInput({ type: input.type, value })
  };
};

const validateInput = ({ type, value } : Props) => {
  const result = validatejs(
    {
      [type]: value
    },
    {
      [type]: validationDictionary[type]
    }
  );

  if (result) {
    return result[type][0];
  }

  return null;
};

const getFormValidation = () => {
  const { inputs } = this.state;

  const updatedInputs = {};

  for (const [key, input] of Object.entries(inputs)) {
    updatedInputs[key] = getInputValidationState({
      input,
      value: input.value
    });
  };

  this.setState({
    inputs: updatedInputs
  });
};