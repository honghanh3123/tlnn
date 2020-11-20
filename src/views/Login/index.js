import React, { useContext, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { baseLayout, baseText } from 'assets/styles';
import styles from './styles';
import Form from 'components/Form';
import { login } from 'consts/forms';
import AsyncButton from 'components/AsyncButton';
import { apiLogin } from 'apis/auth'
import { RootContext } from 'utils';

export default () => {
  const formRef = useRef();
  const { setContext } = useContext(RootContext)

  const _login = async () => {
    const form = await formRef.current.get();
    const response = await apiLogin(form)
    if (response.status === 200) {
      setContext({
        isLogin: true
      })
    }
  }

  return (
    <Layout style={StyleSheet.compose([styles.wrapper, baseLayout.wrapper])}>
      <Layout style={styles.wrapperTitle}>
        <Text category="h1" style={baseText.title}>
          Đăng nhập vào hệ thống
        </Text>
      </Layout>
      <Layout style={styles.wrapperForm}>
        <Form
          ref={formRef}
          formConfig={login}
        />
      </Layout>
      <Layout style={styles.wrapperButtonAction}>
        <AsyncButton
          onPress={_login}
        >
          Đăng nhập
        </AsyncButton>
      </Layout>
    </Layout>
  )
}