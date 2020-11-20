import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Schema from 'async-validator';
import { generateForm } from 'utils';
import { DISPLAY } from 'consts/forms';
import { Input, Text } from '@ui-kitten/components';
import InputPassword from 'components/InputPassword';
import { StyleSheet } from 'react-native';
import { baseInput } from 'assets/styles';

export default forwardRef((props, ref) => {
  const [form, setForm] = useState(generateForm(props.formConfig));
  const [messages, setMessages] = useState({})

  useImperativeHandle(ref, () => ({
    get: _getForm,
    set: _setForm,
    validate: _validate
  }))

  const _getForm = async () => {
    const isInValid = await _validate();
    if (!isInValid) {
      return form
    }
    return
  }

  const _setForm = (_newForm) => setForm(_form => ({
    ..._form,
    ..._newForm
  }))

  const _validate = async () => {
    try {
      const validator = new Schema(props.formConfig)
      await validator.validate(form)
      setMessages({})
      return
    } catch (error) {
      const _messages = {}
      error.errors.map(err => {
        _messages[err.field] = err.message
      })
      setMessages(_messages)
      return error.errors
    }
  }

  const _onChangeText = (key) => text => _setForm({
    [key]: text
  })

  return (
    <>
      {
        Object.keys(props.formConfig).map((key, index) => {
          switch (props.formConfig[key].display.type) {
            case DISPLAY.INPUT: return (
              <Input
                key={index}
                label={<Text>{props.formConfig[key].display.label}</Text>}
                value={form[key]}
                status={messages[key] ? "danger" : "basic"}
                caption={messages[key]}
                onChangeText={_onChangeText(key)}
                style={StyleSheet.compose([baseInput.fullWidth])}
              />
            )
            case DISPLAY.INPUT_PASSWORD: return (
              <InputPassword
                key={index}
                label={<Text>{props.formConfig[key].display.label}</Text>}
                value={form[key]}
                onChangeText={_onChangeText(key)}
                status={Object.keys(messages).length ? "danger" : "basic"}
                caption={messages[key]}
                style={StyleSheet.compose([baseInput.fullWidth])}
              />
            )
            default: return null
          }
        })
      }
    </>
  )
})