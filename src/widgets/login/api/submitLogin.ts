import { useMutation } from '@tanstack/react-query';
import type { Login } from '../types';
import type { Token } from '@/shared/types';

const generateRandomToken = (): string => {
  const randomString = Math.random().toString(36).substring(2) + Date.now().toString(36);
  return `demo_${randomString}`;
};

const submitLogin = async ({ email, password }: Login): Promise<Token> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!email || !password) {
    throw new Error('이메일과 비밀번호를 입력해주세요.');
  }

  return {
    accessToken: generateRandomToken(),
    refreshToken: generateRandomToken(),
  };
};

export const useSubmitLogin = () => {
  return useMutation({
    mutationFn: submitLogin,
  });
};
